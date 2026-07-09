import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Two parallel rate limiters: one keyed on IP, one keyed on browser visitor ID.
// A request is allowed only if BOTH limits have budget remaining.
// This protects against:
//   - Single user clearing localStorage to reset (IP catches them)
//   - Multiple users sharing an IP / coworking space / CGNAT (visitor ID catches each independently)
const ipLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "30 d"),
  analytics: true,
  prefix: "lvrge_ratelimit_ip",
});

const visitorLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "30 d"),
  analytics: true,
  prefix: "lvrge_ratelimit_vid",
});

// Strict format check for visitor IDs supplied by the client.
// Expected: "v1_" prefix + alphanumerics/dashes. Reject anything malformed.
function isValidVisitorId(value) {
  if (typeof value !== 'string') return false;
  if (value.length < 4 || value.length > 64) return false;
  return /^[a-zA-Z0-9_-]+$/.test(value);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Testing/admin bypass: if the caller sends the correct secret header AND
  // that secret is configured in this deployment's env vars, skip rate
  // limiting entirely. Lets the site owner test without burning through (or
  // waiting out) the same 10-scans-per-30-days limit real users face.
  // Set TEST_BYPASS_KEY in Vercel env vars to enable; leave it unset to
  // disable the bypass entirely.
  const testBypassKey = process.env.TEST_BYPASS_KEY;
  const providedKey = req.headers['x-lvrge-test-key'];
  const bypassRateLimit = Boolean(testBypassKey) && providedKey === testBypassKey;

  // Get the user's IP from Vercel's headers
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    'unknown';

  // Pull the visitor ID out of the request body, then sanitize and remove it
  // before we forward the body to Anthropic.
  let visitorId = null;
  const body = req.body && typeof req.body === 'object' ? { ...req.body } : {};
  if (body.visitor_id && isValidVisitorId(body.visitor_id)) {
    visitorId = body.visitor_id;
  }
  delete body.visitor_id;

  if (!bypassRateLimit) {
    // Check both rate limits. If we have a valid visitor ID, both must pass.
    // If we don't (old client, missing field, curl), fall back to IP-only.
    const ipCheck = await ipLimiter.limit(ip);

    let visitorCheck = null;
    if (visitorId) {
      visitorCheck = await visitorLimiter.limit(visitorId);
    }

    // The user's "remaining" is the minimum of the two — whichever is more restrictive.
    const limit = ipCheck.limit;
    const remaining = visitorCheck
      ? Math.min(ipCheck.remaining, visitorCheck.remaining)
      : ipCheck.remaining;
    const reset = visitorCheck
      ? Math.max(ipCheck.reset, visitorCheck.reset)
      : ipCheck.reset;
    const success = visitorCheck
      ? (ipCheck.success && visitorCheck.success)
      : ipCheck.success;

    // Surface limit info on every response so the frontend can keep its UI in sync
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);

    if (!success) {
      return res.status(429).json({
        error: 'rate_limit_exceeded',
        message: "You've reached your free scan limit for this month. Upgrade to Pro for 100 scans/month.",
        limit,
        remaining: 0,
        reset,
      });
    }
  } else {
    // Bypassed — report a large remaining count so the frontend usage bar
    // doesn't show a misleading "0 remaining" from a stale sync.
    res.setHeader('X-RateLimit-Limit', 999999);
    res.setHeader('X-RateLimit-Remaining', 999999);
    res.setHeader('X-RateLimit-Reset', 0);
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// api/verify-pro.js
// Verifies if a customer has an active Pro subscription
// Checks Redis cache for subscription status
// Returns: { isPro: boolean, customerId: string, expiresAt: timestamp }

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerId, email } = req.body;

  if (!customerId && !email) {
    return res.status(400).json({ error: 'customerId or email required' });
  }

  try {
    // Check Redis for active subscription
    const key = customerId ? `lvrge:pro:${customerId}` : `lvrge:email:${email}`;
    const subscription = await redis.get(key);

    if (subscription) {
      const parsed = JSON.parse(subscription);
      return res.status(200).json({
        isPro: true,
        customerId: parsed.customerId,
        expiresAt: parsed.expiresAt,
        name: parsed.name,
      });
    }

    return res.status(200).json({ isPro: false });
  } catch (error) {
    console.error('Verify Pro error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
}

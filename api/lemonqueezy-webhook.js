// api/lemonqueezy-webhook.js
// Handles LemonSqueezy subscription events
// Events: order.created, subscription.created, subscription.updated, subscription.cancelled
// Stores/updates Pro status in Redis

import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const WEBHOOK_SECRET = process.env.LEMONQUEEZY_WEBHOOK_SECRET;

function verifyWebhook(body, signature) {
  if (!WEBHOOK_SECRET) {
    console.warn('LEMONQUEEZY_WEBHOOK_SECRET not set - webhook verification skipped');
    return true;
  }

  const hash = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return hash === signature;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook signature
  const signature = req.headers['x-signature'];
  const rawBody = req.rawBody || JSON.stringify(req.body);

  if (!verifyWebhook(rawBody, signature)) {
    console.error('Invalid webhook signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { meta, data } = req.body;
  const eventType = meta?.event_name;

  try {
    switch (eventType) {
      case 'order.created':
        // One-time purchase or initial subscription
        await handleOrderCreated(data);
        break;

      case 'subscription.created':
        // Subscription started
        await handleSubscriptionCreated(data);
        break;

      case 'subscription.updated':
        // Subscription updated (e.g., plan change)
        await handleSubscriptionUpdated(data);
        break;

      case 'subscription.cancelled':
        // Subscription cancelled
        await handleSubscriptionCancelled(data);
        break;

      default:
        console.log(`Unhandled event: ${eventType}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: 'Processing failed' });
  }
}

async function handleOrderCreated(data) {
  // Extract customer info from LemonSqueezy order
  const customerId = data.attributes?.customer_id;
  const email = data.attributes?.customer_email;
  const name = data.attributes?.customer_name;

  if (!customerId || !email) return;

  // Store Pro subscription in Redis (30 days validity as baseline)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const subscription = {
    customerId,
    email,
    name,
    expiresAt,
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  await redis.set(`lvrge:pro:${customerId}`, JSON.stringify(subscription), {
    ex: 30 * 24 * 60 * 60, // 30 days
  });
  await redis.set(`lvrge:email:${email}`, JSON.stringify(subscription), {
    ex: 30 * 24 * 60 * 60,
  });

  console.log(`Pro subscription activated for ${email}`);
}

async function handleSubscriptionCreated(data) {
  const customerId = data.relationships?.customer?.data?.id;
  const email = data.attributes?.customer_email;
  const name = data.attributes?.customer_name;
  const renews = data.attributes?.renews_at;

  if (!customerId || !email) return;

  // Calculate expiration from renewal date or default to 30 days
  const expiresAt = renews || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const subscription = {
    customerId,
    email,
    name,
    expiresAt,
    status: 'active',
    subscriptionId: data.id,
    createdAt: new Date().toISOString(),
  };

  // Store with TTL slightly longer than subscription renewal
  const ttl = Math.ceil((new Date(expiresAt) - Date.now()) / 1000) + 86400; // +1 day buffer

  await redis.set(`lvrge:pro:${customerId}`, JSON.stringify(subscription), {
    ex: ttl,
  });
  await redis.set(`lvrge:email:${email}`, JSON.stringify(subscription), {
    ex: ttl,
  });

  console.log(`Subscription created for ${email}, expires ${expiresAt}`);
}

async function handleSubscriptionUpdated(data) {
  // Same as created - update the subscription data
  await handleSubscriptionCreated(data);
  console.log(`Subscription updated for customer ${data.relationships?.customer?.data?.id}`);
}

async function handleSubscriptionCancelled(data) {
  const customerId = data.relationships?.customer?.data?.id;
  const email = data.attributes?.customer_email;

  if (!customerId && !email) return;

  // Delete subscription from Redis
  if (customerId) {
    await redis.del(`lvrge:pro:${customerId}`);
  }
  if (email) {
    await redis.del(`lvrge:email:${email}`);
  }

  console.log(`Subscription cancelled for ${email || customerId}`);
}

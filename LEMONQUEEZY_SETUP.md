# LemonSqueezy Integration Setup — LVRGE Pro

**Status**: Backend and frontend code complete. Ready for payment processor configuration.  
**Date**: May 20, 2026

---

## What's Been Built

### Backend Endpoints ✅
- **`/api/verify-pro.js`** — Verifies Pro subscription status by checking Upstash Redis
- **`/api/lemonqueezy-webhook.js`** — Handles LemonSqueezy subscription events (created, updated, cancelled)
- **Signature verification** — HMAC-SHA256 validation of incoming webhooks

### Frontend Updates ✅
- **`checkProStatus()`** — Now calls backend `/api/verify-pro` endpoint for authorization
- **`processPurchase()`** — Redirects to LemonSqueezy hosted checkout
- **`handlePaymentReturn()`** — Captures `customer_id` from LemonSqueezy redirect and stores locally
- **Graceful fallback** — Falls back to localStorage if backend unavailable

---

## Step-by-Step Setup

### 1. Create LemonSqueezy Product & Get Checkout URL

1. Go to [LemonSqueezy Dashboard](https://app.lemonsqueezy.com)
2. Navigate to **Products** → **Create Product**
3. Set up the LVRGE Pro subscription:
   - **Name**: LVRGE Pro
   - **Price**: $19/month (or your preferred pricing)
   - **Subscription enabled**: Yes
   - **Billing cycle**: Monthly
4. After creating, go to **Product Details** → **Sales pages/checkouts**
5. Find your checkout URL. It will look like:
   ```
   https://leverageapp.lemonsqueezy.com/checkout/buy/[PRODUCT_ID]
   ```
6. Copy this URL.

### 2. Update app.html with Checkout URL

In `/Users/scottsheeran/Desktop/LVRGE/app.html`, find the `processPurchase()` function (around line 386):

```javascript
function processPurchase() {
  const checkoutUrl = 'https://leverageapp.lemonsqueezy.com/checkout/buy/YOUR_PRODUCT_ID';
  // Replace YOUR_PRODUCT_ID with your actual product ID from step 1
  window.location.href = checkoutUrl;
}
```

Replace `YOUR_PRODUCT_ID` with the actual product ID from your LemonSqueezy checkout URL.

### 3. Configure Webhook Secret

1. In LemonSqueezy Dashboard, go to **Settings** → **Webhooks**
2. Create a new webhook endpoint:
   - **Endpoint URL**: `https://leverageapp.co/api/lemonqueezy-webhook`
   - **Events**: Select `order.created`, `subscription.created`, `subscription.updated`, `subscription.cancelled`
3. Copy the **Signing Secret**
4. Add to Vercel environment variables:
   ```
   LEMONQUEEZY_WEBHOOK_SECRET=your_signing_secret_here
   ```

### 4. Test Webhook Locally (Optional)

Use LemonSqueezy's webhook testing in their dashboard to send test events. You should see:
- ✅ Webhook received (202 status)
- ✅ Data stored in Upstash Redis

### 5. Deploy & Test End-to-End

```bash
# Push updated app.html to GitHub
git add api/
git commit -m "Add LemonSqueezy payment integration"
git push

# Vercel auto-deploys
# Test at https://leverageapp.co/app
```

**Test flow:**
1. User clicks "Upgrade to Pro — $19/mo"
2. Redirected to LemonSqueezy checkout
3. Completes payment
4. LemonSqueezy redirects back with `?customer_id=xxx`
5. Frontend stores `customerId` in localStorage
6. User reloads page
7. `checkProStatus()` calls `/api/verify-pro`
8. Backend checks Redis for subscription
9. Returns `{ isPro: true, ... }`
10. Header updates to "Pro Member" badge ✅

---

## Testing Without Live Payment

### Option 1: Manual localStorage (Development)
```javascript
// In browser DevTools console:
localStorage.setItem('lvrge_pro', 'true');
location.reload();
```

### Option 2: Mock Customer ID
```javascript
localStorage.setItem('lvrge_customer_id', 'test-customer-123');
location.reload();
```

### Option 3: Use LemonSqueezy Test Mode
LemonSqueezy provides test card numbers in their docs. Use those in the checkout to generate test orders without real charges.

---

## Environment Variables Needed

Add these to Vercel:

```
UPSTASH_REDIS_REST_URL=<your_upstash_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_token>
LEMONQUEEZY_WEBHOOK_SECRET=<your_webhook_signing_secret>
```

The first two already exist (used for rate limiting). Just add the webhook secret.

---

## Subscription Flow (How It Works)

1. **User purchases** → LemonSqueezy creates order
2. **Webhook fires** → `order.created` event sent to `/api/lemonqueezy-webhook`
3. **Server validates signature** → HMAC-SHA256 check
4. **Server stores subscription** → Saves to Upstash Redis with TTL
5. **User lands** → `customer_id` in URL, stored in localStorage
6. **Page loads** → `checkProStatus()` calls `/api/verify-pro`
7. **Backend checks** → Queries Redis, returns subscription status
8. **Frontend updates** → Shows "Pro Member" badge

---

## File Changes Summary

| File | Status | Changes |
|------|--------|---------|
| `api/verify-pro.js` | ✅ Complete | New endpoint for subscription verification |
| `api/lemonqueezy-webhook.js` | ✅ Complete | New webhook handler |
| `app.html` | ✅ Complete | Updated `checkProStatus()`, `processPurchase()`, added `handlePaymentReturn()` |

---

## What's Left

- [ ] Replace `YOUR_PRODUCT_ID` in `processPurchase()` with actual LemonSqueezy product ID
- [ ] Add `LEMONQUEEZY_WEBHOOK_SECRET` to Vercel environment variables
- [ ] Test end-to-end: checkout → redirect → subscription verification
- [ ] Monitor error logs in Vercel for any issues
- [ ] (Optional) Add email verification as fallback if `customer_id` not in URL

---

## Rollback Plan

If issues arise:
1. Revert `app.html` to version without LemonSqueezy
2. Keep webhook endpoint running (will accept but ignore events)
3. Continue with localStorage-only Pro status for manual testing

---

## Success Criteria

✅ User clicks "Upgrade to Pro"  
✅ Redirected to LemonSqueezy checkout  
✅ Payment completes  
✅ Redirected back to app with `customer_id`  
✅ Subscription verified from backend  
✅ "Pro Member" badge displays  
✅ File upload, exports, unlimited scans work  

---

**Ready to launch.** Once you add the webhook secret and replace the product ID, LVRGE Pro is live.

# LVRGE — Google Drive Backup

This bundle contains everything you need to either restore the live site or hand the project to someone else.

**Backup date:** May 13, 2026 (pre-launch)

## What's in here

### `site_backups/`
Latest live versions of all deployed files. If a future deploy breaks the site, you can re-upload these to GitHub to restore.

- `index.html` — landing page (leverageapp.co)
- `app.html` — the actual app (leverageapp.co/app)
- `chat.js` — Anthropic API proxy with IP + visitor ID rate limiting (lives at `/api/chat.js` in the repo)
- `vercel.json` — clean URL routing config
- `package.json` — npm dependencies (Upstash packages)
- `site.webmanifest` — PWA manifest for mobile home screen icons

### `brand_assets/logos/`
LVRGE logo in three background variants. Use the black version for LinkedIn avatar (best contrast at small sizes). PNG for upload to platforms, SVG for further editing.

### `brand_assets/banners/`
LinkedIn company page cover banner. Sized at 1584x396 (LinkedIn's recommended dimensions).

### `brand_assets/favicons/`
Full favicon set: ICO (legacy browsers), PNG at multiple sizes for browser tabs, iOS home screen, Android home screen, and PWA splash.

### `brand_assets/social/`
Open Graph image (`og_image.png`) — appears when leverageapp.co is shared on Twitter, LinkedIn, Slack, iMessage, etc. Sized at 1200x630 (universal standard).

## How to restore the site if everything breaks

1. Go to github.com/scottsheeran/Leverage
2. Replace each file in the repo with the corresponding file from `site_backups/`
3. Commit and push — Vercel will auto-deploy
4. Re-upload favicons and og_image to the repo root if those got deleted

## Active services LVRGE depends on

- **Vercel** (hosting) — sheeranscott-4059 account
- **Namecheap** (domain) — leverageapp.co
- **Upstash Redis** (rate limiting) — `lvrge-ratelimit` database, env vars `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel
- **Anthropic API** (the actual AI) — env var `ANTHROPIC_API_KEY` in Vercel
- **Kit (formerly ConvertKit)** (email list) — form ID `9435551` embedded in index.html

If any of these go down or get disconnected, the site will partially or fully break. See Notion → Credentials & Accounts for the full inventory.

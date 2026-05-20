# LVRGE Workspace

> Paste each section below into a separate Notion page. Use Notion's "/" command to convert headings, tables, and toggles. The order in this doc matches the recommended page structure.

---

# 🏠 Home

> Paste this onto your top-level LVRGE page. This is the dashboard you see when you open the workspace.

## This week's focus

*Update this every Sunday night with one sentence.*

`May 13 — Pre-launch. Birthday trip this week. Launch Monday May 20.`

## Quick links

- 🌐 [Live site](https://www.leverageapp.co)
- 📱 [App](https://www.leverageapp.co/app)
- 🐙 [GitHub repo](https://github.com/scottsheeran/Leverage)
- 🚀 [Vercel dashboard](https://vercel.com/dashboard)
- ✉️ [Kit dashboard](https://app.kit.com)
- ⚡ [Upstash dashboard](https://console.upstash.com)
- 💼 LinkedIn LVRGE page
- 🐦 [Twitter @leverageappco](https://twitter.com/leverageappco)
- 🏷️ [Namecheap domain](https://www.namecheap.com)

## Current numbers

*Update weekly. See Growth Tracker for history.*

| Metric | Value | As of |
| --- | --- | --- |
| Free users (Kit subscribers) | 0 | May 13 |
| Paying users | 0 | May 13 |
| MRR | $0 | May 13 |
| Monthly API spend | ~$0 | May 13 |

## What's currently live

- ✅ Landing page (leverageapp.co)
- ✅ App with rate limiting (leverageapp.co/app)
- ✅ Three-tier pricing + Founding Member offer
- ✅ Email capture via Kit
- ✅ Founder email forwarding (founder@, hello@)
- ⏳ Stripe payment processing (set up when first user wants to pay)

---

# 📓 Decisions Log

> Every meaningful decision gets a row. Date, what was decided, why, and (later) how it played out. This is your memory — populate it as you go.

## How to use

- Add a row every time you make a non-trivial decision
- Update the "Outcome" column 30 days later
- Review the log monthly to see what patterns emerge

## Log

| Date | Decision | Reasoning | Outcome |
| --- | --- | --- | --- |
| May 9 | Named the product LVRGE | "Leverage" was taken on LinkedIn, vowel-drop pattern (Tumblr, Flickr, Lyft) is proven, looks great as a wordmark | TBD |
| May 9 | Kept leverageapp.co as the domain | Already own it, brand and URL don't have to match, migration risk too high pre-launch | TBD |
| May 10 | Picked black badge logo over cream | Better contrast at small avatar sizes on LinkedIn feed | TBD |
| May 10 | Switched landing page banner to tagline-led (no LVRGE wordmark) | Profile avatar overlap was eating the wordmark on the company page | TBD |
| May 10 | Set up Upstash for server-side rate limiting | Protect Anthropic API costs from abuse; in-memory was too leaky | TBD |
| May 11 | Built landing page above the app (architecture: replace homepage, app at /app) | Cleanest SaaS pattern, no users to break, Vercel rewrites handle the routing | TBD |
| May 11 | Picked Kit (formerly ConvertKit) over Beehiiv for email capture | 10k free subscribers vs 2.5k, less confusing trial-default signup | TBD |
| May 12 | Defaulted to keep double opt-in on Kit | Better deliverability long-term; lose some signups to non-confirmation but worth it | TBD |
| May 12 | Three-tier pricing (Free / Pro $19 / Pro Unlimited $39) with Founding Member offer | Two tiers undercharges power users; $39 anchors $19 as the reasonable middle | TBD |
| May 12 | Founding Member: $15 Pro, $29 Unlimited, first 50 users, locked forever | Genuine launch hook for Reddit/LinkedIn; trade some long-term revenue for early urgency | Revisit if hit 30+ founding members; consider tightening to "locked 12 months" |
| May 12 | IP + visitor ID hybrid rate limiting | Catches shared-network false positives without requiring login | TBD |
| May 13 | Added Notes field to job tracker, localStorage persistence | Tracker is the stickiest feature; was losing data on refresh which was a launch blocker | TBD |
| May 13 | Holding off on Stripe until first user asks to pay | Premature payments work is the classic indie pre-launch trap | TBD |
| May 13 | Deferring career coach / outplacement partnerships | Mentor recommended this; too synchronous for lifestyle goal at this stage | Revisit at month 3 if organic acquisition isn't enough |
| May 13 | Launch date set: Monday May 20 evening (7-9pm ET) | Peak Reddit hours; first available slot after birthday trip | TBD |

---

# 📊 Growth Tracker

> One row per week. Update Sunday night, 10 minutes max. This builds the only chart that matters: trajectory.

## How to use

- Add a row each Sunday with that week's numbers
- Pull Kit subscriber count from app.kit.com
- Pull paying user count from Stripe (once set up)
- Pull API cost from Anthropic console
- Note any major event in the Notes column

## Weekly numbers

| Week of | Site visitors | New free signups | Total paying | MRR | API spend | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| May 13 | — | 0 | 0 | $0 | $0 | Pre-launch week. Site went live with full pricing structure. |
| May 20 | — | — | — | — | — | LAUNCH WEEK — LinkedIn + r/recruitinghell |
| May 27 | — | — | — | — | — | — |
| Jun 3 | — | — | — | — | — | — |

## 30-day milestones to track

- [ ] First 10 free signups
- [ ] First paying customer
- [ ] First Founding Member
- [ ] First inbound email (real user, not test)
- [ ] First Reddit comment from a stranger
- [ ] First LinkedIn engagement from outside personal network
- [ ] First piece of unsolicited feedback
- [ ] First bug report
- [ ] First feature request

---

# 💬 Customer Feedback

> Every piece of feedback gets a row. Don't filter or summarize — capture verbatim, with source and date. After 30 days, patterns emerge.

## How to use

- Drop direct quotes in the Quote column (not paraphrased)
- Tag by type so you can filter later
- Don't react to one comment — react to patterns

## Feedback log

| Date | Source | User | Quote | Type |
| --- | --- | --- | --- | --- |
| | | | | |

## Type definitions

- **Bug** — something is broken
- **Feature** — request for new functionality
- **Compliment** — positive feedback, save these for future testimonials (with permission)
- **Question** — confusion about how something works
- **Pricing** — anything about pricing tiers, willingness to pay, comparison shopping
- **Channel** — where they heard about LVRGE

---

# 🚀 Launch Plan

> The playbook. Check off items as you go. This page becomes the template for future subreddit launches.

## Pre-launch (DONE)

- [x] Brand identity (LVRGE wordmark, badge logo, color tokens)
- [x] LinkedIn company page setup (logo, banner, About copy)
- [x] Favicons across all platforms
- [x] Social share card (og:image)
- [x] Landing page with three-tier pricing
- [x] App with rate limiting (Upstash IP + visitor ID)
- [x] Email capture via Kit
- [x] Founder email forwarding
- [x] Site files backed up to Drive
- [x] Notion workspace set up

## Phase 1: Launch Day Setup (Monday May 20, morning)

- [ ] Turn off Gmail vacation responder
- [ ] Check the site in incognito — confirm everything loads
- [ ] Test scan from incognito (different IP/visitor than my main browser)
- [ ] Confirm Kit subscriber form still works
- [ ] Check Vercel deploys are all green
- [ ] Open Vercel logs in a tab (for monitoring)
- [ ] Open Upstash dashboard in a tab (for monitoring API usage)

## Phase 2: LinkedIn Post (Monday May 20, 10-11am ET)

- [ ] Post the LinkedIn LVRGE post (copy below)
- [ ] Switch to personal LinkedIn, find the post, reshare
- [ ] Add 1-2 sentences of personal context in the reshare

### LinkedIn post copy

```
Today we launched LVRGE — a job search tool built for the people who've done everything right and still aren't getting interviews.

The resume is solid. The experience is there. The skills are real. But somehow, silence.

We built LVRGE because the existing tools cost too much (Jobscan: $50/mo), do too little (one-shot $500 resume writers), or produce output a hiring manager spots as AI-generated in 3 seconds.

What's inside:
→ ATS match scoring against any job description
→ Cover letter generator with four tone options (no "I am writing to express my interest" energy)
→ Job tracker with notes, fit scoring, and follow-up context

Free tier: 3 scans per day, no credit card required.
Founding Members (first 50): $15/mo Pro or $29/mo Unlimited — locked forever.

The problem isn't you. It's the system. We built LVRGE to help you work it.

Try it free: leverageapp.co

#JobSearch #ResumeOptimization #JobHunting #ATS #CareerAdvice
```

## Phase 3: Reddit Post (Monday May 20, 7-9pm ET)

- [ ] Confirm Reddit account has at least some non-promotional comment history
- [ ] Go to r/recruitinghell
- [ ] Click Create Post
- [ ] Use title and body below
- [ ] Pick flair: "Advice" or "Discussion" (NOT "Self-Promotion")
- [ ] Post
- [ ] Upvote my own post
- [ ] Save the URL of the post

### Reddit title

```
I got tired of getting filtered out by ATS systems despite being qualified, so I built a free tool to fix it
```

### Reddit body

```
I've been job hunting for the last few months. Senior-level sales role. 8 years of experience, hit quota every year, references lined up. And still — applying to 50+ jobs, hearing back from maybe 3.

At some point I realized: my resume isn't bad. The system is.

ATS software filters before a human ever sees the resume. Miss the right keywords, miss the right phrasing — the resume goes into the void. Doesn't matter that I'm actually qualified. The robot doesn't know that.

I tried the existing tools:
- Jobscan: $50/month. Decent but expensive when you're unemployed.
- ChatGPT for cover letters: hiring managers spot it in 3 seconds.
- Paying a resume writer $500: helps once. But every job needs a different version.

So I built my own. It's called LVRGE (leverageapp.co). Three things in one:

1. **Resume optimizer** — paste your resume + a job description, get an ATS match score, the keywords you're missing, and rewritten sections in your voice (not robot-speak).

2. **Cover letter generator** — pick a tone (direct, warm, formal, bold). Get a cover letter that doesn't start with "I am writing to express my interest in..."

3. **Job tracker** — every application, status, fit score, and notes. So I stop sending duplicate apps to the same company because I forgot I already applied.

It's free. 3 scans per day on the free tier. No credit card, no signup wall, no "create an account to continue" nonsense. Just paste your stuff in and use it.

I'm running it myself — I've gotten 3 interviews a week from 15-25 applications using it. So either it works or I got really lucky. Probably some of both.

If you try it and have feedback (or it breaks), I want to know. The Pro tier is $15/mo for the first 50 people who upgrade — locked forever. After that it goes up.

The problem isn't you. It's the system. Built this to help us all work it.

---

Edit: To answer the question I know is coming — yes, I'm using AI under the hood (Anthropic's Claude). No, your data isn't being stored or used to train models. The whole thing runs through an API proxy. Resumes never get saved server-side.
```

## Phase 4: Comment Monitoring (Monday May 20, 9pm-1am ET)

- [ ] Check Reddit thread every 30 min for first 4 hours
- [ ] Respond to every comment in first 2 hours
- [ ] Use response templates below
- [ ] Take screenshots of meaningful comments for the Customer Feedback log
- [ ] Watch site analytics (if set up) for traffic spike

### Comment response templates

**Type 1 — Supportive ("looks cool, will try")**
```
Thanks — let me know how it goes. If something's broken or confusing, drop a comment here or DM me. I'm actively working on it so feedback gets folded in fast.
```

**Type 2 — "Just a ChatGPT wrapper?"**
```
Fair question. Yes, the actual AI behind it is Claude (Anthropic). But "wrapper" undersells what's involved — the prompts are tuned specifically for ATS matching, the JSON output is structured so the UI can render keyword pills, gap flags, and rewritten sections cleanly, and you can paste a 4-page job description without it choking on context.

Could you DIY this with raw Claude? Honestly yes, if you want to manage prompts, parse output, build the UI, track usage, etc. I built this because I didn't want to do that 50 times during a job search. Free tier is 3 scans/day so you can decide if it's worth it.
```

**Type 3 — "How is my data protected?"**
```
Good question. Short version: nothing's stored server-side. The request goes through a proxy to Anthropic's API, response comes back, end of transaction. I don't have a database of resumes because I don't have a database, period — your data lives only in your browser's localStorage (job tracker) and disappears when the request completes (resume scans).

If you're really paranoid, run it from incognito and your data is gone the moment you close the tab.
```

**Type 4 — Skeptic ("ATS doesn't work that way")**
```
You might be right — ATS implementations vary wildly between companies. Some are dumb keyword matchers, some are more sophisticated, some are barely used. The tool is honestly more useful as a checklist than a magic bypass: "Did you mention X technology that's literally in the job description?" is a question most people don't ask themselves before hitting submit.

It's free to use. If it doesn't help, you've lost 30 seconds. If it does, you've saved an application from the void.
```

**Type 5 — Hostile ("cool ad bro")**
*DO NOT REPLY. Let the upvotes and other commenters defend you. If you must reply:*
```
Free tier exists, no signup wall, no credit card. I'm not selling you anything you didn't choose to look at.
```
*Then stop replying in that thread.*

## Phase 5: Post-Launch Week (May 21-27)

- [ ] Update Decisions Log with launch outcomes
- [ ] Update Growth Tracker for week of May 20
- [ ] Reply to any inbound email at founder@leverageapp.co within 24 hours
- [ ] Note all feedback in Customer Feedback log
- [ ] Check Anthropic API costs daily (watch for abuse spikes)
- [ ] Do NOT post on r/jobsearch yet — wait 3+ days

## Phase 6: Second Subreddit (May 24-26, depending on first launch performance)

- [ ] Draft r/jobsearch post (adapt from r/recruitinghell version)
- [ ] Post during peak hours
- [ ] Same monitoring pattern

## Phase 7: Third Subreddit (May 28-30)

- [ ] Draft r/resumes post
- [ ] Different angle: more specific advice, less founder story
- [ ] Post during peak hours

---

# 💡 Ideas & Backlog

> Where every "wouldn't it be cool if..." thought goes to live without distracting me. Review monthly. Promote things to active work, or delete them.

## Features

- [ ] Stripe payment integration (when first user asks)
- [ ] User accounts and saved scan history
- [ ] Browser extension for one-click job description capture
- [ ] LinkedIn integration (pull job descriptions automatically)
- [ ] Resume version history (attach a specific resume to a tracked job)
- [ ] Interview prep notes attached to job entries
- [ ] Follow-up reminders for tracked jobs
- [ ] Kanban view for job tracker
- [ ] Export tracker to CSV
- [ ] Bulk job import from email or LinkedIn saved jobs
- [ ] Mobile-friendly app shell
- [ ] Pro vs Free differentiation features (faster API priority, etc.)

## Marketing channels to try (post-launch)

- [ ] SEO content (blog posts on ATS topics)
- [ ] YouTube short demos
- [ ] Indie Hackers post about the build journey
- [ ] Product Hunt launch (after a few weeks of real users)
- [ ] Job-search Discord servers
- [ ] Outplacement firms (deferred per lifestyle goal, revisit at month 3)
- [ ] Career coach partnerships (deferred, revisit at month 3)
- [ ] University career centers (long sales cycle, low priority)

## Content topics

- [ ] "What I learned from getting filtered by 200 ATS systems"
- [ ] "The 5 most common keyword gaps in tech resumes"
- [ ] "Why your cover letter sounds like everyone else's (and how to fix it)"
- [ ] "I tracked 100 job applications. Here's what actually worked."
- [ ] Comparison post: LVRGE vs Jobscan vs Teal vs Resume Worded

## Random brain dumps

*Drop anything here. Tag with date.*

---

# 📝 Content & Posts

> Drafts and archives of every public post. When something works, you'll want to remember exactly what you said.

## LinkedIn

### LVRGE company page

**Post 1 (LAUNCH) — May 20**
*Status: drafted, posting Monday*

[See full text in Launch Plan]

### Personal LinkedIn

**Reshare 1 (LAUNCH) — May 20**
*Status: planned for after company post goes live*

Draft personal context to add when resharing:
```
Sharing the launch of LVRGE — a project I've been building over the past few weeks. If you (or anyone you know) is in the middle of a job search and feels like the ATS is fighting you, this might help. Free to try.
```

## Reddit

### r/recruitinghell

**Post 1 — May 20** (Status: drafted, posting Monday evening)

[See full text in Launch Plan]
URL: TBD after posting

### r/jobsearch

**Post 2 — May 24+** (Status: not drafted yet)

### r/resumes

**Post 3 — May 28+** (Status: not drafted yet)

## Twitter/X

*No posts yet. Account exists (@leverageappco) but inactive.*

## Future

*Blog posts, newsletter issues, video scripts, anything else.*

---

# 🔐 Credentials & Accounts

> Inventory of every service LVRGE uses and which email address it's tied to. **DO NOT STORE PASSWORDS HERE.** Use 1Password / Bitwarden / Apple Keychain for actual passwords.

## Active accounts

| Service | URL | Account name / handle | Email tied to | Purpose |
| --- | --- | --- | --- | --- |
| Namecheap | namecheap.com | Scott personal | personal email | Domain (leverageapp.co) |
| Vercel | vercel.com | sheeranscott-4059 | LVRGE Gmail | Hosting + serverless functions |
| GitHub | github.com/scottsheeran/Leverage | scottsheeran | personal email | Code repo (private) |
| Upstash | console.upstash.com | — | LVRGE Gmail | Redis for rate limiting |
| Kit (ConvertKit) | app.kit.com | LVRGE | LVRGE Gmail | Email capture / list |
| Anthropic | console.anthropic.com | — | ? (which email is the API key tied to?) | Claude API |
| LinkedIn | linkedin.com/company/lvrge | LVRGE | Scott personal LinkedIn (admin) | Company page |
| Twitter/X | twitter.com/leverageappco | @leverageappco | LVRGE Gmail | Social (inactive) |

## Email forwards

| Address | Forwards to |
| --- | --- |
| founder@leverageapp.co | LVRGE Gmail |
| hello@leverageapp.co | LVRGE Gmail |

## Action items

- [ ] Confirm which email is on the Anthropic API account — make sure it's LVRGE Gmail
- [ ] Move GitHub repo ownership to LVRGE Gmail at some point (not urgent)
- [ ] Set up a password manager if not already using one
- [ ] Document Stripe account info here when set up

---

# 📅 Weekly Review Template

> Copy this template into a new sub-page every Sunday. 10-minute exercise. The single highest-ROI habit for a solo founder.

## Week of [DATE]

### Numbers (also log in Growth Tracker)
- Site visitors:
- New free signups:
- Total paying users:
- MRR:
- API spend:

### What went well

### What didn't

### What I learned

### Top 3 priorities for next week
1.
2.
3.

### Anything to add to Decisions Log?

### Anything to add to Ideas & Backlog?

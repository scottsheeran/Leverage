# LVRGE Notion Workspace — Manual Setup Guide

This guide walks you through creating your LVRGE roadmap, tracking, and blog calendar in Notion. No OAuth needed — just copy/paste and create.

---

## SETUP CHECKLIST

- [ ] Create main "LVRGE — 12-Month Roadmap" page
- [ ] Create "Phase Milestones" database
- [ ] Create "Daily Metrics Tracker" database
- [ ] Create "Blog Content Calendar" database
- [ ] Create "Reddit & Social Posts" tracker
- [ ] Link all databases with relations

**Time:** 20-30 minutes total

---

## STEP 1: Create Main Roadmap Page

1. In Notion, click "+ New" (or create in your existing workspace)
2. Title: **LVRGE — 12-Month Roadmap**
3. Copy the roadmap content from `LVRGE_12Month_Roadmap.md` into the page
4. Use Notion's text formatting (headings, bold, etc.) to match the markdown structure

**What goes here:**
- Full 12-month strategy (Phase 0-4 descriptions)
- Revenue targets
- Key success metrics
- Decision points
- Risk mitigation section

This is your "master document" reference page.

---

## STEP 2: Create Phase Milestones Database

1. Create a new page under your main roadmap
2. Name it: **Phase Milestones**
3. Click "Database" > "Table"
4. Add these columns:

| Column | Type | Description |
|--------|------|-------------|
| Phase | Text | Phase 0, Phase 1, etc. |
| Timeline | Date Range | Start and end date |
| Revenue Target | Number | $ MRR target (e.g., 50-300) |
| Customer Target | Number | # of paying customers target |
| Primary Goal | Text | What success looks like |
| Key Metrics | Multi-select | Specific metrics to track |
| Status | Select | Not Started / In Progress / On Track / At Risk / Complete |
| Notes | Text | Decision points, dependencies |

**Add these rows:**

| Phase | Timeline | Revenue | Customers | Primary Goal | Status |
|-------|----------|---------|-----------|--------------|--------|
| Phase 0: Launch & Validation | May 20-31 | $50-300 | 3-20 | Validate product works for non-founders | Not Started |
| Phase 1: Early Growth | Jun 1-Jul 31 | $300-800 | 15-50 | Lock in retention + multi-channel testing | Pending |
| Phase 2: Content & Expansion | Aug 1-Sep 30 | $800-1,500 | 40-75 | Establish organic growth from content | Pending |
| Phase 3: Seasonal Peak | Oct 1-Dec 31 | $1,500-3,000 | 75-150 | Capitalize on Q4 job search season | Pending |
| Phase 4: Full Ramp | Jan 1-May 31, 2027 | $3,000-5,000 | 150-250 | Hit $60K/year target | Pending |

---

## STEP 3: Create Daily Metrics Tracker Database

1. Create new page: **Daily Metrics Tracker**
2. Click "Database" > "Table"
3. Add these columns:

| Column | Type | Purpose |
|--------|------|---------|
| Date | Date | Daily entry date |
| Signups (Free) | Number | New free tier signups |
| Pro Conversions | Number | New Pro/Unlimited conversions |
| MRR | Currency | Monthly recurring revenue |
| API Costs | Currency | Daily API spend estimate |
| 30-Day Retention | Number | % of users from 30 days ago still active |
| Churn Rate | Number | % of users who left this period |
| Traffic Source | Text | Reddit, Blog, Email, Referral, etc. |
| Notes | Text | What happened, major changes, observations |

**Formulas to add:**
- Create a view filtered by "Date is between [Phase 0 start] and [Phase 0 end]" to group by phase
- Create a rollup: "Sum all MRR" to see monthly totals

**How to use:**
- Fill in daily starting May 21 (May 20 is launch day, metrics start next day)
- Update each evening (takes 2-3 min)
- Weekly review: Calculate 7-day average for smoothing

---

## STEP 4: Create Phase-Specific Metric Targets

Create a linked relation in Daily Metrics Tracker:
- Add column: "Phase" (Relation to Phase Milestones database)
- When you enter a date in Daily Metrics, it auto-links to the phase that date falls in
- This lets you roll up metrics by phase

---

## STEP 5: Create Blog Content Calendar Database

1. Create new page: **Blog Content Calendar**
2. Click "Database" > "Table"
3. Add these columns:

| Column | Type | Purpose |
|--------|------|---------|
| Title | Text | Blog post title |
| URL Slug | Text | blog-post-url-slug |
| Publish Date | Date | When it goes live |
| Phase | Select | Phase 1, Phase 2, etc. |
| Status | Select | Outline / Drafting / Review / Published |
| Target Keywords | Multi-select | SEO keywords (separate entries) |
| Word Count | Number | Target or actual length |
| Est. Traffic | Number | Expected monthly organic visits |
| CTA | Text | Call to action (link to app) |
| Content Link | URL | Link to draft (Google Doc, etc.) |

**Add these rows for Phase 1:**

| Title | Slug | Publish Date | Status | Target Keywords |
|-------|------|--------------|--------|-----------------|
| How to Beat the ATS: 5 Keywords Hiring Managers Want | how-to-beat-the-ats-keywords | June 1, 2026 | Outline | "beat the ATS", "ATS keywords", "get past ATS" |
| Why Your Generic Cover Letter Gets Rejected | why-generic-cover-letters-fail | June 8, 2026 | Outline | "cover letter tips", "how to write cover letter", "cover letter examples" |
| Track Your Job Search Like a Business | job-search-tracking-spreadsheet | June 15, 2026 | Outline | "job search spreadsheet", "job application tracker", "track applications" |

---

## STEP 6: Create Reddit & Social Posts Tracker

1. Create new page: **Reddit & Social Posts**
2. Click "Database" > "Table"
3. Add these columns:

| Column | Type | Purpose |
|--------|------|---------|
| Post Title | Text | Exact title of post |
| Platform | Select | Reddit, Twitter, LinkedIn, etc. |
| Subreddit/Community | Text | r/recruitinghell, etc. |
| Post Date | Date | When you're posting |
| Status | Select | Planned / Live / Archived |
| Upvotes/Engagement | Number | Track performance |
| Signups Generated | Number | Users who signed up from this post |
| Notes | Text | Responses, feedback, key comments |

**Add this row:**

| Post Title | Platform | Subreddit | Post Date | Status |
|-----------|----------|-----------|-----------|--------|
| I built a tool to stop resumes disappearing into the ATS black hole... | Reddit | r/recruitinghell | May 20, 2026 | Planned |

---

## STEP 7: Create Dashboard (Optional but Useful)

Create a dashboard page that shows:
- Current MRR (rollup from Daily Metrics)
- Monthly signups (sum)
- 30-day retention (latest)
- Current phase + timeline
- Next blog post date

**How:**
1. Create new page: **Dashboard**
2. Add "Database" blocks for each tracker
3. Configure each to show key metrics (filter, sort, rollup)

**Example metrics block:**
- Title: "Current MRR"
- Source: Daily Metrics Tracker
- Show: Latest MRR value
- Refresh: Daily

---

## STEP 8: Set Up Reminders (Optional)

In each database, set reminders for key dates:
- May 20: "Launch day — monitor Reddit post"
- May 31: "Phase 0 review — check metrics, decide if continuing"
- June 1: "Publish first blog post"
- June 30: "Phase 1 review — time to evaluate"
- Every Friday: "Weekly metric update"

---

## HOW TO USE YOUR LVRGE NOTION WORKSPACE

**Daily (5 min):**
- Update Daily Metrics Tracker with signups, conversions, costs
- Add notes about what happened

**Weekly (15 min every Friday):**
- Review Phase Milestones database
- Calculate 7-day averages in Daily Metrics
- Check Blog Content Calendar (next post on track?)
- Update Reddit/Social Posts tracker with engagement

**Monthly (30 min):**
- Full cohort analysis in Daily Metrics
- Update Phase status
- Plan next month's content in Blog Calendar
- Assess if you're on track for phase revenue targets

**Quarterly (1 hour):**
- Review entire roadmap
- Update projections based on actual performance
- Adjust subsequent phase strategies
- Make go/no-go decisions for next quarter

---

## CONNECTED VIEWS (Optional Advanced Setup)

Once databases are created, you can create filtered views:

**Daily Metrics Tracker Views:**
- "Phase 0" — Filter: Date between May 20-31
- "Phase 1" — Filter: Date between Jun 1-Jul 31
- "Phase 2" — Filter: Date between Aug 1-Sep 30
- Monthly view: Rollup sum of MRR by month

**Blog Calendar Views:**
- "Publishing Schedule" — Filter: Status ≠ Published, sorted by Publish Date
- "Q2 Content" — Filter: Phase = "Phase 1"
- "Performance Tracking" — Show published posts with traffic metrics

---

## WHAT YOU'VE NOW GOT

✅ Master roadmap page (strategy reference)
✅ Phase milestones tracker (stay on target)
✅ Daily metrics database (know your numbers)
✅ Blog content calendar (stay organized)
✅ Social posts tracker (monitor campaigns)
✅ Dashboard (quick status check)

**Time to complete:** 25-30 minutes
**Maintenance:** 5-10 min/day, 15 min/week

You now have a full operational dashboard for running LVRGE as a real business.

---

## FILES TO REFERENCE WHILE SETTING UP

- `LVRGE_12Month_Roadmap.md` — Copy key sections into main page
- `LVRGE_Daily_Metrics_Tracker.csv` — Use column names for your database
- `Blog_Posts_Phase1.md` — Copy blog titles/slugs into calendar
- `Reddit_Post_May20.md` — Reference for social tracker

Start with the Phase Milestones database first (easiest), then Daily Metrics, then move to Blog/Social trackers.

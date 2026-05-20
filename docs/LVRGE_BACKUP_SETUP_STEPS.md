# LVRGE Backup Setup - Exact Step-by-Step Instructions

## PHASE 1: GITHUB SETUP (5 minutes)

### Step 1: Open Terminal
```
Click Spotlight (Cmd+Space) → Type "Terminal" → Press Enter
```

### Step 2: Navigate to your LVRGE folder
```bash
cd /Users/scottsheeran/Desktop/LVRGE
```

Press Enter. You should see:
```
Scott@MacBook LVRGE %
```

### Step 3: Create docs folder
```bash
mkdir -p docs
```

Press Enter. No output = success.

### Step 4: Move documentation files to docs folder
```bash
mv ../LVRGE_*.md docs/
```

Press Enter. This moves all 5 LVRGE_*.md files into the docs folder.

### Step 5: Verify files moved
```bash
ls docs/
```

Press Enter. You should see:
```
LVRGE_BACKUP_AUTOMATION_STRATEGY.md
LVRGE_BACKUP_SETUP_STEPS.md
LVRGE_ERROR_MONITORING_SETUP.md
LVRGE_LAUNCH_ANNOUNCEMENTS.md
LVRGE_LAUNCH_DAY_CHECKLIST.md
LVRGE_LAUNCH_READINESS_SUMMARY.md
LVRGE_LEMONSQUEEZY_WEBHOOK_SETUP.md
```

### Step 6: Check Git status
```bash
git status
```

Press Enter. You should see files listed as "renamed" or "new file".

### Step 7: Add files to Git
```bash
git add docs/
```

Press Enter. No output = success.

### Step 8: Commit to Git
```bash
git commit -m "Add launch documentation files"
```

Press Enter. You should see:
```
[main xxxxxxx] Add launch documentation files
 7 files changed, 5000+ insertions(+)
 create mode 100644 docs/LVRGE_*.md
```

### Step 9: Push to GitHub
```bash
git push origin main
```

Press Enter. You should see:
```
Counting objects: 12, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (12/12), ...
```

✅ **PHASE 1 COMPLETE** - Your docs are now in GitHub!

---

## PHASE 2: GOOGLE DRIVE SETUP (10 minutes)

### Step 1: Create Google Drive folder
1. Open **Google Drive** in browser: https://drive.google.com
2. Click **"New"** button (left side)
3. Click **"Folder"**
4. Type: `LVRGE-Backup`
5. Click **"Create"**

✅ Folder created!

### Step 2: Set up Zapier automation
**This is the automated sync between GitHub and Google Drive**

1. Go to https://zapier.com
2. Click **"Sign up"** (top right)
3. Enter email: `sheeranscott@gmail.com`
4. Create password
5. Click **"Create Account"**
6. Verify email (check inbox, click link)
7. Return to zapier.com and log in

### Step 3: Create new Zap
1. Click **"Create Zap"** button (top left)
2. Search for: **GitHub**
3. Click **GitHub** app (by Zapier)
4. Under "Trigger", select **"New File in Repository"**
5. Click **Continue**

### Step 4: Connect GitHub
1. Click **"Sign in with GitHub"**
2. Authorize Zapier to access GitHub
3. When asked to select repository:
   - **Repository:** scottsheran/Leverage
4. Click **Continue**

### Step 5: Set up trigger details
1. Under "Branch", select: **main**
2. Click **Continue**

### Step 6: Set up Google Drive action
1. Search for: **Google Drive**
2. Click **Google Drive** app
3. Select action: **"Create File"**
4. Click **Continue**

### Step 7: Connect Google Drive
1. Click **"Sign in with Google"**
2. Select your Google account: sheeranscott@gmail.com
3. Click **Allow** for Zapier permissions
4. Click **Continue**

### Step 8: Configure Google Drive action
1. **Drive:** "My Drive" (default)
2. **Folder:** Click dropdown → Search "LVRGE-Backup" → Select it
3. **File Name:** Use `{{Filename}}` (should auto-fill)
4. **File Content:** Use `{{File Content}}` (should auto-fill)
5. Click **Continue**

### Step 9: Test the Zap
1. Click **"Test & Review"**
2. You should see a test file created
3. Click **"Create Zap"**

✅ **PHASE 2 COMPLETE** - Google Drive automation is live!

### Verification:
1. Check your Google Drive
2. Open LVRGE-Backup folder
3. You should see files syncing in (may take a few minutes)

---

## PHASE 3: NOTION SETUP (5 minutes - Optional but recommended)

### Step 1: Go to Notion
1. Visit https://www.notion.so
2. Click **"Sign up"**
3. Use email: sheeranscott@gmail.com
4. Create password
5. Verify email

### Step 2: Create workspace
1. Click **"Create workspace"**
2. Name it: `LVRGE`
3. Click **"Continue"**

### Step 3: Create database
1. Click **"Database"**
2. Select **"Table"**
3. Name it: `Launch Documentation`
4. Click **"Create"**

### Step 4: Add properties (columns)
The database should have these columns (left to right):

1. **Name** (already exists - rename if needed)
2. Add new property: Click **"+"** button
   - Name: `Content`
   - Type: `Text`
3. Add new property:
   - Name: `GitHub Link`
   - Type: `URL`
4. Add new property:
   - Name: `Last Updated`
   - Type: `Date`
5. Add new property:
   - Name: `Status`
   - Type: `Select`
   - Options: `Final`, `Draft`, `Archived`

### Step 5: Manually add your documentation (optional)
1. Click **"New"** button in database
2. Add entries like:
   - **Name:** Launch Announcements
   - **Content:** Paste content from LVRGE_LAUNCH_ANNOUNCEMENTS.md
   - **GitHub Link:** https://github.com/scottsheran/Leverage/blob/main/docs/LVRGE_LAUNCH_ANNOUNCEMENTS.md
   - **Last Updated:** Today
   - **Status:** Final

Repeat for other 6 files (or do this as you reference them).

✅ **PHASE 3 COMPLETE** - Notion knowledge base created!

---

## PHASE 4: ICLOUD SETUP (2 minutes)

### Step 1: Check iCloud is enabled
1. Click **Apple menu** (top left) → **System Settings**
2. Click **[Your Name]** (top left sidebar)
3. Click **iCloud**
4. Verify **iCloud Drive** is toggled ON (blue toggle)
5. Close System Settings

### Step 2: Create iCloud backup folder
1. Open **Finder**
2. Click **Locations** → **iCloud Drive** (left sidebar)
3. Right-click → **New Folder**
4. Name: `LVRGE-Backup`

### Step 3: Set up automatic daily sync (Mac Automator)
1. Open **Spotlight** (Cmd+Space)
2. Type: `Automator`
3. Click **Automator**
4. Click **File** → **New** → **New Document**
5. Select **Application** → **Choose**
6. Search and drag: **Run Shell Script**
7. Paste this code:

```bash
#!/bin/bash

SOURCE="/Users/scottsheeran/Desktop/LVRGE/docs"
ICLOUD_FOLDER="$HOME/Library/Mobile Documents/com~apple~CloudDocs/LVRGE-Backup"

# Create folder if it doesn't exist
mkdir -p "$ICLOUD_FOLDER"

# Copy all markdown files
cp "$SOURCE"/*.md "$ICLOUD_FOLDER/" 2>/dev/null

# Log the backup
echo "$(date): Backup to iCloud completed" >> "$ICLOUD_FOLDER/backup.log"

exit 0
```

8. Click **File** → **Save**
9. Name: `LVRGE-Daily-Backup`
10. Location: **Applications**
11. Click **Save**

### Step 4: Schedule the automation
1. Open **System Settings** → **General** → **Login Items**
2. Click **"Allow in the Login Window"** or add to startup items
   - OR use the built-in scheduler:

1. Open **Terminal** again
2. Copy and paste this entire command:

```bash
cat > ~/Library/LaunchAgents/com.lvrge.backup.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.lvrge.backup</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>-c</string>
        <string>cp /Users/scottsheeran/Desktop/LVRGE/docs/*.md "$HOME/Library/Mobile Documents/com~apple~CloudDocs/LVRGE-Backup/" 2>/dev/null && echo "$(date): Backup completed" >> "$HOME/Library/Mobile Documents/com~apple~CloudDocs/LVRGE-Backup/backup.log"</string>
    </array>
    <key>StartInterval</key>
    <integer>86400</integer>
</dict>
</plist>
EOF
```

3. Press Enter
4. Then paste this:

```bash
launchctl load ~/Library/LaunchAgents/com.lvrge.backup.plist
```

5. Press Enter

✅ **PHASE 4 COMPLETE** - iCloud will auto-sync daily!

---

## PHASE 5: VERIFICATION (5 minutes)

### Step 1: Verify GitHub
1. Go to https://github.com/scottsheran/Leverage
2. Look for **docs/** folder
3. You should see all 7 LVRGE_*.md files
4. ✅ GitHub complete

### Step 2: Verify Google Drive
1. Go to https://drive.google.com
2. Open **LVRGE-Backup** folder
3. Wait 5-10 minutes for Zapier sync
4. You should see files appearing
5. ✅ Google Drive complete

### Step 3: Verify iCloud
1. Open **Finder**
2. Click **Locations** → **iCloud Drive**
3. Open **LVRGE-Backup** folder
4. Wait for Finder to load
5. You should see files there
6. ✅ iCloud complete

### Step 4: Verify Notion (if set up)
1. Go to https://www.notion.so
2. Open your LVRGE workspace
3. Click **Launch Documentation** database
4. You should see entries
5. ✅ Notion complete

---

## TEST THE AUTOMATION

### Make a small change to test everything works:

### Step 1: Edit one file locally
1. Open **Terminal**
2. Type:
```bash
cd /Users/scottsheeran/Desktop/LVRGE/docs
nano LVRGE_LAUNCH_READINESS_SUMMARY.md
```
3. Press Ctrl+A (select all)
4. Make a small edit (add "TEST" somewhere)
5. Press Ctrl+X → Y → Enter to save

### Step 2: Commit and push to GitHub
```bash
cd /Users/scottsheeran/Desktop/LVRGE
git add docs/
git commit -m "Test backup automation"
git push origin main
```

Press Enter after each command.

### Step 3: Wait and verify sync
1. **GitHub:** Refresh https://github.com/scottsheran/Leverage (should show update immediately)
2. **Google Drive:** Check LVRGE-Backup folder (should update within 5-10 min)
3. **iCloud:** Check LVRGE-Backup folder (should update within 5-10 min)
4. **Notion:** Refresh database (if set up)

If you see the changes in all places = ✅ All working!

---

## SUMMARY

| Phase | Time | What | Status |
|-------|------|------|--------|
| 1 | 5 min | GitHub setup | ✅ Do first |
| 2 | 10 min | Google Drive/Zapier | ✅ Do second |
| 3 | 5 min | Notion (optional) | ⏳ Do later |
| 4 | 2 min | iCloud setup | ✅ Do third |
| 5 | 5 min | Verification | ✅ Test it works |

**Total time: 20-25 minutes**

---

## WHAT'S NOW PROTECTED

✅ All 7 LVRGE_*.md files
✅ Full git history (GitHub)
✅ 30-day version history (Google Drive)
✅ Automated daily syncs
✅ Searchable knowledge base (Notion)
✅ Local offline backup (iCloud)

You're bulletproof! 🚀

---

## TROUBLESHOOTING

### If Zapier sync isn't working:
1. Go to https://zapier.com/app/dashboard
2. Check Zap status (should be "On")
3. If red error, click to see what failed
4. Usually just needs to re-authenticate GitHub

### If iCloud folder not appearing:
1. Make sure iCloud Drive is enabled (System Settings)
2. Check ~/Library/Mobile Documents/com~apple~CloudDocs/
3. May take 30 seconds to appear in Finder

### If git push fails:
1. Make sure you're in the right folder: `cd /Users/scottsheeran/Desktop/LVRGE`
2. Check GitHub credentials: `git config --list`
3. May need to authenticate GitHub token

### If anything breaks:
Don't worry! All backups are in GitHub. You can restore from there.

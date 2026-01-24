# NIELIT StudentHub - Complete Setup Guide (v1.5)

This guide will walk you through setting up NIELIT StudentHub v1.5 from scratch, with detailed explanations and troubleshooting for each step.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Understanding the Architecture](#understanding-the-architecture)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### Required Accounts

1. **Google Account**
   - Needed for: Google Sheets (database) and Google Apps Script (backend)
   - Free tier sufficient
   - Sign up: [accounts.google.com](https://accounts.google.com)

2. **Cloudinary Account**
   - Needed for: Image and PDF hosting
   - Free tier: 25GB storage, 25GB bandwidth/month
   - Sign up: [cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)

3. **GitHub Account** (for deployment)
   - Needed for: Hosting via GitHub Pages
   - Free tier sufficient
   - Sign up: [github.com/join](https://github.com/join)

### Required Knowledge

**Minimum:**
- Basic understanding of HTML and JavaScript
- Ability to copy/paste code
- Basic file navigation

**Recommended:**
- Understanding of web development concepts
- Familiarity with browser DevTools (F12)
- Basic Git knowledge

### Tools Needed

1. **Text Editor**
   - Recommended: [VS Code](https://code.visualstudio.com/)
   - Alternatives: Sublime Text, Atom, Notepad++
   
2. **Web Browser**
   - Recommended: Chrome (for DevTools)
   - Also test in: Firefox, Safari, Edge

3. **Command Line** (optional, for local testing)
   - Python (for `python -m http.server`)
   - Node.js (for `npx serve`)
   - Or just double-click HTML files

---

## Understanding the Architecture

### How StudentHub v1.5 Works

```
┌─────────────────────────────────────────────────────────────┐
│                   1. USER INTERACTION                       │
│         (HTML/CSS/JavaScript in Browser + config.js)        │
└──────────────────────┬──────────────────┬───────────────────┘
                       │                  │
        ┌──────────────▼──────┐  ┌────────▼──────────┐
        │   2. IMAGE/PDF      │  │  3. DATA REQUESTS │
        │   UPLOAD            │  │  (to Apps Script) │
        │   (to Cloudinary)   │  │                   │
        └──────────────┬──────┘  └────────┬──────────┘
                       │                  │
                       │                  │
        ┌──────────────▼──────┐  ┌────────▼──────────┐
        │   Cloudinary CDN    │  │  Google Apps      │
        │   (Media Storage)   │  │  Script v1.5      │
        └─────────────────────┘  └────────┬──────────┘
                                           │
                                  ┌────────▼──────────┐
                                  │  Google Sheets    │
                                  │  (6 Sheets DB)    │
                                  │  • Users          │
                                  │  • Projects       │
                                  │  • Profiles       │
                                  │  • Comments       │
                                  │  • Upvotes        │
                                  │  • ProfileLikes   │
                                  └───────────────────┘
```

### Data Flow Example: Liking a Profile (NEW in v1.5)

1. **User Action**: User clicks heart icon on another user's profile
2. **Frontend Check**: JavaScript verifies user is logged in and not liking own profile
3. **API Call**: `toggleProfileLike(targetEmail, userEmail)` sent to Apps Script
4. **Backend Processing**: 
   - Script checks ProfileLikes sheet for existing like
   - If exists: Remove row (unlike), decrement count
   - If not exists: Add row (like), increment count
5. **Database Update**: Profiles sheet like count updated
6. **Response**: New count + action ('added'/'removed') sent back
7. **UI Update**: Heart icon toggles, count updates immediately

### Why This Architecture?

**Advantages:**
- ✅ **Zero Server Cost** - Google Sheets and Cloudinary free tiers
- ✅ **No Backend Coding** - Google Apps Script is JavaScript
- ✅ **Easy Maintenance** - Update via Google Sheets UI
- ✅ **Scalable** - Cloudinary CDN + Google infrastructure
- ✅ **Simple Deployment** - Static files on GitHub Pages
- ✅ **Secure Config** - config.js gitignored, secrets in GitHub Actions

**Limitations:**
- ⚠️ Google Sheets quotas (10M cells, good for ~500K projects)
- ⚠️ Apps Script execution time (6 min max)
- ⚠️ Cloudinary bandwidth limits (25GB/month free)
- ⚠️ Not suitable for real-time chat features
- ⚠️ Read/write latency ~800ms-1.2s (acceptable for archiving)

---

## Step-by-Step Setup

### Step 1: Download/Clone the Repository

**Option A: Using Git (Recommended)**

```bash
# Clone the repository
git clone https://github.com/nielitropar/nielitropar.github.io.git

# Navigate into the directory
cd nielitropar.github.io

# Verify files
ls -la
# Should see: index.html, feed.html, project.html, google-app-script-v1.5.js, etc.
```

**Option B: Download ZIP**

1. Go to repository: https://github.com/nielitropar/nielitropar.github.io
2. Click green "Code" button
3. Click "Download ZIP"
4. Extract ZIP to your desired location
5. Navigate into the extracted folder

**What You Should Have:**
```
nielitropar.github.io/
├── index.html                   # Main app file
├── feed.html                    # Feed page
├── project.html                 # Public project view
├── google-app-script-v1.5.js    # 🆕 BACKEND v1.5 (USE THIS!)
├── google-apps-script.js        # Legacy v1.4 (reference only)
├── logo.png                     # NIELIT logo
├── .github/                     # GitHub Actions config
│   └── workflows/
│       └── deploy.yml
├── .gitignore                   # Prevents config.js from being committed
├── README.md                    # Documentation
├── QUICK_REFERENCE.md           # Quick guide
├── SETUP_GUIDE.md               # This file
└── LICENSE                      # MIT License
```

---

### Step 2: Set Up Cloudinary (Image & PDF Hosting)

#### 2.1 Create Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Fill in:
   - Email address
   - Password
   - Check "I agree to terms"
3. Click "Sign up"
4. Verify your email (check inbox/spam)
5. Complete any onboarding prompts

#### 2.2 Get Your Cloud Name

1. Login to Cloudinary dashboard
2. Look at the top of the page
3. You'll see: **Cloud name: your_cloud_name**
4. **Write this down** - you'll need it for config.js

Example cloud name: `dy8up08qd` or `student-hub-cloud`

#### 2.3 Create Upload Preset

**Why?** Upload presets control how images/PDFs are processed and stored.

1. **Navigate to Upload Settings**
   - Click gear icon (⚙️) in top-right
   - Select "Upload" from left sidebar
   - Scroll down to "Upload presets" section

2. **Add New Preset**
   - Click "Add upload preset" button
   - You'll see a form

3. **Configure Preset**
   Fill in these exact values:
   
   - **Preset name**: `studenthub_preset` (exact name!)
   - **Signing Mode**: **Unsigned** ⚠️ CRITICAL!
     - Click dropdown, select "Unsigned"
     - If set to "Signed", uploads will fail
   
   - **Folder**: `studenthub` (optional, for organization)
   - **Access Mode**: `Public`
   - **Unique filename**: ✅ Enable (recommended)
   - **Overwrite**: ❌ Disable (recommended)

4. **Save**
   - Click "Save" button at bottom
   - You should see your preset in the list

5. **Verify**
   - Check that preset name is exactly: `studenthub_preset`
   - Check that "Signing Mode" shows "Unsigned"

**Common Mistakes:**
- ❌ Preset name typo (must be exactly `studenthub_preset`)
- ❌ Signing Mode set to "Signed" (must be "Unsigned")
- ❌ Access Mode not public

**Important note for resume upload feature:** Cloudinary will let you upload image but it blocks pfds and zip uploads by default Enabling “Allow delivery of PDF and ZIP files” in Security settings of Cloudinary resolves the issue.


---

### Step 3: Set Up Google Sheets Backend (v1.5)

#### 3.1 Create Google Sheet

1. Go to: https://sheets.google.com
2. Click "+ Blank" to create new spreadsheet
3. **Name it**: "NIELIT StudentHub Database v1.5"
   - Click on "Untitled spreadsheet" at top
   - Type the name
   - Press Enter

**At this point, your sheet is empty - that's normal!**
The Apps Script will create all 6 sheets automatically.

#### 3.2 Open Apps Script Editor

1. In your Google Sheet, click: **Extensions** → **Apps Script**
2. A new tab opens with the Apps Script editor
3. You'll see a default `myFunction()` - **delete everything**

#### 3.3 Set Up Security Salt (Critical) 
To secure user passwords, you must set a private salt value that is not stored in the code.

1. In the Apps Script Editor, click **Project Settings** (Gear icon ⚙️) in the left sidebar.
2. Scroll down to the **Script Properties** section.
3. Click **Add script property**.
4. Enter the following:
 * **Property:** `SALT`
 * **Value:** (Enter a random long string here, e.g., `RandomString123!@#`)
5. Click **Save script properties**.

#### 2. Verify Code Sync

**Critical Reminder:** This guide now instructs users to set a `SALT` property. You **must** ensure your `google-app-script-v1.5.js` code has been updated to actually *use* this property, or the login will fail (or use `undefined`).

Ensure your code looks like this:

```javascript
function hashPassword(raw) {
  // RETRIEVE SALT FROM SCRIPT PROPERTIES
  const scriptProperties = PropertiesService.getScriptProperties();
  const SALT = scriptProperties.getProperty('SALT');
  
  if (!SALT) throw new Error("Security Error: SALT is not set in Script Properties.");
  
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw + SALT);
  return Utilities.base64Encode(digest);
}

```

#### 3.4 Paste Backend Code (v1.5)

1. Open `google-app-script-v1.5.js` from your downloaded files
2. **Copy ALL the code** (Ctrl+A, Ctrl+C)
   - **IMPORTANT**: Use v1.5, NOT v1.4!
   - First line should say: `// STUDENTHUB - PRODUCTION BACKEND (Trending Added to v1.5)`
3. **Paste** into Apps Script editor (Ctrl+V)
4. **Verify** you see:
   - Comments at top mentioning v1.5
   - New function: `getTrendingProjects()`
   - New function: `toggleProfileLike()`
   - New sheet constant: `PROFILE_LIKES_SHEET`
   - 6 sheets in getOrCreateSheet headers (Users, Projects, Profiles, Comments, Upvotes, ProfileLikes)

#### 3.5 Save the Script

1. Click **Save** icon (💾) or Ctrl+S
2. **Name your project**: "StudentHub API v1.5"
   - Click "Untitled project" at top
   - Type "StudentHub API v1.5"
   - Press Enter

#### 3.6 Deploy as Web App

This is the most important step!

1. **Start Deployment**
   - Click **Deploy** button (top right)
   - Select **New deployment**

2. **Select Type**
   - Click gear icon (⚙️) next to "Select type"
   - Choose **Web app**

3. **Configure Deployment**
   Fill in these settings:
   
   - **Description**: "StudentHub API v1.5 - Trending + ProfileLikes"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** ⚠️ CRITICAL!

   **Why "Anyone"?**
   - This allows your website (running in users' browsers) to call the API
   - The script itself is still secure
   - Data in Google Sheets remains private

4. **Authorize the Script**
   - Click **Deploy**
   - A popup appears: "Authorization required"
   - Click **Authorize access**
   - Select your Google account
   - **You'll see a warning**: "Google hasn't verified this app"
     - Click **Advanced**
     - Click **Go to StudentHub API (unsafe)**
     - This is safe - it's your own script!
   - Click **Allow**

5. **Copy the Web App URL**
   - After authorization, you'll see: "Deployment successfully created"
   - **Copy the Web App URL**
   - It looks like:
     ```
     https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXX/exec
     ```
   - **Save this URL** - you'll need it for config.js!
   - Click **Done**

**Troubleshooting Deployment:**
- If "Anyone" option is grayed out: Your Google Workspace admin may have restrictions
- If authorization fails: Clear cookies and try again
- If deployment fails: Check for syntax errors in code (red underlines)

#### 3.7 Verify Sheet Creation

1. **Go back to your Google Sheet**
2. **Refresh the page** (F5)
3. You should now see **6 tabs** at the bottom:
   - Users
   - Projects
   - Profiles
   - Comments
   - Upvotes
   - **ProfileLikes** (NEW in v1.5!)

4. Each sheet should have headers in the first row:
   - **Users**: email, password, name, university, major, profilePicture, linkedin, github, bio, timestamp, resume
   - **Projects**: id, authorName, authorEmail, authorPicture, title, description, link, tech, projectImage, upvotes, timestamp, **category**
   - **Profiles**: name, email, university, major, linkedin, github, bio, profilePicture, timestamp, resume, **likes**
   - **Comments**: id, projectId, authorName, authorEmail, comment, timestamp
   - **Upvotes**: projectId, userEmail, timestamp
   - **ProfileLikes**: targetEmail, userEmail, timestamp

If sheets are not created:
- Check Apps Script logs: View → Executions
- Manually trigger: Run → `getOrCreateSheet` with parameter "Users"

---

### Step 4: Configure the Website

Now we connect everything together!

#### 4.1 Create config.js

**IMPORTANT:** This file is gitignored for security. You must create it manually.

1. **In your project root**, create a new file named `config.js`
2. **Paste this template:**

```javascript
const CONFIG = {
    SHEET_URL: 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE',
    CLOUDINARY_NAME: 'YOUR_CLOUDINARY_CLOUD_NAME',
    CLOUDINARY_PRESET: 'studenthub_preset'
};
```

3. **Replace with YOUR values:**

```javascript
const CONFIG = {
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbyN8x.../exec',
    CLOUDINARY_NAME: 'student-hub-cloud',
    CLOUDINARY_PRESET: 'studenthub_preset'  // Keep this exact name
};
```

4. **Save** the file (Ctrl+S)

**Example (with fake values):**
```javascript
const CONFIG = {
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbxGbZ1abc2def3ghi4jkl5mno6pqr/exec',
    CLOUDINARY_NAME: 'dy8up08qd',
    CLOUDINARY_PRESET: 'studenthub_preset'
};
```

#### 4.2 Verify config.js

**Checklist:**
- [ ] File named exactly `config.js` (lowercase, no spaces)
- [ ] Located in root folder (same level as index.html)
- [ ] SHEET_URL ends with `/exec`
- [ ] CLOUDINARY_NAME matches your dashboard
- [ ] CLOUDINARY_PRESET is exactly `studenthub_preset`
- [ ] File saved

**How the files load config.js:**
- index.html: `<script src="config.js"></script>` (line ~1175)
- feed.html: `<script src="config.js"></script>` (line ~1225)
- project.html: `<script src="config.js"></script>` (line ~573)

All files automatically read `CONFIG.SHEET_URL`, `CONFIG.CLOUDINARY_NAME`, and `CONFIG.CLOUDINARY_PRESET`.

---

## Testing

### Test 1: Local Testing (No Server)

**Simplest Method:**

1. **Double-click** `index.html`
2. It opens in your default browser
3. You should see:
   - Hero section with "Welcome to StudentHub"
   - Animated statistics (loading → counting)
   - Trending section (horizontal scroll on mobile)
   - Profile grid

**If you see errors:**
- Open Console (F12 → Console tab)
- Look for "Failed to load resource: config.js"
  - **Fix**: Verify config.js exists in the same folder
- Look for "CONFIG is not defined"
  - **Fix**: config.js might have syntax errors
- Look for network errors to SHEET_URL
  - **Fix**: Verify Apps Script deployment

### Test 2: Local Server (Recommended)

**Why?** More realistic environment, better debugging.

**Option A: Python**
```bash
# In project directory
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option B: Node.js**
```bash
# In project directory
npx serve
# Visit: http://localhost:3000
```

**Option C: VS Code**
- Install "Live Server" extension
- Right-click index.html → "Open with Live Server"

### Test 3: Feature Testing (v1.5)

Once the site loads, test each feature:

#### Test Statistics Animation
- [ ] Hero section loads
- [ ] "Total Students" counts up from 0
- [ ] "Total Projects" counts up from 0
- [ ] Numbers match actual data in Google Sheet

#### Test Trending (NEW v1.5)
- [ ] Trending section visible below hero
- [ ] Shows "🔥 Trending Projects"
- [ ] Displays up to 5 projects
- [ ] Click on trending card → goes to project.html
- [ ] Mobile: Horizontal scroll works
- [ ] Desktop: Shows in sidebar on feed.html

#### Test Profile Likes (NEW v1.5)
- [ ] Go to feed.html and login
- [ ] Click on a user's profile
- [ ] See heart icon with like count
- [ ] Click heart → count increases
- [ ] Click again → count decreases
- [ ] Try to like own profile → shows error
- [ ] Refresh page → like state persists

#### Test Categories (NEW v1.5)
- [ ] Click "Post Project" on feed.html
- [ ] See category dropdown (Web Dev, Mobile, AI/ML, IoT, Blockchain, Cybersecurity, Other)
- [ ] Select category and post project
- [ ] Project card shows category badge
- [ ] Click category filter chip → shows only that category
- [ ] Search works with category names

#### Test Resume Upload (NEW v1.5)
- [ ] Edit profile
- [ ] Upload PDF resume (< 5MB)
- [ ] Save changes
- [ ] View own profile → "Download Resume" button appears
- [ ] Click button → PDF downloads
- [ ] Others can see your resume link

#### Test Public Sharing
- [ ] Click "Share" on any project
- [ ] Copy project.html link
- [ ] Open link in incognito mode (no login)
- [ ] Project detail page loads
- [ ] Image displays
- [ ] Comments load
- [ ] Can't post comment without login
- [ ] "Sign In to Comment" button shown

#### Test Security Migration (NEW v1.5)
This tests the automatic password upgrade:

1. **Create a test user with old security:**
   - Manually add a row to Users sheet:
   - Email: `olduser@test.com`
   - Password: Use legacy hash (SHA-256 without salt)
   - To get legacy hash, use browser console:
     ```javascript
     async function hashLegacy(raw) {
       const encoder = new TextEncoder();
       const data = encoder.encode(raw);
       const hashBuffer = await crypto.subtle.digest('SHA-256', data);
       const hashArray = Array.from(new Uint8Array(hashBuffer));
       const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
       return hashBase64;
     }
     hashLegacy('testpass').then(console.log);
     ```
   - Fill in other columns (name, university, etc.)

2. **Test login:**
   - Go to feed.html
   - Login with `olduser@test.com` / `testpass`
   - Should succeed

3. **Verify migration:**
   - Check Users sheet
   - Password should now be different (includes salt)
   - Login again → still works (using new hash)

### Troubleshooting Tests

**Trending doesn't show:**
1. Check Apps Script version (should be v1.5)
2. Test API: `YOUR_SHEET_URL?action=getTrending` in browser
3. Should return JSON with 5 projects sorted by trendingScore
4. Check console for JavaScript errors

**Profile likes don't work:**
1. Verify ProfileLikes sheet exists
2. Test API: `YOUR_SHEET_URL?action=toggleProfileLike&targetEmail=test@test.com&userEmail=user@test.com`
3. Check console for errors
4. Verify you're not trying to like own profile

**Categories don't filter:**
1. Check Projects sheet has "category" column (12th column, index 11)
2. Re-post a project to populate category
3. Test search with category name

**Resume upload fails:**
1. Check file is PDF (not image)
2. Check file size < 5MB
3. Check Cloudinary preset allows PDFs
4. Check console for Cloudinary errors

---

## Deployment

### Option 1: GitHub Pages with Manual Config (Simple)

**For Testing/Personal Use**

```bash
# 1. Ensure config.js exists locally
cat config.js  # Should show your credentials

# 2. Add to Git (but .gitignore prevents commit)
git add .

# 3. Commit
git commit -m "Initial setup with v1.5"

# 4. Push
git push origin main
```

**Wait!** This won't work because config.js is gitignored!

**Solution:** Use GitHub Actions (see Option 2) OR temporarily:
1. Remove `config.js` from .gitignore
2. Commit and push
3. **DANGER**: Your credentials are now public!
4. Only use this for testing, never in production

### Option 2: GitHub Pages with GitHub Actions (Production)

**For Production/Team Use - Secure!**

This method keeps your credentials secret using GitHub Actions.

#### 2.1 Set Up Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"**
4. **Add these 3 secrets:**

   **Secret 1:**
   - Name: `APP_SHEET_URL`
   - Value: Your Apps Script URL (e.g., `https://script.google.com/macros/s/AKfycbx.../exec`)

   **Secret 2:**
   - Name: `APP_CLOUD_NAME`
   - Value: Your Cloudinary cloud name (e.g., `dy8up08qd`)

   **Secret 3:**
   - Name: `APP_CLOUD_PRESET`
   - Value: `studenthub_preset`

5. **Verify secrets:**
   - You should see 3 secrets listed
   - Values are hidden (shown as `***`)

#### 2.2 Understand the Workflow

The existing `.github/workflows/deploy.yml` file:
1. Triggers on every push to main branch
2. Checks out your code
3. **Creates config.js** using secrets (this is the magic!)
4. Deploys to GitHub Pages

**Key section of deploy.yml:**
```yaml
- name: Inject Configuration
  run: |
    echo "const CONFIG = {" > config.js
    echo "    SHEET_URL: '${{ secrets.APP_SHEET_URL }}'," >> config.js
    echo "    CLOUDINARY_NAME: '${{ secrets.APP_CLOUD_NAME }}'," >> config.js
    echo "    CLOUDINARY_PRESET: '${{ secrets.APP_CLOUD_PRESET }}'" >> config.js
    echo "};" >> config.js
```

#### 2.3 Enable GitHub Pages

1. **Go to Repository Settings** → **Pages**
2. **Change Source:**
   - From: "Deploy from a branch"
   - To: **"GitHub Actions"**
3. **Save**

#### 2.4 Deploy

```bash
# Make any change (or just push)
git add .
git commit -m "Deploy StudentHub v1.5"
git push origin main
```

**What happens:**
1. GitHub Actions runs
2. Creates config.js with your secrets
3. Deploys to Pages
4. Your site is live!

**Monitor deployment:**
1. Go to "Actions" tab in your repository
2. See workflow run in progress
3. Green checkmark = success
4. Red X = failed (click for logs)

**Your site will be at:**
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

### Option 3: Other Hosting

**Netlify:**
1. Drag and drop project folder to: https://app.netlify.com/drop
2. **Problem**: Need to add config.js manually
3. **Solution**: Use Netlify environment variables

**Vercel:**
```bash
npm i -g vercel
cd nielitropar.github.io
vercel
```

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

**Traditional Web Hosting:**
- Upload all files via FTP
- Ensure config.js is included
- Ensure index.html is in root directory

---

## Troubleshooting

### General Issues

**Page loads but data doesn't:**
1. Open Console (F12)
2. Look for red errors
3. Common issues:
   - `CONFIG is not defined` → config.js not loaded
   - `Failed to load resource: config.js` → File doesn't exist
   - Network error to SHEET_URL → Apps Script not deployed correctly

**Statistics show 0:**
1. Test API: `YOUR_SHEET_URL?action=getStats`
2. Should return: `{"status":"success","data":{"totalStudents":X,"totalProjects":Y}}`
3. If error: Check Apps Script deployment

**Trending shows "Loading trends...":**
1. Test API: `YOUR_SHEET_URL?action=getTrending`
2. Should return 5 projects with trendingScore
3. If error: Verify using v1.5 backend (has getTrending function)

**Profile likes show error:**
1. Verify ProfileLikes sheet exists
2. Test API: `YOUR_SHEET_URL?action=toggleProfileLike&targetEmail=a@b.com&userEmail=c@d.com`
3. Check you're not liking own profile (intentional restriction)

### GitHub Actions Issues

**Workflow fails:**
1. Go to Actions tab
2. Click on failed run
3. Expand steps to see error
4. Common issues:
   - Secrets not set correctly
   - deploy.yml syntax error
   - Pages not enabled

**Site deployed but config missing:**
1. Check Actions logs → "Inject Configuration" step
2. Verify secrets are set (Settings → Secrets → Actions)
3. Re-run workflow

**Config.js contains literal `${{ secrets.APP_SHEET_URL }}`:**
1. Secrets not set in GitHub
2. Add secrets (see Deployment → Option 2 → Step 2.1)

---

## Advanced Configuration

### Customization

#### Change Colors

Edit CSS variables in all HTML files (index.html, feed.html, project.html):

```css
:root {
    --primary: #003366;     /* NIELIT dark blue */
    --accent: #0066CC;      /* NIELIT light blue */
    --background: #F5F7FA;  /* Light gray background */
    --card-bg: #FFFFFF;     /* White cards */
    --text-primary: #1A1A1A; /* Almost black text */
}
```

#### Change Logo

Replace `logo.png` with your logo, or update these lines:

**index.html:**
- Line ~69: `<img src="logo.png" ...>`

**feed.html:**
- Line ~161: `<img src="logo.png" ...>`

**project.html:**
- Line ~40: `<img src="logo.png" ...>`

### Add Features

#### Add Google Analytics

```html
<!-- Add before </head> in all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Track v1.5 Events

```javascript
// Profile like
gtag('event', 'like_profile', {
  'event_category': 'social',
  'event_label': targetEmail
});

// View trending
gtag('event', 'view_trending', {
  'event_category': 'engagement',
  'event_label': projectTitle
});

// Filter category
gtag('event', 'filter_category', {
  'event_category': 'discovery',
  'event_label': categoryName
});
```

### Security Enhancements

#### Monitor ProfileLikes

Check for abuse:
1. Open ProfileLikes sheet
2. Sort by timestamp (newest first)
3. Look for spam patterns (same user liking many profiles quickly)
4. Can manually delete rows if needed

#### Audit Trending Scores

If trending seems unfair:
1. Open Apps Script editor
2. Run `getTrendingProjects()` manually
3. Check execution logs (View → Executions)
4. Review trendingScore calculation

#### Adjust Trending Weights

In `google-app-script-v1.5.js`, line ~64:
```javascript
const rawScore = (upvotes * 2) + (comments * 3);
```

Change weights:
- Increase upvote weight: `upvotes * 3`
- Increase comment weight: `comments * 5`
- Adjust time decay: `Math.pow(daysOld + 1, 0.5)` → `Math.pow(daysOld + 1, 0.8)`

After changes:
1. Save script
2. Deploy → Manage deployments → Edit → Deploy
3. Test API to verify changes

---

## Next Steps

After successful setup:

1. **Test Thoroughly**
   - All v1.5 features
   - All devices (desktop, tablet, mobile)
   - Multiple browsers

2. **Customize**
   - Update colors to match institution
   - Replace logo
   - Add Google Analytics

3. **Monitor**
   - Check Apps Script execution logs weekly
   - Review new user signups
   - Monitor trending for fairness
   - Check ProfileLikes for abuse

4. **Backup Regularly**
   - Export Google Sheet (File → Download → CSV for each sheet)
   - Store in safe location
   - Schedule monthly backups

5. **Plan Improvements**
   - Gather user feedback
   - Prioritize feature requests
   - Update documentation

6. **Launch!**
   - Announce to students
   - Create user guide
   - Set up support channel

---

**Congratulations!** Your StudentHub is now set up and ready to use! 🎉

For ongoing support, refer to:
- **README.md** - Complete documentation
- **QUICK_REFERENCE.md** - Quick lookup
- **GitHub Issues** - Report bugs, request features

**Made with ❤️ at NIELIT Ropar**

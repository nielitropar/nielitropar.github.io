# CI/CD Pipeline & Security Setup Guide (v1.5)

Since the NIELIT StudentHub is a **serverless, client-side application** hosted on GitHub Pages, there is a crucial distinction between "hiding" credentials from the **public repository** and "hiding" them from the **browser**.

### The Reality of Client-Side Apps
Because the site runs entirely in the user's browser (HTML/JS), **you cannot hide these credentials from the browser**. Any URL or key required to fetch data *must* be sent to the client. A user can always see them by pressing `F12` (DevTools) → Network.

**However**, you **CAN** and **SHOULD** hide them from your public GitHub source code to prevent bots from scraping your keys or people cloning your repo with your credentials.

---

## Table of Contents

1. [Phase 1: Refactor Code to Extract Secrets](#phase-1-refactor-code-to-extract-secrets)
2. [Phase 2: Configure GitHub Secrets](#phase-2-configure-github-secrets)
3. [Phase 3: Create Deployment Workflow](#phase-3-create-a-deployment-workflow)
4. [Phase 4: Backend Configuration (v1.5 Critical)](#phase-4-backend-configuration-v15-critical)
5. [Phase 5: Security Hardening](#phase-5-security-hardening-the-real-security)

---

## Phase 1: Refactor Code to Extract Secrets

First, remove the hardcoded credentials from your HTML files (`index.html`, `feed.html`, `project.html`, etc.) and place them in a central configuration file.

### 1. Create a Configuration File
Create a new file named `config.js` in your root folder. This file will hold your keys locally but will be ignored by Git.

```javascript
// config.js
const CONFIG = {
    SHEET_URL: 'YOUR_ACTUAL_SHEET_URL',
    CLOUDINARY_NAME: 'YOUR_CLOUD_NAME',
    CLOUDINARY_PRESET: 'studenthub_preset'
};
```

**Example (with fake values):**
```javascript
const CONFIG = {
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbxGbZ1abc2def3ghi4jkl5mno6pqr/exec',
    CLOUDINARY_NAME: 'dy8up08qd',
    CLOUDINARY_PRESET: 'studenthub_preset'
};
```

### 2. Update HTML Files

In every HTML file where you currently define `const SHEET_URL = ...`, replace those lines with a reference to the config file.

**Add this BEFORE your main script logic:**

```html
<script src="config.js"></script>

<script>
    // Update your existing code to use the global CONFIG object
    const SHEET_URL = CONFIG.SHEET_URL;
    const CLOUDINARY_NAME = CONFIG.CLOUDINARY_NAME;
    const CLOUDINARY_PRESET = CONFIG.CLOUDINARY_PRESET;

    // ... rest of your application logic ...
</script>
```

**Files to Update:**
- ✅ `index.html` (line ~1175)
- ✅ `feed.html` (line ~1225)
- ✅ `project.html` (line ~573)

All three files already have `<script src="config.js"></script>` at the correct location.

### 3. Update `.gitignore`

Create or edit the `.gitignore` file in your repository root and add the following line. This ensures your local `config.js` (containing real keys) is never pushed to GitHub.

```text
config.js
```

**Verify:**
```bash
# Check if config.js is ignored
git status
# config.js should NOT appear in the list
```

---

## Phase 2: Configure GitHub Secrets

Since `config.js` is ignored, we need a way to inject these values when GitHub builds your site.

### Step-by-Step Instructions

1. **Navigate to Repository Settings**
   - Go to your GitHub repository
   - Click **Settings** (top navigation)
   - In the left sidebar, expand **Secrets and variables**
   - Click **Actions**

2. **Add Repository Secrets**
   Click **New repository secret** button for each of the following:

   **Secret 1: Apps Script URL**
   - Name: `APP_SHEET_URL`
   - Value: Your deployed Google Apps Script Web App URL
   - Example: `https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXX/exec`
   - Click **Add secret**

   **Secret 2: Cloudinary Cloud Name**
   - Name: `APP_CLOUD_NAME`
   - Value: Your Cloudinary cloud name (from dashboard)
   - Example: `dy8up08qd`
   - Click **Add secret**

   **Secret 3: Cloudinary Upload Preset**
   - Name: `APP_CLOUD_PRESET`
   - Value: `studenthub_preset` (exact name from Cloudinary)
   - Click **Add secret**

3. **Verify Secrets**
   - You should see 3 secrets listed
   - Values are hidden (shown as `***`)
   - You cannot view secrets after creation (security feature)

**Screenshot Reference:**
```
Settings > Secrets and variables > Actions > Repository secrets

 APP_SHEET_URL          Updated X days ago
 APP_CLOUD_NAME         Updated X days ago  
 APP_CLOUD_PRESET       Updated X days ago
```

---

## Phase 3: Create a Deployment Workflow

We will use GitHub Actions to generate the `config.js` file dynamically during the deployment process using the secrets configured above.

### 1. Create Workflow Directory

```bash
# In your repository root
mkdir -p .github/workflows
```

### 2. Create Deployment Workflow File

Create a file named `deploy.yml` inside `.github/workflows/` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"] # Change to "master" if that is your default branch

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # This step creates the config.js file on the build server using your Secrets
      - name: Inject Configuration
        run: |
          echo "const CONFIG = {" > config.js
          echo "    SHEET_URL: '${{ secrets.APP_SHEET_URL }}'," >> config.js
          echo "    CLOUDINARY_NAME: '${{ secrets.APP_CLOUD_NAME }}'," >> config.js
          echo "    CLOUDINARY_PRESET: '${{ secrets.APP_CLOUD_PRESET }}'" >> config.js
          echo "};" >> config.js

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Note:** This workflow file already exists in your repository at `.github/workflows/deploy.yml`.

### 3. Finalize GitHub Pages Settings

1. Go to **Settings** → **Pages** (in left sidebar)
2. Under "Build and deployment":
   - **Source**: Change from "Deploy from a branch" to **"GitHub Actions"**
3. Click **Save**

### 4. Test the Workflow

```bash
# Make a small change and push
git add .
git commit -m "Test GitHub Actions deployment"
git push origin main
```

**Monitor Deployment:**
1. Go to **Actions** tab in your repository
2. You should see a workflow run in progress
3. Click on the run to see detailed logs
4. Green checkmark ✓ = successful deployment
5. Red X ✗ = failed (click for error logs)

**Result:** When you push code, GitHub Actions will:
1. Check out your code
2. Create `config.js` using your secrets
3. Deploy to GitHub Pages
4. Your source code never shows the keys

---

## Phase 4: Backend Configuration (v1.5 Critical)

### Overview
Version 1.5 introduces a **Background Worker** pattern that requires a **Time-Driven Trigger** in Google Apps Script. This is **essential** for the trending feature to work correctly.

### Why This Matters
- **v1.4**: Trending calculated on every page load (slow, ~2.5s)
- **v1.5**: Trending pre-calculated hourly (fast, ~0.3s)
- **Without trigger**: Trending will be empty or stale

### Step 1: Deploy Google Apps Script v1.5

1. **Open Your Google Sheet**
   - Go to the spreadsheet used for StudentHub database

2. **Access Apps Script Editor**
   - Click **Extensions** → **Apps Script**
   - A new tab opens with the script editor

3. **Replace Code with v1.5**
   - Select all existing code (Ctrl+A)
   - Delete it
   - Open `google-app-script-v1.5.js` from your repository
   - Copy **entire contents** (Ctrl+A, Ctrl+C)
   - Paste into Apps Script editor (Ctrl+V)

4. **Verify Version**
   - Check first line: `// STUDENTHUB - PRODUCTION BACKEND (Optimized v1.5)`
   - Verify `updateTrendingCache()` function exists (around line 270)
   - Verify `TRENDING_CACHE_SHEET` constant exists (around line 7)

5. **Save Project**
   - Click **Save** icon (💾) or press Ctrl+S
   - Click "Untitled project" at top
   - Rename to: "StudentHub API v1.5"
   - Press Enter

6. **Deploy as Web App**
   - Click **Deploy** → **New deployment**
   - Click gear icon (⚙️) next to "Select type"
   - Choose **Web app**
   - Configure:
     - **Description**: "StudentHub API v1.5 - Trending + ProfileLikes"
     - **Execute as**: Me (your email)
     - **Who has access**: **Anyone** ⚠️ **CRITICAL**
   - Click **Deploy**
   - If prompted, click **Authorize access**
   - Handle security warning:
     - Click **Advanced**
     - Click **Go to StudentHub API (unsafe)**
     - Click **Allow**
   - Copy the **Web App URL**
   - Save this URL (you'll need it for config.js and GitHub Secrets)
   - Click **Done**

### Step 2: Set Up Time-Driven Trigger (CRITICAL)

This is the most important step for v1.5 performance.

#### Option A: Automatic Setup (Recommended)

1. **Access Triggers Panel**
   - In Apps Script editor, look at left sidebar
   - Click the **Triggers** icon (⏰ clock icon)
   - Alternatively: Click **Triggers** in left menu

2. **Add New Trigger**
   - Click **+ Add Trigger** button (bottom right)

3. **Configure Trigger Settings**
   Fill in the following exactly:

   | Setting | Value | Notes |
   |---------|-------|-------|
   | **Choose which function to run** | `updateTrendingCache` | Select from dropdown |
   | **Choose which deployment should run** | `Head` | Keep default |
   | **Select event source** | `Time-driven` | NOT "From spreadsheet" |
   | **Select type of time based trigger** | `Hour timer` | NOT "Day timer" |
   | **Select hour interval** | `Every hour` | For real-time trending |
   | **Failure notification settings** | `Notify me daily` | Optional but recommended |

4. **Save Trigger**
   - Click **Save** button
   - If prompted for permissions, click **Authorize**
   - Review permissions and click **Allow**

5. **Verify Trigger Created**
   - You should see your trigger in the list:
   ```
   updateTrendingCache
   Time-driven | Hour timer | Every hour
   ```

#### Option B: Alternative Intervals (Optional)

If hourly updates are too frequent for your use case:

| Interval | Best For | Freshness |
|----------|----------|-----------|
| Every hour | Active campuses (>500 users) | Very fresh |
| Every 2 hours | Medium campuses (200-500 users) | Fresh |
| Every 4 hours | Small campuses (<200 users) | Acceptable |
| Every 6 hours | Low-activity periods | Stale |

**Recommendation:** Start with "Every hour" and adjust based on activity.

### Step 3: Verify Trigger Execution

#### Immediate Verification (Optional)

Run the function manually to populate the cache immediately:

1. In Apps Script editor, at the top toolbar:
   - Click dropdown showing function name
   - Select `updateTrendingCache`
2. Click **Run** button (▶️ play icon)
3. Check execution log:
   - Click **View** → **Execution log**
   - Should show "Execution completed"
   - No errors

#### Wait for Automatic Execution

1. **Wait 1 Hour**
   - Trigger runs at the top of each hour
   - Example: If created at 3:45 PM, first run at 4:00 PM

2. **Check Execution History**
   - Click **Executions** icon (▶️ in left sidebar)
   - You should see:
     ```
     Function: updateTrendingCache
     Status: Completed
     Duration: 2-5 seconds
     ```

3. **Verify Database Update**
   - Go back to your Google Sheet
   - Look for **TrendingCache** sheet (7th tab)
   - Should contain 6 rows:
     - Row 1: Headers
     - Rows 2-6: Top 5 trending projects
   - Data should include `trendingScore` column

#### Troubleshooting Triggers

**Issue 1: Trigger Not Listed**
- Refresh the page (F5)
- Check you're in the correct project
- Verify you clicked "Save" after configuration

**Issue 2: Execution Failed**
- Click on failed execution to see error
- Common errors:
  - "No projects found": Database is empty (expected for new installs)
  - "Permission denied": Re-authorize the script
  - "Timeout": Database too large (contact support)

**Issue 3: TrendingCache Sheet Empty**
- Manually run `updateTrendingCache` function
- Check if Projects sheet has data
- Verify Comments sheet exists
- Check execution logs for errors

### Step 4: Test the API

Once trigger is set up, test the trending endpoint:

#### Browser Test
```
YOUR_SHEET_URL?action=getTrending
```

**Expected Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "1234567890",
      "title": "AI Chatbot",
      "upvotes": 15,
      "commentCount": 8,
      "trendingScore": 12.34,
      ...
    },
    // 4 more projects
  ]
}
```

#### Command Line Test
```bash
curl "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=getTrending"
```

**If response is empty `[]`:**
- Wait for first trigger execution (up to 1 hour)
- Manually run `updateTrendingCache` function
- Verify you have projects in the database

### Step 5: Monitor Trigger Health

#### Daily Checks (First Week)
- Go to Executions tab
- Verify hourly runs are succeeding
- Check duration (should be 2-10 seconds)
- No failure notifications in email

#### Weekly Maintenance
- Review execution logs
- Check for any failed runs
- Verify trending data is current
- Monitor quota usage (very unlikely to hit limits)

#### Quota Information
- **Free Tier Limits**:
  - Script runtime: 6 minutes per execution
  - Triggers: 20 time-driven triggers per script
  - Daily execution: 90 minutes total
- **v1.5 Usage**:
  - Per execution: 2-10 seconds
  - Daily total: 24 hours × 10 seconds = 240 seconds = 4 minutes
  - **Conclusion**: Well within free tier limits

---

## Phase 5: Security Hardening (The "Real" Security)

Since the browser *can* still see these keys, you must secure the *services* themselves to reject unauthorized use.

### 1. Lock Down Cloudinary

This prevents other websites from taking your keys and using your storage quota.

#### Step-by-Step Instructions

1. **Login to Cloudinary**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign in to your account

2. **Access Upload Settings**
   - Click **Settings** icon (⚙️ gear icon in top-right)
   - In left sidebar, click **Upload**
   - Scroll down to **Upload presets** section

3. **Edit Your Preset**
   - Find `studenthub_preset` in the list
   - Click **Edit** (pencil icon)

4. **Configure Allowed Referrers**
   - Scroll to **Security** section
   - Find **Allowed fetch domains** or **Allowed HTTP Referrers**
   - Add your domains (one per line):
     ```
     nielitropar.github.io
     localhost
     127.0.0.1
     ```
   - **Important**: Do NOT include `https://` or trailing slashes

5. **Save Settings**
   - Scroll to bottom
   - Click **Save**

**Result:** Even if someone steals your Cloud Name, they cannot upload images from their own site.

#### Test Cloudinary Security

**Allowed Domain (Should Work):**
```javascript
// From nielitropar.github.io
fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload', {
  method: 'POST',
  body: formData
}); // ✅ Success
```

**Blocked Domain (Should Fail):**
```javascript
// From malicious-site.com
fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload', {
  method: 'POST',
  body: formData
}); // ❌ 403 Forbidden
```

### 2. Protect Google Apps Script (Optional)

Google Apps Script Web Apps set to "Anyone" are public. While this is required for the site to work, you can add a layer of protection against bots.

#### Step 1: Generate Secret Token

Create a random, secure token:

```bash
# Option 1: Use online generator
# Visit: https://www.uuidgenerator.net/

# Option 2: Generate in terminal (Mac/Linux)
openssl rand -hex 32

# Option 3: Use a passphrase
# Example: NIELIT_APP_TOKEN_2026_SECURE_KEY_987654321
```

**Example Token:**
```
NIELIT_APP_TOKEN_2026_b8f3c7a2d4e1f9g6h5i4j3k2l1
```

#### Step 2: Add Token to GitHub Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. **Name**: `APP_SECRET_TOKEN`
4. **Value**: Your generated token
5. Click **Add secret**

#### Step 3: Update GitHub Actions Workflow

Edit `.github/workflows/deploy.yml`:

```yaml
- name: Inject Configuration
  run: |
    echo "const CONFIG = {" > config.js
    echo "    SHEET_URL: '${{ secrets.APP_SHEET_URL }}'," >> config.js
    echo "    CLOUDINARY_NAME: '${{ secrets.APP_CLOUD_NAME }}'," >> config.js
    echo "    CLOUDINARY_PRESET: '${{ secrets.APP_CLOUD_PRESET }}'," >> config.js
    echo "    APP_TOKEN: '${{ secrets.APP_SECRET_TOKEN }}'" >> config.js  # NEW
    echo "};" >> config.js
```

#### Step 4: Update Local config.js

For local development:

```javascript
const CONFIG = {
    SHEET_URL: 'YOUR_SHEET_URL',
    CLOUDINARY_NAME: 'YOUR_CLOUD_NAME',
    CLOUDINARY_PRESET: 'studenthub_preset',
    APP_TOKEN: 'NIELIT_APP_TOKEN_2026_b8f3c7a2d4e1f9g6h5i4j3k2l1'  // NEW
};
```

#### Step 5: Update Frontend Fetch Calls

Modify all API calls to include the token:

**Example in feed.html (line ~1275):**
```javascript
// OLD
const res = await fetch(`${SHEET_URL}?action=getProjects&page=${currentPage}${emailParam}${searchParam}`);

// NEW
const res = await fetch(`${SHEET_URL}?action=getProjects&token=${CONFIG.APP_TOKEN}&page=${currentPage}${emailParam}${searchParam}`);
```

**Apply to all API calls:**
- `getProjects`
- `getTrending`
- `getProfiles`
- `getProfile`
- `getComments`
- `login`
- `signup`
- etc.

#### Step 6: Update Backend (google-app-script-v1.5.js)

Add security check at the top of `handleRequest()`:

```javascript
function handleRequest(e, method) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    // ===== NEW: SECURITY CHECK =====
    const validToken = 'NIELIT_APP_TOKEN_2026_b8f3c7a2d4e1f9g6h5i4j3k2l1';
    const incomingToken = method === 'GET' ? e.parameter.token : JSON.parse(e.postData.contents).token;

    if (incomingToken !== validToken) {
       return createResponse('error', 'Unauthorized Access');
    }
    // ===== END SECURITY CHECK =====
    
    let action, params;
    
    if (method === 'GET') {
      // ... existing code
```

#### Step 7: Redeploy Backend

1. Save the updated Apps Script code
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (pencil icon) on current deployment
4. Change **Version** to "New version"
5. Add description: "Added token-based authentication"
6. Click **Deploy**

#### Test Token Authentication

**With Token (Should Work):**
```bash
curl "YOUR_SHEET_URL?action=getProjects&token=YOUR_TOKEN"
# ✅ Returns data
```

**Without Token (Should Fail):**
```bash
curl "YOUR_SHEET_URL?action=getProjects"
# ❌ {"status":"error","data":"Unauthorized Access"}
```

**Wrong Token (Should Fail):**
```bash
curl "YOUR_SHEET_URL?action=getProjects&token=WRONG_TOKEN"
# ❌ {"status":"error","data":"Unauthorized Access"}
```

### 3. Additional Security Measures

#### Enable Google Apps Script Logging

1. In Apps Script editor: **View** → **Executions**
2. Monitor for:
   - Unusual traffic patterns
   - Failed authentication attempts
   - Execution time spikes

#### Set Up Email Alerts

1. Go to **Triggers** in Apps Script
2. Edit your `updateTrendingCache` trigger
3. Set **Failure notification** to "Notify me immediately"
4. You'll receive email if trigger fails

#### Regular Security Audits

**Monthly Checklist:**
- [ ] Review Apps Script execution logs
- [ ] Check Cloudinary usage stats
- [ ] Verify no unauthorized domains in Cloudinary
- [ ] Confirm token hasn't leaked (search GitHub)
- [ ] Update dependencies (GitHub Actions)

---

## Phase 6: Deployment Checklist

Before going live, verify all steps:

### Backend Configuration
- [ ] v1.5 code deployed to Google Apps Script
- [ ] Web App deployed with "Anyone" access
- [ ] Time-driven trigger created (hourly)
- [ ] TrendingCache sheet populated
- [ ] API endpoints tested and working
- [ ] (Optional) Token authentication enabled

### Frontend Configuration
- [ ] config.js created locally (gitignored)
- [ ] All HTML files reference config.js
- [ ] .gitignore includes config.js

### GitHub Configuration
- [ ] Repository secrets added (3 or 4)
- [ ] deploy.yml workflow exists
- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] Workflow run successful

### Security Configuration
- [ ] Cloudinary referrers restricted
- [ ] (Optional) Apps Script token enabled
- [ ] Execution logging enabled
- [ ] Email alerts configured

### Testing
- [ ] Local development works
- [ ] Production deployment successful
- [ ] Trending data populates
- [ ] Can create account and login
- [ ] Can post project with image
- [ ] Can like profiles
- [ ] Mobile navigation works

---

## Troubleshooting

### Deployment Fails

**Issue:** GitHub Actions workflow fails

**Solution:**
1. Check Actions tab for error logs
2. Common causes:
   - Secrets not set correctly
   - Typo in deploy.yml
   - Wrong branch name (main vs master)
3. Re-run workflow after fixing

### Trending Not Working

**Issue:** Trending section is empty

**Solution:**
1. Verify trigger exists (Apps Script → Triggers)
2. Check TrendingCache sheet has data
3. Manually run `updateTrendingCache`
4. Wait for next hourly execution
5. Test API: `?action=getTrending`

### Token Authentication Issues

**Issue:** All API calls return "Unauthorized Access"

**Solution:**
1. Verify CONFIG.APP_TOKEN is defined
2. Check token matches in frontend and backend
3. Ensure all fetch calls include `&token=${CONFIG.APP_TOKEN}`
4. Clear browser cache (Ctrl+Shift+Delete)
5. Hard refresh (Ctrl+F5)

### Cloudinary Upload Fails

**Issue:** Images fail to upload

**Solution:**
1. Check referrer list includes your domain
2. Verify preset name is exactly `studenthub_preset`
3. Check preset is set to "Unsigned"
4. Test from allowed domain
5. Check browser console for specific error

---

## Summary

This guide covered:

1. ✅ **Extracting secrets** from source code into config.js
2. ✅ **Configuring GitHub Secrets** for secure deployment
3. ✅ **Creating GitHub Actions workflow** for automatic deployment
4. ✅ **Setting up Time-Driven Trigger** for v1.5 trending (CRITICAL)
5. ✅ **Hardening Cloudinary** with referrer restrictions
6. ✅ **Adding token authentication** to Apps Script (optional)

**Key Takeaway:** While browser-visible credentials are unavoidable in client-side apps, proper service-level security (Cloudinary referrers, Apps Script tokens) and GitHub Actions secrets protect against abuse and credential exposure in source code.

**Next Steps:**
1. Test entire flow end-to-end
2. Monitor execution logs for first 24 hours
3. Set up email alerts for failures
4. Document any custom configurations
5. Train team on deployment process

---

**Document Version:** 1.5.1  
**Last Updated:** January 25, 2026  
**Author:** NIELIT StudentHub Team  
**License:** MIT

**Need Help?** [GitHub Issues](https://github.com/nielitropar/nielitropar.github.io/issues) • [Email Support](mailto:sarwan@nielit.gov.in)

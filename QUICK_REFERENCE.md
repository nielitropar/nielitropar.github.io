# NIELIT StudentHub - Quick Reference Card (v1.5.1)

## 🚀 Quick Start Important

### Test Locally (Instant)
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: Just double-click index.html

```

Then visit: http://localhost:8000 (or file:/// path)

---

## 🔑 Demo Login

```
Email: demo@nielit.gov.in
Password: demo123

```

Works even without configuration!

---

## ⚙️ Configuration (3 Files, Same Config)

### Create config.js in root folder:

```javascript
const CONFIG = {
    SHEET_URL: '[https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec](https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec)',
    CLOUDINARY_NAME: 'your_cloud_name',
    CLOUDINARY_PRESET: 'studenthub_preset'
};

```

**Critical:** All HTML files (index.html, feed.html, project.html) load this config.js automatically!

---

## 🔧 Google Apps Script Setup (v1.5.1)

### Quick Deploy:

1. Go to [Google Sheets](https://sheets.google.com) → New Spreadsheet
2. Extensions → Apps Script
3. **Paste entire `google-app-script-v1.5.js` code** (NOT v1.4)
4. Save (💾) → Name it "StudentHub API v1.5"
5. Deploy → New deployment → Web app
* **Execute as:** Me
* **Who has access:** Anyone ⚠️ Must be "Anyone"!


6. Authorize (click through warnings)
7. Copy deployment URL → Use in config.js

### What's New in v1.5 Optimization:

* ✅ **Instant Search (Fuse.js)** - 0ms latency client-side fuzzy search
* ✅ **Search Index Caching** - Server generates lightweight index (cached for 6 hours)
* ✅ **Server-Side Slicing** - Optimized pagination reading only ~20 rows
* ✅ **Smart Trending Algorithm** - Time-decay scoring for fair ranking
* ✅ **Background Worker** - Decoupled heavy math to hourly triggers

### Database Structure (7 Sheets):

1. **Users** - Auth (11 columns including resume)
2. **Projects** - Content (12 columns including category)
3. **Profiles** - Public data (11 columns including likes)
4. **Comments** - Discussions (6 columns)
5. **Upvotes** - Individual project likes (3 columns)
6. **ProfileLikes** - Individual profile likes (3 columns)
7. **TrendingCache** - [NEW] Stores pre-calculated trending data

---

## 🎨 Cloudinary Setup

### Quick Steps:

1. Sign up: [cloudinary.com](https://cloudinary.com/users/register/free)
2. Dashboard → Note your **Cloud Name**
3. Settings (⚙️) → Upload → Add preset:
* Preset name: `studenthub_preset` (exact name!)
* Signing Mode: **Unsigned** ⚠️ Critical!
* Access Mode: Public


4. Save → Use Cloud Name in config.js

**Important note for resume upload feature:** Cloudinary will let you upload image but it blocks pfds and zip uploads by default Enabling “Allow delivery of PDF and ZIP files” in Security settings of Cloudinary resolves the issue.

---

## 🌐 Deploy to GitHub Pages

### Option 1: Manual Config (Recommended for Testing)

```bash
# 1. Clone repo
git clone [https://github.com/nielitropar/nielitropar.github.io.git](https://github.com/nielitropar/nielitropar.github.io.git)
cd nielitropar.github.io

# 2. Create config.js (see Configuration section above)
nano config.js  # or use any text editor

# 3. Commit and push
git add config.js
git commit -m "Add configuration"
git push

```

### Option 2: GitHub Actions (Production - Secure)

Use the existing `.github/workflows/deploy.yml` with secrets:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add these secrets:
* `APP_SHEET_URL` - Your Apps Script URL
* `APP_CLOUD_NAME` - Your Cloudinary name
* `APP_CLOUD_PRESET` - `studenthub_preset`


3. Push any change → GitHub Actions auto-deploys with injected config

### Enable Pages:

Repository Settings → Pages → Source: GitHub Actions (or main branch if manual)

Your site: `https://USERNAME.github.io/REPO/`

---

## 🐛 Common Fixes

### Search Results Not Updating Immediately?

**Reason:** The Search Index is cached for **6 hours** to protect the server.
**Behavior:** New projects appear in the Feed instantly, but may take up to 6 hours to appear in the Search Bar.
**Fix:** This is intended behavior for performance. To force update, you can redeploy the script or wait.

### Projects Not Loading?

**Check:**

1. config.js exists and has correct SHEET_URL
2. Apps Script deployed with "Who has access: Anyone"
3. Browser console (F12) for errors
4. Test API: `YOUR_SHEET_URL?action=getProjects` in browser

### Trending Not Showing?

**Check:**

1. Using google-app-script-v1.5.js (NOT v1.4)
2. **Trigger Configured:** Did you add the Time-driven trigger for `updateTrendingCache`?
3. API test: `YOUR_SHEET_URL?action=getTrending`

### Login Fails After Signup?

**Check:**

1. Google Sheet has "Users" tab with your email
2. Email exactly matches (case-insensitive but check spaces)
3. Try demo@nielit.gov.in / demo123 first
4. Clear localStorage: `localStorage.clear()` in console

### Config Not Loading?

**If you see undefined errors:**

1. Verify config.js is in the same folder as index.html
2. Check browser console for "Failed to load resource: config.js"
3. Try hard refresh: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)

---

## 📊 Feature Checklist (v1.5.1)

### Core Features (All Implemented ✅):

* [x] User authentication (signup/login with SHA-256 + salt)
* [x] **Automatic password migration** (v1.0 → v1.5 security)
* [x] Session management (localStorage)
* [x] Profile management (edit name, bio, links, picture, resume)
* [x] **Profile likes** (heart/like other users' profiles)
* [x] Project posting with Cloudinary images
* [x] **Project categories** (Web Dev, Mobile, AI/ML, IoT, Blockchain, etc.)
* [x] Individual upvote tracking (one vote per user per project)
* [x] Comments on projects (full CRUD)
* [x] **Smart Trending algorithm** (engagement + time decay)
* [x] **Instant Search** (Client-side Fuse.js implementation)
* [x] **Server-side pagination** (20 projects, 24 profiles per page)
* [x] Mobile responsive with bottom navigation
* [x] User profile pages (individual portfolios)
* [x] **Public sharing** (project.html for guests)
* [x] Directory view (all students)
* [x] **Animated statistics** (total students/projects on hero)

### Technical Features:

* [x] **Fuse.js Library** integration for fuzzy search
* [x] **Search Index Caching** (RAM cache for 6 hours)
* [x] Cloudinary image + PDF hosting (resume upload)
* [x] Google Sheets as database (7 sheets)
* [x] **Salted password hashing** (SHA-256)
* [x] XSS protection (HTML escaping)
* [x] LocalStorage caching
* [x] Error handling with user feedback
* [x] **Deep linking** (direct URLs to projects/profiles)

---

## 🎯 Testing Checklist (v1.5 Features)

### Must Test Before Deploying:

* [ ] Login with demo@nielit.gov.in / demo123
* [ ] Create new account (test signup)
* [ ] Upload profile picture (test Cloudinary)
* [ ] **Upload PDF resume** (new feature)
* [ ] Post project with image
* [ ] Post project with category selection
* [ ] Upvote a project (button should disable)
* [ ] **Like another user's profile** (heart icon)
* [ ] Try to like own profile (should show error)
* [ ] Add comment to project
* [ ] View another user's profile
* [ ] **Check trending section** (horizontal scroll on mobile, sidebar on desktop)
* [ ] **Search for projects** (Type "Python" - verify 0ms latency)
* [ ] **Search for profiles** (Type "Student" - verify 0ms latency)
* [ ] **Filter by category** (chips on feed.html)
* [ ] Click trending project → goes to project detail
* [ ] Edit own profile
* [ ] View "My Projects" page
* [ ] Test mobile bottom navigation (3 tabs: Feed, Profiles, Post)
* [ ] **Test public sharing** (copy project.html link, open in incognito)

---

## 🔐 Security Notes (v1.5)

### Built-in Security:

* **SHA-256 + Salt password hashing** - `NIELIT_STUDENTHUB_SECURE_SALT_2026`
* **Automatic Migration** - Old passwords upgraded on login
* **XSS protection** - All user input escaped (`escapeHtml()`)
* **Input validation** - Server-side validation in Apps Script
* **CORS configured** - Apps Script handles cross-origin requests
* **No SQL injection** - Using Google Sheets (no SQL)
* **Individual tracking** - Upvotes and ProfileLikes prevent duplicates

### Best Practices:

* Never commit config.js with sensitive data to public repos
* Use GitHub Actions secrets for production
* Monitor Apps Script execution logs regularly
* Review new user signups periodically
* Keep Google Sheet private (only script has access)
* Use HTTPS in production (GitHub Pages provides this)

---

## 📱 Mobile Support

### Responsive Breakpoints:

* **Desktop**: 1200px+ (3-column layout with sidebars)
* **Tablet**: 968px - 1200px (2-column layout)
* **Mobile**: < 968px (single column + bottom nav)
* **Small Mobile**: < 480px (optimized spacing)

### Mobile-Specific Features (v1.5):

* **Bottom Navigation Bar** - 3 tabs: Feed, Profiles, Post
* **Horizontal Trending** - Swipeable cards on mobile
* **Touch-friendly buttons** - Larger tap targets
* **Optimized layouts** - No sidebars on mobile
* **Fixed bottom nav** - Always accessible
* **Safe area support** - iPhone notch compatibility
* **User menu modal** - Mobile-specific profile menu
* **Fast image loading** - Cloudinary optimization
* **No zoom on input** - Font-size: 16px prevents iOS zoom
* **Category chips** - Horizontal scroll on mobile

---

## 📋 API Reference (v1.5.1)

### Available Actions:

| Action | Method | Parameters | Returns |
| --- | --- | --- | --- |
| `getProjects` | GET | `userEmail`, `page`, `searchTerm` | Paginated projects |
| `getProject` | GET | `id` | Single project |
| `getTrending` | GET | none | Top 5 by score |
| `getProfiles` | GET | `page`, `searchTerm`, `userEmail` | Paginated profiles |
| `getProfile` | GET | `email`, `userEmail` | Single profile |
| `getSearchIndex` | GET | none | Lightweight project index |
| `getProfileIndex` | GET | none | Lightweight profile index |
| `getComments` | GET | `projectId` | Comments array |
| `getStats` | GET | none | Total students/projects |
| `login` | GET | `email`, `password` | User object |
| `signup` | POST | `data` object | Success message |
| `addProject` | POST | `data` object | Success message |
| `updateProfile` | POST | `data` object | Success message |
| `toggleUpvote` | POST | `projectId`, `userEmail` | `{action, newCount}` |
| `toggleProfileLike` | POST | `targetEmail`, `userEmail` | `{action, newCount}` |
| `addComment` | POST | `data` object | Success message |

---

**Quick Help:** For detailed instructions, see [README.md](https://github.com/nielitropar/nielitropar.github.io/blob/main/README.md) or [SETUP_GUIDE.md](https://github.com/nielitropar/nielitropar.github.io/blob/main/SETUP_GUIDE.md)

**Need Support?** Check browser console first, then [GitHub Issues](https://github.com/nielitropar/nielitropar.github.io/issues)

**Made with ❤️ at NIELIT Ropar | Version 1.5.1 | January 2026**

---

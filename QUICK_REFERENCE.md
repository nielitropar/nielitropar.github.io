# NIELIT StudentHub - Quick Reference Card (v1.5)

## 🚀 Quick Start Commands

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
    SHEET_URL: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    CLOUDINARY_NAME: 'your_cloud_name',
    CLOUDINARY_PRESET: 'studenthub_preset'
};
```

**Critical:** All HTML files (index.html, feed.html, project.html) load this config.js automatically!

---

## 🔧 Google Apps Script Setup (v1.5)

### Quick Deploy:
1. Go to [Google Sheets](https://sheets.google.com) → New Spreadsheet
2. Extensions → Apps Script
3. **Paste entire `google-app-script-v1.5.js` code** (NOT v1.4)
4. Save (💾) → Name it "StudentHub API v1.5"
5. Deploy → New deployment → Web app
   - **Execute as:** Me
   - **Who has access:** Anyone ⚠️ Must be "Anyone"!
6. Authorize (click through warnings)
7. Copy deployment URL → Use in config.js

### What's New in v1.5:
- ✅ **Smart Trending Algorithm** - Time-decay scoring for fair ranking
- ✅ **Profile Likes** - 6th sheet added (ProfileLikes)
- ✅ **Individual Upvote Tracking** - Separate Upvotes sheet
- ✅ **Enhanced Security** - Automatic password migration with salt

### Database Structure (6 Sheets):
1. **Users** - Auth (11 columns including resume)
2. **Projects** - Content (12 columns including category)
3. **Profiles** - Public data (11 columns including likes)
4. **Comments** - Discussions (6 columns)
5. **Upvotes** - Individual project likes (3 columns)
6. **ProfileLikes** - NEW! Individual profile likes (3 columns)

---

## 🎨 Cloudinary Setup

### Quick Steps:
1. Sign up: [cloudinary.com](https://cloudinary.com/users/register/free)
2. Dashboard → Note your **Cloud Name**
3. Settings (⚙️) → Upload → Add preset:
   - Preset name: `studenthub_preset` (exact name!)
   - Signing Mode: **Unsigned** ⚠️ Critical!
   - Access Mode: Public
4. Save → Use Cloud Name in config.js

---

## 🌐 Deploy to GitHub Pages

### Option 1: Manual Config (Recommended for Testing)
```bash
# 1. Clone repo
git clone https://github.com/nielitropar/nielitropar.github.io.git
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
   - `APP_SHEET_URL` - Your Apps Script URL
   - `APP_CLOUD_NAME` - Your Cloudinary name
   - `APP_CLOUD_PRESET` - `studenthub_preset`
3. Push any change → GitHub Actions auto-deploys with injected config

### Enable Pages:
Repository Settings → Pages → Source: GitHub Actions (or main branch if manual)

Your site: `https://USERNAME.github.io/REPO/`

---

## 🐛 Common Fixes

### Projects Not Loading?
**Check:**
1. config.js exists and has correct SHEET_URL
2. Apps Script deployed with "Who has access: Anyone"
3. Browser console (F12) for errors
4. Test API: `YOUR_SHEET_URL?action=getProjects` in browser

**Quick Test:**
```bash
curl "YOUR_SHEET_URL?action=getProjects"
# Should return JSON with {"status":"success","data":{...}}
```

### Trending Not Showing?
**Check:**
1. Using google-app-script-v1.5.js (NOT v1.4)
2. API test: `YOUR_SHEET_URL?action=getTrending`
3. Should return top 5 projects with trendingScore

### Images Not Uploading?
**Check:**
1. CLOUDINARY_NAME is correct (from dashboard)
2. Upload preset exists: `studenthub_preset`
3. Preset is **Unsigned** (not Signed)
4. Image size < 5MB
5. Browser console for Cloudinary errors

### Login Fails After Signup?
**Check:**
1. Google Sheet has "Users" tab with your email
2. Email exactly matches (case-insensitive but check spaces)
3. Try demo@nielit.gov.in / demo123 first
4. Clear localStorage: `localStorage.clear()` in console

### Profile Likes Not Working?
**Check:**
1. ProfileLikes sheet exists (6th sheet)
2. Using v1.5 backend (has toggleProfileLike action)
3. Can't like your own profile (intentional)

### Config Not Loading?
**If you see undefined errors:**
1. Verify config.js is in the same folder as index.html
2. Check browser console for "Failed to load resource: config.js"
3. Try hard refresh: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)

---

## 📊 Feature Checklist (v1.5)

### Core Features (All Implemented ✅):
- [x] User authentication (signup/login with SHA-256 + salt)
- [x] **Automatic password migration** (v1.0 → v1.5 security)
- [x] Session management (localStorage)
- [x] Profile management (edit name, bio, links, picture, resume)
- [x] **Profile likes** (heart/like other users' profiles)
- [x] Project posting with Cloudinary images
- [x] **Project categories** (Web Dev, Mobile, AI/ML, IoT, Blockchain, etc.)
- [x] Individual upvote tracking (one vote per user per project)
- [x] Comments on projects (full CRUD)
- [x] **Smart Trending algorithm** (engagement + time decay)
- [x] Search (projects by title/author/tech/category, profiles by name/major)
- [x] **Server-side pagination** (20 projects, 24 profiles per page)
- [x] Mobile responsive with bottom navigation
- [x] User profile pages (individual portfolios)
- [x] **Public sharing** (project.html for guests)
- [x] Directory view (all students)
- [x] **Animated statistics** (total students/projects on hero)

### Technical Features:
- [x] Cloudinary image + PDF hosting (resume upload (Enable PDF & ZIP Delivery in Cloudinary Settings))
- [x] Google Sheets as database (6 sheets)
- [x] **Salted password hashing** (SHA-256 + NIELIT_STUDENTHUB_SECURE_SALT_2026)
- [x] XSS protection (HTML escaping)
- [x] LocalStorage caching
- [x] Error handling with user feedback
- [x] Mobile-first responsive design
- [x] Touch-friendly interactions
- [x] **Deep linking** (direct URLs to projects/profiles)

---

## 🎯 Testing Checklist (v1.5 Features)

### Must Test Before Deploying:
- [ ] Login with demo@nielit.gov.in / demo123
- [ ] Create new account (test signup)
- [ ] Upload profile picture (test Cloudinary)
- [ ] **Upload PDF resume** (new feature)
- [ ] Post project with image
- [ ] Post project with category selection
- [ ] Upvote a project (button should disable)
- [ ] **Like another user's profile** (heart icon)
- [ ] Try to like own profile (should show error)
- [ ] Add comment to project
- [ ] View another user's profile
- [ ] **Check trending section** (horizontal scroll on mobile, sidebar on desktop)
- [ ] Search for projects (by title, tech, author, category)
- [ ] **Filter by category** (chips on feed.html)
- [ ] Search for users (by name, major)
- [ ] Click trending project → goes to project detail
- [ ] Edit own profile
- [ ] View "My Projects" page
- [ ] Test on mobile device (or DevTools)
- [ ] Test mobile bottom navigation (3 tabs: Feed, Profiles, Post)
- [ ] Test back button navigation
- [ ] **Test public sharing** (copy project.html link, open in incognito)
- [ ] **Test password migration** (create user with v1.0, login with v1.5)

---

## 🔐 Security Notes (v1.5)

### Built-in Security:
- **SHA-256 + Salt password hashing** - `NIELIT_STUDENTHUB_SECURE_SALT_2026`
- **Automatic Migration** - Old passwords upgraded on login
- **XSS protection** - All user input escaped (`escapeHtml()`)
- **Input validation** - Server-side validation in Apps Script
- **CORS configured** - Apps Script handles cross-origin requests
- **No SQL injection** - Using Google Sheets (no SQL)
- **Individual tracking** - Upvotes and ProfileLikes prevent duplicates

### Best Practices:
- Never commit config.js with sensitive data to public repos
- Use GitHub Actions secrets for production
- Monitor Apps Script execution logs regularly
- Review new user signups periodically
- Keep Google Sheet private (only script has access)
- Use HTTPS in production (GitHub Pages provides this)

---

## 📱 Mobile Support

### Responsive Breakpoints:
- **Desktop**: 1200px+ (3-column layout with sidebars)
- **Tablet**: 968px - 1200px (2-column layout)
- **Mobile**: < 968px (single column + bottom nav)
- **Small Mobile**: < 480px (optimized spacing)

### Mobile-Specific Features (v1.5):
- **Bottom Navigation Bar** - 3 tabs: Feed, Profiles, Post
- **Horizontal Trending** - Swipeable cards on mobile
- **Touch-friendly buttons** - Larger tap targets
- **Optimized layouts** - No sidebars on mobile
- **Fixed bottom nav** - Always accessible
- **Safe area support** - iPhone notch compatibility
- **User menu modal** - Mobile-specific profile menu
- **Fast image loading** - Cloudinary optimization
- **No zoom on input** - Font-size: 16px prevents iOS zoom
- **Category chips** - Horizontal scroll on mobile

---

## 🎨 Customization Quick Guide

### Change Colors (All HTML files):
```css
:root {
    --primary: #003366;     /* Main NIELIT blue */
    --accent: #0066CC;      /* Lighter blue */
    --secondary: #FF6B35;   /* Orange accent */
    --background: #F5F7FA;  /* Page background */
    --card-bg: #FFFFFF;     /* Card backgrounds */
}
```

### Replace Logo:
Update these files:
- Replace `logo.png` file with same dimensions (200x200px recommended)
- Or update img src in index.html, feed.html, project.html

---

## 📞 Support Channels

### Self-Help:
1. **Quick Reference** - This file for common issues
2. **README.md** - Comprehensive setup guide
3. **Browser Console** - F12 → Console tab for errors
4. **Apps Script Logs** - View → Executions for backend errors
5. **Demo Mode** - Test with demo credentials first

### Get Help:
- **GitHub Issues**: [Report bugs or request features](https://github.com/nielitropar/nielitropar.github.io/issues)
- **Documentation**: README.md has detailed troubleshooting

### When Reporting Issues:
Include:
1. **Version**: v1.5 (check google-apps-script.js first line)
2. Browser and version
3. Steps to reproduce
4. Error messages from console
5. Screenshots if applicable
6. Config values (redact sensitive URLs)

---

## 🎓 Key Files Explained (v1.5)

```
nielitropar.github.io/
├── config.js                    # ⚠️ CREATE THIS! (gitignored for security)
│                                # Contains SHEET_URL, CLOUDINARY credentials
│
├── index.html                   # Student directory & portfolio view
│                                # Shows: All profiles, individual portfolios, trending
│                                # Loads: config.js automatically
│
├── feed.html                    # Main feed with projects (pagination)
│                                # Shows: Project feed, trending sidebar, post modal
│                                # Loads: config.js automatically
│
├── project.html                 # Public project detail page
│                                # Shows: Single project (no login required)
│                                # Loads: config.js automatically
│
├── google-app-script-v1.5.js    # 🆕 BACKEND v1.5 (USE THIS!)
│                                # Contains: Trending, ProfileLikes, Migration
│                                # Functions: getTrending, toggleProfileLike, etc.
│
├── google-apps-script.js        # Legacy v1.4 (for reference only)
│
├── logo.png                     # NIELIT logo (replace if needed)
│
├── .github/workflows/deploy.yml # GitHub Actions workflow
│                                # Injects config from secrets
│
├── .gitignore                   # Prevents config.js from being committed
│
├── README.md                    # Full documentation
├── QUICK_REFERENCE.md           # This file
├── SETUP_GUIDE.md               # Step-by-step setup
└── LICENSE                      # MIT License
```

### Database Sheets (Auto-created by v1.5):
- **Users** (11 cols) - email, password, name, university, major, profilePicture, linkedin, github, bio, timestamp, resume
- **Projects** (12 cols) - id, authorName, authorEmail, authorPicture, title, description, link, tech, projectImage, upvotes, timestamp, **category**
- **Profiles** (11 cols) - name, email, university, major, linkedin, github, bio, profilePicture, timestamp, resume, **likes**
- **Comments** (6 cols) - id, projectId, authorName, authorEmail, comment, timestamp
- **Upvotes** (3 cols) - projectId, userEmail, timestamp
- **ProfileLikes** (3 cols) - targetEmail, userEmail, timestamp

---

## 📈 Optional Enhancements

### Add Google Analytics:
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

### Track Events:
```javascript
// In feed.html after login
gtag('event', 'login', {'method': 'Google Apps Script'});

// After posting project
gtag('event', 'post_project', {'event_category': 'engagement'});

// After liking profile
gtag('event', 'like_profile', {'event_category': 'social'});
```

---

## 🎯 Production Checklist (v1.5)

Before going live:

### Configuration:
- [ ] config.js created with correct credentials
- [ ] OR GitHub Actions secrets configured
- [ ] Cloudinary credentials correct
- [ ] Apps Script uses v1.5 code (check first line)
- [ ] Logo replaced with institution logo (if needed)

### Testing:
- [ ] All v1.5 features tested (trending, profile likes, categories)
- [ ] Tested on desktop (Chrome, Firefox, Safari)
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] Tested with real user accounts (not just demo)
- [ ] Images upload and display correctly
- [ ] Resume PDFs upload and download
- [ ] Search works for projects and profiles
- [ ] Comments system works
- [ ] Mobile bottom navigation works
- [ ] Trending section visible on all screen sizes
- [ ] Profile likes work (can't like own profile)
- [ ] Category filtering works

### Backend:
- [ ] Apps Script deployed with "Anyone" access
- [ ] Google Sheet has all 6 tabs
- [ ] Test API endpoints directly in browser:
  - `?action=getProjects`
  - `?action=getTrending`
  - `?action=getStats`
- [ ] ProfileLikes sheet exists and has headers

### Security:
- [ ] Verified password hashing works (check Users sheet)
- [ ] Test password migration (old user → new login)
- [ ] Test XSS protection (try entering `<script>alert(1)</script>`)
- [ ] Ensure Google Sheet is private (not publicly shared)
- [ ] Monitor Apps Script quotas

### Deployment:
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site loads at GitHub Pages URL
- [ ] All assets load (images, styles, scripts)
- [ ] No console errors on production site
- [ ] config.js NOT in repository (check .gitignore)

---

## 💡 Pro Tips (v1.5)

1. **Test in Incognito/Private Mode** - Avoids localStorage conflicts
2. **Check Network Tab (F12)** - Debug API call issues
3. **Version Control** - Always use v1.5 backend for new deployments
4. **Mobile First** - Test mobile layout during development
5. **User Feedback** - Add feedback mechanism (GitHub Issues)
6. **Monitor Trending** - Check if scoring algorithm needs tuning
7. **Backup Regularly** - Export Google Sheet periodically
8. **Use Console Logs** - Add `console.log()` for debugging
9. **Clear Cache** - Hard refresh (Ctrl+F5) after config changes
10. **Read Error Messages** - Console provides specific error details
11. **Test Migration** - Create user with v1.0, login with v1.5 to verify upgrade
12. **Profile Likes Limit** - Can't like own profile (intentional)

---

## 🌟 What's New in v1.5

### Major Features:
- ✅ **Smart Trending Algorithm** - Fair time-decay scoring
- ✅ **Profile Likes** - Social acknowledgment between peers
- ✅ **Enhanced Security** - Automatic password migration
- ✅ **Category Support** - Better project organization
- ✅ **Resume Upload** - PDF support via Cloudinary
- ✅ **Public Sharing** - project.html works without login
- ✅ **Animated Stats** - Counting animation on hero

### Technical Improvements:
- New API action: `getTrending`
- New API action: `toggleProfileLike`
- New sheet: ProfileLikes (6th sheet)
- Optimized pagination (server-side only)
- Better mobile UX (horizontal trending)
- Self-healing crypto migration

### Bug Fixes:
- Deep link loader now hides correctly
- Category display in project cards
- Search timeout debouncing
- Mobile bottom nav alignment
- Trending scroll on mobile

---

## 🎉 Success Metrics

After deployment, you can track:

### User Engagement (v1.5):
- Total users registered
- Projects posted per week
- Average upvotes per project
- **Profile likes per user**
- Comments per project
- **Trending project views**
- **Category popularity**

### Popular Content:
- Most upvoted projects
- Most active users
- **Most liked profiles**
- **Trending categories**
- Most commented projects

---

## 📋 API Reference (v1.5)

### Available Actions:

| Action | Method | Parameters | Returns |
|--------|--------|------------|---------|
| `getProjects` | GET | `userEmail`, `page`, `searchTerm` | Paginated projects |
| `getProject` | GET | `id` | Single project |
| `getTrending` | GET | none | Top 5 by score |
| `getProfiles` | GET | `page`, `searchTerm`, `userEmail` | Paginated profiles |
| `getProfile` | GET | `email`, `userEmail` | Single profile |
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

**Quick Help:** For detailed instructions, see [README.md](README.md) or [SETUP_GUIDE.md](SETUP_GUIDE.md)

**Need Support?** Check browser console first, then [GitHub Issues](https://github.com/nielitropar/nielitropar.github.io/issues)

**Made with ❤️ at NIELIT Ropar | Version 1.5 | January 2026**

---

[⬆ Back to Top](#nielit-studenthub---quick-reference-card-v15)

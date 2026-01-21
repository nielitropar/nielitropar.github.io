# NIELIT StudentHub - Quick Reference Card

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

## ⚙️ Configuration (3 Lines to Change)

### For index.html (lines ~1225-1227):
```javascript
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
const CLOUDINARY_PRESET = 'studenthub_preset';
const CLOUDINARY_NAME = 'your_cloud_name';
```

### For profiles.html (line ~111):
```javascript
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

**Critical:** Both files must have the same SHEET_URL!

---

## 🔧 Google Apps Script Setup

### Quick Deploy:
1. Go to [Google Sheets](https://sheets.google.com) → New Spreadsheet
2. Extensions → Apps Script
3. Paste entire `google-apps-script.js` code
4. Save (💾) → Name it "StudentHub API"
5. Deploy → New deployment → Web app
   - **Execute as:** Me
   - **Who has access:** Anyone ⚠️ Must be "Anyone"!
6. Authorize (click through warnings)
7. Copy deployment URL → Paste in both HTML files

### Initialize Sample Data:
```javascript
// In Apps Script editor, select function dropdown:
initializeSampleData()
// Click Run (▶️)
```

Creates demo account and sample data automatically.

---

## 🎨 Cloudinary Setup

### Quick Steps:
1. Sign up: [cloudinary.com](https://cloudinary.com/users/register/free)
2. Dashboard → Note your **Cloud Name**
3. Settings (⚙️) → Upload → Add preset:
   - Preset name: `studenthub_preset` (exact name!)
   - Signing Mode: **Unsigned** ⚠️ Critical!
   - Access Mode: Public
4. Save → Use Cloud Name in config

---

## 🌐 Deploy to GitHub Pages

```bash
# If you cloned:
git add .
git commit -m "Configure NIELIT StudentHub"
git push

# If you downloaded:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Then: Repository Settings → Pages → Source: main branch

Your site: `https://USERNAME.github.io/REPO/`

---

## 🐛 Common Fixes

### Projects Not Loading?
**Check:**
1. SHEET_URL is correct (ends with `/exec`)
2. Apps Script deployed with "Who has access: Anyone"
3. Browser console (F12) for errors
4. Test API: `YOUR_SHEET_URL?action=getProjects` in browser

**Quick Test:**
```bash
curl "YOUR_SHEET_URL?action=getProjects"
# Should return JSON
```

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

### Demo Mode Warning Shows?
**Means:** Configuration not saved correctly
**Fix:** 
1. Re-edit SHEET_URL in **both** index.html and profiles.html
2. Save files
3. Hard refresh: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)

---

## 📊 Feature Checklist

### Core Features (All Implemented ✅):
- [x] User authentication (signup/login with SHA-256)
- [x] Session management (localStorage)
- [x] Profile management (edit name, bio, links, picture)
- [x] Project posting with Cloudinary images
- [x] Upvote system (one-click, optimistic updates)
- [x] Comments on projects (full CRUD)
- [x] Search (projects by title/author/tech, profiles by name/major)
- [x] Mobile responsive with bottom navigation
- [x] User profile pages (individual portfolios)
- [x] Trending projects (top 5 by upvotes)
- [x] Demo mode fallback
- [x] Directory view (all students)

### Technical Features:
- [x] Cloudinary image hosting
- [x] Google Sheets as database (4 sheets)
- [x] Password hashing (SHA-256)
- [x] XSS protection (HTML escaping)
- [x] LocalStorage caching
- [x] Error handling with user feedback
- [x] Mobile-first responsive design
- [x] Touch-friendly interactions

---

## 🎯 Testing Checklist

### Must Test Before Deploying:
- [ ] Login with demo@nielit.gov.in / demo123
- [ ] Create new account (test signup)
- [ ] Upload profile picture (test Cloudinary)
- [ ] Post project with image
- [ ] Post project without image
- [ ] Upvote a project (button should disable)
- [ ] Add comment to project
- [ ] View another user's profile
- [ ] Search for projects (by title, tech, author)
- [ ] Search for users (by name, major)
- [ ] Click trending project
- [ ] Edit own profile
- [ ] View "My Projects" page
- [ ] Test on mobile device (or DevTools)
- [ ] Test mobile bottom navigation (4 tabs)
- [ ] Test back button navigation

---

## 🔐 Security Notes

### Built-in Security:
- **SHA-256 password hashing** - Never stores plain text
- **XSS protection** - All user input escaped (`escapeHtml()`)
- **Input validation** - Server-side validation in Apps Script
- **CORS configured** - Apps Script handles cross-origin requests
- **No SQL injection** - Using Google Sheets (no SQL)

### Best Practices:
- Never commit SHEET_URL with sensitive data
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

### Mobile-Specific Features:
- **Bottom Navigation Bar** - 4 tabs: Feed, Profiles, Post, Me
- **Touch-friendly buttons** - Larger tap targets
- **Optimized layouts** - No sidebars on mobile
- **Fixed bottom nav** - Always accessible
- **Safe area support** - iPhone notch compatibility
- **User menu modal** - Mobile-specific profile menu
- **Fast image loading** - Cloudinary optimization
- **No zoom on input** - Font-size: 16px prevents iOS zoom

### Navigation Mapping:
| Desktop | Mobile Bottom Nav |
|---------|-------------------|
| Feed link | 🏠 Feed tab |
| Profiles link | 👥 Profiles tab |
| Post Project button | ➕ Post tab |
| Sidebar profile menu | 👤 Me tab |

---

## 🎨 Customization Quick Guide

### Change Colors (Both HTML files, lines ~8-19):
```css
:root {
    --primary: #003366;     /* Main NIELIT blue */
    --accent: #0066CC;      /* Lighter blue */
    --secondary: #FF6B35;   /* Not actively used */
    --background: #F5F7FA;  /* Page background */
    --card-bg: #FFFFFF;     /* Card backgrounds */
}
```

### Change Fonts (line ~6):
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
```

### Replace Logo:
Update these lines:
- `index.html` line ~106: Auth page logo
- `index.html` line ~161: Nav logo (img src)
- `profiles.html` line ~69: Nav logo

Or replace `logo.png` file with same dimensions.

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
- **Code Comments**: Check inline comments for implementation details

### When Reporting Issues:
Include:
1. Browser and version
2. Steps to reproduce
3. Error messages from console
4. Screenshots if applicable
5. Config values (redact sensitive URLs)

---

## 🎓 Key Files Explained

```
nielitropar.github.io/
├── index.html               # Main app (Feed page)
│                            # Contains: Auth, Feed, Modals, Mobile Nav
│                            # Config at lines ~1225-1227
│
├── profiles.html            # Directory & Portfolio pages
│                            # Contains: Student list, Individual profiles
│                            # Config at line ~111
│
├── google-apps-script.js    # Backend API (paste in Apps Script)
│                            # Contains: All CRUD operations, Auth
│                            # Functions: doGet, doPost, login, signup, etc.
│
├── logo.png                 # NIELIT logo (replace if needed)
│
├── README.md                # Full documentation (setup, usage, troubleshooting)
│
├── QUICK_REFERENCE.md       # This file (quick setup guide)
│
└── LICENSE                  # MIT License
```

### Database Sheets (Created automatically):
- **Users** - Authentication data (email, hashed password, profile info)
- **Projects** - All posted projects (title, description, image, upvotes)
- **Profiles** - Public user data (no passwords)
- **Comments** - Project comments (linked by projectId)

---

## 🚀 Performance Tips

### Image Optimization:
- Use Cloudinary's auto-optimization (already configured)
- Keep uploads under 5MB for fast uploads
- Cloudinary serves optimized WebP on supported browsers
- Images cached by Cloudinary CDN globally

### Speed Up Loading:
- Projects load via single API call (not real-time updates)
- LocalStorage caches user session (no re-login needed)
- Minimize API calls (batch operations where possible)
- Use browser caching (GitHub Pages handles this)

### Best Practices:
- Don't reload page unnecessarily (use optimistic updates)
- Lazy load images (Cloudinary handles this)
- Minimize Apps Script execution time (already optimized)
- Test on slow 3G network to verify mobile performance

---

## 📈 Optional Enhancements

### Add Google Analytics:
```html
<!-- Add before </head> in both HTML files -->
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
// In index.html after login
gtag('event', 'login', {'method': 'Google Apps Script'});

// After posting project
gtag('event', 'post_project', {'event_category': 'engagement'});
```

---

## 🎯 Production Checklist

Before going live:

### Configuration:
- [ ] SHEET_URL configured in **both** HTML files
- [ ] Cloudinary credentials correct
- [ ] Logo replaced with institution logo (if needed)
- [ ] Colors customized to match branding (optional)

### Testing:
- [ ] All features tested on desktop
- [ ] All features tested on mobile
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Tested with real user accounts (not just demo)
- [ ] Images upload and display correctly
- [ ] Search works for projects and profiles
- [ ] Comments system works
- [ ] Mobile bottom navigation works
- [ ] Profile pages load correctly

### Backend:
- [ ] Apps Script deployed with "Anyone" access
- [ ] Sample data initialized (or first user created)
- [ ] Google Sheet has all 4 tabs (Users, Projects, Profiles, Comments)
- [ ] Test API endpoints directly in browser

### Security:
- [ ] Verified password hashing works (check Users sheet)
- [ ] Test XSS protection (try entering `<script>alert(1)</script>`)
- [ ] Ensure Google Sheet is private (not publicly shared)
- [ ] Monitor Apps Script quotas (won't exceed free tier initially)

### Deployment:
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site loads at GitHub Pages URL
- [ ] All assets load (images, styles, scripts)
- [ ] No console errors on production site

### Post-Launch:
- [ ] Create backup of Google Sheet
- [ ] Document admin procedures
- [ ] Set up error monitoring (optional)
- [ ] Prepare user onboarding guide
- [ ] Monitor usage and engagement

---

## 💡 Pro Tips

1. **Test in Incognito/Private Mode** - Avoids localStorage conflicts
2. **Check Network Tab (F12)** - Debug API call issues
3. **Version Control** - Commit often, test before deploying
4. **Mobile First** - Always test mobile layout during development
5. **User Feedback** - Add feedback mechanism (GitHub Issues)
6. **Monitor Apps Script Quotas** - Check daily execution limits
7. **Backup Regularly** - Export Google Sheet periodically
8. **Use Console Logs** - Add `console.log()` for debugging
9. **Clear Cache** - Hard refresh (Ctrl+F5) after config changes
10. **Read Error Messages** - Console provides specific error details

---

## 🌟 What's New in Current Version

### Major Features Implemented:
- ✅ **Complete Authentication System** - SHA-256 hashing, session management
- ✅ **Comments System** - Full CRUD for project comments
- ✅ **Mobile Bottom Navigation** - 4-tab fixed navigation bar
- ✅ **User Profile Pages** - Individual portfolios with all projects
- ✅ **Trending Section** - Top 5 projects by upvotes
- ✅ **Enhanced Search** - Real-time filtering for projects and profiles
- ✅ **Demo Mode** - Works without configuration for testing
- ✅ **Error Handling** - User-friendly error messages
- ✅ **XSS Protection** - HTML escaping on all user input
- ✅ **Mobile Optimization** - Touch-friendly, responsive design

### Technical Improvements:
- Optimistic UI updates (instant feedback)
- Better state management with localStorage
- Enhanced error messages and logging
- Improved code organization and comments
- Mobile-first responsive breakpoints
- Safe area support for notched devices
- Input validation (frontend and backend)
- Proper CORS handling

---

## 🎉 Success Metrics

After deployment, you can track:

### User Engagement:
- Total users registered (Users sheet row count)
- Projects posted per week
- Average upvotes per project
- Comments per project
- Search queries (if analytics added)
- Profile views (if tracking added)

### Popular Content:
- Most upvoted projects (sort Projects sheet)
- Most active users (count projects per user)
- Trending categories (if added)
- Most commented projects

### Technical Metrics:
- Page load time (use Lighthouse)
- Mobile usability score (use PageSpeed Insights)
- Apps Script execution time (check Logs)
- API call success rate
- Image optimization savings (Cloudinary dashboard)

### Growth Indicators:
- Daily active users
- New signups per week
- Project posting frequency
- User retention (returning users)
- Mobile vs desktop usage

---

## 📋 API Reference

### Available Actions:

| Action | Method | Parameters | Returns |
|--------|--------|------------|---------|
| `getProjects` | GET | none | Array of all projects |
| `getProfiles` | GET | none | Array of all profiles |
| `getComments` | GET | `projectId` | Array of comments |
| `login` | GET | `email`, `password` | User object (no password) |
| `signup` | POST | `data` object | Success message |
| `addProject` | POST | `data` object | Success message |
| `updateProfile` | POST | `data` object | Success message |
| `updateUpvotes` | POST | `projectId`, `upvotes` | Success message |
| `addComment` | POST | `data` object | Success message |

### Example API Call:
```javascript
// GET request (login)
fetch(`${SHEET_URL}?action=login&email=test@example.com&password=pass123`)
  .then(r => r.json())
  .then(data => console.log(data));

// POST request (add project)
fetch(SHEET_URL, {
  method: 'POST',
  body: JSON.stringify({
    action: 'addProject',
    data: { /* project data */ }
  })
}).then(r => r.json());
```

---

## 🔄 Update Guide

### To update your deployed site:

1. **Make changes** to HTML files locally
2. **Test locally** (double-click or `python -m http.server`)
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
4. **Wait 1-2 minutes** for GitHub Pages to rebuild
5. **Hard refresh** your live site (Ctrl+F5)

### To update Apps Script backend:

1. Open Google Apps Script editor
2. Make changes to code
3. **Save** (💾)
4. **Deploy** → Manage deployments → Edit version → Deploy
5. Test changes immediately (no waiting)

---

**Quick Help:** For detailed instructions, see [README.md](README.md)

**Need Support?** Check browser console first, then [GitHub Issues](https://github.com/nielitropar/nielitropar.github.io/issues)

**Made with ❤️ at NIELIT Ropar**

---

[⬆ Back to Top](#nielit-studenthub---quick-reference-card)

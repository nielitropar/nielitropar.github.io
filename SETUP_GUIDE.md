# NIELIT StudentHub - Complete Setup Guide

## 🎯 What's Fixed and Improved

### ✅ Fixed Issues:
1. **Projects not loading** - Added proper error handling and fallback to demo data
2. **Profiles not loading** - Fixed data fetching with retry logic
3. **Robust error handling** - App works even if Google Sheets is down
4. **Demo mode** - Works perfectly without configuration for testing

### ✨ New Features Added:
1. **💬 Comments System** - Fully functional commenting on projects
2. **🔗 Share Feature** - Share projects via link, email, or WhatsApp
3. **Better UI feedback** - Loading states, empty states, error messages
4. **Improved data persistence** - Better local storage handling
5. **Enhanced security** - XSS protection with HTML escaping

---

## 🚀 Quick Start (3 Options)

### Option 1: Demo Mode (Instant Testing)
**Perfect for:** Testing the app immediately without any setup

1. Open `index.html` in your browser
2. Login with: `demo@nielit.gov.in` / `demo123`
3. That's it! Everything works with demo data

**Note:** In demo mode, you'll see:
- ⚠️ "Demo Mode" toasts
- Pre-populated demo projects and profiles
- All features work locally (data not saved to server)

---

### Option 2: Local Testing (Recommended for Development)
**Perfect for:** Developing and testing before deploying

1. **Install a local web server:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx serve
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Test with demo credentials:**
   - Email: `demo@nielit.gov.in`
   - Password: `demo123`

---

### Option 3: Full Production Setup
**Perfect for:** Live deployment with real data persistence

Follow the complete setup below ⬇️

---

## 📋 Complete Production Setup

### Step 1: Google Sheets Setup (5 minutes)

#### 1.1 Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: "NIELIT StudentHub Database"

#### 1.2 Add Apps Script
1. In the sheet: `Extensions` → `Apps Script`
2. Delete any existing code
3. Copy **entire contents** of `google-apps-script.js`
4. Paste into the editor
5. Click **Save** (💾 icon)
6. Name the project: "StudentHub API"

#### 1.3 Deploy as Web App
1. Click `Deploy` → `New deployment`
2. Click gear icon (⚙️) next to "Select type"
3. Choose `Web app`
4. Configure:
   - **Description**: "StudentHub API v1"
   - **Execute as**: **"Me"** ⚠️ Important!
   - **Who has access**: **"Anyone"** ⚠️ Important!
5. Click `Deploy`
6. Click **Authorize** when prompted
7. **COPY THE WEB APP URL** 📋 (Save this!)
   - Format: `https://script.google.com/macros/s/AKfycbxXXXXX.../exec`

#### 1.4 Initialize Sample Data (Optional)
1. In Apps Script editor, select function: `initializeSampleData`
2. Click **Run** (▶️)
3. Check execution log for demo credentials

**Demo Accounts Created:**
- Email: `demo@nielit.gov.in` / Password: `demo123`
- Email: `sarah@nielit.gov.in` / Password: `sarah123`

---

### Step 2: Cloudinary Setup (5 minutes)

#### 2.1 Create Account
1. Go to [Cloudinary Sign Up](https://cloudinary.com/users/register/free)
2. Register for **free account**
3. Verify your email

#### 2.2 Get Credentials
1. Login to Cloudinary dashboard
2. Note your **Cloud Name** (e.g., "dxyz123abc")
   - Find it in Dashboard → Account Details

#### 2.3 Create Upload Preset
1. Go to **Settings** (⚙️) → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - **Preset name**: `studenthub_preset`
   - **Signing Mode**: **"Unsigned"** ⚠️ Critical!
   - **Folder**: `studenthub` (optional)
   - **Access Mode**: `Public`
5. Click **Save**

---

### Step 3: Configure the Website (2 minutes)

#### 3.1 Edit index.html
1. Open `index.html` in a text editor (VS Code recommended)
2. Find lines 1225-1227 (near the top of the `<script>` section):

```javascript
const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset';
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUDINARY_CLOUD_NAME';
```

3. **Replace with your actual values:**

```javascript
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxXXXXX/exec'; // Your Web App URL
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset'; // Keep this
const CLOUDINARY_CLOUD_NAME = 'dxyz123abc'; // Your Cloudinary cloud name
```

4. **Save the file**

---

### Step 4: Deploy to GitHub Pages (5 minutes)

#### 4.1 Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click **New repository**
3. Name: `nielitropar` (or your preferred name)
4. Set to **Public**
5. Click **Create repository**

#### 4.2 Upload Files
```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: NIELIT StudentHub"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/nielitropar.git

# Push
git branch -M main
git push -u origin main
```

#### 4.3 Enable GitHub Pages
1. Go to repository **Settings**
2. Click **Pages** (left sidebar)
3. Under **Source**: Select `main` branch
4. Click **Save**
5. Wait 1-2 minutes
6. Your site will be live at: `https://yourusername.github.io/nielitropar`

---

## ✅ Testing Checklist

### After Setup, Test These:

- [ ] **Login** with demo account works
- [ ] **Signup** creates new account
- [ ] **Profile picture upload** works
- [ ] **Post project** with/without image works
- [ ] **Upvote** button works and count updates
- [ ] **Comments** can be added and viewed
- [ ] **Share** button shows share options
- [ ] **Search** filters projects and profiles
- [ ] **User profiles** show correct data
- [ ] **Mobile menu** works on small screens

---

## 🐛 Troubleshooting

### Issue: "Unable to connect to server"

**Symptoms:** Projects/profiles don't load, "connection error" messages

**Solutions:**
1. **Check SHEET_URL:**
   - Open `index.html`
   - Verify the URL is exactly as copied from Apps Script
   - Must end with `/exec`

2. **Verify Apps Script Deployment:**
   - Open Apps Script project
   - Go to `Deploy` → `Manage deployments`
   - Check "Who has access" is set to **"Anyone"**
   - If not, redeploy with correct settings

3. **Check Browser Console:**
   - Press `F12` to open Developer Tools
   - Go to **Console** tab
   - Look for specific error messages
   - Common fix: CORS errors mean deployment settings are wrong

4. **Test API Directly:**
   - Open this URL in browser: `YOUR_SHEET_URL?action=test`
   - Should see: `{"status":"success","data":"API is working!"}`
   - If error, redeploy Apps Script

---

### Issue: Images Not Uploading

**Symptoms:** Profile pictures or project images don't upload

**Solutions:**
1. **Check Cloudinary Settings:**
   - Verify upload preset name is exactly `studenthub_preset`
   - Verify preset is set to **"Unsigned"** mode
   - Check cloud name matches in `index.html`

2. **Check File Size:**
   - Cloudinary free tier: Max 10MB per image
   - Try smaller image (<5MB)

3. **Check Browser Console:**
   - Look for upload errors
   - If "Invalid preset" error: Double-check preset name
   - If CORS error: Check upload preset public access settings

4. **Test Upload Manually:**
   - Go to Cloudinary Dashboard
   - Try uploading image manually
   - If fails, check account status

---

### Issue: Projects/Profiles Not Appearing

**Symptoms:** Posted content doesn't show up

**Solutions:**
1. **Check Google Sheets:**
   - Open your Google Sheet
   - Check if data appears in sheets: `Projects`, `Profiles`, `Users`
   - If sheets don't exist: Run `initializeSampleData` function

2. **Check Browser Console:**
   - Look for JavaScript errors
   - If "Cannot read property" error: Clear browser cache

3. **Clear Cache:**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Select "Cached images and files"
   - Clear and reload page

4. **Force Refresh:**
   - Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - This bypasses cache

---

### Issue: "Demo Mode" Warning

**Symptoms:** Toast shows "Demo Mode" even though you configured URLs

**Solution:**
This means the configuration wasn't saved correctly:

1. **Re-check Configuration:**
   ```javascript
   // WRONG:
   const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   
   // CORRECT:
   const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxXXXXX/exec';
   ```

2. **Verify Save:**
   - Make sure you saved `index.html` after editing
   - If using GitHub Pages, make sure you committed and pushed changes

3. **Hard Refresh:**
   - Clear browser cache
   - Press `Ctrl+F5` to force refresh

---

### Issue: Mobile Menu Not Working

**Symptoms:** Hamburger menu doesn't open on mobile

**Solutions:**
1. **Check Screen Size:**
   - Mobile menu appears only on screens < 968px width
   - Try resizing browser window

2. **Check JavaScript Errors:**
   - Open mobile view in browser (F12 → Toggle device toolbar)
   - Check console for errors

3. **Test on Real Device:**
   - Sometimes desktop browser mobile emulation differs from real mobile

---

### Issue: Comments Not Showing

**Symptoms:** Comments section is empty or shows loading forever

**Solutions:**
1. **Initial State:**
   - Comments sheet may be empty initially
   - Try adding a comment first

2. **Check Apps Script:**
   - Verify `COMMENTS_SHEET` is created in Google Sheets
   - Run `testConnection` function in Apps Script

3. **Check Browser Console:**
   - Look for API errors
   - If 404: Sheets not initialized properly

---

## 🎨 Customization Guide

### Change Colors

Edit lines 8-19 in `index.html`:

```css
:root {
    --primary: #003366;        /* NIELIT Dark Blue */
    --secondary: #FF6B35;      /* Accent Orange */
    --accent: #0066CC;         /* NIELIT Light Blue */
    --nielit-red: #DC143C;     /* NIELIT Red */
    /* ... */
}
```

### Change Fonts

Edit line 7 in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update CSS around line 38:

```css
body {
    font-family: 'YourFont', sans-serif;
}
```

### Add Your Logo

Replace `logo.png` with your own logo file, or update the image source in lines 106 and 161.

---

## 📊 Database Schema Reference

### Users Sheet
| Column | Description | Example |
|--------|-------------|---------|
| email | Unique identifier | student@nielit.gov.in |
| password | SHA-256 hashed | 5e884898da28... |
| name | Full name | Rajesh Kumar |
| university | Institute | NIELIT Ropar |
| major | Field of study | Computer Science |
| profilePicture | Cloudinary URL | https://res.cloudinary... |
| linkedin | LinkedIn profile | https://linkedin.com/... |
| github | GitHub profile | https://github.com/... |
| bio | User biography | Passionate about AI... |
| timestamp | Creation date | 2026-01-21T10:30:00Z |

### Projects Sheet
| Column | Description |
|--------|-------------|
| id | Unique project ID |
| authorName | Creator's name |
| authorEmail | Creator's email |
| authorPicture | Creator's profile pic |
| title | Project title |
| description | Project details |
| link | Project URL |
| tech | Technologies used |
| projectImage | Project screenshot |
| upvotes | Vote count |
| timestamp | Post date |

### Comments Sheet
| Column | Description |
|--------|-------------|
| id | Unique comment ID |
| projectId | Associated project |
| authorName | Commenter's name |
| authorEmail | Commenter's email |
| authorPicture | Commenter's profile pic |
| comment | Comment text |
| timestamp | Comment date |

### Shares Sheet
| Column | Description |
|--------|-------------|
| id | Unique share ID |
| projectId | Shared project |
| sharedBy | User who shared |
| sharedWith | Recipient (if applicable) |
| method | Share method (link/email/whatsapp) |
| timestamp | Share date |

---

## 🔒 Security Features

### Implemented Security Measures:

1. **Password Hashing:**
   - SHA-256 encryption
   - Passwords never stored in plain text

2. **XSS Protection:**
   - All user input is HTML-escaped
   - Prevents injection attacks

3. **CORS Configuration:**
   - Proper CORS headers on Apps Script
   - Prevents unauthorized API access

4. **Input Validation:**
   - Client-side validation
   - Server-side validation in Apps Script

5. **Rate Limiting:**
   - Google Apps Script has built-in rate limits
   - Prevents API abuse

### Security Best Practices:

- ✅ Never commit API keys to GitHub
- ✅ Use environment variables for sensitive data
- ✅ Regularly update dependencies
- ✅ Monitor Apps Script execution logs
- ✅ Set up Google Cloud alerting for unusual activity

---

## 📈 Performance Optimization

### Current Optimizations:

1. **Lazy Loading:**
   - Images load on demand
   - Reduces initial page load

2. **Efficient Rendering:**
   - Virtual DOM-like updates
   - Only re-renders changed elements

3. **Caching:**
   - LocalStorage for user session
   - Reduces API calls

4. **Optimized Images:**
   - Cloudinary automatic optimization
   - WebP format support
   - Responsive images

### Future Improvements:

- [ ] Service Worker for offline support
- [ ] Implement pagination for large datasets
- [ ] Add image lazy loading library
- [ ] Compress CSS/JS for production
- [ ] Add CDN for static assets

---

## 🌐 Browser Support

### Fully Supported:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Mobile:
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+
- ✅ Samsung Internet 14+

### Not Supported:
- ❌ Internet Explorer (EOL)
- ❌ Legacy browsers

---

## 📞 Support & Help

### Getting Help:

1. **Check this guide first** - Most issues are covered above
2. **Browser Console** - Check for error messages (F12)
3. **Apps Script Logs** - Check execution logs for server errors
4. **GitHub Issues** - Create an issue with error details

### Providing Feedback:

- 🐛 Bug reports: Include browser, OS, and error messages
- 💡 Feature requests: Describe use case and expected behavior
- 📝 Documentation: Suggest improvements to this guide

---

## 🎓 Educational Resources

### Learn More:

- **Google Apps Script:** [Official Documentation](https://developers.google.com/apps-script)
- **Cloudinary:** [Developer Docs](https://cloudinary.com/documentation)
- **HTML/CSS/JS:** [MDN Web Docs](https://developer.mozilla.org/)
- **GitHub Pages:** [GitHub Docs](https://docs.github.com/en/pages)

### Suggested Improvements:

1. Add user authentication with Google OAuth
2. Implement real-time updates with WebSockets
3. Add rich text editor for project descriptions
4. Create mobile app with React Native
5. Add analytics and tracking

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Credits

### Built With Love At:
**NIELIT Ropar** - National Institute of Electronics & Information Technology

### Technologies Used:
- HTML5, CSS3, JavaScript (ES6+)
- Google Apps Script & Google Sheets
- Cloudinary CDN
- GitHub Pages
- Google Fonts (Poppins, Playfair Display)

---

## 🎉 Success!

If you've made it this far and everything is working, congratulations! 🎊

You now have a fully functional, production-ready student project platform.

**Next Steps:**
1. Invite students to sign up
2. Share the platform URL
3. Monitor usage and gather feedback
4. Iterate and improve based on user needs

**Remember:** This is open source! Feel free to customize, improve, and share your changes with the community.

---

**Made with ❤️ by students, for students**

**NIELIT Ropar • 2026**

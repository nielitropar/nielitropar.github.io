# StudentHub Enhanced - Complete Setup Guide 🚀

A professional LinkedIn-style platform with **authentication**, **profile pictures**, and **project images**.

## 🎯 New Features

### ✅ Authentication System
- **Login/Signup Pages** - Secure user authentication
- **Password Protection** - Hashed passwords stored safely
- **Session Management** - Stay logged in between visits

### ✅ Profile Pictures
- **Upload Profile Photos** - Show your face to the community
- **Automatic Preview** - See changes before saving
- **Cloud Storage** - Images stored on Cloudinary (free)

### ✅ Project Images
- **Visual Projects** - Upload screenshots or demos
- **Gallery View** - Projects display with beautiful images
- **Optional Upload** - Not required, but recommended

---

## 📋 Setup Instructions

### Part 1: Image Hosting (Cloudinary - FREE)

Cloudinary provides free image hosting perfect for this project.

#### Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a **free account**
3. Verify your email
4. Login to your dashboard

#### Step 2: Get Your Credentials

1. On the dashboard, you'll see:
   - **Cloud Name** (e.g., "dxyz123abc")
   - **API Key**
   - **API Secret**

2. **Copy your Cloud Name** - you'll need this!

#### Step 3: Create Upload Preset

1. Click on **Settings** (gear icon) → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - **Preset name**: `studenthub_preset`
   - **Signing Mode**: **Unsigned**
   - **Folder**: `studenthub` (optional)
   - **Access Mode**: Public
5. Click **Save**

**Important**: Make sure signing mode is "Unsigned" - this allows uploads without API keys!

---

### Part 2: Google Sheets Backend

#### Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new blank spreadsheet
3. Name it **"StudentHub Database"**

#### Step 2: Add Apps Script

1. In your sheet: `Extensions` → `Apps Script`
2. Delete existing code
3. Copy **ALL** code from `google-apps-script.js`
4. Paste into editor
5. Click **Save** (💾 icon)
6. Name the project: "StudentHub API"

#### Step 3: Deploy as Web App

1. Click `Deploy` → `New deployment`
2. Click gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure:
   - **Description**: StudentHub Enhanced API
   - **Execute as**: Me
   - **Who has access**: **Anyone**
5. Click `Deploy`
6. Grant permissions when asked
7. **COPY THE WEB APP URL** 📋
   - Format: `https://script.google.com/macros/s/[LONG-ID]/exec`

#### Step 4: Initialize Sample Data (Optional)

1. In Apps Script editor
2. Select function: `initializeSampleData`
3. Click Run ▶️
4. Check execution log for demo credentials

---

### Part 3: Configure Website

#### Step 1: Open HTML File

Open `studenthub-enhanced.html` in a text editor (VS Code, Notepad++, etc.)

#### Step 2: Update Configuration

Find these lines near the top of the JavaScript section (around line 800):

```javascript
const SHEET_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset';
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
```

**Replace with your actual values:**

```javascript
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxXXXXX/exec';
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset';
const CLOUDINARY_CLOUD_NAME = 'dxyz123abc';  // Your actual cloud name
```

#### Step 3: Save the File

---

### Part 4: Deploy Website

Choose one of these options:

#### Option A: GitHub Pages (Recommended)

1. Create GitHub account (github.com)
2. Create new repository: `studenthub`
3. Upload `studenthub-enhanced.html`
4. Rename file to `index.html`
5. Go to Settings → Pages
6. Source: main branch
7. Your site: `https://yourusername.github.io/studenthub`

#### Option B: Netlify Drop (Easiest)

1. Go to https://app.netlify.com/drop
2. Drag `studenthub-enhanced.html` into browser
3. Instant deployment!
4. Get custom URL

#### Option C: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Deployed in seconds

#### Option D: Local Testing

Just double-click `studenthub-enhanced.html` to open in browser!

---

## 🎨 Usage Guide

### For Students

#### 1. Create Account

1. Open the website
2. Click **"Sign up"**
3. Upload a profile picture (optional but recommended)
4. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
   - University
   - Major
5. Click **"Create Account"**

#### 2. Login

1. Enter your email and password
2. Click **"Log In"**
3. You'll be taken to the main feed

#### 3. Edit Profile

1. Click sidebar menu → **"Edit Profile"**
2. Update:
   - Profile picture
   - University, major
   - LinkedIn, GitHub links
   - Bio
3. Click **"Save Changes"**

#### 4. Post a Project

1. Click **"Post Project"** button
2. Upload project image (screenshot, demo, logo)
3. Fill in:
   - Project Title
   - Description (what it does, problem it solves)
   - Project Link (GitHub, live demo)
   - Technologies Used
4. Click **"Post Project"**

#### 5. Interact with Projects

- **Upvote**: Click 👍 button
- **View Details**: Click project title or "View Project"
- **Visit Links**: Click GitHub/demo links

#### 6. Browse Profiles

1. Click **"Profiles"** in navigation
2. See all registered students
3. Click social links to connect

---

## 🛠️ How It Works

### Architecture

```
┌─────────────────────┐
│   Web Browser       │
│   (HTML/CSS/JS)     │
└──────────┬──────────┘
           │
           ├─────────────────────┐
           ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│   Cloudinary    │   │  Google Apps    │
│   (Images)      │   │  Script (API)   │
└─────────────────┘   └────────┬────────┘
                               │
                               ▼
                      ┌─────────────────┐
                      │  Google Sheets  │
                      │   (Database)    │
                      └─────────────────┘
```

### Data Flow

**Signup:**
1. User uploads profile picture → Cloudinary
2. Cloudinary returns image URL
3. User data + image URL → Google Sheets
4. Account created → Auto login

**Post Project:**
1. User uploads project image → Cloudinary
2. Project data + image URL → Google Sheets
3. Feed updates with new project

**Login:**
1. Email + password → Google Apps Script
2. Password verified (hashed)
3. User data loaded
4. Session stored locally

---

## 🔒 Security Features

### Password Security
- Passwords hashed with SHA-256
- Never stored in plain text
- Verified server-side

### Session Management
- Login persists in localStorage
- Auto-logout on browser close (optional)
- No sensitive data exposed

### Image Security
- Cloudinary handles all uploads
- Unsigned uploads (no API key needed)
- Public read access only

---

## 📊 Database Structure

### Users Sheet
| Column | Type | Description |
|--------|------|-------------|
| email | String | Unique identifier |
| password | Hash | SHA-256 hashed |
| name | String | Full name |
| university | String | University name |
| major | String | Field of study |
| profilePicture | URL | Cloudinary URL |
| linkedin | URL | LinkedIn profile |
| github | URL | GitHub profile |
| bio | Text | User biography |
| timestamp | DateTime | Created date |

### Projects Sheet
| Column | Type | Description |
|--------|------|-------------|
| id | String | Unique ID |
| authorName | String | Creator name |
| authorEmail | String | Creator email |
| authorPicture | URL | Author photo |
| title | String | Project name |
| description | Text | Project details |
| link | URL | Project URL |
| tech | String | Technologies |
| projectImage | URL | Project photo |
| upvotes | Number | Vote count |
| timestamp | DateTime | Posted date |

### Profiles Sheet
(Public profile data, synced with Users)

---

## 🎯 Customization

### Change Colors

Edit CSS variables (around line 5):

```css
:root {
    --primary: #2D3B55;      /* Navy blue */
    --secondary: #FF6B35;    /* Orange */
    --accent: #F7931E;       /* Gold */
    --background: #F8F9FA;   /* Light gray */
}
```

### Change Fonts

Update Google Fonts import (line 6):

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap">
```

### Add Features

**Comments System:**
1. Create "Comments" sheet
2. Link to project IDs
3. Add comment form in project cards

**Email Notifications:**
1. Use MailApp in Apps Script
2. Trigger on new projects
3. Send weekly digests

---

## 🐛 Troubleshooting

### "Unable to connect to server"

**Check:**
- SHEET_URL is correct
- Google Apps Script is deployed
- Deployment access is "Anyone"

**Solution:**
- Redeploy the Web App
- Clear browser cache
- Check browser console for errors

### Profile picture not uploading

**Check:**
- CLOUDINARY_CLOUD_NAME is correct
- Upload preset is "unsigned"
- Preset name is exactly "studenthub_preset"

**Solution:**
- Verify Cloudinary credentials
- Check browser console
- Try smaller image (< 5MB)

### Can't login after signup

**Check:**
- Email is exactly the same
- Password is case-sensitive
- Check Google Sheets Users tab

**Solution:**
- Try password reset (if implemented)
- Check execution logs in Apps Script
- Verify user was added to sheet

### Images not displaying

**Check:**
- Image URLs are valid
- Cloudinary images are public
- No ad blockers interfering

**Solution:**
- Check image URL directly
- Verify Cloudinary settings
- Try different browser

---

## 🚀 Advanced Setup

### Custom Domain

**With Netlify:**
1. Deploy to Netlify
2. Add custom domain in settings
3. Update DNS records
4. SSL automatically enabled

**With GitHub Pages:**
1. Add CNAME file to repo
2. Configure DNS settings
3. Enable HTTPS in settings

### Email Verification

Add to Apps Script:

```javascript
function sendVerificationEmail(email, name) {
  MailApp.sendEmail({
    to: email,
    subject: 'Welcome to StudentHub!',
    body: 'Hi ' + name + ', welcome to StudentHub!'
  });
}
```

### Password Reset

1. Add "Forgot Password" link
2. Generate reset token
3. Email reset link
4. Verify token + update password

### Admin Panel

1. Create admin role in Users sheet
2. Add admin check in script
3. Build admin dashboard
4. Moderate projects/users

---

## 📈 Scaling Beyond Google Sheets

When you outgrow Sheets (1000+ users):

### Database Migration
- **Firebase**: Real-time sync
- **MongoDB Atlas**: NoSQL, free tier
- **Supabase**: PostgreSQL + auth
- **PlanetScale**: MySQL, generous free tier

### Backend Framework
- **Node.js + Express**: Simple API
- **Next.js**: Full-stack React
- **Django**: Python framework
- **FastAPI**: Modern Python API

### Hosting Upgrade
- **Vercel**: Serverless, free tier
- **Railway**: Deploy in minutes
- **AWS**: Scalable, complex
- **DigitalOcean**: $5/month droplet

---

## 💡 Pro Tips

1. **Test Locally First**: Open HTML file before deploying
2. **Use Demo Account**: Test features without affecting real data
3. **Regular Backups**: Download Google Sheets weekly
4. **Monitor Usage**: Check Cloudinary bandwidth
5. **Compress Images**: Use TinyPNG before uploading
6. **Mobile Testing**: Test on phone browsers
7. **SEO Optimization**: Add meta tags for sharing
8. **Analytics**: Add Google Analytics
9. **Error Tracking**: Use Sentry for bugs
10. **Documentation**: Keep setup docs updated

---

## 🆘 Support Resources

- **Google Apps Script**: https://developers.google.com/apps-script
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **HTML/CSS/JS**: https://developer.mozilla.org/
- **GitHub Pages**: https://pages.github.com/
- **Netlify Docs**: https://docs.netlify.com/

---

## 📝 License

Free to use for educational purposes. Built for students by students! 🎓

---

**Ready to launch? Follow the setup steps above and you'll be live in 30 minutes!** 🚀

For questions or issues, check the troubleshooting section or review your configuration settings.

**Happy coding!** 💻✨

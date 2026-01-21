# NIELIT StudentHub - Connect, Create, Inspire 🚀

<div align="center">

<img width="666" height="374" alt="nielit_logo" src="https://github.com/user-attachments/assets/8c14f5c0-decd-41cd-8524-2cd89abc589c" />


**A professional LinkedIn-style platform for NIELIT Ropar students**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://developers.google.com/apps-script)

[Live Demo](https://nielitropar.github.io) • [Database](https://docs.google.com/spreadsheets/d/1z8j6iyls8z1WhJz8FdjHSXycqCd8zT9kDAFaASvj-JQ/edit?usp=sharing) • [Report Bug](https://github.com/nielitropar/nielitropar.github.io/issues) • [Request Feature](https://github.com/nielitropar/nielitropar.github.io/issues)

</div>

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**NIELIT StudentHub** is a comprehensive web platform designed specifically for students at NIELIT Ropar to showcase their innovative projects, connect with peers, and build a professional portfolio. Think of it as a combination of LinkedIn, GitHub, and a project gallery—all tailored for the NIELIT community.

### Key Highlights

- 🔐 **Secure Authentication** - Hashed password storage with session management
- 👤 **Rich User Profiles** - Upload photos, add bio, social links, and more
- 📁 **Project Showcase** - Share projects with images, descriptions, and live demos
- 🔍 **Advanced Search** - Find projects and students quickly
- 👍 **Social Engagement** - Upvote, comment, and share projects
- 📱 **Mobile Responsive** - Perfect experience on all devices
- 🎨 **NIELIT Branding** - Official colors and logo integration
- ☁️ **Cloud Storage** - Free image hosting via Cloudinary
- 📊 **Google Sheets Backend** - No server required, easy to maintain

---

## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup** - User authentication with password hashing (SHA-256)
- **Session Management** - Stay logged in between visits
- **Profile Privacy** - Control your information visibility

### 👥 User Profiles
- **Profile Pictures** - Upload and display profile photos
- **Personal Info** - Name, email, university, major/field of study
- **Social Links** - LinkedIn, GitHub integration
- **Bio Section** - Tell your story
- **View Individual Profiles** - Click on any user to see their complete profile
- **User Statistics** - Track project count and total upvotes received

### 📁 Project Management
- **Create Projects** - Share your innovations with rich descriptions
- **Project Images** - Upload screenshots, demos, or logos
- **Project Details** - Title, description, tech stack, live links
- **Upvote System** - Community engagement through voting
- **View User Projects** - See all projects by any user
- **My Projects** - Quick access to your own work

### 🔍 Search & Discovery
- **Project Search** - Find projects by title, description, author, or technology
- **Profile Search** - Search students by name, email, major, or university
- **Real-time Filtering** - Results update as you type
- **Trending Projects** - Discover popular projects

### 📊 Analytics & Stats
- **Total Projects Counter** - See community growth
- **Active Students Counter** - Track user engagement
- **Trending Section** - Most upvoted projects
- **User Statistics** - Individual project counts and upvotes

### 📱 Mobile Responsive Design
- **Hamburger Menu** - Intuitive mobile navigation
- **Touch-Friendly** - Optimized for touch interactions
- **Responsive Layouts** - Perfect on phones, tablets, and desktops
- **Mobile Search** - Full search functionality on mobile
- **Optimized Images** - Fast loading on mobile networks

### 🎨 NIELIT Branding
- **Official Logo** - NIELIT Ropar branding throughout
- **Brand Colors** - Navy Blue (#003366) and Light Blue (#0066CC)
- **Professional Design** - Clean, modern interface
- **Consistent Theme** - Unified look across all pages

---

## 🎬 Demo

### Live Website
Visit the live demo at: **[https://nielitropar.github.io](https://nielitropar.github.io)**

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Login Page
![Login Page](https://via.placeholder.com/800x450/003366/FFFFFF?text=Login+Page)

#### Main Feed
![Main Feed](https://via.placeholder.com/800x450/003366/FFFFFF?text=Main+Feed)

#### User Profile
![User Profile](https://via.placeholder.com/800x450/003366/FFFFFF?text=User+Profile)

#### Profiles Directory
![Profiles](https://via.placeholder.com/800x450/003366/FFFFFF?text=Profiles+Directory)

#### Mobile View
![Mobile](https://via.placeholder.com/400x700/003366/FFFFFF?text=Mobile+View)

</details>

### Demo Credentials
```
Email: demo@nielit.gov.in
Password: demo123
```

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Google Fonts** - Poppins & Playfair Display

### Backend
- **Google Apps Script** - Serverless backend
- **Google Sheets** - Database
- **Cloudinary** - Image hosting and CDN

### Tools & Services
- **GitHub Pages** - Free hosting
- **Git** - Version control
- **VS Code** - Recommended editor

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- A Google Account
- A Cloudinary account (free tier)
- A text editor (VS Code recommended)
- A web browser (Chrome, Firefox, Safari)
- Basic knowledge of HTML/CSS/JavaScript

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/nielitropar/nielitropar.github.io.git
cd nielitropar.github.io
```

#### Step 2: Set Up Cloudinary (Image Hosting)

1. **Create Account**
   - Go to [Cloudinary Sign Up](https://cloudinary.com/users/register/free)
   - Register for a free account
   - Verify your email

2. **Get Credentials**
   - Login to your Cloudinary dashboard
   - Note your **Cloud Name** (e.g., "dxyz123abc")

3. **Create Upload Preset**
   - Go to Settings (⚙️) → Upload
   - Click "Add upload preset"
   - Configure:
     - **Preset name**: `studenthub_preset`
     - **Signing Mode**: `Unsigned` ⚠️ Important!
     - **Folder**: `studenthub` (optional)
     - **Access Mode**: `Public`
   - Save

#### Step 3: Set Up Google Sheets Backend

1. **Create Spreadsheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it "NIELIT StudentHub Database"

2. **Add Apps Script**
   - In the sheet: `Extensions` → `Apps Script`
   - Delete any existing code
   - Copy **all** code from `google-apps-script.js`
   - Paste into the editor
   - Click **Save** (💾 icon)
   - Name the project: "StudentHub API"

3. **Deploy as Web App**
   - Click `Deploy` → `New deployment`
   - Click the gear icon (⚙️) next to "Select type"
   - Choose `Web app`
   - Configure:
     - **Description**: "StudentHub Enhanced API"
     - **Execute as**: "Me"
     - **Who has access**: "Anyone" ⚠️ Important!
   - Click `Deploy`
   - **Authorize** the script when prompted
   - **Copy the Web App URL** 📋 (Save this!)

4. **Initialize Sample Data** (Optional)
   - In Apps Script editor, select function: `initializeSampleData`
   - Click Run (▶️)
   - Check execution log for demo credentials

#### Step 4: Configure the Website

1. **Open `index.html`** in your text editor

2. **Find the configuration section** (around line 1150):

```javascript
const SHEET_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset';
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
```

3. **Replace with your values**:

```javascript
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxXXXXX/exec';
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset';
const CLOUDINARY_CLOUD_NAME = 'dxyz123abc';  // Your actual cloud name
```

4. **Save the file**

#### Step 5: Test Locally

Simply double-click `index.html` to open it in your browser and test!

#### Step 6: Deploy to GitHub Pages

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Source: Select `main` branch
   - Click `Save`
   - Your site will be live at: `https://yourusername.github.io/repo-name`

---

## ⚙️ Configuration

### Environment Variables

Edit these constants in `index.html`:

```javascript
// Google Sheets Web App URL
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

// Cloudinary Configuration
const CLOUDINARY_UPLOAD_PRESET = 'studenthub_preset';
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
```

### Customizing Colors

Edit CSS variables in `index.html` (around line 20):

```css
:root {
    --primary: #003366;        /* NIELIT Dark Blue */
    --secondary: #FF6B35;      /* Accent Orange */
    --accent: #0066CC;         /* NIELIT Light Blue */
    --nielit-red: #DC143C;     /* NIELIT Red accent */
    --background: #F5F7FA;
    --card-bg: #FFFFFF;
    /* ... more variables ... */
}
```

### Customizing Fonts

Update the Google Fonts import (line 6):

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

---

## 📚 Usage Guide

### For Students

#### Creating an Account

1. Open the website
2. Click **"Sign up"**
3. Upload a profile picture (optional but recommended)
4. Fill in your details:
   - Full Name
   - Email (use your NIELIT email)
   - Password (minimum 6 characters)
   - University/Institute
   - Major/Field of Study
5. Click **"Create Account"**
6. You'll be automatically logged in

#### Logging In

1. Click **"Log in"** (or visit the homepage)
2. Enter your email and password
3. Click **"Log In"**
4. You'll be taken to the main feed

#### Editing Your Profile

1. Click the hamburger menu (☰) or sidebar
2. Select **"Edit Profile"**
3. Update any information:
   - Change profile picture
   - Update university and major
   - Add LinkedIn and GitHub links
   - Write a bio about yourself
4. Click **"Save Changes"**

#### Posting a Project

1. Click the **"Post Project"** button (in navigation or hero section)
2. Upload a project image (optional but recommended)
3. Fill in project details:
   - **Title**: Give your project a catchy name
   - **Description**: Explain what it does and the problem it solves
   - **Project Link**: Add GitHub repository or live demo URL
   - **Technologies Used**: List the tech stack (e.g., "React, Node.js, MongoDB")
4. Click **"Post Project"**
5. Your project will appear in the feed instantly!

#### Viewing User Profiles

1. Click on any user's **name** or **avatar** in the feed
2. You'll see:
   - Their profile information
   - All projects they've posted
   - Total project count and upvotes
   - Social media links
3. Click **"Back"** to return to the previous view

#### Searching

**Search for Projects:**
1. Go to the **Feed** tab
2. Use the search bar at the top
3. Type keywords (project title, tech, author name)
4. Results filter in real-time

**Search for Students:**
1. Go to the **Profiles** tab
2. Use the search bar
3. Type name, email, major, or university
4. Results filter in real-time

#### Interacting with Projects

- **👍 Upvote**: Click the thumbs up button to show support
- **💬 Comment**: Click to add a comment (coming soon)
- **🔗 Share**: Share the project with others (coming soon)
- **View Project**: Click the project link to visit the repository or live demo

#### Viewing Your Projects

1. Click **"My Projects"** in the sidebar menu
2. View all projects you've posted
3. See your statistics (total projects, total upvotes)

---

## 🏗️ Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────┐
│                      Web Browser                         │
│              (HTML5 + CSS3 + JavaScript)                 │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTPS Requests
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────┐
│  Cloudinary  │          │ Google Apps  │
│   CDN & API  │          │    Script    │
│              │          │   (Backend)  │
│ - Image      │          │              │
│   Upload     │          │ - Auth       │
│ - Image      │          │ - CRUD Ops   │
│   Storage    │          │ - Validation │
│ - Image      │          │              │
│   Delivery   │          │              │
└──────────────┘          └──────┬───────┘
                                 │
                                 │ API Calls
                                 │
                         ┌───────▼────────┐
                         │ Google Sheets  │
                         │   (Database)   │
                         │                │
                         │ - Users        │
                         │ - Projects     │
                         │ - Profiles     │
                         └────────────────┘
```

### Data Flow

#### User Signup Flow
```
1. User fills signup form
2. Profile picture uploaded to Cloudinary → URL returned
3. User data + image URL sent to Google Apps Script
4. Script hashes password (SHA-256)
5. User data stored in Google Sheets (Users + Profiles)
6. Success response returned
7. User auto-logged in, session stored in localStorage
```

#### Project Posting Flow
```
1. User fills project form
2. Project image uploaded to Cloudinary → URL returned
3. Project data + image URL sent to Google Apps Script
4. Script validates and stores in Google Sheets (Projects)
5. Success response returned
6. Project appears in feed instantly (optimistic update)
```

#### Login Flow
```
1. User enters email + password
2. Credentials sent to Google Apps Script
3. Script looks up user in Users sheet
4. Password hashed and compared
5. If match: User data returned
6. Session stored in localStorage
7. User redirected to main app
```

---

## 🗄️ Database Schema

### Users Sheet

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| email | String | Unique identifier, primary key | `student@nielit.gov.in` |
| password | String | SHA-256 hashed password | `5e884898da28047...` |
| name | String | Full name | `Rajesh Kumar` |
| university | String | Institute name | `NIELIT Ropar` |
| major | String | Field of study | `Computer Science` |
| profilePicture | URL | Cloudinary image URL | `https://res.cloudinary.com/...` |
| linkedin | URL | LinkedIn profile | `https://linkedin.com/in/...` |
| github | URL | GitHub profile | `https://github.com/...` |
| bio | Text | User biography | `Passionate about AI...` |
| timestamp | DateTime | Account creation date | `2026-01-21T10:30:00Z` |

### Projects Sheet

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | String | Unique project ID | `1737456789123` |
| authorName | String | Creator's name | `Rajesh Kumar` |
| authorEmail | String | Creator's email (FK to Users) | `student@nielit.gov.in` |
| authorPicture | URL | Creator's profile pic | `https://res.cloudinary.com/...` |
| title | String | Project title | `AI Study Assistant` |
| description | Text | Project details | `A machine learning app...` |
| link | URL | Project URL | `https://github.com/user/project` |
| tech | String | Technologies used | `Python, TensorFlow, React` |
| projectImage | URL | Project screenshot | `https://res.cloudinary.com/...` |
| upvotes | Number | Vote count | `42` |
| timestamp | DateTime | Post date | `2026-01-21T15:45:00Z` |

### Profiles Sheet

| Column | Type | Description |
|--------|------|-------------|
| name | String | Full name |
| email | String | Email (FK to Users) |
| university | String | Institute name |
| major | String | Field of study |
| linkedin | URL | LinkedIn profile |
| github | URL | GitHub profile |
| bio | Text | User biography |
| profilePicture | URL | Profile image URL |
| timestamp | DateTime | Profile creation date |

**Note**: The Profiles sheet is a public-facing version of Users data (no passwords).

---

## 🎨 Customization

### Adding New Features

#### Example: Comments System

1. **Create Comments Sheet**
```javascript
// In Google Apps Script
function createCommentsSheet() {
  const sheet = getOrCreateSheet('Comments');
  sheet.appendRow(['id', 'projectId', 'authorEmail', 'authorName', 'comment', 'timestamp']);
}
```

2. **Add API Endpoint**
```javascript
function addComment(commentData) {
  const sheet = getOrCreateSheet('Comments');
  sheet.appendRow([
    Date.now().toString(),
    commentData.projectId,
    commentData.authorEmail,
    commentData.authorName,
    commentData.comment,
    new Date().toISOString()
  ]);
  return createResponse('success', 'Comment added');
}
```

3. **Update Frontend**
```javascript
async function postComment(projectId, comment) {
  const response = await fetch(SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'addComment',
      data: {
        projectId,
        authorEmail: currentUser.email,
        authorName: currentUser.name,
        comment
      }
    })
  });
  // Handle response...
}
```

### Styling Changes

All styles are in the `<style>` section of `index.html`. Key sections:

- **Colors**: Lines 20-35 (CSS variables)
- **Typography**: Lines 40-50
- **Navigation**: Lines 60-150
- **Cards**: Lines 400-500
- **Responsive**: Lines 1400-1600

### Adding Analytics

Add Google Analytics:

```html
<!-- Add before </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Unable to connect to server"

**Symptoms**: Projects/profiles don't load, "connection error" messages

**Causes**:
- Incorrect SHEET_URL
- Google Apps Script not deployed
- Deployment not set to "Anyone"

**Solutions**:
- Verify SHEET_URL in `index.html` matches your deployment URL
- Redeploy the Web App in Google Apps Script
- Ensure "Who has access" is set to "Anyone"
- Check browser console (F12) for specific errors

#### 2. Profile Pictures Not Uploading

**Symptoms**: Upload button doesn't work, images don't display

**Causes**:
- Incorrect Cloudinary credentials
- Upload preset not set to "unsigned"
- Wrong preset name

**Solutions**:
- Verify CLOUDINARY_CLOUD_NAME in `index.html`
- Check upload preset in Cloudinary settings
- Ensure preset name is exactly `studenthub_preset`
- Ensure "Signing Mode" is "Unsigned"
- Try a smaller image (< 5MB)

#### 3. Can't Login After Signup

**Symptoms**: Signup succeeds but login fails

**Causes**:
- Email typo during signup vs login
- Password case sensitivity
- Browser cache issues

**Solutions**:
- Ensure email is exactly the same (case-sensitive)
- Check password (case-sensitive)
- Check Google Sheets Users tab to verify account exists
- Clear browser cache and cookies
- Try incognito/private browsing mode

#### 4. Projects Not Appearing

**Symptoms**: Posted projects don't show up in feed

**Causes**:
- API call failed
- Data not saved to sheet
- Frontend rendering issue

**Solutions**:
- Check browser console for errors
- Verify project was added to Projects sheet in Google Sheets
- Refresh the page
- Check Apps Script execution logs

#### 5. Images Not Displaying

**Symptoms**: Broken image icons, missing pictures

**Causes**:
- Invalid image URLs
- Cloudinary access issues
- Ad blocker interference

**Solutions**:
- Check image URL directly in browser
- Verify Cloudinary images are set to "Public"
- Disable ad blockers temporarily
- Check browser console for 404 errors

#### 6. Mobile Menu Not Working

**Symptoms**: Hamburger menu doesn't open

**Causes**:
- JavaScript error
- CSS conflicts

**Solutions**:
- Check browser console for errors
- Test on different browsers/devices
- Clear cache and reload

### Debug Mode

To enable detailed logging, add this to the JavaScript section:

```javascript
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log('[StudentHub]', ...args);
}

// Use throughout code:
log('User logged in:', currentUser);
```

### Getting Help

If you encounter issues not listed here:

1. Check browser console (F12 → Console tab) for errors
2. Check Google Apps Script execution logs (View → Logs)
3. Verify all configuration values are correct
4. Try in a different browser
5. [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues) on GitHub

---

## 🤝 Contributing

We welcome contributions from the NIELIT community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   - Click the "Fork" button on GitHub

2. **Clone Your Fork**
```bash
git clone https://github.com/your-username/nielitropar.github.io.git
cd nielitropar.github.io
```

3. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make Your Changes**
   - Write clean, commented code
   - Follow existing code style
   - Test thoroughly

5. **Commit Your Changes**
```bash
git add .
git commit -m "Add: Description of your changes"
```

6. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Submit!

### Contribution Guidelines

- **Code Style**: Follow existing patterns
- **Comments**: Add comments for complex logic
- **Testing**: Test on multiple browsers and devices
- **Documentation**: Update README if needed
- **Commits**: Use clear, descriptive commit messages

### Ideas for Contributions

- 🐛 Bug fixes
- ✨ New features (comments, notifications, etc.)
- 🎨 UI/UX improvements
- 📱 Mobile optimizations
- 🌐 Internationalization (Hindi support)
- 📝 Documentation improvements
- ♿ Accessibility enhancements
- ⚡ Performance optimizations

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 National Institute of Electronics & Information Technology
Deemed to be University Under Distinct Category

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Credits & Acknowledgments

### Creators
- **Dr. Sarwan Singh** - Project Supervisor & Mentor
- **Lovnish Verma** - Lead Developer & Architecture
- **Nikshep Paliwal** - UI/UX Design & Frontend Development

### Built With Love At
**NIELIT Ropar** - National Institute of Electronics & Information Technology

### Special Thanks
- NIELIT Ropar faculty and staff for their support
- All student contributors and testers
- The open-source community

### Technologies & Services
- [Google Apps Script](https://developers.google.com/apps-script) - Backend API
- [Google Sheets](https://sheets.google.com) - Database
- [Cloudinary](https://cloudinary.com) - Image hosting
- [GitHub Pages](https://pages.github.com) - Hosting
- [Google Fonts](https://fonts.google.com) - Typography

---

## 📞 Contact

### Project Maintainers

**Dr. Sarwan Singh**
- Email: sarwan@nielit.gov.in
- Institute: NIELIT Ropar
- GitHub: [@lovnishverma](https://github.com/sarwansingh)

**Lovnish Verma**
- Email: princelv84@gmail.com
- GitHub: [@lovnishverma](https://github.com/lovnishverma)

**Nikshep Palliwal**
- Email: niksheppalliwal@gmail.com
- GitHub: [@niksheppaliwal](https://github.com/niksheppalliwal)

### Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues)
- 📧 **Email**: studenthub@nielit.gov.in
- 🌐 **Website**: [https://nielit.gov.in](https://nielit.gov.in)

---

## 🎓 About NIELIT Ropar

**National Institute of Electronics & Information Technology (NIELIT) Ropar** is a premier institute under the Ministry of Electronics and Information Technology, Government of India. We are committed to providing quality education and training in IT and Electronics.

### Our Mission
To create skilled IT professionals and promote research and development in emerging technologies.

### Programs Offered
- Diploma Courses
- Certificate Courses
- Degree Programs
- Short-term Training Programs
- Industry Certifications

**Visit us**: [www.nielit.gov.in](https://nielit.gov.in)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/nielitropar/nielitropar.github.io?style=social)
![GitHub forks](https://img.shields.io/github/forks/nielitropar/nielitropar.github.io?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/nielitropar/nielitropar.github.io?style=social)

---

## 🗺️ Roadmap

### Version 1.0 ✅ (Current)
- [x] User authentication
- [x] Profile management
- [x] Project posting
- [x] Image uploads
- [x] Search functionality
- [x] Mobile responsive design
- [x] NIELIT branding

### Version 1.1 🚧 (In Progress)
- [ ] Comments system
- [ ] Project categories/tags
- [ ] Advanced filtering
- [ ] Email notifications
- [ ] Password reset functionality

### Version 2.0 📋 (Planned)
- [ ] Real-time chat
- [ ] Project collaboration features
- [ ] Skill endorsements
- [ ] Achievement badges
- [ ] Admin dashboard
- [ ] Content moderation
- [ ] Analytics dashboard

### Version 3.0 💭 (Future)
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)
- [ ] AI-powered project recommendations
- [ ] Video project demos
- [ ] Hackathon organization features
- [ ] Job board integration

---

## 📚 Additional Resources

### Documentation
- [Google Apps Script Guide](https://developers.google.com/apps-script/guides/sheets)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MDN Web Docs](https://developer.mozilla.org/)

### Tutorials
- [How to Build a Web App with Google Sheets](https://developers.google.com/apps-script/guides/web)
- [Image Optimization Best Practices](https://cloudinary.com/blog/image_optimization_best_practices)
- [Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

### Community
- [Google Apps Script Community](https://groups.google.com/g/google-apps-script-community)
- [Cloudinary Community](https://community.cloudinary.com/)
- [GitHub Discussions](https://github.com/nielitropar/nielitropar.github.io/discussions)

---

<div align="center">

**Made with ❤️ by students, for students**

**NIELIT Ropar • 2026**

[⬆ Back to Top](#nielit-studenthub---connect-create-inspire-)

</div>

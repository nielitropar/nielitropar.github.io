# NIELIT StudentHub - Connect, Create, Inspire 🚀

<div align="center">

<img width="666" height="374" alt="nielit_logo" src="https://github.com/user-attachments/assets/8c14f5c0-decd-41cd-8524-2cd89abc589c" />


**A professional LinkedIn-style platform for NIELIT Ropar students**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://developers.google.com/apps-script)

[Live Demo](https://nielitropar.github.io) • [Database](https://docs.google.com/spreadsheets/d/1FbYvYiawnVn8QpjwlHPRlJMtICFSerQR9ljbrg2dDAs/edit?usp=sharing) • [Report Bug](https://github.com/nielitropar/nielitropar.github.io/issues) • [Request Feature](https://github.com/nielitropar/nielitropar.github.io/issues)

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

- 🔐 **Secure Authentication** - Hashed password storage with SHA-256 encryption
- 👤 **Rich User Profiles** - Upload photos, add bio, social links, and more
- 📁 **Project Showcase** - Share projects with images, descriptions, and live demos
- 🔍 **Advanced Search** - Find projects and students quickly
- 👍 **Social Engagement** - Upvote and comment on projects
- 📱 **Mobile Responsive** - Perfect experience on all devices with dedicated bottom navigation
- 🎨 **NIELIT Branding** - Official colors and logo integration
- ☁️ **Cloud Storage** - Free image hosting via Cloudinary
- 📊 **Google Sheets Backend** - No server required, easy to maintain

---

## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup** - User authentication with SHA-256 password hashing
- **Session Management** - LocalStorage-based session persistence
- **Demo Mode** - Built-in fallback with demo credentials
- **Profile Privacy** - Email-based user identification

### 👥 User Profiles
- **Profile Pictures** - Upload and display via Cloudinary
- **Personal Info** - Name, email, university, major/field of study
- **Social Links** - LinkedIn, GitHub integration
- **Bio Section** - Personal description up to 500 characters
- **View Individual Profiles** - Click on any user to see their complete profile and projects
- **User Statistics** - Track project count and total upvotes received

### 📁 Project Management
- **Create Projects** - Share your innovations with rich descriptions
- **Project Images** - Upload screenshots, demos, or logos via Cloudinary
- **Project Details** - Title, description, tech stack, live/GitHub links
- **Upvote System** - Community engagement through voting (one-click, optimistic updates)
- **Comments System** - Full commenting functionality on projects
- **View User Projects** - See all projects by any user on their profile page
- **Real-time Updates** - Projects appear instantly after posting

### 🔍 Search & Discovery
- **Project Search** - Find projects by title, author name, or technology
- **Profile Search** - Search students by name or major
- **Real-time Filtering** - Results update as you type
- **Trending Projects** - Top 5 most upvoted projects in sidebar
- **Project Count Display** - Total projects visible in feed

### 💬 Social Features
- **Comments** - Add and view comments on any project
- **Upvotes** - One-click voting with instant feedback
- **User Interaction** - Click on names/avatars to view profiles
- **Trending Section** - Discover popular projects

### 📱 Mobile Responsive Design
- **Bottom Navigation Bar** - Fixed navigation with 4 tabs (Feed, Profiles, Post, Me)
- **Hamburger Menu** - Intuitive mobile navigation
- **Touch-Friendly** - Optimized buttons and interactions
- **Responsive Layouts** - Adaptive grid for phones, tablets, and desktops
- **Mobile Search** - Full search functionality on mobile
- **Optimized Images** - Fast loading with Cloudinary auto-optimization
- **Safe Area Support** - iPhone notch and home bar compatibility

### 🎨 NIELIT Branding
- **Official Logo** - NIELIT Ropar branding throughout
- **Brand Colors** - Navy Blue (#003366) and Accent Blue (#0066CC)
- **Professional Design** - Clean, modern interface
- **Consistent Theme** - Unified look across all pages

---

## 🎬 Demo

### Live Website
Visit the live demo at: **[https://nielitropar.github.io](https://nielitropar.github.io)**

### Demo Credentials
```
Email: demo@nielit.gov.in
Password: demo123
```

**Note**: Demo mode works even without Google Sheets configuration, allowing immediate testing.

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup with modern standards
- **CSS3** - Modern styling with CSS Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)** - Vanilla JS, no frameworks required
- **Google Fonts** - Poppins & Playfair Display typography

### Backend
- **Google Apps Script** - Serverless backend API
- **Google Sheets** - Database with 4 sheets (Users, Projects, Profiles, Comments)
- **Cloudinary** - Image hosting and CDN

### Tools & Services
- **GitHub Pages** - Free static site hosting
- **Git** - Version control
- **Any Text Editor** - VS Code recommended but not required

### Key Files
```
├── index.html               # Main feed page (single-file app)
├── profiles.html            # Student directory and portfolio view
├── google-apps-script.js    # Backend API code
├── logo.png                 # NIELIT logo
├── README.md               # This file
├── QUICK_REFERENCE.md      # Quick setup guide
└── LICENSE                 # MIT License
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- A Google Account
- A Cloudinary account (free tier)
- A text editor (VS Code, Sublime, or any editor)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/JavaScript (helpful but not required)

### Installation

#### Step 1: Clone/Download the Repository

**Option A: Git Clone**
```bash
git clone https://github.com/nielitropar/nielitropar.github.io.git
cd nielitropar.github.io
```

**Option B: Download ZIP**
- Click "Code" → "Download ZIP"
- Extract to your desired location

#### Step 2: Set Up Cloudinary (Image Hosting)

1. **Create Account**
   - Go to [Cloudinary Sign Up](https://cloudinary.com/users/register/free)
   - Register for a free account (no credit card required)
   - Verify your email

2. **Get Credentials**
   - Login to your Cloudinary dashboard
   - Note your **Cloud Name** (e.g., "dy8up08qd")
   - You'll find it at the top of your dashboard

3. **Create Upload Preset**
   - Go to Settings (⚙️) → Upload
   - Scroll down and click "Add upload preset"
   - Configure:
     - **Preset name**: `studenthub_preset` (exact name required)
     - **Signing Mode**: **Unsigned** ⚠️ Critical!
     - **Folder**: `studenthub` (optional)
     - **Access Mode**: `Public`
   - Click **Save**

#### Step 3: Set Up Google Sheets Backend

1. **Create Spreadsheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it "NIELIT StudentHub Database"

2. **Add Apps Script**
   - In the sheet: `Extensions` → `Apps Script`
   - Delete any existing code in the editor
   - Copy **all** code from `google-apps-script.js`
   - Paste into the Apps Script editor
   - Click **Save** (💾 icon)
   - Name the project: "StudentHub API"

3. **Deploy as Web App**
   - Click `Deploy` → `New deployment`
   - Click the gear icon (⚙️) next to "Select type"
   - Choose **Web app**
   - Configure:
     - **Description**: "StudentHub API v2.0"
     - **Execute as**: **Me** ⚠️ Important!
     - **Who has access**: **Anyone** ⚠️ Critical!
   - Click **Deploy**
   - **Authorize** the script when prompted (click through security warnings)
   - **Copy the Web App URL** 📋 (looks like: `https://script.google.com/macros/s/AKfycbx.../exec`)
   - Save this URL - you'll need it next!

4. **Initialize Database (Optional)**
   - In Apps Script editor, select function: `initializeSampleData` from dropdown
   - Click **Run** (▶️)
   - This creates demo data including the demo@nielit.gov.in account
   - Check execution log to verify completion

#### Step 4: Configure the Website

1. **Open `index.html`** in your text editor

2. **Find the configuration section** (around line 1225-1227):

```javascript
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzGbZ39b67jJ2NPODCW4K3zqlf6p6-bq8vPRHmCdNjOxl37MT9KdndnCR8vw55qv7dN/exec';
const CLOUDINARY_PRESET = 'studenthub_preset'; 
const CLOUDINARY_NAME = 'dy8up08qd';
```

3. **Replace with your values**:

```javascript
const SHEET_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
const CLOUDINARY_PRESET = 'studenthub_preset';
const CLOUDINARY_NAME = 'YOUR_CLOUD_NAME_HERE';
```

4. **Repeat for `profiles.html`** (around line 111):

```javascript
const SHEET_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
```

5. **Save both files**

#### Step 5: Test Locally

**Option 1: Double-click Method**
- Simply double-click `index.html` to open in your browser

**Option 2: Local Server (Recommended)**
```bash
# Using Python (if installed)
python -m http.server 8000
# Then visit: http://localhost:8000

# OR using Node.js
npx serve
# Then visit: http://localhost:3000
```

**Test Checklist:**
- [ ] Login with demo@nielit.gov.in / demo123
- [ ] View profiles page
- [ ] Try posting a project (with image)
- [ ] Test upvoting
- [ ] Add a comment
- [ ] Search functionality
- [ ] Mobile responsive design (resize browser)

#### Step 6: Deploy to GitHub Pages

1. **Initialize Git Repository** (if not cloned)
```bash
git init
git add .
git commit -m "Initial commit - NIELIT StudentHub"
```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository
   - Name it (e.g., `nielit-studenthub`)
   - Don't initialize with README (you already have files)

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Under "Source": Select `main` branch
   - Click `Save`
   - Wait 2-3 minutes for deployment
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## ⚙️ Configuration

### Essential Configuration (3 Lines)

Edit these in **both** `index.html` and `profiles.html`:

```javascript
// index.html (lines ~1225-1227)
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
const CLOUDINARY_PRESET = 'studenthub_preset';
const CLOUDINARY_NAME = 'your_cloud_name';

// profiles.html (line ~111)
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

### Customizing Colors

Edit CSS variables in both HTML files (around line 8-19):

```css
:root {
    --primary: #003366;        /* NIELIT Dark Blue */
    --secondary: #FF6B35;      /* Accent Orange (not actively used) */
    --accent: #0066CC;         /* NIELIT Light Blue */
    --background: #F5F7FA;     /* Page background */
    --card-bg: #FFFFFF;        /* Card backgrounds */
    --text-primary: #1A1A1A;   /* Main text */
    --text-secondary: #6B7280; /* Secondary text */
    --border: #E5E7EB;         /* Borders */
}
```

### Customizing Fonts

Update the Google Fonts import (line ~6):

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
```

Change to your preferred fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update CSS:
```css
body {
    font-family: 'YourFont', sans-serif;
}
```

### Customizing Logo

Replace `logo.png` with your own logo, or update references in:
- `index.html` line ~106 (auth page)
- `index.html` line ~161 (navigation)
- `profiles.html` line ~69 (navigation)

---

## 📚 Usage Guide

### For Students

#### Creating an Account

1. Open the website
2. Click **"Sign up"** at the bottom of login page
3. Fill in your details:
   - Upload a profile picture (optional but recommended)
   - Full Name (required)
   - Email Address (required, use your NIELIT email)
   - Password (required, minimum 6 characters)
   - Major/Stream (optional, e.g., "Computer Science")
4. Click **"Sign Up"**
5. You'll be automatically logged in to the main feed

#### Logging In

1. Enter your email and password on the homepage
2. Click **"Log In"**
3. Use demo credentials for testing: demo@nielit.gov.in / demo123

#### Editing Your Profile

**Desktop:**
1. Click **"✏️ Edit Profile"** in the left sidebar
2. Update any information:
   - Change profile picture
   - Update name, university, major
   - Add LinkedIn and GitHub links
   - Write a bio (visible on your profile page)
3. Click **"Save"**

**Mobile:**
1. Tap the **"Me"** icon in bottom navigation
2. Tap **"✏️ Edit Profile"**
3. Update your information
4. Tap **"Save"**

#### Posting a Project

**Desktop:**
1. Click **"📝 Post Project"** button in top navigation
2. Fill in project details:
   - **Project Image**: Upload a screenshot or logo (optional)
   - **Title**: Give your project a name (required)
   - **Description**: Explain what it does (required)
   - **Link**: GitHub repository or live demo URL (optional)
   - **Tech Stack**: List technologies used (optional, e.g., "React, Node.js, MongoDB")
3. Click **"Post"**
4. Your project appears in the feed instantly

**Mobile:**
1. Tap **"➕ Post"** in bottom navigation
2. Fill in the form
3. Tap **"Post"**

#### Viewing Profiles

1. Click on any user's **name** or **profile picture** in the feed
2. You'll see:
   - Their complete profile information
   - All projects they've posted
   - Social media links (LinkedIn, GitHub)
   - Contact button (opens email)
3. Click **"← Back to Directory"** or browser back button to return

#### Searching

**Search for Projects (Feed page):**
1. Use the search bar at the top: "🔍 Search projects..."
2. Type keywords (project title, author name, or tech stack)
3. Results filter in real-time as you type

**Search for Students (Profiles page):**
1. Go to the **Profiles** tab
2. Use the search bar: "🔍 Search by name or major..."
3. Type name or major
4. Results filter in real-time

#### Interacting with Projects

- **👍 Upvote**: Click the thumbs up button to show support (one-click, instant)
- **💬 Comment**: Click to open comment modal, write and post comments
- **🔗 View Code**: Click the link to visit GitHub repo or live demo (opens in new tab)
- **View Author**: Click name/avatar to see their profile and all projects

#### Viewing Your Projects

**Desktop:**
1. Click **"📁 My Projects"** in the left sidebar
2. You're redirected to your profile page showing all your posts

**Mobile:**
1. Tap **"Me"** in bottom navigation
2. Tap **"📁 My Projects"**

---

## 🏗️ Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────┐
│                   Web Browser (Client)                   │
│         HTML5 + CSS3 + Vanilla JavaScript                │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTPS Requests (Fetch API)
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────┐
│  Cloudinary  │          │ Google Apps  │
│   CDN & API  │          │    Script    │
│              │          │   (Backend)  │
│ • Upload     │          │              │
│   Images     │          │ • doGet()    │
│ • Store      │          │ • doPost()   │
│   Images     │          │ • Auth       │
│ • Deliver    │          │ • CRUD Ops   │
│   via CDN    │          │ • Validation │
└──────────────┘          └──────┬───────┘
                                 │
                                 │ SpreadsheetApp API
                                 │
                         ┌───────▼────────┐
                         │ Google Sheets  │
                         │   (Database)   │
                         │                │
                         │ • Users        │
                         │ • Projects     │
                         │ • Profiles     │
                         │ • Comments     │
                         └────────────────┘
```

### Data Flow

#### User Signup Flow
```
1. User fills signup form
2. Profile picture uploaded to Cloudinary → URL returned
3. User data + image URL sent to Google Apps Script via POST
4. Script hashes password using SHA-256
5. User data stored in Google Sheets:
   - Users sheet (with hashed password)
   - Profiles sheet (public data only)
6. Success response returned to client
7. User object stored in localStorage
8. User redirected to main feed
```

#### Project Posting Flow
```
1. User fills project form
2. Project image uploaded to Cloudinary → URL returned
3. Project data + image URL + author info sent to Apps Script
4. Script validates and appends to Projects sheet
5. Success response returned
6. Project appears in feed instantly (no reload needed)
7. Trending section updated if project gets upvotes
```

#### Login Flow
```
1. User enters email + password
2. Credentials sent to Google Apps Script via GET
3. Script searches Users sheet for matching email
4. Password hashed and compared with stored hash
5. If match: User data returned (no password)
6. User object stored in localStorage
7. UI updated to show authenticated state
8. Projects and profiles loaded from API
```

#### Comment Flow
```
1. User clicks comment button on project
2. Modal opens, existing comments loaded via GET
3. User types comment and clicks "Post"
4. Comment data sent to Apps Script via POST
5. Script appends to Comments sheet
6. Comments reloaded and displayed in modal
7. Comment count updated on project card
```

---

## 🗄️ Database Schema

### Users Sheet (Private - Authentication)

| Column | Type | Description | Example | Used For |
|--------|------|-------------|---------|----------|
| email | String | Unique identifier, primary key | `student@nielit.gov.in` | Login, FK |
| password | String | SHA-256 hashed password | `5e884898da28047...` | Authentication |
| name | String | Full name | `Rajesh Kumar` | Display |
| university | String | Institute name | `NIELIT Ropar` | Profile |
| major | String | Field of study | `Computer Science` | Profile |
| profilePicture | URL | Cloudinary image URL | `https://res.cloudinary.com/...` | Avatar |
| linkedin | URL | LinkedIn profile | `https://linkedin.com/in/...` | Social link |
| github | URL | GitHub profile | `https://github.com/...` | Social link |
| bio | Text | User biography | `Passionate about AI...` | Profile |
| timestamp | DateTime | Account creation date | `2026-01-21T10:30:00Z` | Metadata |

**Column Indexes**: 0=email, 1=password, 2=name, 3=university, 4=major, 5=profilePicture, 6=linkedin, 7=github, 8=bio, 9=timestamp

### Projects Sheet (Public)

| Column | Type | Description | Example | Used For |
|--------|------|-------------|---------|----------|
| id | String | Unique project ID (timestamp) | `1737456789123` | Primary key |
| authorName | String | Creator's name | `Rajesh Kumar` | Display |
| authorEmail | String | Creator's email (FK) | `student@nielit.gov.in` | Linking to user |
| authorPicture | URL | Creator's profile pic | `https://res.cloudinary.com/...` | Avatar in feed |
| title | String | Project title | `AI Study Assistant` | Display, search |
| description | Text | Project details | `A machine learning app...` | Display, search |
| link | URL | Project URL | `https://github.com/user/project` | External link |
| tech | String | Technologies used | `Python, TensorFlow, React` | Badge, search |
| projectImage | URL | Project screenshot | `https://res.cloudinary.com/...` | Display |
| upvotes | Number | Vote count | `42` | Sorting, trending |
| timestamp | DateTime | Post date | `2026-01-21T15:45:00Z` | Sorting, display |

**Column Indexes**: 0=id, 1=authorName, 2=authorEmail, 3=authorPicture, 4=title, 5=description, 6=link, 7=tech, 8=projectImage, 9=upvotes, 10=timestamp

### Profiles Sheet (Public - Directory)

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| name | String | Full name | `Rajesh Kumar` |
| email | String | Email (FK to Users) | `student@nielit.gov.in` |
| university | String | Institute name | `NIELIT Ropar` |
| major | String | Field of study | `Computer Science` |
| linkedin | URL | LinkedIn profile | `https://linkedin.com/in/...` |
| github | URL | GitHub profile | `https://github.com/...` |
| bio | Text | User biography | `Passionate about AI...` |
| profilePicture | URL | Profile image URL | `https://res.cloudinary.com/...` |
| timestamp | DateTime | Profile creation date | `2026-01-21T10:30:00Z` |

**Column Indexes**: 0=name, 1=email, 2=university, 3=major, 4=linkedin, 5=github, 6=bio, 7=profilePicture, 8=timestamp

**Note**: The Profiles sheet mirrors Users data but excludes passwords for public access.

### Comments Sheet (Public)

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | String | Unique comment ID (timestamp) | `1737456999456` |
| projectId | String | Associated project ID (FK) | `1737456789123` |
| authorName | String | Commenter's name | `Priya Singh` |
| authorEmail | String | Commenter's email (FK) | `priya@nielit.gov.in` |
| comment | Text | Comment content | `Great work! Very innovative.` |
| timestamp | DateTime | Comment date | `2026-01-21T16:00:00Z` |

**Column Indexes**: 0=id, 1=projectId, 2=authorName, 3=authorEmail, 4=comment, 5=timestamp

---

## 🎨 Customization

### Styling Changes

All styles are embedded in the HTML files. Key sections:

**In `index.html`:**
- **CSS Variables**: Lines 8-19 (colors, shadows)
- **Typography**: Lines 27-35
- **Navigation**: Lines 37-95
- **Cards & Projects**: Lines 149-290
- **Modals**: Lines 468-535
- **Responsive Design**: Lines 709-850

**Common Customizations:**

```css
/* Change primary color scheme */
:root {
    --primary: #1E3A8A;  /* Navy blue */
    --accent: #3B82F6;   /* Lighter blue */
}

/* Change font */
body {
    font-family: 'Roboto', sans-serif;
}

/* Adjust card shadows */
.card {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Customize mobile nav height */
.mobile-bottom-nav {
    padding: 1rem 0.5rem;
}
```

### Adding New Features

#### Example: Share Button for Projects

1. **Update Project Card HTML** (in `renderProjects()` function):

```javascript
// Add to project footer
`<button class="action-btn" onclick="shareProject('${p.id}', '${p.title}')">
    🔗 Share
</button>`
```

2. **Add Share Function**:

```javascript
function shareProject(id, title) {
    const url = `${window.location.origin}?project=${id}`;
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this project on StudentHub!',
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
}
```

#### Example: Project Categories/Tags

1. **Update Database Schema** - Add "category" column to Projects sheet

2. **Update Form** - Add category dropdown in project modal:

```html
<div class="form-group">
    <label>Category</label>
    <select id="postCategory" class="form-input">
        <option value="Web Development">Web Development</option>
        <option value="Mobile App">Mobile App</option>
        <option value="AI/ML">AI/ML</option>
        <option value="IoT">IoT</option>
        <option value="Other">Other</option>
    </select>
</div>
```

3. **Update Post Handler** - Include category in project data:

```javascript
const project = {
    // ... existing fields ...
    category: document.getElementById('postCategory').value
};
```

4. **Update Apps Script** - Modify `addProject()` to handle category column

5. **Add Filter UI** - Add category filter buttons in the feed

### Adding Analytics

**Google Analytics 4:**

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

**Track Custom Events:**

```javascript
// Track project posts
gtag('event', 'post_project', {
  'event_category': 'engagement',
  'event_label': projectTitle
});

// Track upvotes
gtag('event', 'upvote', {
  'event_category': 'engagement',
  'event_label': projectId
});
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. "Unable to connect to server" / Projects Not Loading

**Symptoms:**
- Projects/profiles don't load
- "connection error" messages
- Blank feed page

**Causes:**
- Incorrect `SHEET_URL` in config
- Google Apps Script not deployed
- Deployment not set to "Anyone"
- Script authorization not completed

**Solutions:**
1. **Verify SHEET_URL**: Open `index.html` and check line ~1225. The URL should look like:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXX/exec
   ```
   Must end with `/exec`!

2. **Check Deployment**:
   - Open Google Apps Script
   - Click `Deploy` → `Manage deployments`
   - Verify "Who has access" is set to **Anyone**
   - If not, create new deployment with correct settings

3. **Test the API**:
   - Open this URL in browser: `YOUR_SHEET_URL?action=getProjects`
   - Should return JSON with projects (or empty array)
   - If you see "Authorization required", the script wasn't properly authorized

4. **Check Browser Console**:
   - Press F12 → Console tab
   - Look for specific error messages
   - Common errors:
     - `CORS error`: Check deployment settings
     - `404 Not Found`: Wrong URL
     - `Script function not found`: Code not saved/deployed

#### 2. Profile Pictures Not Uploading

**Symptoms:**
- Upload button doesn't work
- Images don't display after upload
- Broken image icons

**Causes:**
- Incorrect Cloudinary credentials
- Upload preset not set to "unsigned"
- Wrong preset name
- Image file too large

**Solutions:**
1. **Verify Cloudinary Config** in `index.html` (line ~1227):
   ```javascript
   const CLOUDINARY_NAME = 'your_actual_cloud_name';  // Check dashboard
   ```

2. **Check Upload Preset**:
   - Go to Cloudinary Settings → Upload
   - Find preset named `studenthub_preset`
   - **Signing Mode** must be "Unsigned"
   - If it doesn't exist or is "Signed", create/update it

3. **Test Upload**:
   - Try a smaller image (< 5MB)
   - Use common formats (JPG, PNG)
   - Check browser console for Cloudinary errors

4. **Manual Test**:
   ```javascript
   // Run in browser console to test Cloudinary
   fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
     method: 'POST',
     body: new FormData() // Add test image
   }).then(r => r.json()).then(console.log);
   ```

#### 3. Can't Login After Signup

**Symptoms:**
- Signup succeeds but login fails
- "User not found" or "Incorrect password" error

**Causes:**
- Email case sensitivity mismatch
- Password not meeting requirements
- Data not saved to Users sheet
- Browser cache issues

**Solutions:**
1. **Check Google Sheet**:
   - Open your spreadsheet
   - Go to "Users" tab
   - Verify your email exists in column A
   - Password should be a long hash in column B

2. **Email Format**:
   - Ensure exact same email for signup and login
   - No extra spaces before/after
   - Check lowercase conversion (script converts to lowercase)

3. **Password Requirements**:
   - Minimum 6 characters
   - Case-sensitive
   - Try resetting by creating new account with different email

4. **Clear Cache**:
   - Open in incognito/private mode
   - Or clear browser cache and localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

#### 4. Projects Not Appearing After Posting

**Symptoms:**
- "Post" button works but project doesn't show in feed
- Success message but no project visible

**Causes:**
- API call failed silently
- Data not saved to Projects sheet
- Frontend rendering issue
- Network timeout

**Solutions:**
1. **Check Apps Script Logs**:
   - Open Google Apps Script editor
   - Click "View" → "Logs" or "Executions"
   - Look for errors during the `addProject` call
   - Check if data was actually appended

2. **Verify in Sheet**:
   - Open Google Sheets
   - Check "Projects" tab
   - Look for your project in the last row
   - Verify all columns have data

3. **Check Console**:
   - F12 → Console
   - Look for JavaScript errors
   - Check Network tab for failed requests

4. **Manual Reload**:
   - Refresh the page (Ctrl+F5 / Cmd+Shift+R)
   - Projects should load from database

5. **Test API**:
   ```bash
   # Test getting projects
   curl "YOUR_SHEET_URL?action=getProjects"
   ```

#### 5. Images Not Displaying

**Symptoms:**
- Broken image icons (🖼️)
- Alt text showing instead of images
- Images uploaded but not visible

**Causes:**
- Invalid/broken image URLs
- Cloudinary access issues
- Ad blocker interference
- CORS issues

**Solutions:**
1. **Check Image URL**:
   - Right-click broken image → "Open in new tab"
   - Should show image on Cloudinary CDN
   - If 404: Image wasn't uploaded successfully
   - If access denied: Check Cloudinary settings

2. **Verify Cloudinary Settings**:
   - Go to Cloudinary dashboard
   - Settings → Upload
   - Ensure images are set to "Public" access
   - Check "Delivery URL" settings

3. **Disable Ad Blockers**:
   - Temporarily disable ad blockers
   - Some block Cloudinary domains
   - Try in incognito mode

4. **Check Console**:
   - F12 → Console
   - Look for 404 or CORS errors on image URLs

#### 6. Mobile Menu Not Working

**Symptoms:**
- Bottom navigation bar not visible
- Buttons don't respond on mobile
- Layout broken on phone

**Causes:**
- CSS media query not applying
- JavaScript error preventing interaction
- Browser compatibility issue

**Solutions:**
1. **Check Screen Size**:
   - Mobile menu shows only at width < 968px
   - Test in browser DevTools (F12 → Device toolbar)
   - Try actual mobile device

2. **Check Console**:
   - Open mobile browser console (if possible)
   - Look for JavaScript errors
   - Test in Chrome mobile for better debugging

3. **Clear Cache**:
   - Clear mobile browser cache
   - Force reload (hard refresh)

4. **Test Different Browser**:
   - Try Chrome, Safari, Firefox mobile
   - Check if issue is browser-specific

#### 7. Search Not Working

**Symptoms:**
- Typing in search box doesn't filter results
- No results shown when searching

**Causes:**
- JavaScript error in filter function
- No data loaded to filter
- Case sensitivity issue

**Solutions:**
1. **Check Data Loading**:
   - Ensure projects/profiles loaded first
   - Check `allProjects` or `allProfiles` array in console:
   ```javascript
   console.log(allProjects);  // Should show array of projects
   ```

2. **Check Console for Errors**:
   - F12 → Console
   - Type in search box and watch for errors

3. **Test Filter Function**:
   ```javascript
   // In console
   filterProjects('test');  // Should filter projects
   ```

### Debug Mode

Enable detailed logging by adding this at the start of `<script>` section:

```javascript
const DEBUG = true;

// Add throughout code:
if (DEBUG) console.log('Loading projects...', allProjects);
if (DEBUG) console.log('User logged in:', currentUser);
if (DEBUG) console.log('API Response:', response);
```

### Getting Help

If issues persist after trying solutions above:

1. **Check Browser Console** (F12 → Console) - Most errors appear here
2. **Check Apps Script Logs** (View → Executions) - Check for backend errors
3. **Verify All Configuration** - Double-check SHEET_URL and Cloudinary settings
4. **Test in Different Browser** - Rule out browser-specific issues
5. **Try Demo Mode** - Test with demo@nielit.gov.in / demo123 to verify basic functionality
6. **[Open GitHub Issue](https://github.com/nielitropar/nielitropar.github.io/issues)** - Provide:
   - Browser and version
   - Steps to reproduce
   - Console error messages
   - Screenshots if applicable

---

## 🤝 Contributing

We welcome contributions from the NIELIT community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/nielitropar.github.io.git
   cd nielitropar.github.io
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Your Changes**
   - Write clean, commented code
   - Follow existing code style
   - Test thoroughly on desktop and mobile

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   # Examples:
   # "Add: Share button for projects"
   # "Fix: Mobile menu not closing on iOS"
   # "Update: Improve search performance"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes clearly
   - Link related issues if any
   - Submit!

### Contribution Guidelines

**Code Style:**
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Use meaningful variable names
- Follow existing patterns in codebase

**Testing:**
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Test with and without configuration
- Verify demo mode still works

**Documentation:**
- Update README if adding new features
- Add comments in code
- Update QUICK_REFERENCE if needed

**Commit Messages:**
- Use clear, descriptive messages
- Start with action verb: Add, Fix, Update, Remove
- Keep first line under 50 characters
- Add detailed description if needed

### Ideas for Contributions

**High Priority:**
- 🐛 Bug fixes (see GitHub Issues)
- ♿ Accessibility improvements (ARIA labels, keyboard navigation)
- 🌐 Internationalization (Hindi support)
- 📱 Mobile UX improvements
- ⚡ Performance optimizations

**Feature Requests:**
- ✨ Project categories/tags
- 🔔 Notification system
- 🏆 Achievement badges
- 📊 User statistics dashboard
- 🔄 Project updates/versions
- 📺 Video project demos
- 🔗 Project collaboration features
- 👥 Follow system
- 📧 Email notifications
- 🌙 Dark mode

**Technical Improvements:**
- 🔒 Enhanced security (rate limiting, input sanitization)
- 📦 Code modularization
- 🧪 Unit tests
- 📈 Analytics integration
- 🔍 SEO optimization
- 💾 Better state management
- 🎨 UI/UX polish

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

**What this means:**
- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ Can create derivative works
- ⚠️ Must include copyright notice
- ⚠️ Provided "as-is" without warranty

---

## 👥 Credits & Acknowledgments

### Creators
- **Dr. Sarwan Singh** - Project Supervisor & Mentor
- **Lovnish Verma** - Lead Developer & System Architecture
- **Nikshep Paliwal** - UI/UX Design & Frontend Development

### Built With Love At
**NIELIT Ropar** - National Institute of Electronics & Information Technology

### Special Thanks
- NIELIT Ropar faculty and staff for their guidance and support
- All student beta testers who provided valuable feedback
- The open-source community for inspiration and resources

### Technologies & Services
- [Google Apps Script](https://developers.google.com/apps-script) - Serverless backend platform
- [Google Sheets](https://sheets.google.com) - Cloud database
- [Cloudinary](https://cloudinary.com) - Image hosting and optimization
- [GitHub Pages](https://pages.github.com) - Free static site hosting
- [Google Fonts](https://fonts.google.com) - Poppins & Playfair Display fonts

---

## 📞 Contact

### Project Maintainers

**Dr. Sarwan Singh**
- Email: sarwan@nielit.gov.in
- Role: Project Supervisor
- Institute: NIELIT Ropar
- GitHub: [@sarwansingh](https://github.com/sarwansingh)

**Lovnish Verma**
- Email: princelv84@gmail.com
- Role: Lead Developer
- GitHub: [@lovnishverma](https://github.com/lovnishverma)

**Nikshep Paliwal**
- Email: niksheppaliwal@gmail.com
- Role: UI/UX Developer
- GitHub: [@niksheppaliwal](https://github.com/niksheppaliwal)

### Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues/new?template=feature_request.md)
- 📧 **General Inquiries**: sarwan@nielit.gov.in
- 🌐 **NIELIT Website**: [https://nielit.gov.in](https://nielit.gov.in)

---

## 🎓 About NIELIT Ropar

**National Institute of Electronics & Information Technology (NIELIT) Ropar** is a premier institute under the Ministry of Electronics and Information Technology, Government of India. We are committed to providing quality education and training in IT and Electronics.

### Our Mission
To create skilled IT professionals and promote research and development in emerging technologies including AI, IoT, Cloud Computing, and Cybersecurity.

### Programs Offered
- **Certificate Courses** - CCC, BCC, ECC
- **Diploma Courses** - ADCA, DCA
- **Degree Programs** - B.Sc., M.Sc. in IT
- **Short-term Training** - Python, Web Development, Data Science
- **Industry Certifications** - AWS, Google Cloud, Microsoft

### Contact NIELIT Ropar
- **Address**: Punjab Engineering College Campus, Sector 12, Chandigarh
- **Website**: [www.nielit.gov.in](https://nielit.gov.in)
- **Email**: chandigarh@nielit.gov.in

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/nielitropar/nielitropar.github.io?style=social)
![GitHub forks](https://img.shields.io/github/forks/nielitropar/nielitropar.github.io?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/nielitropar/nielitropar.github.io?style=social)
![GitHub issues](https://img.shields.io/github/issues/nielitropar/nielitropar.github.io)
![GitHub pull requests](https://img.shields.io/github/issues-pr/nielitropar/nielitropar.github.io)

---

## 🗺️ Roadmap

### Version 1.0 ✅ (Current - Completed)
- [x] User authentication with SHA-256 hashing
- [x] Profile management with Cloudinary images
- [x] Project posting with images
- [x] Upvote system
- [x] Comments system
- [x] Search functionality (projects and profiles)
- [x] Mobile responsive design with bottom navigation
- [x] NIELIT branding and theme
- [x] Demo mode
- [x] Individual user profile pages
- [x] Trending projects section

### Version 1.1 🚧 (In Progress)
- [ ] Project categories/tags with filtering
- [ ] Advanced search filters (by category, date, upvotes)
- [ ] User profile statistics (total views, engagement)
- [ ] Password reset via email
- [ ] Email verification for new accounts

### Version 2.0 📋 (Planned)
- [ ] Real-time notifications (new comments, upvotes)
- [ ] Project collaboration features (co-authors)
- [ ] Private messaging between users
- [ ] Follow/unfollow users
- [ ] User activity feed
- [ ] Achievement badges system
- [ ] Admin dashboard for moderation
- [ ] Content reporting and moderation
- [ ] Analytics dashboard (for admins)
- [ ] Dark mode theme

### Version 3.0 💭 (Future Vision)
- [ ] Native mobile app (React Native)
- [ ] API for third-party integrations
- [ ] AI-powered project recommendations
- [ ] Video project demos
- [ ] Live coding sessions / webinars
- [ ] Hackathon organization features
- [ ] Job board integration
- [ ] Mentorship matching system
- [ ] Project showcase events
- [ ] Alumni network integration

---

## 📚 Additional Resources

### Documentation
- [Google Apps Script Guide](https://developers.google.com/apps-script/guides/sheets)
- [Google Sheets API Reference](https://developers.google.com/sheets/api)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MDN Web Docs](https://developer.mozilla.org/)

### Tutorials
- [Building Web Apps with Google Sheets](https://developers.google.com/apps-script/guides/web)
- [Image Optimization with Cloudinary](https://cloudinary.com/blog/image_optimization_best_practices)
- [Responsive Web Design Basics](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

### Community
- [Google Apps Script Community](https://groups.google.com/g/google-apps-script-community)
- [Cloudinary Community Forum](https://community.cloudinary.com/)
- [GitHub Discussions](https://github.com/nielitropar/nielitropar.github.io/discussions)
- [Stack Overflow - google-apps-script](https://stackoverflow.com/questions/tagged/google-apps-script)

### Related Projects
- [Awesome Google Apps Script](https://github.com/contributorpw/google-apps-script-awesome-list)
- [Google Sheets Database Projects](https://github.com/topics/google-sheets-database)
- [Static Site Generators](https://jamstack.org/generators/)

---

## 🏆 Achievements & Impact

### Current Metrics (As of January 2026)
- **Active Users**: Growing student community
- **Projects Shared**: Student innovations showcase
- **Mobile-First Design**: 100% responsive across all devices
- **Zero Cost Hosting**: Completely free infrastructure
- **Open Source**: Available for educational use

### Use Cases
- **Student Portfolios**: Showcase academic and personal projects
- **Peer Learning**: Students learn from each other's work
- **Project Discovery**: Find collaborators and inspiration
- **Skill Development**: Practice full-stack development
- **Community Building**: Connect NIELIT students across batches

---

<div align="center">

**Made with ❤️ by NIELIT Ropar, for students**

**NIELIT Ropar • 2026**

---

*"Empowering the next generation of tech innovators"*

---

[⬆ Back to Top](#nielit-studenthub---connect-create-inspire-)

</div>

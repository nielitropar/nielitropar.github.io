# NIELIT StudentHub - Connect, Create, Inspire 🚀

<div align="center">

![NIELIT StudentHub Banner](https://github.com/user-attachments/assets/8c14f5c0-decd-41cd-8524-2cd89abc589c)

**A professional portfolio and project showcase platform for NIELIT Ropar students**

[![Android App](https://img.shields.io/badge/Download-Android%20App-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/nielitropar/nielitropar.github.io/releases/tag/v1.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.4-success?style=for-the-badge)](https://github.com/nielitropar/nielitropar.github.io)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com)

[Live Demo](https://nielitropar.github.io) • [Database](https://docs.google.com/spreadsheets/d/1FbYvYiawnVn8QpjwlHPRlJMtICFSerQR9ljbrg2dDAs/edit?usp=sharing) • [Report Bug](https://github.com/nielitropar/nielitropar.github.io/issues) • [Request Feature](https://github.com/nielitropar/nielitropar.github.io/issues)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [What's New in v1.4](#-whats-new-in-v14)
- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Detailed Setup](#-detailed-setup)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Security Features](#-security-features)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**NIELIT StudentHub** is a comprehensive web platform designed specifically for students at NIELIT Ropar to showcase their innovative projects, connect with peers, and build professional portfolios. Think of it as a combination of LinkedIn, GitHub, and a project gallery—all tailored for the NIELIT community.

### Key Highlights

- 🔐 **Secure Authentication** - SHA-256 password hashing with salt + automatic migration from legacy passwords
- 👤 **Rich User Profiles** - Upload photos, add bio, social links, and resume (PDF support)
- 📁 **Project Showcase** - Share projects with images, descriptions, categories, and live demos
- 🔍 **Advanced Search** - Server-side pagination with real-time filtering
- 👍 **Social Engagement** - Individual upvote tracking (no duplicate votes)
- 💬 **Comments System** - Full commenting functionality on projects
- 📱 **Mobile First Design** - Dedicated bottom navigation and touch-optimized UI
- 🎨 **NIELIT Branding** - Official colors and modern gradient design
- ☁️ **Cloud Storage** - Free image + PDF hosting via Cloudinary
- 📊 **Google Sheets Backend** - No server required, easy to maintain
- 🔗 **Public Sharing** - Share projects and profiles with anyone (no login required)
- 🗂️ **Project Categories** - Organize by Web Dev, Mobile, AI/ML, IoT, Blockchain, etc.

---

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login/Signup** - SHA-256 password hashing with salt (NIELIT_STUDENTHUB_SECURE_SALT_2026)
- **Automatic Migration** - Legacy passwords automatically upgraded to secure format on login
- **Session Management** - LocalStorage-based session persistence
- **XSS Protection** - All user input HTML-escaped
- **Demo Mode** - Built-in fallback with demo credentials

### 👥 User Profiles
- **Profile Pictures** - Upload and display via Cloudinary CDN
- **Resume Upload** - PDF resume support with Cloudinary auto-optimization
- **Personal Info** - Name, email, university, major/field of study
- **Social Links** - LinkedIn, GitHub integration
- **Bio Section** - Personal description up to 500 characters
- **Individual Portfolios** - Dedicated page for each user with all their projects
- **Public Sharing** - Share profile links with anyone (no login required to view)

### 📁 Project Management
- **Create Projects** - Rich descriptions, categories, and tech stacks
- **Project Images** - Upload screenshots, demos, or logos via Cloudinary
- **Project Categories** - Web Development, Mobile App, AI/ML, IoT, Blockchain, Cybersecurity, Other
- **Individual Upvote Tracking** - One vote per user (prevents duplicate voting)
- **Comments System** - Full CRUD functionality
- **Public Sharing** - Dedicated project.html page for sharing with non-users
- **Real-time Statistics** - Live project and student count

### 🔍 Search & Discovery
- **Server-Side Pagination** - 20 projects per page, 24 profiles per page
- **Real-time Filtering** - Search by title, author, tech stack, category, major
- **Category Filters** - Quick-access buttons for All, Web Dev, App, AI/ML, IoT, Blockchain, Other
- **Trending Section** - Top 5 most upvoted projects (legacy - shown on feed.html)
- **Load More** - Infinite scroll with "Load More" button
- **Deep Linking** - Direct links to specific projects and profiles

### 💬 Social Features
- **Comments** - Add and view comments on any project
- **Individual Upvotes** - Tracked per user in separate Upvotes sheet
- **User Interaction** - Click on names/avatars to view profiles
- **Share Functionality** - Share projects/profiles via Email, WhatsApp, Twitter, LinkedIn

### 📱 Mobile Responsive Design
- **Bottom Navigation Bar** - Fixed navigation with 3 tabs (Feed, Directory, Post)
- **Touch-Optimized** - Large tap targets and smooth interactions
- **Responsive Layouts** - Adaptive grid for phones, tablets, desktops
- **Safe Area Support** - iPhone notch and home bar compatibility
- **Optimized Images** - Cloudinary auto-optimization and lazy loading

### 🎨 Modern Design
- **NIELIT Branding** - Official Navy Blue (#003366) and Accent Blue (#0066CC)
- **Gradient Accents** - Vibrant hero section with animated background
- **Smooth Animations** - Fade-ins, hover effects, modal transitions
- **Professional Typography** - Inter + Space Grotesk fonts
- **Dark Mode Ready** - CSS variables for easy theming

---

## 🆕 What's New in v1.4

### Backend Improvements (google-apps-script.js)
- ✅ **Project Categories** - Added 12th column to Projects sheet
- ✅ **Single Item Queries** - New `getProject(id)` and `getProfile(email)` actions
- ✅ **Server-Side Pagination** - `getProjectsPaginated()` and `getProfilesPaginated()`
- ✅ **Stats API** - `getStats()` returns total students and projects
- ✅ **Individual Upvote Tracking** - Separate Upvotes sheet prevents duplicate votes
- ✅ **Password Migration** - Automatic upgrade from legacy hash to salted hash

### Frontend Enhancements
- ✅ **Category Filtering** - Quick-access category chips on feed.html
- ✅ **Deep Linking** - Direct URLs to specific projects and profiles
- ✅ **Public Sharing** - project.html and index.html work without login
- ✅ **Resume Support** - PDF upload and download from profiles
- ✅ **Animated Stats** - Hero section with counting animation
- ✅ **Load More** - Replace infinite scroll with "Load More" button
- ✅ **Modern UI** - Refreshed design with gradients and shadows
- ✅ **Better SEO** - Meta tags for Open Graph and Twitter Cards

### Bug Fixes
- 🐛 Fixed: Deep link loader now hides correctly
- 🐛 Fixed: Category display in project cards
- 🐛 Fixed: Search timeout debouncing
- 🐛 Fixed: Mobile bottom nav alignment

---

## 🎬 Demo

### Live Website
Visit: **[https://nielitropar.github.io](https://nielitropar.github.io)**

### Demo Credentials
```
Email: demo@nielit.gov.in
Password: requestfromadmin
```

### Screenshots



**Desktop - Directory View**
![Directory](https://github.com/user-attachments/assets/6576527a-786b-4983-844a-5fc3d2e34860)

**Mobile - Project Feed**
![Feed Mobile](https://github.com/user-attachments/assets/862309f3-b5d9-4240-9194-6db39005e036)

**Project Detail Page**
![Project Detail](https://via.placeholder.com/1200x600/FF6B35/FFFFFF?text=Project+Detail)

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup with modern standards
- **CSS3** - Grid, Flexbox, CSS Variables, Animations
- **JavaScript (ES6+)** - Vanilla JS, Fetch API, LocalStorage
- **Google Fonts** - Inter & Space Grotesk

### Backend
- **Google Apps Script** - Serverless backend API
- **Google Sheets** - Database with 5 sheets (Users, Projects, Profiles, Comments, Upvotes)
- **Cloudinary** - Image + PDF hosting and CDN

### Tools & Services
- **GitHub Pages** - Free static site hosting
- **Git** - Version control
- **VS Code** - Recommended editor

### Key Files Structure
```
nielitropar.github.io/
├── index.html               # Student directory & portfolio view
├── feed.html                # Main feed with projects (pagination)
├── project.html             # Public project detail page
├── google-apps-script.js    # Backend API code (v1.4)
├── google-app-script-v1.0.js # Legacy backup
├── logo.png                 # NIELIT logo
├── README.md               # This file
├── QUICK_REFERENCE.md      # Quick setup guide
├── SETUP_GUIDE.md          # Detailed setup walkthrough
└── LICENSE                 # MIT License
```

---

## ⚡ Quick Start

### Prerequisites
- Google Account
- Cloudinary Account (free tier)
- GitHub Account (for deployment)
- Text Editor (VS Code recommended)

### 1. Clone Repository
```bash
git clone https://github.com/nielitropar/nielitropar.github.io.git
cd nielitropar.github.io
```

### 2. Set Up Cloudinary
1. Sign up at [cloudinary.com](https://cloudinary.com/users/register/free)
2. Note your **Cloud Name** from dashboard
3. Create upload preset:
   - Name: `studenthub_preset` (exact name!)
   - Signing Mode: **Unsigned** (critical!)
   - Folder: `studenthub` (optional)
   - Access Mode: Public

### 3. Set Up Google Sheets Backend
1. Create new Google Sheet
2. Extensions → Apps Script
3. Copy **all code** from `google-apps-script.js`
4. Save as "StudentHub API"
5. Deploy → New deployment → Web app
   - Execute as: **Me**
   - Who has access: **Anyone** (critical!)
6. Authorize and **copy Web App URL**

### 4. Configure Files
Edit `index.html`, `feed.html`, and `project.html`:
```javascript
const SHEET_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
const CLOUDINARY_PRESET = 'studenthub_preset';
const CLOUDINARY_NAME = 'YOUR_CLOUD_NAME_HERE';
```

### 5. Test Locally
```bash
# Option 1: Python
python -m http.server 8000
# Visit: http://localhost:8000

# Option 2: Node.js
npx serve
# Visit: http://localhost:3000

# Option 3: Just double-click index.html
```

### 6. Deploy to GitHub Pages
```bash
git add .
git commit -m "Configure NIELIT StudentHub"
git push origin main
```
Enable GitHub Pages: Settings → Pages → Source: main branch

**Your site is live at:** `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## 📚 Detailed Setup

For comprehensive setup instructions, see:
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Step-by-step walkthrough
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick lookup guide

### Initialize Sample Data (Optional)
In Google Apps Script editor:
1. Select function: `initializeSampleData`
2. Click Run (▶️)
3. Check execution log for confirmation
4. Verify Google Sheet now has 5 tabs with headers and demo data

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
│ • Images     │          │ • doGet()    │
│ • PDFs       │          │ • doPost()   │
│ • Auto-opt   │          │ • Pagination │
└──────────────┘          └──────┬───────┘
                                 │
                                 │ SpreadsheetApp API
                                 │
                         ┌───────▼────────┐
                         │ Google Sheets  │
                         │   (Database)   │
                         │ • Users        │
                         │ • Projects     │
                         │ • Profiles     │
                         │ • Comments     │
                         │ • Upvotes      │
                         └────────────────┘
```

### Data Flow Example: Posting a Project

```
1. User fills project form + uploads image
2. Image → Cloudinary → Returns secure_url
3. Project data + image URL → Google Apps Script (POST)
4. Script validates data + appends to Projects sheet
5. Success response → Browser
6. UI updates immediately (optimistic)
7. Server-side pagination reloads first page
```

---

## 🗄️ Database Schema

### Users Sheet (Private - Authentication)
| Column | Type | Description | Index |
|--------|------|-------------|-------|
| email | String | Unique identifier, primary key | 0 |
| password | String | SHA-256 salted hash | 1 |
| name | String | Full name | 2 |
| university | String | Institute name | 3 |
| major | String | Field of study | 4 |
| profilePicture | URL | Cloudinary image URL | 5 |
| linkedin | URL | LinkedIn profile | 6 |
| github | URL | GitHub profile | 7 |
| bio | Text | User biography | 8 |
| timestamp | DateTime | Account creation | 9 |
| resume | URL | Cloudinary PDF URL | 10 |

### Projects Sheet (Public)
| Column | Type | Description | Index |
|--------|------|-------------|-------|
| id | String | Unique ID (timestamp) | 0 |
| authorName | String | Creator's name | 1 |
| authorEmail | String | Creator's email (FK) | 2 |
| authorPicture | URL | Creator's avatar | 3 |
| title | String | Project title | 4 |
| description | Text | Project details | 5 |
| link | URL | GitHub/demo URL | 6 |
| tech | String | Technologies used | 7 |
| projectImage | URL | Project screenshot | 8 |
| upvotes | Number | Vote count | 9 |
| timestamp | DateTime | Post date | 10 |
| category | String | Project category | 11 |

**Categories**: Web Development, Mobile App, AI / ML, IoT & Hardware, Blockchain, Cybersecurity, Other

### Profiles Sheet (Public - Directory)
| Column | Type | Description | Index |
|--------|------|-------------|-------|
| name | String | Full name | 0 |
| email | String | Email (FK to Users) | 1 |
| university | String | Institute | 2 |
| major | String | Field of study | 3 |
| linkedin | URL | LinkedIn | 4 |
| github | URL | GitHub | 5 |
| bio | Text | Biography | 6 |
| profilePicture | URL | Avatar | 7 |
| timestamp | DateTime | Creation date | 8 |
| resume | URL | PDF URL | 9 |

### Comments Sheet (Public)
| Column | Type | Description | Index |
|--------|------|-------------|-------|
| id | String | Unique ID (timestamp) | 0 |
| projectId | String | Associated project (FK) | 1 |
| authorName | String | Commenter's name | 2 |
| authorEmail | String | Commenter's email (FK) | 3 |
| comment | Text | Comment content | 4 |
| timestamp | DateTime | Comment date | 5 |

### Upvotes Sheet (Individual Tracking)
| Column | Type | Description | Index |
|--------|------|-------------|-------|
| projectId | String | Project ID (FK) | 0 |
| userEmail | String | User email (FK) | 1 |
| timestamp | DateTime | Upvote date | 2 |

**Purpose**: Prevents duplicate votes. Each user can only upvote a project once.

---

## 🔌 API Reference

### Available Actions

| Action | Method | Parameters | Returns | Description |
|--------|--------|------------|---------|-------------|
| `getProjects` | GET | `userEmail`, `page`, `searchTerm` | `{items[], total, hasMore, page}` | Paginated projects (20/page) |
| `getProject` | GET | `id` | Project object | Single project by ID |
| `getProfiles` | GET | `page`, `searchTerm` | `{items[], total, hasMore, page}` | Paginated profiles (24/page) |
| `getProfile` | GET | `email` | Profile object | Single profile by email |
| `getComments` | GET | `projectId` | Comment array | Comments for project |
| `getStats` | GET | none | `{totalStudents, totalProjects}` | Platform statistics |
| `login` | GET | `email`, `password` | User object (no password) | Authenticate user |
| `signup` | POST | `data` object | Success message | Create account |
| `addProject` | POST | `data` object | Success message | Post project |
| `updateProfile` | POST | `data` object | Success message | Update user info |
| `toggleUpvote` | POST | `projectId`, `userEmail` | `{action, newCount}` | Add/remove upvote |
| `addComment` | POST | `data` object | Success message | Post comment |

### Example Usage

**GET Request (Login)**
```javascript
const response = await fetch(
  `${SHEET_URL}?action=login&email=test@example.com&password=pass123`
);
const json = await response.json();
// Returns: { status: 'success', data: { email, name, ... } }
```

**POST Request (Add Project)**
```javascript
const response = await fetch(SHEET_URL, {
  method: 'POST',
  body: JSON.stringify({
    action: 'addProject',
    data: {
      id: Date.now().toString(),
      authorName: 'John Doe',
      authorEmail: 'john@example.com',
      title: 'My Project',
      description: 'Project description',
      category: 'Web Development',
      tech: 'React, Node.js',
      projectImage: 'https://...',
      link: 'https://github.com/...'
    }
  })
});
const json = await response.json();
// Returns: { status: 'success', data: 'Project posted' }
```

**Pagination Example**
```javascript
// Load first page
const page1 = await fetch(
  `${SHEET_URL}?action=getProjects&page=1&userEmail=${currentUser.email}`
);
const json1 = await page1.json();
// json1.data = { items: [...], total: 45, hasMore: true, page: 1 }

// Load next page
const page2 = await fetch(
  `${SHEET_URL}?action=getProjects&page=2&userEmail=${currentUser.email}`
);
```

---

## 🔒 Security Features

### Password Security
- **SHA-256 Hashing** - Industry-standard cryptographic hashing
- **Salt Added** - `NIELIT_STUDENTHUB_SECURE_SALT_2026` prevents rainbow table attacks
- **Automatic Migration** - Legacy passwords upgraded on login (backward compatible)

### Input Validation
- **HTML Escaping** - All user input escaped to prevent XSS
  ```javascript
  function escapeHtml(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  ```
- **Server-Side Validation** - Email format, password strength checks
- **No SQL Injection** - Google Sheets doesn't use SQL

### Access Control
- **Private Data** - Users sheet password column never exposed to client
- **Public Sharing** - Profiles and Projects sheets accessible without login
- **Email-Based Auth** - All operations require valid email from session

### Best Practices
- Never commit SHEET_URL with production data to public repos
- Monitor Google Apps Script execution logs regularly
- Keep Google Sheet private (only script has access)
- Use HTTPS in production (GitHub Pages provides this)

---

## 🎨 Customization

### Change Colors
Edit CSS variables in all HTML files:
```css
:root {
    --primary: #003366;        /* NIELIT Dark Blue */
    --accent: #0066CC;         /* NIELIT Light Blue */
    --secondary: #FF6B35;      /* Accent Orange */
    --background: #F5F7FA;     /* Page background */
    --card-bg: #FFFFFF;        /* Card backgrounds */
    --text-primary: #1A1A1A;   /* Main text */
    --text-secondary: #6B7280; /* Secondary text */
}
```

### Change Fonts
Update Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```
Then update CSS:
```css
body {
    font-family: 'Roboto', sans-serif;
}
```

### Replace Logo
Update these lines in all HTML files:
```html
<!-- index.html, feed.html, project.html -->
<img src="logo.png" alt="StudentHub" style="height: 40px;">
```
Or replace `logo.png` file (recommended size: 200x200px, transparent background).

### Add New Project Category
1. Update category dropdown in feed.html:
```html
<select id="postCategory" class="form-input">
    <option value="Your New Category">Your New Category</option>
</select>
```
2. Add filter chip:
```html
<button onclick="filterCategory(this, 'Your New Category')" class="filter-chip">
    Your New Category
</button>
```

### Add Google Analytics
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

---

## 🐛 Troubleshooting

### Projects Not Loading
**Symptoms**: Blank feed, "connection error"

**Solutions**:
1. Verify `SHEET_URL` ends with `/exec`
2. Check Apps Script deployment: "Who has access" = **Anyone**
3. Test API directly: `YOUR_SHEET_URL?action=getProjects` in browser
4. Check browser console (F12) for errors

### Images Not Uploading
**Symptoms**: Upload button doesn't work, broken images

**Solutions**:
1. Verify `CLOUDINARY_NAME` is correct
2. Check upload preset: `studenthub_preset` (exact name)
3. Ensure preset is **Unsigned** (not Signed)
4. Try smaller image (< 5MB)

### Login Fails After Signup
**Symptoms**: "User not found" or "Incorrect password"

**Solutions**:
1. Check Google Sheet has "Users" tab with your email
2. Verify email exact match (case-insensitive)
3. Try demo credentials first: `demo@nielit.gov.in` / `demo123`
4. Clear localStorage: `localStorage.clear()` in console

### Deep Link Not Working
**Symptoms**: URL like `index.html?email=...` shows loader forever

**Solutions**:
1. Check email exists in Profiles sheet
2. Verify `getProfile` action in Apps Script
3. Check browser console for errors
4. Ensure loader hiding logic is correct

### Categories Not Showing
**Symptoms**: Projects show "Other" for all categories

**Solutions**:
1. Check Projects sheet has 12 columns (including "category" at index 11)
2. Verify `addProject` function includes `data.category`
3. Re-post projects to populate category field

For more troubleshooting, see **[README.md - Troubleshooting Section](README.md#troubleshooting)** or open a [GitHub Issue](https://github.com/nielitropar/nielitropar.github.io/issues).

---

## 🤝 Contributing

We welcome contributions! Here's how:

### How to Contribute

1. **Fork** the repository
2. **Create** a branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Ideas

**High Priority**:
- 🐛 Bug fixes
- ♿ Accessibility improvements (ARIA labels, keyboard nav)
- 🌐 Internationalization (Hindi support)
- 📱 Mobile UX enhancements
- ⚡ Performance optimizations

**Feature Requests**:
- ✨ Advanced filtering (date range, multiple categories)
- 🔔 Notification system
- 🏆 Achievement badges
- 📊 Analytics dashboard
- 🔗 Project collaboration features
- 👥 Follow system
- 🌙 Dark mode
- 📧 Email notifications

### Code Style
- Use 2-space indentation
- Add comments for complex logic
- Follow existing naming conventions
- Test on desktop and mobile

---

## 📄 License

This project is licensed under the **MIT License**.

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

**What this means**:
- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ Can create derivative works
- ⚠️ Must include copyright notice
- ⚠️ Provided "as-is" without warranty

See [LICENSE](LICENSE) file for full details.

---

## 👥 Credits & Acknowledgments

### Creators
- **Dr. Sarwan Singh** - Project Supervisor & Mentor
- **Lovnish Verma** - Lead Developer & System Architecture
- **Nikshep Paliwal** - UI/UX Design & Frontend Development

### Built With Love At
**NIELIT Ropar** - National Institute of Electronics & Information Technology

### Technologies & Services
- [Google Apps Script](https://developers.google.com/apps-script) - Serverless backend
- [Google Sheets](https://sheets.google.com) - Cloud database
- [Cloudinary](https://cloudinary.com) - Image + PDF hosting
- [GitHub Pages](https://pages.github.com) - Free hosting
- [Google Fonts](https://fonts.google.com) - Inter & Space Grotesk

---

## 📞 Contact

### Project Maintainers

**Dr. Sarwan Singh**
- Email: sarwan@nielit.gov.in
- Role: Project Supervisor
- Institute: NIELIT Ropar

**Lovnish Verma**
- Email: princelv84@gmail.com
- Role: Lead Developer
- GitHub: [@lovnishverma](https://github.com/lovnishverma)

**Nikshep Paliwal**
- Email: niksheppaliwal@gmail.com
- Role: UI/UX Developer
- GitHub: [@niksheppaliwal](https://github.com/niksheppaliwal)

### Support Channels
- 🐛 **Bug Reports**: [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues/new)
- 💡 **Feature Requests**: [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues/new)
- 📧 **General Inquiries**: sarwan@nielit.gov.in
- 🌐 **NIELIT Website**: [nielit.gov.in](https://nielit.gov.in)

---

##

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

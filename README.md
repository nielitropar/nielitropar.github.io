# NIELIT StudentHub

<div align="center">

![NIELIT StudentHub Banner](https://github.com/user-attachments/assets/8c14f5c0-decd-41cd-8524-2cd89abc589c)

**A Zero-OpEx Serverless Portfolio Platform for Engineering Students**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.5-success?style=for-the-badge)](https://github.com/nielitropar/nielitropar.github.io)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge&logo=github)](https://nielitropar.github.io)
[![Android App](https://img.shields.io/badge/Download-Android%20App-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/nielitropar/nielitropar.github.io/releases/tag/v1.0)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=flat&logo=github&logoColor=white)](https://pages.github.com)

[🚀 Live Demo](https://nielitropar.github.io) • [📱 Android App](https://github.com/nielitropar/nielitropar.github.io/releases/tag/v1.0) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/nielitropar/nielitropar.github.io/issues) • [✨ Request Feature](https://github.com/nielitropar/nielitropar.github.io/issues)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ What's New in v1.5](#-whats-new-in-v15)
- [🏗️ Architecture](#-architecture)
- [⚡ Quick Start](#-quick-start)
- [📚 Documentation](#-documentation)
- [🎬 Demo & Screenshots](#-demo--screenshots)
- [🔬 Research Paper](#-research-paper)
- [🛠️ Technology Stack](#-technology-stack)
- [🌟 Key Features](#-key-features)
- [📊 Performance & Scalability](#-performance--scalability)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**NIELIT StudentHub** is a revolutionary serverless platform that enables educational institutions to deploy professional-grade student portfolio systems with **$0 annual operational costs**. Built on innovative "Zero-OpEx Architecture," it combines Google Sheets as a database, Google Apps Script as a backend, and GitHub Pages for hosting—proving that enterprise features don't require enterprise budgets.

### 🎓 Perfect For

- 🏛️ Educational institutions with limited budgets
- 👨‍🎓 Student-led projects and campus initiatives  
- 🔬 Research labs showcasing work
- 💼 Department-level portfolio systems
- 🌍 Organizations in developing nations

### 💡 Core Philosophy

> "Robust software engineering principles applied to low-code infrastructure can democratize digital visibility for resource-constrained institutions."

---

## ✨ What's New in v1.5

<table>
<tr>
<td width="50%">

### 🔥 Smart Trending Algorithm
- **Time-Decay Scoring**: Fair ranking that prevents old projects from dominating
- **Engagement Metrics**: Weighted scoring (Upvotes×2 + Comments×3)
- **Freshness First**: Recent high-engagement projects rise to the top

</td>
<td width="50%">

### ❤️ Profile Likes System  
- **Peer Recognition**: Students can acknowledge each other's work
- **Individual Tracking**: Separate ProfileLikes sheet prevents duplicates
- **Real-time Updates**: Instant count synchronization

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Enhanced Security
- **Salted Password Hashing**: SHA-256 + salt (`NIELIT_STUDENTHUB_SECURE_SALT_2026`)
- **Auto-Migration**: Legacy passwords upgraded on login
- **Backward Compatible**: No user disruption

</td>
<td width="50%">

### 🗂️ Project Categories
- **7 Categories**: Web Dev, Mobile, AI/ML, IoT, Blockchain, Cybersecurity, Other
- **Filter Chips**: Quick category-based search
- **Better Organization**: Enhanced discoverability

</td>
</tr>
</table>

**[See Full Changelog →](QUICK_REFERENCE.md#-whats-new-in-v15)**

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph TB
    subgraph "🌐 Client Layer"
        A[Browser] -->|HTTPS| B[GitHub Pages CDN]
        B --> C[HTML/CSS/JS SPA]
    end
    
    subgraph "☁️ Backend Layer"
        C -->|REST API| D[Google Apps Script]
        C -->|Image Upload| E[Cloudinary API]
    end
    
    subgraph "💾 Data Layer"
        D -->|CRUD| F[Google Sheets DB]
        F --> G[Users Sheet]
        F --> H[Projects Sheet]
        F --> I[Profiles Sheet]
        F --> J[Comments Sheet]
        F --> K[Upvotes Sheet]
        F --> L[ProfileLikes Sheet]
    end
    
    style A fill:#667eea
    style C fill:#764ba2
    style D fill:#f093fb
    style F fill:#4facfe
```

</div>

### 🎯 Architecture Highlights

| Component | Technology | Purpose | Cost |
|-----------|-----------|---------|------|
| **Frontend** | HTML5/CSS3/Vanilla JS | Static SPA hosted on CDN | $0 |
| **Backend** | Google Apps Script | Serverless API Gateway | $0 |
| **Database** | Google Sheets (6 sheets) | Relational data store | $0 |
| **Storage** | Cloudinary | Image/PDF CDN | $0 (25GB/month) |
| **Hosting** | GitHub Pages | Static site hosting | $0 |
| **CI/CD** | GitHub Actions | Automated deployment | $0 |

**Total Annual Cost:** **$0.00** 💰

**[Learn More About Architecture →](SETUP_GUIDE.md#understanding-the-architecture)**

---

## ⚡ Quick Start

### Prerequisites

✅ Google Account  
✅ Cloudinary Account (free tier)  
✅ GitHub Account  
✅ Basic HTML/JS knowledge

### 3-Minute Setup

```bash
# 1️⃣ Clone Repository
git clone https://github.com/nielitropar/nielitropar.github.io.git
cd nielitropar.github.io

# 2️⃣ Create config.js (see Setup Guide)
cat > config.js << EOF
const CONFIG = {
    SHEET_URL: 'YOUR_APPS_SCRIPT_URL',
    CLOUDINARY_NAME: 'YOUR_CLOUD_NAME',
    CLOUDINARY_PRESET: 'studenthub_preset'
};
EOF

# 3️⃣ Test Locally
python -m http.server 8000
# Visit: http://localhost:8000

# 4️⃣ Deploy to GitHub Pages
git add .
git commit -m "Deploy StudentHub"
git push origin main
```

**🎉 Your site is live at: `https://YOUR_USERNAME.github.io`**

**[Full Setup Instructions →](SETUP_GUIDE.md)**

---

## 📚 Documentation

<table>
<tr>
<td align="center" width="33%">

### 🚀 Quick Reference
**[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**

- Common commands
- Demo credentials
- Feature checklist
- Troubleshooting
- Mobile support

</td>
<td align="center" width="33%">

### 📖 Setup Guide
**[SETUP_GUIDE.md](SETUP_GUIDE.md)**

- Step-by-step walkthrough
- Google Sheets setup
- Cloudinary configuration
- Deployment options
- Testing procedures

</td>
<td align="center" width="33%">

### 🔐 Security & CI/CD
**[CICDPipelinesSecuritySetupGuide.md](CICDPipelinesSecuritySetupGuide.md)**

- GitHub Actions workflow
- Secrets management
- Security hardening
- Token-based auth
- Production deployment

</td>
</tr>
</table>

### 📑 Additional Resources

- **[API Reference](QUICK_REFERENCE.md#-api-reference)** - Complete endpoint documentation
- **[Database Schema](README.md#-database-schema)** - 6-sheet structure explained
- **[Customization Guide](QUICK_REFERENCE.md#-customization-quick-guide)** - Branding & theming
- **[Troubleshooting](QUICK_REFERENCE.md#-common-fixes)** - Common issues & solutions

---

## 🎬 Demo & Screenshots

### 🖥️ Desktop Experience

<table>
<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/6576527a-786b-4983-844a-5fc3d2e34860" alt="Student Directory" />
<p align="center"><strong>Student Directory</strong><br/>Browse profiles with search & filters</p>
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/862309f3-b5d9-4240-9194-6db39005e036" alt="Project Feed" />
<p align="center"><strong>Project Feed</strong><br/>Trending sidebar & engagement metrics</p>
</td>
</tr>
<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/ecfaf6ba-1705-444c-8aa5-a4a78c3a8607" alt="Project Detail" />
<p align="center"><strong>Project Detail Page</strong><br/>Public sharing with comments</p>
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/69e7cdda-debb-477b-b9a2-0aba884a37ab" alt="User Profile" />
<p align="center"><strong>User Portfolio</strong><br/>Comprehensive profile with likes</p>
</td>
</tr>
</table>

### 📱 Mobile-First Design

- ✅ **Bottom Navigation** - 3-tab mobile interface
- ✅ **Horizontal Trending** - Swipeable cards  
- ✅ **Touch-Optimized** - Large tap targets
- ✅ **Responsive Grid** - Adapts from 320px to 4K

**[View Live Demo →](https://nielitropar.github.io)**

---

## 🔬 Research Paper

### 📄 Publication

**Title:** *NIELIT StudentHub: A Zero-Opex, Serverless Institutional Knowledge Management System*

**Authors:** Lovnish Verma, Sarwan Singh  
**Institution:** NIELIT Ropar, India  
**Date:** January 24, 2026

**[Read Full Paper (paper.md)](paper.md)**

### 🎓 Key Contributions

1. **Time-Decay Engagement Heuristic**
   ```
   Score = (Upvotes×2 + Comments×3) / √(DaysOld + 1)
   ```
   Ensures fair trending without old project domination

2. **Self-Healing Cryptographic Migration**
   - Automatic password security upgrade on login
   - Zero user disruption
   - Backward compatibility maintained

3. **Frugal Information System**
   - Proof-of-concept for Zero-OpEx architecture
   - Serverless micro-service pattern on commodity SaaS
   - Scalable to 500K+ projects with free-tier tools

**Citations:** `paper.bib` available for LaTeX integration

---

## 🛠️ Technology Stack

### Frontend
```javascript
{
  "markup": "HTML5 (Semantic)",
  "styling": "CSS3 (Grid, Flexbox, CSS Variables)",
  "scripting": "Vanilla JavaScript ES6+",
  "fonts": "Inter, Space Grotesk (Google Fonts)",
  "responsive": "Mobile-first, 320px-4K"
}
```

### Backend
```javascript
{
  "runtime": "Google Apps Script (V8)",
  "api": "RESTful (GET/POST)",
  "authentication": "SHA-256 + Salt",
  "database": "Google Sheets (6 normalized sheets)",
  "concurrency": "LockService for race conditions"
}
```

### Infrastructure
```javascript
{
  "hosting": "GitHub Pages (Global CDN)",
  "cicd": "GitHub Actions",
  "media": "Cloudinary (Image + PDF optimization)",
  "version_control": "Git",
  "deployment": "Automated via workflow"
}
```

### Key Libraries
- **None** - Zero frontend dependencies (pure vanilla JS)
- Cloudinary Upload Widget (inline)
- Native Fetch API for AJAX
- CSS Grid/Flexbox (no Bootstrap)

---

## 🌟 Key Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security
- ✅ SHA-256 salted password hashing
- ✅ Auto-migration from legacy security
- ✅ XSS protection (HTML entity encoding)
- ✅ Individual upvote/like tracking
- ✅ Session management (LocalStorage)
- ✅ CORS-enabled API

### 👤 User Profiles
- ✅ Profile pictures (Cloudinary CDN)
- ✅ PDF resume upload & hosting
- ✅ Social links (LinkedIn, GitHub)
- ✅ Custom bio (500 chars)
- ✅ Profile likes (peer recognition)
- ✅ Individual portfolios

### 📁 Project Management
- ✅ Rich text descriptions
- ✅ 7 project categories
- ✅ Tech stack tags
- ✅ Image uploads (auto-optimization)
- ✅ GitHub/demo links
- ✅ Individual upvote tracking

</td>
<td width="50%">

### 🔍 Discovery & Search
- ✅ Server-side pagination (20/page)
- ✅ Real-time search (title/author/tech/category)
- ✅ Category filters (Web/Mobile/AI/IoT...)
- ✅ Smart trending algorithm (time-decay)
- ✅ Load more (infinite scroll alternative)

### 💬 Social Features
- ✅ Project comments (full CRUD)
- ✅ Profile likes
- ✅ Upvotes (one per user per project)
- ✅ Trending feed (top 5)
- ✅ Public sharing (no login required)
- ✅ Share via Email/WhatsApp/Twitter/LinkedIn

### 📱 Mobile Experience
- ✅ Bottom navigation bar
- ✅ Horizontal trending cards
- ✅ Touch-optimized UI
- ✅ iPhone notch support
- ✅ Responsive typography
- ✅ No zoom on input (16px font)

### 🎨 Design & UX
- ✅ NIELIT branding (Navy Blue #003366)
- ✅ Gradient accents
- ✅ Smooth animations
- ✅ Modal transitions
- ✅ Professional typography
- ✅ Dark mode ready (CSS vars)

</td>
</tr>
</table>

---

## 📊 Performance & Scalability

### Benchmark Results

| Metric | Value | Notes |
|--------|-------|-------|
| **First Contentful Paint** | <1.2s | GitHub Pages CDN |
| **API Response Time** | 800ms-1.2s | Acceptable for archival use |
| **Max Concurrent Users** | ~30 | Google Apps Script limit |
| **Storage Capacity** | 500K projects | 10M cells / 20 cols per row |
| **Lifespan** | 27 years | At 10 projects/day |
| **Bandwidth** | 25GB/month | Cloudinary free tier |

### Scalability Analysis

**Ideal For:**
- ✅ Campuses with <5,000 students
- ✅ Departments with <2,000 members
- ✅ Non-real-time use cases
- ✅ Budget-constrained institutions

**Not Suitable For:**
- ❌ Real-time chat applications
- ❌ High-frequency trading platforms
- ❌ >10K concurrent users
- ❌ Sub-100ms latency requirements

**[Full Analysis in Research Paper →](paper.md#performance-and-scalability)**

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Bugs
Found a bug? [Open an issue](https://github.com/nielitropar/nielitropar.github.io/issues) with:
- Browser & version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

### ✨ Request Features
Have an idea? [Submit a feature request](https://github.com/nielitropar/nielitropar.github.io/issues) with:
- Use case description
- Expected functionality
- Mockups/wireframes (optional)

### 🔧 Submit Pull Requests

```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m 'Add amazing feature'

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open Pull Request
```

### 📋 Development Guidelines
- Follow existing code style (2-space indent)
- Add comments for complex logic
- Test on desktop + mobile
- Update documentation if needed

### 🎯 Contribution Ideas
- 🌐 Internationalization (Hindi support)
- ♿ Accessibility improvements (ARIA)
- 🌙 Dark mode implementation
- 📊 Analytics dashboard
- 🔔 Notification system
- 🏆 Achievement badges

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

✅ **Free to use** for personal and commercial projects  
✅ **Modify** as needed for your institution  
✅ **Distribute** modified versions  
✅ **Private use** allowed  

⚠️ **Must include** copyright notice  
⚠️ **Provided "as-is"** without warranty  

**TL;DR:** Use it however you want, just give credit! 🙌

---

## 👥 Team

<table>
<tr>
<td align="center" width="50%">

### Dr. Sarwan Singh
**Project Supervisor**

📧 sarwan@nielit.gov.in  
🏛️ NIELIT Ropar

*Faculty mentor guiding project vision and research methodology*

</td>
<td align="center" width="50%">

### Lovnish Verma
**Lead Developer**

📧 princelv84@gmail.com  
💻 [@lovnishverma](https://github.com/lovnishverma)

*System architecture, full-stack development, and technical documentation*

</td>
</tr>
</table>

---

## 🙏 Acknowledgments

### 🏛️ Institution
**National Institute of Electronics & Information Technology (NIELIT), Ropar**  
For providing the research environment and testing infrastructure.

### 🛠️ Technologies
- [Google Apps Script](https://developers.google.com/apps-script) - Serverless backend
- [Google Sheets](https://sheets.google.com) - Cloud database
- [Cloudinary](https://cloudinary.com) - Media optimization
- [GitHub Pages](https://pages.github.com) - Free hosting
- [Google Fonts](https://fonts.google.com) - Typography

### 📚 Inspiration
- Watson et al. (2013) - *Frugal Information Systems*
- Heeks & Molla (2009) - *Impact Assessment of ICT Projects*
- Vare (2021) - *Student-Led Sustainability Projects*

### 🌟 Community
Special thanks to all students who tested the platform and provided feedback during development.

---

<div align="center">

## 🚀 Ready to Deploy Your Own?

**Choose your path:**

<table>
<tr>
<td align="center" width="33%">

### 🏃‍♂️ Quick Start
**I want to deploy in 10 minutes**

[Follow Quick Reference →](QUICK_REFERENCE.md)

</td>
<td align="center" width="33%">

### 📖 Detailed Setup
**I want to understand everything**

[Read Setup Guide →](SETUP_GUIDE.md)

</td>
<td align="center" width="33%">

### 🔐 Production Deploy
**I need enterprise security**

[See CI/CD Guide →](CICDPipelinesSecuritySetupGuide.md)

</td>
</tr>
</table>

---

### 📞 Need Help?

💬 [GitHub Discussions](https://github.com/nielitropar/nielitropar.github.io/discussions) • 🐛 [Report Issue](https://github.com/nielitropar/nielitropar.github.io/issues) • 📧 [Email Support](mailto:sarwan@nielit.gov.in)

---

### ⭐ Show Your Support

If this project helped you, consider giving it a ⭐️!

It helps others discover this zero-cost solution for their institutions.

---

**Made with ❤️ at NIELIT Ropar • 2026**

*Empowering institutions with zero-cost digital infrastructure*

*"Empowering the next generation of tech innovators"*

[![Star on GitHub](https://img.shields.io/github/stars/nielitropar/nielitropar.github.io?style=social)](https://github.com/nielitropar/nielitropar.github.io)
[![Fork on GitHub](https://img.shields.io/github/forks/nielitropar/nielitropar.github.io?style=social)](https://github.com/nielitropar/nielitropar.github.io/fork)
[![Watch on GitHub](https://img.shields.io/github/watchers/nielitropar/nielitropar.github.io?style=social)](https://github.com/nielitropar/nielitropar.github.io)

</div>

<div align="center">

---

[⬆ Back to Top](#nielit-studenthub---connect-create-inspire-)

</div>

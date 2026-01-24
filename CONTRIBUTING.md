# Contributing to NIELIT StudentHub

First off, thank you for considering contributing to NIELIT StudentHub! It's people like you that make this tool such a great resource for the student community.

We welcome contributions from everyone—whether you're fixing a typo, reporting a bug, or building a major new feature. This document guides you through the process.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Development Guidelines](#development-guidelines)
  - [Style Guide](#style-guide)
  - [Backend Development](#backend-development)
- [Pull Request Process](#pull-request-process)
- [Contribution Ideas](#contribution-ideas)

## Code of Conduct

This project and everyone participating in it is governed by the principles of respect and collaboration. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting a Bug Report:**
* **Check the [Issues](https://github.com/nielitropar/nielitropar.github.io/issues)** to see if the problem has already been reported.
* **Check the [Documentation](QUICK_REFERENCE.md)** to make sure the behavior isn't intended.

**How to Submit a Good Bug Report:**
Open a new [Issue](https://github.com/nielitropar/nielitropar.github.io/issues/new) and include:
* **Browser & Version:** (e.g., Chrome 120.0, Firefox 115.0)
* **Device:** (e.g., Desktop, iPhone 14, Android Tablet)
* **Steps to Reproduce:** A clear, numbered list of steps to trigger the issue.
* **Expected vs. Actual Behavior:** What you thought would happen vs. what actually happened.
* **Console Errors:** Press `F12` and paste any red error messages from the Console tab.
* **Screenshots:** If applicable, add screenshots to help explain the problem.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

**How to Submit a Good Enhancement Suggestion:**
Open a new [Issue](https://github.com/nielitropar/nielitropar.github.io/issues/new) and include:
* **Use Case Description:** Why do you need this? Who will benefit?
* **Expected Functionality:** Describe how the feature should work.
* **Mockups/Wireframes:** (Optional) Simple sketches or UI designs are very helpful.

### Your First Code Contribution

Unsure where to begin? You can look through these issue labels:
* **[good first issue](https://github.com/nielitropar/nielitropar.github.io/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22):** Issues which should only require a few lines of code, and a test or two.
* **[help wanted](https://github.com/nielitropar/nielitropar.github.io/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22):** Issues which may be a bit more involved than "good first issue".

## Development Guidelines

### Style Guide

* **Indentation:** Use **2 spaces** for indentation. No tabs.
* **Comments:** Add comments for complex logic, especially in `google-app-script-v1.5.js`.
* **Formatting:** Keep code clean and readable. Use semantic HTML5 elements where possible.
* **Mobile-First:** Always test your changes on both Desktop and Mobile viewports (using DevTools).

### Backend Development

* **Version:** Always use the `v1.5` backend logic (`google-app-script-v1.5.js`) for new features.
* **Security:** Never commit hardcoded credentials or API keys.
* **Performance:** If adding database queries, adhere to the "Reverse-Range" pagination strategy to ensure O(1) performance. Avoid full table scans.

## Pull Request Process

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** the project to your machine:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/nielitropar.github.io.git](https://github.com/YOUR_USERNAME/nielitropar.github.io.git)
    ```
3.  **Create a Branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```
4.  **Commit** your changes with clear, descriptive messages:
    ```bash
    git commit -m "Add amazing feature"
    ```
5.  **Push** to your branch:
    ```bash
    git push origin feature/amazing-feature
    ```
6.  **Open a Pull Request** against the `main` branch of the original repository.
7.  **Describe** your changes in the PR description and link to any relevant issues (e.g., "Fixes #123").

## Contribution Ideas

Looking for something to work on? Here are some high-priority areas:

* 🌐 **Internationalization:** Add Hindi language support.
* ♿ **Accessibility:** Improve ARIA labels and keyboard navigation.
* 🌙 **Dark Mode:** Implement a CSS-based dark mode toggle.
* 📊 **Analytics Dashboard:** Create a view for admins to see site stats.
* 🔔 **Notification System:** Notify users when their project gets a comment/like.
* 🏆 **Achievement Badges:** Visual rewards for active students.
* 🔄 **Real-time Updates:** Explore alternatives to polling for live updates.

---

**Thank you for your contribution!**

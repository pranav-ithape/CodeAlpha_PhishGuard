
## PhishGuard Educational Platform ("Readability-First Security Research")

This directory contains the original raw design artifacts, screens, HTML templates, and design system specifications imported from Google Stitch

---

### Project Inventory

| File | Screen Title | Dimensions | React Mapping |
| :--- | :--- | :--- | :--- |
| [`PhishGuard_Overview___Training_Dashboard.html`](./PhishGuard_Overview___Training_Dashboard.html) | PhishGuard Overview & Training Dashboard | 2560 × 3868 | [`src/pages/DashboardPage.tsx`](../src/pages/DashboardPage.tsx) |
| [`Email_Red-Flag_Inspector___Hands-on_Lab.html`](./Email_Red-Flag_Inspector___Hands-on_Lab.html) | Email Red-Flag Inspector — Hands-on Lab | 2560 × 3960 | [`src/pages/EmailAnalysisPage.tsx`](../src/pages/EmailAnalysisPage.tsx) |
| [`URL___Domain_Deconstructor___Forensic_Lab.html`](./URL___Domain_Deconstructor___Forensic_Lab.html) | URL & Domain Deconstructor — Forensic Lab | 2560 × 5130 | [`src/pages/UrlAnalysisPage.tsx`](../src/pages/UrlAnalysisPage.tsx) |
| [`Course_Curriculum___Phishing_Emails_Lesson.html`](./Course_Curriculum___Phishing_Emails_Lesson.html) | Course Curriculum — Phishing Emails Lesson | 2560 × 8374 | [`src/pages/LessonPage.tsx`](../src/pages/LessonPage.tsx) & [`src/pages/LearnPage.tsx`](../src/pages/LearnPage.tsx) |
| [`PhishGuard_Readability-First_Logo.html`](./PhishGuard_Readability-First_Logo.html) | PhishGuard Readability-First Logo | 512 × 512 | [`src/components/common/PhishGuardLogo.tsx`](../src/components/common/PhishGuardLogo.tsx) |
| [`PhishGuard_Educational_Platform.html`](./PhishGuard_Educational_Platform.html) | PhishGuard Educational Platform | 1280 × 1024 | Base Architecture & Design System |
| [`design_systems.json`](./design_systems.json) | Complete Design Tokens & Guidelines | N/A | [`tailwind.config.js`](../tailwind.config.js) & [`src/index.css`](../src/index.css) |

---

### Design System: Readability-First Security Research

- **Philosophy:** Rejects clichéd dark-mode neon infosec tropes in favor of an authoritative, academic press/investigative research aesthetic.
- **Canvas / Background:** `#fbf9f7` (Warm Paper)
- **Primary Anchor:** `#195350` / Container `#356b68` (Deep Teal)
- **Secondary Accent:** `#8c4e3b` / `#a6634f` (Burnt Copper)
- **Tertiary Accent:** `#36513e` / `#58745f` (Deep Sage)
- **Typography:** Public Sans (Display, Headings, Body) + JetBrains Mono (Forensic Telemetry, RFC-822, URLs)
- **Iconography:** Material Symbols Outlined

# 🛡️ PhishGuard

<div align="center">
  <img src="public/logo-full.png" alt="PhishGuard Logo" width="400" />
  <br />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

**An advanced, educational phishing-awareness platform designed to train users in threat recognition, digital forensics, and incident response.**

</div>

PhishGuard is a comprehensive educational platform that teaches users how to recognize phishing, analyze suspicious emails and URLs, practice incident-response decisions, and assess their understanding through scenario-based training.

---

## Features

- **9-Module Phishing-Awareness Curriculum:** Structured, pedagogical pathway covering threat fundamentals, attack taxonomies, header dissection, lookalike domains, psychological influence levers, breach case studies, diagnostic assessment, preventative controls, and immediate post-click containment.
- **Email Red-Flag Inspector:** Hands-on analytical workbench for dissecting email headers, sender address/display name discrepancies, suspicious link targets, high-risk attachment extensions, and simulated SPF/DKIM/DMARC authentication results.
- **URL & Domain Deconstructor:** Diagnostic tool that separates full URLs into scheme, hostname, subdomains, registrable apex domain, public suffix, path, and query strings to enforce the "Golden Rule of URLs".
- **Scenario-Based Assessment:** 10 diagnostic, real-world scenario questions with multiple-choice evaluations, detailed rationale, and attempt history tracking.
- **Weak-Area Recommendations:** Targeted mapping of incorrect assessment answers back to specific curriculum modules to guide refresher study.
- **Learner Progress Persistence:** Client-side progress tracking using versioned schema migration (`schemaVersion: 2`) with automatic corruption recovery.
- **Continue Learning Workflow:** Context-aware guidance on the dashboard directing the learner to their next sequential lesson or assessment milestone.
- **Incident-Response Training:** Playbook covering the critical first 15 minutes of post-click containment across credential exposure, malicious downloads, payment diversions, and executive impersonations.
- **Real-World & Composite Case Studies:** Forensic post-mortems of major incidents with clear provenance distinguishing documented historic cases from composite instructional designs.
- **Light & Dark Theme:** Calm, readability-first editorial design system featuring Warm Paper / Ivory and Dark themes with full color-contrast calibration.
- **Responsive UI:** Fluid layouts tested across mobile (375px), tablet (768px), and desktop (1440px+) screen widths.
- **Accessibility-Oriented Interactions:** WCAG 2.2 AA compliant focus indicators, semantic radio groups, keyboard-activatable accordions, and screen-reader accessible input labelling.
- **Deterministic Explainable Analysis:** Transparent, rule-based indicators with score breakdown and plain-language educational feedback.

---

## Tech Stack

- **React (v18.3):** Component architecture and client-side state management.
- **TypeScript (v5.7):** Strict type safety across educational models, analyzers, and assessment definitions.
- **Vite (v6.1):** Build tool, bundler, and local development environment.
- **Tailwind CSS (v3.4):** Design token implementation with dark/light theme support.
- **Lucide React:** Consistent iconography for educational feedback and navigation.
- **React Router (v6.28):** Client-side single-page application routing.
- **Browser localStorage:** Isolated, versioned client-side storage for learner progression and theme preference.
- **Deterministic Rule-Based Analysis:** Pure TypeScript parsing engines for URL syntax and email structure without external API runtime dependencies.

---

## Architecture

```
                    ┌───────────────────────────────┐
                    │       Learner Interface       │
                    │   (React SPA / Tailwind CSS)  │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │     Educational Curriculum    │
                    │      (9 Canonical Modules)    │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │     Assessment & Progress     │
                    │  (Diagnostic Quiz / Storage)  │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │    Static Analysis Engines    │
                    │ (Email & URL Rule Evaluators) │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      Explainable Findings     │
                    │ (Risk Badges & Red Flags)     │
                    └───────────────────────────────┘
```

- **Analysis Runs Locally:** All URL dissection and email header parsing occur synchronously inside the learner's browser.
- **Progress Stored Locally:** Learner milestones, completed modules, and quiz scores reside in browser `localStorage`.
- **Zero Backend Requirement:** PhishGuard requires no database server, cloud compute, or authentication infrastructure.
- **No Live Threat Intelligence:** Indicators are evaluated using transparent static heuristics rather than external database lookups.
- **No AI / LLM Classifier:** Results are deterministic and rule-based, providing predictable, explainable educational output.
- **Synthetic Demonstration Data:** All laboratory specimens and scenario examples are clearly labeled as synthetic training materials.

---

## Email Red-Flag Inspector

The Email Red-Flag Inspector (`/email-analysis`) provides an educational environment to dissect suspicious messages. It evaluates indicators including:

- Sender display name vs. address mismatch
- Reply-To address diversion
- Psychological pressure and artificial urgency cues
- Credential harvesting requests
- Wire transfer and payroll diversion patterns
- High-risk attachment file extensions (`.iso`, `.exe`, `.vbs`, `.xlsm`)
- Simulated SPF, DKIM, and DMARC authentication results

> **Educational Notice:**
> The analyzer identifies warning signs and does not prove that an email is malicious. It is designed to reinforce structured habits of verification.

---

## URL & Domain Deconstructor

The URL & Domain Deconstructor (`/url-analysis`) breaks down web addresses into structured components based on RFC standards:

- Protocol scheme (`http:` vs `https:`)
- Hostname, subdomain levels, and registrable apex domain
- Multi-label public suffixes (e.g., `.co.uk`, `.com.au`, `.gov.au`)
- Brand impersonation and lookalike keywords (typosquatting)
- Internationalized domain names (Punycode / homograph detection)
- Direct IP address hosts (IPv4 / IPv6)
- Non-standard network port numbers
- Sensitive paths and credential-harvesting subdirectories
- Open redirect and deceptive query parameters

> **Educational Notice:**
> The analyzer performs static analysis and does not visit or fetch the submitted URL.

---

## Limitations

PhishGuard is an educational training platform with specific scope boundaries:

- **No Live Threat Intelligence:** Does not query live URL reputation databases, blocklists, or commercial feeds.
- **No DNS Resolution:** Does not perform live DNS record lookups or verify MX records over the network.
- **No WHOIS Lookups:** Does not query domain registrars or check domain registration dates.
- **No Malware Scanning:** Does not inspect binary payloads, decompile executables, or analyze macros.
- **No Remote URL Fetching:** Does not download target web pages or follow HTTP redirects.
- **No Backend Synchronization:** Progress is stored locally in the current browser and does not synchronize across devices.
- **No User Accounts:** Operates without usernames, passwords, or authentication systems.
- **No Gateway Integration:** Cannot be deployed as an inline email gateway or endpoint security agent.

PhishGuard is **not** a production Security Operations Center (SOC), an antivirus scanner, a malware analysis sandbox, or a live threat intelligence platform. It does not provide guaranteed phishing detection or professional cybersecurity certification.

---

## Privacy & Security

- **Local-Only Storage:** Learner progress and theme preferences are saved solely to browser `localStorage` under specific isolated keys (`phishguard_user_progress`, `phishguard_theme`).
- **No Data Exfiltration:** Analyzed emails and URLs remain strictly in local memory and are never transmitted to any external server.
- **Safe Output Rendering:** All analyzer inputs are rendered as inert text and data nodes. No submitted content is executed as markup or rendered as active clickable navigation hyperlinks.
- **Zero Production Secrets:** PhishGuard currently requires no production environment secrets.

---

## Educational Reference Sources

PhishGuard's curriculum and forensic heuristics draw upon standards and guidance published by established cybersecurity institutions:

- **CISA (Cybersecurity and Infrastructure Security Agency):** Phishing guidance, MFA implementation, and incident reporting recommendations.
- **NIST SP 800-63B:** Digital identity guidelines, authentication resilience, and credential security.
- **RFC 5322 & RFC 5321:** Internet Message Format and Simple Mail Transfer Protocol specifications for header parsing.
- **RFC 3986:** Uniform Resource Identifier (URI) Generic Syntax for URL component parsing.
- **Mozilla Public Suffix List:** Architectural model for registrable domain identification.

### Case Study Provenance
- **Documented Incidents:** Historical compromises (e.g., RSA SecurID, Ubiquiti Networks, FACC AG) clearly labeled with verified public post-mortem references.
- **Composite Scenarios:** Synthetic training exercises labeled as composite instructional scenarios designed to safely illustrate attack methodologies.

---

## Project Structure

```
PhishGuard/
├── public/                 # Static assets and SPA rewrite rules
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Progress indicators, badges, checklists
│   │   ├── layout/         # Header, footer, navigation bar
│   │   └── ui/             # Design-system buttons, cards, dialogs
│   ├── data/               # Static educational curriculum content
│   │   ├── analysisExamples.ts   # Synthetic email & URL lab specimens
│   │   ├── modules.ts            # 9 canonical curriculum module definitions
│   │   ├── sampleCaseStudies.ts  # Incident post-mortems and composite cases
│   │   ├── sampleQuiz.ts         # 10 diagnostic scenario questions
│   │   └── safetyTips.ts         # Defense checklists and mitigation rules
│   ├── hooks/              # Custom React state hooks
│   │   ├── useTheme.ts           # Warm Paper / Dark theme management
│   │   └── useTrainingProgress.ts # Progress persistence and weak-area mapping
│   ├── layouts/            # Application layout shells
│   ├── lib/                # Static analysis engines & automated test suites
│   │   ├── emailAnalyzer.ts      # Header and red-flag parsing engine
│   │   ├── urlAnalyzer.ts        # URL decomposition and public suffix engine
│   │   └── __tests__/            # Verification and regression test scripts
│   ├── pages/              # Primary route views (Dashboard, Learn, Labs, Quiz)
│   ├── types/              # TypeScript data contracts and schema definitions
│   ├── App.tsx             # Route definitions and navigation guards
│   ├── index.css           # Design tokens, typography, and utility styles
│   └── main.tsx            # Application entry point
├── .gitignore              # Repository file exclusion rules
├── index.html              # HTML shell, accessibility landmarks, and SEO metadata
├── package.json            # Project dependencies and script declarations
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Single-Page Application (SPA) rewrite configuration
└── vite.config.ts          # Vite bundler configuration
```

---

## Local Setup & Development

Follow these steps to run PhishGuard in a local development environment:

### Prerequisites
- Node.js v18.0 or higher
- npm v9.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/pranav-ithape/CodeAlpha_PhishGuard.git

# Navigate to the project directory
cd <project-directory>

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build & Verification
```bash
# Validate TypeScript and generate production bundle
npm run build

# Preview the production build locally
npm run preview
```

### Running Automated Test Suites
```bash
# Run Phase 4 static analyzer regression tests
npx vite-node src/lib/__tests__/runAnalysisTests.ts

# Run Phase 5 progress and assessment tests
npx vite-node src/lib/__tests__/runPhase5Tests.ts

# Run Phase 6 production hardening and security tests
npx vite-node src/lib/__tests__/runPhase6Tests.ts
```

---

## Deployment Instructions

PhishGuard is built as a static Single-Page Application (SPA) and can be hosted on any static hosting platform.

> **Ownership Notice:**
> Repository creation, GitHub push, account authentication, and deployment ownership are handled outside this project.

### Recommended Static Hosting: Vercel

1. **Push Code to Git:** Push the project repository to your Git provider:
   ```bash
   git remote add origin https://github.com/pranav-ithape/CodeAlpha_PhishGuard.git
   git push -u origin main
   ```
2. **Import Project:** In your hosting dashboard, import the repository from `https://github.com/pranav-ithape/CodeAlpha_PhishGuard.git`.
3. **Build Settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. **Environment Variables:** None required. PhishGuard requires zero production secrets.
5. **SPA Routing Configuration:** The included `vercel.json` file automatically configures server-side rewrites so that nested routes (e.g., `/learn/introduction`, `/quiz`, `/email-analysis`) load correctly on page refresh:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
6. **Deploy:** Deploy the application to your production URL (`https://<deployment-domain>`).

---

## 👨‍💻 Author

**Pranav Ithape**
- **GitHub:** [@pranav-ithape](https://github.com/pranav-ithape)
- **Repository:** [CodeAlpha_PhishGuard](https://github.com/pranav-ithape/CodeAlpha_PhishGuard)

---

## ⚖️ Disclaimer

**For Educational Purposes Only.** PhishGuard is built to help individuals and organizations learn about cybersecurity threats. Do not use the techniques or tools discussed here for malicious purposes. The author is not responsible for any misuse of the information provided in this repository.

---

## 📜 License

This project is open-source under the MIT License.

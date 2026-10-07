import { CaseStudy } from '../types';

export const SAMPLE_CASE_STUDIES: CaseStudy[] = [
  // =========================================================================
  // CASE 1: BEC / VENDOR PAYMENT DIVERSION (COMPOSITE EDUCATIONAL CASE)
  // =========================================================================
  {
    id: 'case-1',
    caseType: 'Composite Educational Case',
    title: 'The Multi-Million Dollar Vendor Invoicing Diversion',
    targetOrganization: 'Mid-Market Manufacturing Enterprise (Composite Educational Scenario)',
    industry: 'Manufacturing & Global Supply Chain',
    year: 2023,
    attackMethod: 'Business Email Compromise (BEC) & Vendor Impersonation',
    summary: 'A composite training scenario modeling real-world supply chain compromises: adversaries infiltrate an authorized vendor email account, observe billing workflows, and inject altered bank routing details into an upcoming invoice.',
    
    // 11 Canonical Structured Fields
    incidentOverview: 'This composite educational case models common Business Email Compromise patterns identified by cybersecurity agencies worldwide. Adversaries gain unauthorized access to a legitimate supplier\'s email mailbox. By quietly monitoring existing email threads rather than triggering alarms, the attackers identify an upcoming contractual payment. They submit modified payment instructions from the supplier\'s authentic email domain, attempting to divert funds to third-party accounts before the discrepancy is noticed.',
    target: 'Accounts Payable specialists and Financial Controllers managing vendor disbursements.',
    attackVector: 'Compromised third-party supplier email account with mailbox forwarding rules configured.',
    initialDeception: 'The attacker monitors an active invoice thread. When the final payment date approaches, the attacker replies from the vendor\'s authentic email account, claiming that an internal corporate restructuring requires upcoming payments to be routed to updated bank coordinates.',
    victimInteraction: 'The finance specialist reviews the email, notes that it comes from the vendor\'s authentic email address, updates the vendor master record, and submits the transfer without secondary verbal confirmation.',
    attackerObjective: 'Divert corporate milestone wire transfers directly into international money-mule accounts before the monthly billing reconciliation occurred.',
    warningSignsMissed: [
      'Sudden modification of established banking coordinates for an active multi-year supplier.',
      'Urgency in the email requesting immediate processing to meet "end-of-month audit cutoffs."',
      'Absence of secondary out-of-band verbal authorization with the supplier\'s pre-recorded finance contact.'
    ],
    whyAttackSucceeded: 'The email originated from the supplier\'s authentic domain (passing standard email authentication checks). The organization lacked a mandatory dual-authorization protocol requiring verbal confirmation for any vendor banking changes.',
    financialOrDataImpact: 'Significant capital diversion risk; prolonged reconciliation delays; emergency forensic auditing of accounts payable workflows.',
    lessonsLearned: [
      'Strict Out-of-Band Verification: Any modification of vendor banking details must mandate dual-custody phone confirmation using established, pre-recorded numbers.',
      'Authentication Is Not Verification: Valid SPF/DKIM/DMARC only proves the email originated from the domain server, not that the sender is trustworthy or uncompromised.',
      'Automated Bank Detail Safeguards: Enterprise ERP systems should automatically place a temporary hold on high-value transfers following bank account updates.'
    ],
    whatShouldHaveHappened: 'Upon receiving the bank change notification, the accounts payable specialist should have paused the transaction, retrieved the supplier\'s official contact number from the existing vendor contract directory, and verbally verified the routing change with the supplier\'s known finance contact.',
    whatHappened: 'Attackers compromised the email account of an account executive at a genuine supplier. Rather than blasting out malware, they quietly created inbox forwarding rules and observed legitimate discussions regarding an upcoming $4.2M milestone payment. When the final invoice was ready, the attacker emailed the buyer from the compromised account with updated wiring coordinates citing an "annual banking audit". The buyer executed the payment.',
    sources: [
      {
        title: 'FBI Internet Crime Complaint Center (IC3)',
        citation: 'Business Email Compromise: Public Service Announcement I-050422-PSA on Global BEC Losses and Vendor Account Compromise'
      },
      {
        title: 'CISA Cybersecurity Advisory',
        citation: 'Defending Against Business Email Compromise Attacks: Guidance for Small- and Medium-Sized Enterprises'
      }
    ]
  },

  // =========================================================================
  // CASE 2: EXECUTIVE IMPERSONATION / WHALING (COMPOSITE EDUCATIONAL CASE)
  // =========================================================================
  {
    id: 'case-2',
    caseType: 'Composite Educational Case',
    title: 'The "Emergency Acquisition" Executive Whaling Scheme',
    targetOrganization: 'Mid-Market Energy & Infrastructure Firm (Composite Educational Scenario)',
    industry: 'Energy & Infrastructure',
    year: 2023,
    attackMethod: 'Executive Whaling & Display Name Spoofing',
    summary: 'A composite training scenario demonstrating executive impersonation: a spoofed email claiming to be from the traveling CEO pressures a finance manager into preparing an urgent wire transfer for a "confidential regulatory settlement."',
    
    incidentOverview: 'While senior leadership is traveling at an industry symposium, adversaries launch a targeted whaling attempt against the finance department. Capitalizing on the executive\'s public absence and strict confidentiality claims, the attacker attempts to coerce an urgent payment outside standard operational procedures.',
    target: 'Finance Managers and Controllers with wire authorization capabilities.',
    attackVector: 'Targeted spear phishing with display name spoofing sent from an external lookalike domain.',
    initialDeception: 'The finance manager receives an email displaying the CEO\'s full name: "I am in transit completing an emergency regulatory agreement. Standard communication channels are delayed; prepare an immediate escrow deposit to outside counsel. Do not discuss this with other staff until our board announcement on Monday."',
    victimInteraction: 'Under pressure from perceived executive authority and fear of disrupting a time-sensitive corporate deal, the recipient considers bypassing standard approval hierarchies.',
    attackerObjective: 'Exploit executive authority and fabricated secrecy to bypass organizational approval hierarchies and steal corporate liquid reserves.',
    warningSignsMissed: [
      'The sender\'s actual email address uses an external lookalike domain rather than the corporate domain.',
      'Demands for absolute secrecy and instructions not to consult internal colleagues or legal counsel.',
      'High emotional coercion emphasizing catastrophic business consequences if the transaction is delayed.'
    ],
    whyAttackSucceeded: 'The scenario demonstrates how authority bias and situational urgency can suppress critical thinking when organizations lack technical display-name warnings on external mail.',
    financialOrDataImpact: 'Risk of unrecoverable wire loss, severe operational disruption, and breakdown of internal fiscal controls.',
    lessonsLearned: [
      'No Executive Exemption: Security policies for wire authorizations must apply unconditionally to all personnel, including executive leadership.',
      'Display Name Impersonation Protection: Configure mail gateways to prominently flag or quarantine external messages matching names of company executives.',
      'Secrecy Clauses as Red Flags: Any request instructing an employee to hide a financial transaction from peers or supervisors should be treated as suspicious by default.'
    ],
    whatShouldHaveHappened: 'The finance manager should have recognized the display name discrepancy, stopped the transaction, and initiated a verification call to the executive through pre-established internal channels.',
    whatHappened: 'Attackers targeted the finance director with an email impersonating the CEO during an international business trip. The email demanded an urgent, confidential wire transfer of $870,000 to an offshore escrow account to close a time-sensitive acquisition, warning that any delay would cause the deal to collapse. The finance director bypassed internal controls and authorized the transfer.',
    sources: [
      {
        title: 'ENISA (European Union Agency for Cybersecurity)',
        citation: 'Threat Landscape: Social Engineering and Executive Impersonation in European Enterprises'
      },
      {
        title: 'UK National Cyber Security Centre (NCSC)',
        citation: 'Guidance on CEO Fraud, Whaling, and Mitigating Targeted Email Impersonation'
      }
    ]
  },

  // =========================================================================
  // CASE 3: SMISHING & REVERSE-PROXY AiTM BREACH (DOCUMENTED CASE)
  // =========================================================================
  {
    id: 'case-3',
    caseType: 'Documented Case',
    title: 'The 2022 Reverse-Proxy AiTM Session Interception Breach (Twilio Incident)',
    targetOrganization: 'Twilio Inc.',
    industry: 'Telecommunications & Cloud Infrastructure',
    year: 2022,
    attackMethod: 'Smishing with Adversary-in-the-Middle (AiTM) Reverse Proxy',
    summary: 'A documented real-world incident in August 2022: employees received SMS messages regarding schedule changes, leading to an Evilginx reverse proxy that captured credentials and one-time MFA codes in real time.',
    
    incidentOverview: 'In August 2022, adversaries launched an automated smishing campaign against several hundred employees and contractors at Twilio. By deploying an Adversary-in-the-Middle (AiTM) reverse proxy, the attackers intercepted both credentials and time-based one-time passcodes (TOTP), allowing them to capture authenticated session tokens and temporarily access internal systems.',
    target: 'Customer support personnel, operational staff, and contractors.',
    attackVector: 'SMS text messaging directing victims to lookalike domains hosting an Evilginx reverse proxy kit.',
    initialDeception: 'Staff received SMS messages appearing to come from IT or HR, claiming: "Your schedule has changed" or "Your password has expired," providing links to lookalike domains matching company naming patterns.',
    victimInteraction: 'Employees clicked the SMS links on mobile devices, landed on what appeared to be their corporate Okta Single Sign-On portal, entered their credentials, and entered their SMS/TOTP authentication codes.',
    attackerObjective: 'Capture authenticated session cookies (session tokens) to access internal enterprise portals without triggering new MFA prompts.',
    warningSignsMissed: [
      'SMS received from unverified consumer phone numbers rather than official corporate notification channels.',
      'Domains were newly registered with commercial registrars and contained hyphenated variations of corporate SSO endpoints.',
      'Mobile browser address bars truncated long URLs, obscuring the suspicious domain endings.'
    ],
    whyAttackSucceeded: 'Traditional MFA methods (SMS codes and standard authenticator app passcodes) are phishable via reverse proxies because the proxy relays user input to the real service in real time and captures the resulting session cookie. The organization had not yet universally enforced phishing-resistant FIDO2 hardware keys.',
    financialOrDataImpact: 'Unauthorized access to internal support consoles; customer contact records exposed; extensive enterprise-wide credential and token revocations.',
    lessonsLearned: [
      'Phishing-Resistant MFA Is Essential: FIDO2 / WebAuthn hardware security keys cryptographically bind the authentication assertion to the exact domain origin in the browser address bar, neutralizing reverse-proxy interception.',
      'Never Route Internal IT Alerts Exclusively via SMS: Employees must be trained that identity credentials and shift schedules are never updated via external SMS links.',
      'Proactive Domain Monitoring: Implement automated threat intelligence to identify and initiate takedowns on newly registered lookalike domains.'
    ],
    whatShouldHaveHappened: 'Employees receiving the SMS should have recognized that internal scheduling is managed via corporate software, refrained from tapping the link, and reported the SMS to the security operations center.',
    whatHappened: 'Attackers sent SMS text messages to hundreds of employees: "Your work shift schedule has changed. Review updates at [company]-sso-portal.com". The deceptive URL hosted a live reverse proxy that fetched the real login page from the authentic identity provider. When employees typed their credentials and one-time SMS passcodes, the proxy forwarded them to the real service, received the valid session cookie from Okta, and saved the session cookie for the attacker while logging the employee in normally.',
    sources: [
      {
        title: 'Twilio Official Security Incident Post-Mortem',
        citation: 'Twilio Security: "An update on the August 2022 security incident" (Published August 2022, updated September 2022)'
      },
      {
        title: 'CISA Cybersecurity Alert',
        citation: 'CISA Alert on Adversary-in-the-Middle (AiTM) Phishing Tactics and the Need for FIDO2-Based Multi-Factor Authentication'
      }
    ]
  },

  // =========================================================================
  // CASE 4: HEALTHCARE CREDENTIAL HARVEST (COMPOSITE EDUCATIONAL CASE)
  // =========================================================================
  {
    id: 'case-4',
    caseType: 'Composite Educational Case',
    title: 'The Cloned Cloud Portal Healthcare Credential Harvest',
    targetOrganization: 'Regional Health System (Composite Educational Scenario)',
    industry: 'Healthcare & Hospital Administration',
    year: 2024,
    attackMethod: 'Spear Phishing with Cloned Shared-Document Lure on Cloud Infrastructure',
    summary: 'A composite training scenario based on healthcare sector advisories: spear phishing directed at executive assistants uses shared-document lures hosted on legitimate cloud storage to bypass domain reputation filters.',
    
    incidentOverview: 'This composite case models documented threats facing the healthcare sector. Adversaries conduct open-source reconnaissance to identify administrative assistants supporting clinical leadership. The attacker delivers a lure linking to an authentic cloud storage platform that hosts an embedded credential harvesting form, attempting to extract administrative credentials.',
    target: 'Executive Assistants and Clinical Operations Staff.',
    attackVector: 'Email lure linking to a cloned Microsoft 365 login portal hosted on legitimate public cloud infrastructure.',
    initialDeception: 'An email arrives with the subject: "Confidential: Clinical Governance Review.pdf", containing a button linking to a document hosted on a public cloud storage service.',
    victimInteraction: 'The assistant opens the link and sees a sign-in screen. Despite already being authenticated to their local computer, they enter their corporate credentials to "view the secure PDF."',
    attackerObjective: 'Harvest administrative credentials to gain lateral access to sensitive hospital databases and evaluate ransomware deployment opportunities.',
    warningSignsMissed: [
      'The sender\'s address used an external lookalike domain rather than the hospital\'s official domain.',
      'A login prompt appeared unexpectedly despite the user already having an active Single Sign-On session.',
      'The document was shared via an external link rather than standard internal document-sharing repositories.'
    ],
    whyAttackSucceeded: 'The attacker hosted the lure on legitimate cloud infrastructure, allowing the message to bypass basic domain reputation filters. The victim assumed the secondary login prompt was routine security verification.',
    financialOrDataImpact: 'Potential exposure of patient records, substantial regulatory reporting requirements, and enterprise-wide password resets.',
    lessonsLearned: [
      'Cloud Hosting Does Not Guarantee Trust: Attackers regularly abuse legitimate cloud storage services to host credential-harvesting forms.',
      'The Unexpected Login Red Flag: If your browser is already authenticated to enterprise SSO, an unexpected secondary login prompt should immediately raise suspicion.',
      'Role-Specific Training: Administrative staff manage sensitive communications and require targeted training on shared-document pretexts.'
    ],
    whatShouldHaveHappened: 'The assistant should have verified the sender domain, questioned why a login prompt appeared when SSO was already active, and checked directly with the sender before entering any credentials.',
    whatHappened: 'Attackers researched LinkedIn to identify executive assistants supporting hospital trustees. A targeted message arrived purportedly from the Chief Medical Officer sharing an encrypted SharePoint PDF titled "Executive Board Q2 Restructuring Agenda.pdf". Clicking the link routed users to a high-fidelity Microsoft login clone hosted on Microsoft Azure Blob Storage (giving it an authentic microsoft.com SSL certificate). The harvested credentials allowed attackers to pivot into patient record databases.',
    sources: [
      {
        title: 'U.S. Department of Health and Human Services (HHS HC3)',
        citation: 'HC3 Sector Alert: Spear-Phishing and Credential Harvesting Trends Targeting the Healthcare and Public Health Sector'
      },
      {
        title: 'American Hospital Association (AHA)',
        citation: 'Cybersecurity Advisory: Defending Healthcare Administrative Workflows Against Living-off-the-Cloud Threats'
      }
    ]
  },

  // =========================================================================
  // CASE 5: MALICIOUS SAAS OAUTH CONSENT PHISHING (DOCUMENTED CASE)
  // =========================================================================
  {
    id: 'case-5',
    caseType: 'Documented Case',
    title: 'The Malicious Cloud SaaS OAuth "Consent Phishing" Campaigns',
    targetOrganization: 'Enterprise Cloud & Technology Organizations (Documented Campaign Series)',
    industry: 'Enterprise Software & Cloud Engineering',
    year: 2023,
    attackMethod: 'Illicit OAuth Application Grant / Consent Phishing',
    summary: 'A documented threat campaign series identified by major cloud providers: users are deceived into authorizing a third-party cloud application that silently grants adversaries persistent programmatic API access to email and files without stealing passwords.',
    
    incidentOverview: 'Unlike traditional credential theft, adversaries in these campaigns do not attempt to steal passwords. Instead, they register malicious third-party applications with major cloud platform developer programs and lure employees into approving an OAuth consent dialog. Authorizing the application grants the threat actors programmatic API access to corporate email, files, and calendars that persists even through password resets.',
    target: 'DevOps engineers, cloud architects, and corporate knowledge workers.',
    attackVector: 'Email invitations leading to authentic cloud OAuth 2.0 authorization endpoints.',
    initialDeception: 'Recipients receive an invitation purportedly recommending a new productivity or security utility (e.g., an automated code review or meeting assistant), directing them to a legitimate cloud platform authorization prompt.',
    victimInteraction: 'Users click the link and view an authentic cloud platform consent dialog. Trusting the dialog because it is served by the authentic provider, they click "Accept" without scrutinizing the requested permissions.',
    attackerObjective: 'Obtain long-lived OAuth refresh tokens that grant persistent API access to corporate data without requiring user passwords or triggering MFA prompts.',
    warningSignsMissed: [
      'The application requested extensive permissions: reading and writing email, accessing all user files, and offline access.',
      'The application publisher was unverified and unfamiliar to the organization\'s IT department.',
      'The tool had not been vetted through standard corporate software procurement or security review procedures.'
    ],
    whyAttackSucceeded: 'Users were trained to look for fraudulent login pages, but were unprepared for authentic OAuth consent prompts. Because no password was requested, victims believed the action was harmless.',
    financialOrDataImpact: 'Silent exfiltration of proprietary documents and internal communications; persistent API access; organization-wide revocation of third-party application tokens.',
    lessonsLearned: [
      'Consent Phishing Awareness: Teach employees that clicking "Accept" on an OAuth authorization screen can grant broad API access to company data.',
      'Restrict User Consent for Third-Party Apps: Cloud administrators should disable unmanaged end-user application consent and mandate administrative approval for API integrations.',
      'Regular OAuth Audit: Periodically audit enterprise application permissions and revoke access for inactive or unverified third-party applications.'
    ],
    whatShouldHaveHappened: 'The employee should have recognized that third-party applications requiring access to company data must go through official IT procurement and security review before authorization.',
    whatHappened: 'Adversaries registered a malicious cloud application and emailed engineers claiming it was a new internal AI productivity tool. When engineers clicked the link, the legitimate cloud platform displayed an OAuth consent screen asking for extensive permissions. The engineers approved the request, giving the attackers persistent access to internal emails, documents, and code repositories without ever entering a password.',
    sources: [
      {
        title: 'Microsoft Threat Intelligence Guidance',
        citation: 'Microsoft Security: "Protecting organizations against illicit consent grants and malicious OAuth applications" (Threat Research & Defense Advisory)'
      },
      {
        title: 'CISA Security Alert',
        citation: 'CISA Guidance: Mitigating Risks of Illicit Consent Grants and Third-Party Cloud Application Permissions'
      }
    ]
  },

  // =========================================================================
  // CASE 6: POSTAL SMISHING TO MOBILE BANKING TROJAN (COMPOSITE EDUCATIONAL CASE)
  // =========================================================================
  {
    id: 'case-6',
    caseType: 'Composite Educational Case',
    title: 'The Postal Parcel Smishing to Mobile Banking Trojan Campaign',
    targetOrganization: 'Mobile Workforce & Consumer Banking Users (Composite Educational Scenario)',
    industry: 'Logistics & Mobile Banking',
    year: 2024,
    attackMethod: 'Smishing with Mobile Application (.apk) Malware Delivery',
    summary: 'A composite training scenario modeled on global smishing investigations: SMS parcel notifications guide recipients to fake courier sites that prompt downloading a mobile application containing an infostealer or banking trojan.',
    
    incidentOverview: 'This composite educational scenario models widespread smishing campaigns investigated by international cybercrime agencies (such as FluBot and TeaBot variants). Attackers distribute SMS messages claiming an incoming parcel delivery requires address confirmation. Tapping the link routes the user to a deceptive web page instructing them to download an application file, attempting to install a mobile banking trojan.',
    target: 'Mobile smartphone users and enterprise employees using personal or mobile devices.',
    attackVector: 'SMS text message linking to an attacker-controlled web page distributing an unverified mobile application file.',
    initialDeception: 'The SMS reads: "Postal Delivery: Your package is on hold due to incomplete address details. Update your delivery preferences using our tracking helper: `postal-tracking-update.com/track`".',
    victimInteraction: 'The user taps the link on a mobile device, follows prompts on the landing page to download an installation file, and bypasses operating system security warnings to install the app.',
    attackerObjective: 'Gain mobile operating system permissions to intercept incoming SMS verification codes, log keystrokes, and overlay fake login interfaces over legitimate banking applications.',
    warningSignsMissed: [
      'The message arrived from an unfamiliar or unexpected phone number.',
      'The website instructed the user to download an installation package directly from the browser rather than an official app store.',
      'The application requested extensive permissions (e.g., accessibility and SMS access) unrelated to parcel delivery.'
    ],
    whyAttackSucceeded: 'The attacker exploited the routine expectation of package deliveries and the casual reading habits associated with mobile devices. Clear step-by-step instructions guided victims to bypass standard mobile security warnings.',
    financialOrDataImpact: 'Risk of compromised mobile banking accounts, unauthorized transactions, and unauthorized forwarding of incoming verification messages.',
    lessonsLearned: [
      'Never Sideload Applications: Legitimate couriers and service providers will never instruct users to enable "Install Unknown Apps" or download installation files from a web browser.',
      'SMS Verification Caution: Parcel delivery services do not require downloading an external application simply to verify a shipping address.',
      'Mobile Device Management: Organizations should use mobile device management (MDM) on corporate smartphones to restrict the installation of unapproved application packages.'
    ],
    whatShouldHaveHappened: 'The recipient should have recognized the suspicious link, avoided downloading any files, and checked their shipment directly on the courier\'s official website using their original order tracking number.',
    whatHappened: 'Attackers blasted SMS messages regarding failed parcel deliveries with links to a lookalike postal site. The site instructed users to download an app to schedule a redelivery. Victims who installed the app unwittingly installed a banking trojan that requested accessibility permissions, allowing the malware to intercept incoming MFA codes and overlay fake login screens over banking applications.',
    sources: [
      {
        title: 'Europol European Cybercrime Centre (EC3)',
        citation: 'Law Enforcement Operations Against Mobile Smishing and Banking Trojan Networks (EC3 Operation Announcements)'
      },
      {
        title: 'CERT-EU Threat Advisory',
        citation: 'Threats Posed by Mobile SMS Phishing Campaigns Distributing Malicious Android Application Packages'
      }
    ]
  }
];

import { Lesson } from '../types';

export const SAMPLE_LESSONS: Record<string, Lesson> = {
  // =========================================================================
  // MODULE 01: INTRODUCTION TO PHISHING
  // =========================================================================
  'introduction': {
    id: 'lesson-intro-1',
    slug: 'introduction',
    moduleId: 'mod-1',
    title: 'Introduction to Phishing & Attack Lifecycles',
    shortDescription: 'Understand what phishing is, the attacker’s core objectives, why deceptive communications remain widespread, and how to spot universal warning signs.',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'sec-intro-1',
        title: '01.1 What Is Phishing?',
        content: 'Phishing is a form of social engineering where an adversary masquerades as a trusted entity—such as a service provider, bank, cloud vendor, or colleague—to deceive individuals into performing actions that compromise security.\n\nThe attacker’s ultimate objectives generally fall into five distinct categories:\n• Credential Theft: Harvesting usernames, passwords, or session tokens to gain unauthorized access to accounts.\n• Financial Fraud: Deceiving victims into transferring funds, redirecting vendor invoices, or purchasing gift cards.\n• Malware Delivery: Tricking the recipient into opening files or downloading programs that contain malicious code.\n• Data Exfiltration: Extracting sensitive personal information, proprietary files, or customer records.\n• Account Takeover & Network Access: Establishing an initial foothold within an organization to navigate toward other internal systems.',
        progressiveDisclosure: {
          level1Simple: 'Phishing is digital deception. An attacker pretends to be someone you trust so you will share credentials, send money, or open dangerous files.',
          level2Example: 'You receive an unexpected email that appears to come from your human resources department stating that your direct deposit requires immediate confirmation, providing a link to an external login form.',
          level3Technical: 'Phishing targets human trust and decision-making rather than software vulnerabilities alone. Attackers bypass network boundaries by convincing legitimate users to provide valid authentication tokens or execute code within their own workstation session.',
          level4DeepDive: 'Modern phishing includes multi-stage techniques such as Adversary-in-the-Middle (AiTM) reverse proxies that relay authentication requests, as well as illicit OAuth application consent requests ("consent phishing") where users are asked to grant cloud API permissions to third-party applications.'
        },
        keyTakeaways: [
          'Phishing targets human trust, habits, and situational pressure rather than relying solely on software flaws.',
          'Attackers may seek credentials, financial transactions, sensitive documents, or initial access.',
          'Anyone can make a mistake when caught during busy, distracted, or high-pressure moments.'
        ],
        proTip: 'Whenever a communication requests credentials, financial changes, or sensitive data, verify the request through an independent, trusted channel.'
      },
      {
        id: 'sec-intro-2',
        title: '01.2 How a Phishing Attack Works: The 5-Stage Lifecycle',
        content: 'Phishing attacks generally follow a predictable, sequential operational lifecycle. Understanding these stages helps defenders recognize and interrupt the threat chain before harm occurs.',
        visualHighlight: {
          type: 'breakdown',
          title: 'The 5-Stage Attack Lifecycle',
          items: [
            { label: 'Stage 1: Message Delivery', value: 'Adversary crafts a deceptive message (email, SMS, voice call) engineered to reach the target\'s inbox or device.' },
            { label: 'Stage 2: Victim Interaction', value: 'The recipient experiences curiosity, urgency, or concern, opens the message, and interacts with a link or attachment.' },
            { label: 'Stage 3: Credential / Data Capture', value: 'The victim is routed to a lookalike portal, prompted for permissions, or runs a file containing malicious code.' },
            { label: 'Stage 4: Attacker Access', value: 'The adversary receives captured credentials, session tokens, or establishes remote access to a workstation.' },
            { label: 'Stage 5: Abuse & Fraud', value: 'The attacker pursues their ultimate objective: fraudulent wire transfers, data exfiltration, extortion, or lateral movement.' }
          ]
        },
        warningNote: 'Interaction with a fraudulent form can take only seconds. Recognizing warning signs before clicking or submitting data provides the strongest line of defense.'
      },
      {
        id: 'sec-intro-3',
        title: '01.3 Why Phishing Remains Widespread',
        content: 'Phishing consistently ranks among the most common initial access vectors for several fundamental reasons:\n\n1. Asymmetric Effort: Attackers can automate the distribution of large volumes of messages at low cost. Even if the overwhelming majority of recipients ignore the message, a single interaction can yield access.\n\n2. Cognitive Load & Multitasking: People process numerous communications daily while managing deadlines, meetings, and competing priorities. When attention is divided, people naturally rely on familiar cues and mental shortcuts rather than inspecting technical details.\n\n3. Abuse of Legitimate Services: Threat actors frequently host deceptive forms or documents on well-known public cloud services (such as shared document platforms and cloud storage). Because these services are familiar and widely used, automated email filters and users alike may not flag them immediately.',
        keyTakeaways: [
          'Falling for a deceptive message is not a reflection of intelligence; it exploits normal human communication habits and divided attention.',
          'Attackers frequently leverage trusted cloud infrastructure to make their lures appear routine.'
        ]
      },
      {
        id: 'sec-intro-4',
        title: '01.4 Common Warning Signs',
        content: 'While phishing attacks vary in technical sophistication, many deceptive communications exhibit recognizable warning signs:\n\n• Artificial Urgency: Short deadlines demanding immediate action ("within 2 hours", "action required before account closure").\n• Fear of Negative Repercussions: Threatening disciplinary action, legal penalties, service interruption, or financial loss.\n• Curiosity or Unsolicited Offers: Promises of unexpected bonuses, confidential reorganization plans, or prizes.\n• Authority Impersonation: Messages claiming to come from senior executives, legal counsel, or IT administrators demanding exceptions to standard procedures.\n• Unexpected Communication: Unprompted invoices, shipping alerts for items never ordered, or password reset notices you did not request.',
        visualHighlight: {
          type: 'redflags',
          title: 'Common Warning Signals Diagnostic',
          items: [
            { label: 'Artificial Urgency', value: 'Demands for fast compliance intended to discourage deliberate verification.', isSuspicious: true },
            { label: 'Unexpected Request', value: 'Unplanned demands for passwords, financial routing changes, or personal data.', isSuspicious: true },
            { label: 'Generic Greeting', value: 'Vague salutations such as "Dear Customer" or "Dear Employee" on supposedly urgent notices.', isSuspicious: true },
            { label: 'Channel Inconsistency', value: 'A colleague or executive contacting you via personal email or messaging apps for sensitive business tasks.', isSuspicious: true }
          ]
        }
      },
      {
        id: 'sec-intro-5',
        title: '01.5 Phishing vs Legitimate Communication',
        content: 'Distinguishing legitimate business communications from deceptive attempts requires comparing organizational norms against attacker tactics.',
        visualHighlight: {
          type: 'comparison',
          title: 'Communication Comparison Matrix',
          items: [
            { label: 'Verification Protocol', value: 'Legitimate: Directs you to standard internal portals or bookmarks. Phishing: Often forces you to click a specific external link in the email body.' },
            { label: 'Password Policy', value: 'Legitimate: Reputable organizations do not ask you to email passwords or confirm them via unverified links. Phishing: Frequently insists credentials must be verified to retain access.' },
            { label: 'Channel Consistency', value: 'Legitimate: Arrives from standard corporate domain with consistent display and reply paths. Phishing: Envelope From, Reply-To, and display name may contradict one another.' },
            { label: 'Tone & Pressure', value: 'Legitimate: Accommodates standard operational and review processes. Phishing: Coercive, urgent, and encourages bypassing standard approval procedures.' }
          ]
        },
        proTip: 'When in doubt, use a known good bookmark or navigate directly to the official portal address in your browser rather than clicking email hyperlinks.'
      }
    ],
    practicalChecklist: [
      'Recognize that technical perimeter firewalls cannot prevent legitimate credential entry on fake sites.',
      'Treat any unexpected inbound message demanding fast action with calm, methodical skepticism.',
      'Always look for common warning signs: artificial urgency, fear, authority coercion, and unexpected requests.',
      'Know your organization’s official incident reporting pathway before an emergency arises.'
    ],
    knowledgeCheck: {
      question: 'You receive an unexpected email purportedly from your organization\'s payroll department at 4:30 PM on a Friday. The message claims: "Error detected in your direct deposit. If you do not verify your banking credentials via the link below within 2 hours, your monthly salary payout will be delayed." What is the safest immediate action?',
      scenarioContext: 'Inbound message with a high-priority red exclamation mark and an external lookalike sender address.',
      options: [
        { id: 'opt-a', text: 'Click the link quickly to ensure your salary payment is not delayed over the weekend.' },
        { id: 'opt-b', text: 'Reply to the sender asking them to confirm the email was sent from the genuine payroll team.' },
        { id: 'opt-c', text: 'Pause, recognize the emotional urgency red flag, and verify the claim directly with payroll via known internal phone or directory contacts.' },
        { id: 'opt-d', text: 'Forward the message to your personal email account to inspect the link from home.' }
      ],
      correctOptionId: 'opt-c',
      explanation: 'The message exhibits multiple classic warning signs: artificial time pressure (2-hour countdown), fear of negative consequence (delayed paycheck), Friday afternoon dispatch, and an external link. Pausing and contacting payroll through a pre-verified internal directory confirms whether any real payroll issue exists without exposing credentials.',
      takeaway: 'Never verify a suspicious message by replying to it or clicking its links. Always use an independent, pre-established channel.'
    }
  },

  // =========================================================================
  // MODULE 02: TYPES OF PHISHING ATTACKS
  // =========================================================================
  'phishing-types': {
    id: 'lesson-types-1',
    slug: 'phishing-types',
    moduleId: 'mod-2',
    title: 'Phishing Attack Vectors & Taxonomy',
    shortDescription: 'Master the 8 core phishing variants: Bulk, Spear, Whaling, Business Email Compromise, Smishing, Vishing, Clone Phishing, and Pharming.',
    category: 'Attack Vectors',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'sec-type-1',
        title: '02.1 Bulk Phishing (Mass Campaigns)',
        content: '1. What it is: Automated, non-targeted messages sent to large numbers of recipients simultaneously.\n2. Who is commonly targeted: General consumers, employees of any company, banking customers.\n3. How it works: Attackers cast a wide net hoping that a fraction of recipients use the spoofed service (e.g., streaming providers, parcel couriers, retail platforms).\n4. Typical attacker message: "Your parcel is pending clearance. Confirm delivery details" or "Your subscription payment could not be processed."\n5. Warning signs: Generic salutations ("Dear Customer"), claims regarding services you do not use, sender addresses unrelated to the cited brand.\n6. Example scenario: An employee receives an alert on their corporate email stating their personal video streaming account has expired.\n7. Defensive action: Delete and report the message. When verifying an account issue, navigate to the official website or app independently.',
        keyTakeaways: [
          'Bulk phishing relies on volume and probability rather than tailored research.',
          'Look for generic greetings and notifications about accounts unrelated to your work.'
        ]
      },
      {
        id: 'sec-type-2',
        title: '02.2 Spear Phishing (Targeted Deception)',
        content: '1. What it is: A customized phishing attempt directed at a specific individual, department, or organization.\n2. Who is commonly targeted: Project managers, engineers, HR specialists, procurement coordinators.\n3. How it works: Adversaries conduct reconnaissance using publicly accessible sources (LinkedIn, social media, conference agendas, vendor press releases) to craft messages referencing real colleagues, projects, or business tools.\n4. Typical attacker message: "Hi Alex, attached is the updated schedule for the migration project we discussed at yesterday’s sync."\n5. Warning signs: Slight deviations in typical communication style, unexpected external addresses for internal contacts, unprompted requests to open shared files.\n6. Example scenario: An engineer receives an email appearing to come from their team lead sharing a "critical architecture diagram" that requires downloading an unverified file.\n7. Defensive action: Confirm the request through an internal communication channel (such as corporate chat or an internal phone extension) before opening files or links.',
        proTip: 'The more relevant and personalized an unexpected communication appears, the more important it is to confirm it through an independent channel.'
      },
      {
        id: 'sec-type-3',
        title: '02.3 Whaling (Executive Impersonation)',
        content: '1. What it is: A specialized category of spear phishing targeting senior executives, board members, or high-level decision makers—or messages sent impersonating them.\n2. Who is commonly targeted: Chief Financial Officers, Chief Executive Officers, board members, executive assistants, controllers.\n3. How it works: Attackers exploit perceived executive authority and organizational deference to pressure staff into bypassing standard verification and approval procedures.\n4. Typical attacker message: "I am in transit and need you to settle an urgent legal retainer wire before 5 PM. Please keep this confidential until our announcement."\n5. Warning signs: Requests for immediate wire transfers, demands for strict secrecy, instructions not to consult peers or legal counsel, and pressure outside regular approval chains.\n6. Example scenario: A finance manager receives an email purportedly from the CEO ordering an emergency wire transfer to secure a confidential acquisition.\n7. Defensive action: Require dual-authorization for high-value financial transfers, and verify executive directives through pre-established verbal or in-person channels.',
        warningNote: 'Standard corporate governance should never permit high-value financial transfers based solely on an unverified email request.'
      },
      {
        id: 'sec-type-4',
        title: '02.4 Business Email Compromise (BEC)',
        content: '1. What it is: A financial fraud scheme where attackers compromise or impersonate legitimate business email accounts to deceive organizations into transferring funds or altering payment details.\n2. Who is commonly targeted: Accounts Payable staff, procurement specialists, finance directors, supply chain managers.\n3. How it works: Attackers compromise an authentic vendor account or register a convincing lookalike domain, monitor billing discussions, and inject updated banking coordinates into pending invoices.\n4. Typical attacker message: "Due to our annual banking audit, please remit payment for Invoice #8492 to our updated bank routing coordinates attached."\n5. Warning signs: Last-minute alteration of established bank routing numbers, urgency to settle invoices ahead of contractual schedule, slight variations in domain spelling.\n6. Example scenario: A regular parts supplier sends an invoice from their authentic email account, but the payment routing coordinates inside the PDF have been modified by an attacker with mailbox access.\n7. Defensive action: Require verbal confirmation of all bank coordinate changes using the pre-recorded phone number on file—never the contact number listed on the invoice itself.',
        keyTakeaways: [
          'BEC frequently originates from real, compromised corporate email inboxes, meaning technical authentication checks can pass.',
          'Mandatory verbal confirmation of bank coordinate changes using known contact numbers is the single most effective countermeasure against BEC.'
        ]
      },
      {
        id: 'sec-type-5',
        title: '02.5 Smishing (SMS / Mobile Messaging)',
        content: '1. What it is: Phishing conducted via SMS text messaging or mobile messaging applications.\n2. Who is commonly targeted: Any mobile phone user, mobile workforce employees, on-call personnel.\n3. How it works: Attackers exploit high open rates and the casual context of mobile messaging, taking advantage of smaller screens where address bars may truncate long URLs.\n4. Typical attacker message: "Delivery Alert: Your package is on hold due to missing address details. Update preferences at: `track-parcel-update.com`".\n5. Warning signs: Messages from unknown numbers or unfamiliar shortcodes, shortened or hyphenated URLs, urgent notifications about unexpected deliveries or fraud alerts.\n6. Example scenario: An employee receives an SMS claiming their corporate Single Sign-On session has expired and instructing them to tap a link to re-authenticate.\n7. Defensive action: Avoid tapping links in unsolicited text messages. When checking account status, open the official app or use a trusted browser bookmark manually.',
        proTip: 'Mobile browser address bars often display only a portion of long web addresses. Tap or inspect the address bar to view the full domain before entering any information.'
      },
      {
        id: 'sec-type-6',
        title: '02.6 Vishing (Voice Phishing & Phone Social Engineering)',
        content: '1. What it is: Social engineering conducted over telephone calls or voice communications, often involving caller ID spoofing.\n2. Who is commonly targeted: Help desk staff, customer support representatives, finance personnel, general employees.\n3. How it works: Attackers call the victim, impersonate an IT support technician, bank fraud investigator, or executive, and use conversational pressure to extract credentials or multi-factor authentication codes.\n4. Typical attacker message: "This is IT Support. We detected an unauthorized login attempt on your account. A verification passcode was just sent to your phone—please read it back so we can secure the session."\n5. Warning signs: Inbound callers requesting one-time verification passcodes, demands for remote desktop access software, insistence on immediate compliance, and manufactured urgency.\n6. Example scenario: A caller claiming to be from corporate IT asks an employee for their MFA passcode to "complete an urgent security update."\n7. Defensive action: Disconnect the call. Legitimate IT staff and financial institutions will not ask you to read back a one-time MFA passcode over the phone.',
        warningNote: 'One-time passwords sent to your device are meant for your direct entry on official portals. Anyone asking you to read an MFA code aloud over the phone is attempting to access your account.'
      },
      {
        id: 'sec-type-7',
        title: '02.7 Clone Phishing (Message Replication & Tampering)',
        content: '1. What it is: An attack where an authentic, previously delivered email containing an attachment or link is copied (cloned), modified with a malicious payload, and resent from a spoofed or compromised address.\n2. Who is commonly targeted: Participants in ongoing business email threads, customer service teams.\n3. How it works: The attacker gains access to historical sent messages, replicates the exact formatting, language, and signatures, and replaces legitimate links or attachments with deceptive counterparts.\n4. Typical attacker message: "Resending the previously shared contract as the earlier attachment was corrupted. Please review the updated version attached."\n5. Warning signs: A duplicate message arriving unexpectedly, an unprompted "resend" from an address slightly different from the original, sudden requests to download files in different formats.\n6. Example scenario: An employee receives a duplicate of a vendor invoice they settled yesterday, asking them to "use this corrected link instead."\n7. Defensive action: Check whether the original matter was already resolved. Confirm with the sender through an independent message thread or phone call before opening new files.',
        keyTakeaways: [
          'Clone phishing can be convincing because the formatting and signatures are copied from real communications.',
          'Always examine why a previously completed communication is suddenly being re-sent.'
        ]
      },
      {
        id: 'sec-type-8',
        title: '02.8 Pharming (Redirection to Fraudulent Destinations)',
        content: '1. What it is: A technique in which a victim is redirected to a fraudulent destination even though they intended to reach a legitimate service (for example, typing a correct domain name or clicking a bookmark).\n2. Who is commonly targeted: Online banking users, e-commerce shoppers, users on unmanaged or compromised networks.\n3. How it works: Pharming involves manipulating domain name resolution. Rather than relying on the user clicking a fraudulent link in an email, attackers may manipulate DNS settings, compromise local network routers, or alter local system host configurations so that requests for a legitimate domain resolve to an attacker-controlled server IP.\n4. Typical attacker message: No message is required; redirection occurs in the background when the user attempts to visit the genuine website.\n5. Warning signs: Unexpected changes in website layout, browser alerts regarding invalid connection security certificates, sudden requests to re-enter sensitive details on familiar pages, or anomalous network behavior.\n6. Example scenario: An individual connects to an untrusted public network where DNS queries are redirected to an attacker-controlled harvest page resembling their banking portal.\n7. Defensive action: Never bypass browser certificate warnings. Avoid conducting sensitive transactions on untrusted networks without a trusted corporate VPN, and keep network equipment updated.',
        keyTakeaways: [
          'Pharming redirects users to deceptive sites even when they type the correct web address.',
          'A valid HTTPS certificate does not prove that the destination website or its operator is trustworthy.'
        ]
      }
    ],
    practicalChecklist: [
      'Distinguish untargeted bulk campaigns from high-customization spear-phishing attempts.',
      'Treat unsolicited SMS messages containing links with caution.',
      'Never recite one-time MFA codes or passwords over unsolicited inbound phone calls.',
      'Mandate verbal out-of-band verification for any vendor bank account routing modifications.',
      'Pay attention to browser connection security warnings and unexpected page behavior.'
    ],
    knowledgeCheck: {
      question: 'An accounts payable specialist receives an email from an established supplier’s genuine email address. The email includes a valid PDF invoice but states: "Our primary bank is undergoing an annual audit; please direct this month\'s $85,000 wire transfer to our secondary account coordinates listed in the attached invoice." What attack type does this scenario represent?',
      scenarioContext: 'Email arrived from the supplier\'s authentic domain with valid SPF/DKIM authentication.',
      options: [
        { id: 'opt-a', text: 'Bulk Phishing, because suppliers invoice many companies simultaneously.' },
        { id: 'opt-b', text: 'Business Email Compromise (BEC) / Vendor Email Compromise, using invoice diversion.' },
        { id: 'opt-c', text: 'Pharming, because the funds are redirected to a different destination.' },
        { id: 'opt-d', text: 'Smishing, because invoices involve commercial transactions.' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'This is a classic Business Email Compromise (BEC) / Vendor Email Compromise scheme. Attackers compromise the vendor\'s real email account or create a convincing pretext to insert altered banking coordinates into legitimate business transactions. Because the email originates from the vendor\'s authentic account, gateway SPF/DKIM checks pass.',
      takeaway: 'Any change in vendor banking coordinates must be confirmed out-of-band using a known pre-recorded phone number, regardless of email authentication status.'
    }
  },

  // =========================================================================
  // MODULE 03: ANATOMY OF PHISHING EMAILS
  // =========================================================================
  'phishing-emails': {
    id: 'lesson-emails-1',
    slug: 'phishing-emails',
    moduleId: 'mod-3',
    title: 'Anatomy of Phishing Emails & Forensic Inspection',
    shortDescription: 'Master the 12-point email inspection process, uncover display name spoofing, understand email authentication realities (SPF/DKIM/DMARC), and apply the 5-step inspection routine.',
    category: 'Email Defense',
    difficulty: 'Intermediate',
    estimatedMinutes: 22,
    reinforcingLab: {
      title: 'Email Red-Flag Inspector',
      description: 'Put your inspection skills to work in our interactive lab. Inspect raw headers, trace mismatched Return-Paths, and flag suspicious attachments in real time.',
      route: '/email-analysis',
      buttonLabel: 'Launch Email Red-Flag Inspector Lab',
      iconName: 'mail'
    },
    sections: [
      {
        id: 'sec-email-1',
        title: '03.1 The 12-Point Email Anatomy Inspection',
        content: 'Systematic email inspection involves evaluating 12 specific structural elements rather than judging a message by its visual layout alone:\n\n1. Sender Display Name: The descriptive label shown by the email client (e.g., "Microsoft IT Support"). Easily customized by the sender.\n2. Sender Email Address: The actual mailbox and domain shown in the "From:" line (e.g., `support@mail-update39.net`).\n3. Reply-To Address: Where replies are routed if you click Reply. Attackers may configure this to point to an external mailbox.\n4. Recipient List: Is the message addressed to you individually, or are numerous recipients blind-copied (BCC)?\n5. Subject Line: Often engineered to provoke alarm, curiosity, or urgency.\n6. Message Context: Did you solicit this communication? Does the timing align with known business events?\n7. Emotional Tone & Urgency: Look for manufactured deadlines ("immediate action required within 60 minutes").\n8. Specific Call to Action: Does the message demand credentials, payment, or file downloads?\n9. Hyperlink Destinations: Where do embedded buttons and text links actually lead when hovered over?\n10. Attachments: Are there unexpected file attachments, especially macro-enabled documents, ISO files, ZIP archives, or HTML files?\n11. Corporate Signatures & Branding: Mismatched logos, incorrect address footers, or missing corporate disclaimers.\n12. Technical Authentication Headers: Results from SPF, DKIM, and DMARC verification.',
        visualHighlight: {
          type: 'redflags',
          title: 'Display Name Spoofing vs Header Reality',
          items: [
            { label: 'Visible Display Name', value: 'Microsoft 365 Security Team', isSuspicious: false, explanation: 'Can be set to any arbitrary string in many mail clients' },
            { label: 'Actual From Address', value: 'admin@sec-msoffice-notice39.co', isSuspicious: true, explanation: 'Hyphenated lookalike domain registered on .co rather than microsoft.com' },
            { label: 'Reply-To Address', value: 'harvester-drop@proton.me', isSuspicious: true, explanation: 'Steers replies to an unmonitored external mailbox' }
          ]
        },
        proTip: 'On desktop email clients, hover your cursor over the sender name to reveal the actual email address enclosed in angle brackets (<user@domain.com>).'
      },
      {
        id: 'sec-email-2',
        title: '03.2 Email Authentication Protocols: What SPF, DKIM & DMARC Really Mean',
        content: 'Email authentication protocols establish message provenance, but learners must understand their precise boundaries.\n\n• SPF (Sender Policy Framework): Helps receiving mail servers evaluate whether a sending server is authorized by the domain owner to send mail on their behalf.\n• DKIM (DomainKeys Identified Mail): Provides a cryptographic signature that helps verify that a message was signed by the sending domain and was not altered after signing.\n• DMARC (Domain-based Message Authentication, Reporting & Conformance): Allows domain owners to publish policies regarding how receiving servers should treat messages that fail SPF/DKIM, and checks alignment between the authenticated domain and the visible From domain.\n\nCRITICAL DEFENSIVE RULE:\nPassing SPF, DKIM, and DMARC DOES NOT prove that an email is safe or trustworthy!\n\nHere is why:\n1. An attacker can register their own domain (e.g., `update-account-notice.com`), configure valid SPF and DKIM records, and deliver properly authenticated phishing messages.\n2. In Business Email Compromise (BEC), attackers use compromised legitimate employee accounts. Because the email originates from the genuine corporate server, all SPF, DKIM, and DMARC checks will pass all technical authentication checks legitimately.',
        progressiveDisclosure: {
          level1Simple: 'Email authentication checks whether an email really came from the mail server associated with the address, not whether the sender is telling the truth.',
          level2Example: 'An attacker sends a phishing message from an address on a domain they registered yesterday. The email passes SPF and DKIM because the attacker owns that domain and set up valid records for it.',
          level3Technical: 'SPF validates server IP against published DNS records; DKIM cryptographically signs header fields and body content; DMARC enforces identifier alignment between the visible From address and authenticated domains. None of these evaluate message intent, semantic truth, or attached payloads.',
          level4DeepDive: 'Authentication-Results headers record forensic data: `dmarc=pass (p=reject) header.from=company.com`. If DMARC policy is set to `p=none`, receiving gateways will deliver failing messages anyway. Indirect mail flows (such as mailing lists or forwarding) can break SPF alignment, requiring DKIM preservation.'
        },
        warningNote: 'A passing authentication result does not prove that the message is benign, that the sender is trustworthy, or that the request is legitimate.'
      },
      {
        id: 'sec-email-3',
        title: '03.3 Weaponized Attachments & Hidden Link Hazards',
        content: 'Email security gateways filter direct executable files, leading attackers to use alternative delivery formats:\n\n• HTML / HTM Attachments: Attackers attach `.html` files containing offline credential forms or JavaScript obfuscation. Opening the file launches a browser locally, bypassing some gateway web reputation filters.\n• Password-Protected Archives: Placing files inside an encrypted ZIP or archive with the password in the email body prevents automated gateway scanners from analyzing the contents.\n• ISO / VHD Disk Images: Disk images can contain nested files that bypass Mark-of-the-Web (MotW) flags on some systems.\n• Macro-Enabled Documents: Office documents (`.docm`, `.xlsm`) prompting users to "Enable Content" to view a blurred document, which can execute embedded Visual Basic scripts.',
        keyTakeaways: [
          'Do not enable macros or script execution on unexpected received documents.',
          'HTML attachments are frequently used to host offline credential-harvesting forms.'
        ]
      },
      {
        id: 'sec-email-4',
        title: '03.4 The Repeatable 5-Step Email Inspection Routine',
        content: 'To maintain consistent vigilance without excessive fatigue during busy workdays, apply this repeatable 5-step checklist to any unexpected or high-stakes message:',
        visualHighlight: {
          type: 'breakdown',
          title: 'The 5-Step Email Inspection Routine',
          items: [
            { label: 'Step 1: Check Envelope vs Display Name', value: 'Look beyond the friendly name. Inspect the domain inside the angle brackets and check the Reply-To address.' },
            { label: 'Step 2: Scrutinize Request & Urgency', value: 'Does the message demand immediate action, passwords, payment changes, or confidential disclosures?' },
            { label: 'Step 3: Preview Hyperlinks (Hover Don’t Click)', value: 'Hover over links to preview destination URLs. Verify the root domain before the first slash.' },
            { label: 'Step 4: Inspect Attachments & Extensions', value: 'Check file extensions. Beware of unexpected HTML files, disk images, and password-protected archives.' },
            { label: 'Step 5: Verify Out-of-Band', value: 'If the request involves money, credentials, or sensitive data, call the sender using a pre-established trusted directory.' }
          ]
        },
        proTip: 'Memorizing the 5-Step Routine provides a reliable inspection habit that helps identify common deception patterns before interacting with suspicious messages.'
      }
    ],
    practicalChecklist: [
      'Expand email headers and inspect the true sender domain before reading the body.',
      'Check if the Reply-To header points to an unexpected or external email service.',
      'Hover over hyperlinks to preview destination URLs before clicking.',
      'Never enable macros or execution scripts on received documents.',
      'Remember that valid SPF/DKIM/DMARC authentication does not guarantee safe content.'
    ],
    knowledgeCheck: {
      question: 'You receive an email from "IT Helpdesk <support@company-auth-portal.com>" that passes SPF, DKIM, and DMARC verification checks. The email informs you that your cloud storage is nearly full and provides a button to "Verify Your Account to Expand Storage." What does the passing DMARC authentication status prove?',
      scenarioContext: 'Email displays an "Authenticated" badge in your client UI.',
      options: [
        { id: 'opt-a', text: 'It proves the email is completely safe and genuine because DMARC blocks all phishing.' },
        { id: 'opt-b', text: 'It proves only that the email was legitimately sent from the domain "company-auth-portal.com", NOT that the domain or request is trustworthy.' },
        { id: 'opt-c', text: 'It proves your company\'s internal IT department officially owns the domain "company-auth-portal.com".' },
        { id: 'opt-d', text: 'It proves that any attachments in the email have been thoroughly scanned and verified free of malware.' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Email authentication protocols (SPF, DKIM, DMARC) verify domain alignment and server authorization; they do NOT evaluate sender intent, domain legitimacy, or message trustworthiness. An attacker can easily register "company-auth-portal.com", configure valid SPF/DKIM records, and deliver properly authenticated phishing emails.',
      takeaway: 'Passing SPF/DKIM/DMARC confirms the message came from the domain owner, but says nothing about whether that domain owner is legitimate or malicious.'
    }
  },

  // =========================================================================
  // MODULE 04: FAKE WEBSITES & IMPERSONATION
  // =========================================================================
  'fake-websites': {
    id: 'lesson-web-1',
    slug: 'fake-websites',
    moduleId: 'mod-4',
    title: 'Recognizing Fake Websites & Impersonation',
    shortDescription: 'Master URL anatomy, identify deceptive subdomains and lookalike domains, understand why HTTPS does not equal legitimacy, and apply the golden rule of URL inspection.',
    category: 'Web Defense',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    reinforcingLab: {
      title: 'URL & Domain Deconstructor',
      description: 'Dissect real deceptive URLs in our forensic lab. Break apart protocols, subdomains, apex domains, and query strings with automated risk scoring.',
      route: '/url-analysis',
      buttonLabel: 'Launch URL & Domain Deconstructor Lab',
      iconName: 'travel_explore'
    },
    sections: [
      {
        id: 'sec-web-1',
        title: '04.1 The Anatomy of a URL: What to Look For',
        content: 'To identify fraudulent websites, you must understand the anatomical components of a Uniform Resource Locator (URL).\n\nConsider this example URL:\n`https://login.example.com/account/security?session=8932`\n\n• Protocol (`https://`): Defines the communication protocol used to transmit data.\n• Subdomain (`login.`): A prefix created by the domain owner to organize website sections.\n• Registered / Apex Domain (`example`): The unique name registered with a domain registrar. This represents the legal entity operating the website.\n• Top-Level Domain (TLD) (`.com`): The domain extension (.com, .org, .edu, .net, .co).\n• Path (`/account/security`): The specific resource or directory on the destination web server.\n• Query Parameters (`?session=8932`): Optional parameters passed to web scripts.',
        progressiveDisclosure: {
          level1Simple: 'A web address has several parts, but only one part identifies who operates the site: the registered domain right before the first single slash.',
          level2Example: 'In `https://microsoft.com.security-verify.net/login`, the real operator is `security-verify.net`. The attacker configured "microsoft.com" as a subdomain to mislead viewers.',
          level3Technical: 'The Fully Qualified Domain Name (FQDN) is resolved hierarchically by DNS from right to left: root zone -> TLD (.net) -> authoritative nameserver for second-level domain (security-verify.net) -> host/subdomain (microsoft.com).',
          level4DeepDive: 'According to RFC 3986, a URI consists of `scheme:[//authority]path[?query][#fragment]`. The authority component contains `[userinfo@]host[:port]`. Attackers historically used userinfo tricks (`https://google.com@evil.com`), though modern web browsers suppress or warn on userinfo in address bars.'
        },
        visualHighlight: {
          type: 'breakdown',
          title: 'URL Component Breakdown',
          items: [
            { label: 'Protocol', value: 'https:// (Encrypted transport channel)' },
            { label: 'Subdomain', value: 'login. (Prefix configured by domain owner)' },
            { label: 'Registered Apex Domain', value: 'example.com (The actual registered domain)' },
            { label: 'Path & Query', value: '/account/security?id=102 (Location on the server)' }
          ]
        }
      },
      {
        id: 'sec-web-2',
        title: '04.2 Connection Security vs Website Trustworthiness: The HTTPS Reality',
        content: 'Phishing websites can use valid HTTPS certificates. HTTPS protects the connection between your browser and the website, but it does not prove that the website itself is legitimate.\n\nIt is essential to distinguish between connection security and site trustworthiness:\n\n• Connection Security (HTTPS): An SSL/TLS certificate ensures that communication between your browser and the server is encrypted in transit and cannot be easily modified or read by on-path eavesdroppers.\n• Site Trustworthiness: A certificate does NOT verify whether the entity running the server is an authentic organization or an attacker. Automated certificate authorities issue free certificates based on domain control, not organizational vetting.',
        warningNote: 'A padlock icon indicates that traffic is encrypted to the destination server. If that server belongs to an attacker, your encrypted password goes directly to the attacker.'
      },
      {
        id: 'sec-web-3',
        title: '04.3 Common Deceptive Domain Patterns',
        content: 'Adversaries employ several established patterns to disguise fraudulent destinations:\n\n1. Misleading Subdomains: Placing a trusted brand name inside a subdomain prefix (`https://paypal.com.account-update-sec.co`). The true domain is `account-update-sec.co`.\n\n2. Typosquatting: Registering common typographical errors or visual lookalikes (`micros0ft.com`, `amazn.com`).\n\n3. Homoglyph / Punycode Attacks: Substituting Latin letters with visually identical characters from other alphabets (such as Cyrillic \'а\' for Latin \'a\'). Browsers typically display these using Punycode (`xn--...`).\n\n4. Brand Affixing: Adding words such as "support", "portal", "login", or "verify" to a brand name (`netflix-support-login.com`).\n\n5. URL Shorteners & Open Redirects: Using link shorteners or abusing open redirect parameters on legitimate websites to conceal the final destination.',
        visualHighlight: {
          type: 'comparison',
          title: 'Legitimate vs Deceptive Domain Analysis',
          items: [
            { label: 'Legitimate Portal', value: 'https://login.microsoftonline.com/common/oauth2', explanation: 'Root domain is microsoftonline.com owned by Microsoft' },
            { label: 'Subdomain Trick', value: 'https://login.microsoftonline.com.auth-check.net/login', explanation: 'Actual root domain is auth-check.net' },
            { label: 'Typosquatting', value: 'https://www.micros0ft.com/account', explanation: 'Uses numeral 0 instead of letter o' },
            { label: 'Affixing Words', value: 'https://www.microsoft-sso-verify.com/login', explanation: 'Independent domain registered to mimic corporate SSO' }
          ]
        },
        proTip: 'Use a password manager. Legitimate password managers verify the exact registered domain before offering to autofill credentials and will refuse to autofill on lookalike domains.'
      },
      {
        id: 'sec-web-4',
        title: '04.4 The Golden Rule of URL Inspection: Read Left from the First Slash',
        content: 'To identify the registered domain of any URL without memorizing complex technical specifications, apply this practical technique:\n\n1. Locate the first single forward slash (`/`) that appears after the `https://` prefix.\n2. Look immediately to the left of that slash.\n3. The domain name immediately preceding that slash, along with its top-level extension (e.g., `domain.com`), is the registered domain.\n\nEverything to the left of that registered domain is a subdomain configured by the domain owner. Everything to the right of the slash is a path on that server.',
        keyTakeaways: [
          'Read backwards from the first single slash to find the registered domain.',
          'If the domain immediately before the slash is not the official domain of the service, do not submit credentials.'
        ]
      }
    ],
    practicalChecklist: [
      'Locate the first single slash after `https://` and read left to find the true registered domain.',
      'Never rely on the HTTPS browser padlock icon as proof of website legitimacy.',
      'Be alert to hyphenated domain names and added words like "-verify", "-login", or "-portal".',
      'Use a reputable password manager; if it does not autofill on a familiar login page, the domain may be deceptive.',
      'Bookmark critical banking and corporate SSO portals rather than clicking email links.'
    ],
    knowledgeCheck: {
      question: 'A user receives a text message asking them to update their delivery preferences. Tapping the link opens a page with a valid padlock icon and the address: "https://www.ups.com.delivery-tracking-portal.info/package/78912". What is the actual registered domain of this website?',
      scenarioContext: 'The website displays the authentic UPS shield logo, official corporate fonts, and an active SSL connection.',
      options: [
        { id: 'opt-a', text: 'ups.com, because "www.ups.com" appears immediately after the https:// protocol.' },
        { id: 'opt-b', text: 'delivery-tracking-portal.info, because it is the registered domain immediately preceding the first single forward slash.' },
        { id: 'opt-c', text: 'package/78912, because the path dictates the server destination.' },
        { id: 'opt-d', text: 'The site is officially verified because of the secure HTTPS padlock.' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Applying the Golden Rule of URL Inspection: find the first single forward slash after the protocol (`/package/...`). Looking immediately to the left reveals "delivery-tracking-portal.info". The "www.ups.com" portion is merely a misleading subdomain configured by the attacker to deceive users.',
      takeaway: 'Subdomains can be configured to mimic any brand. Always identify the apex domain immediately before the first single forward slash.'
    }
  },

  // =========================================================================
  // MODULE 05: SOCIAL ENGINEERING PSYCHOLOGY
  // =========================================================================
  'social-engineering': {
    id: 'lesson-soceng-1',
    slug: 'social-engineering',
    moduleId: 'mod-5',
    title: 'The Psychology of Social Engineering Manipulation',
    shortDescription: 'Understand how attackers exploit urgency, stress, and cognitive load, analyze realistic manipulation scenarios, and adopt the STOP -> THINK -> VERIFY -> ACT pause.',
    category: 'Human Psychology',
    difficulty: 'Intermediate',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'sec-se-1',
        title: '05.1 Common Psychological Levers in Social Engineering',
        content: 'Social engineering targets human communication norms and situational pressure rather than technical software vulnerabilities. Attackers commonly exploit several behavioral tendencies:\n\n1. Authority: Natural deference toward organizational leadership, IT administrators, or legal counsel.\n2. Urgency: Artificial time limits designed to encourage quick action before verification occurs.\n3. Fear of Consequences: Threats of service disconnection, disciplinary action, legal penalties, or financial loss.\n4. Scarcity: Implying that an opportunity or resource is limited in availability.\n5. Curiosity: Tempting the recipient with confidential or unexpected information (e.g., compensation reviews or reorganization lists).\n6. Reciprocity: Offering an unprompted favor or assistance so the recipient feels obligated to comply with a follow-up request.\n7. Social Proof: Suggesting that peers or other departments have already complied with the request.\n8. Familiarity: Mimicking the casual tone or vocabulary of an internal colleague.\n9. Trust in Established Brands: Leveraging confidence in well-known cloud providers, couriers, or financial institutions.\n10. Cognitive Overload: Delivering communications during periods of divided attention or high workload (e.g., late Friday afternoon or before holidays).',
        visualHighlight: {
          type: 'breakdown',
          title: 'Frequently Exploited Psychological Triggers',
          items: [
            { label: 'Authority', value: '"The CEO needs this wire completed immediately before boarding an international flight."' },
            { label: 'Urgency & Fear', value: '"Your payroll account will be locked within 45 minutes unless you verify your password."' },
            { label: 'Curiosity', value: '"Confidential executive compensation adjustments attached for staff review."' },
            { label: 'Social Proof', value: '"All team members must complete this external compliance review by end of day."' },
            { label: 'Cognitive Overload', value: 'High-pressure messages dispatched late in the day when attention is divided.' }
          ]
        }
      },
      {
        id: 'sec-se-2',
        title: '05.2 Pretexting & Realistic Scenario Construction',
        content: 'Pretexting is the practice of inventing a fabricated persona or plausible scenario to gain the target\'s trust and induce compliance.\n\nAttackers construct believable pretexts by researching public sources (such as LinkedIn profile changes, conference speaker schedules, press releases, or supplier relationships):\n\n• "Your account will be disabled": Fabricated IT alerts warning of imminent access termination.\n• "Your manager needs this payment immediately": Deceptive executive directives capitalizing on deference to leadership.\n• "Your package could not be delivered": Exploiting consumer anticipation around e-commerce deliveries.\n• "Your payroll information needs verification": Leveraging financial concern around monthly compensation.\n• "You have won an award or bonus": Exploiting excitement to encourage credential entry.',
        progressiveDisclosure: {
          level1Simple: 'Pretexting means creating a believable fake story so you will trust the person contacting you without asking questions.',
          level2Example: 'An attacker notices on social media that your company recently hired a new HR director. They send an email posing as that director, asking you to confirm your direct deposit details.',
          level3Technical: 'Pretexting establishes cognitive resonance. By incorporating accurate internal terminology, real colleague names, and current projects, the attacker suppresses standard anomaly detection.',
          level4DeepDive: 'Advanced pretexts may combine multiple communication channels (such as a professional connection request followed by an email and a subsequent telephone call) to build an appearance of legitimacy.'
        }
      },
      {
        id: 'sec-se-3',
        title: '05.3 Why Smart People Make Mistakes: Cognitive Load & Pressure',
        content: 'It is a common misconception that only naive or careless individuals fall for phishing attacks. In reality, human decision-making is heavily influenced by situational factors.\n\nStrong emotions, time pressure, multitasking, and uncertainty can reduce the attention people give to unusual details and make them more likely to rely on familiar cues or act quickly.\n\nWhen employees are rushing to meet deadlines, managing multiple tasks simultaneously, or processing high volumes of messages, their cognitive resources are stretched. Attackers deliberately craft lures that take advantage of these moments of divided attention.\n\nSecurity awareness is not about blame or embarrassment; it is about recognizing emotional pressure and situational urgency before acting.',
        warningNote: 'A supportive security culture encourages immediate reporting of suspected mistakes. Punishment and embarrassment only lead to hidden incidents.'
      },
      {
        id: 'sec-se-4',
        title: '05.4 The Universal Mental Pause: STOP -> THINK -> VERIFY -> ACT',
        content: 'To counter psychological manipulation, introduce a conscious pause whenever you encounter unexpected or high-stakes requests:',
        visualHighlight: {
          type: 'breakdown',
          title: 'The 4-Step Mental Pause Routine',
          items: [
            { label: 'STOP', value: 'Notice any sudden feeling of urgency, panic, or excitement. Take a brief pause before clicking or typing.' },
            { label: 'THINK', value: 'Ask yourself: Did I expect this request? Does this follow standard procedure? Why is there a rush?' },
            { label: 'VERIFY', value: 'Inspect the sender address and link destination. If in doubt, verify via an independent trusted channel.' },
            { label: 'ACT', value: 'Proceed safely: use your official bookmark, report the message, or discard it.' }
          ]
        },
        proTip: 'A brief pause before clicking helps interrupt automatic reactions and gives you time to evaluate the request critically.'
      }
    ],
    practicalChecklist: [
      'Take a brief pause whenever an inbound message provokes sudden urgency or concern.',
      'Recognize that legitimate executives and vendors respect verification procedures.',
      'Never bypass standard multi-party approval controls because of an urgent email directive.',
      'Remember that public information on professional profiles can be used to craft believable scenarios.',
      'Adopt the universal mental pause: STOP -> THINK -> VERIFY -> ACT.'
    ],
    knowledgeCheck: {
      question: 'An administrative assistant receives a direct message purportedly from the company’s Chief Legal Officer stating: "I am in the middle of a confidential acquisition negotiation and cannot take calls. I need you to purchase five $100 Apple gift cards right now for the outside legal team and text me the redemption codes. This is critical for closing the deal today." Which psychological levers is the attacker exploiting?',
      scenarioContext: 'Message sent via an external phone number with the executive\'s real photo as the avatar.',
      options: [
        { id: 'opt-a', text: 'Only technical network vulnerabilities in the SMS gateway.' },
        { id: 'opt-b', text: 'Authority, extreme urgency, manufactured confidentiality, and fear of disrupting a major business deal.' },
        { id: 'opt-c', text: 'Reciprocity and social proof, because everyone purchases gift cards.' },
        { id: 'opt-d', text: 'Scarcity of gift cards in retail stores.' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'The attacker leverages Authority (impersonating the Chief Legal Officer), Urgency ("closing the deal today"), and Manufactured Confidentiality ("cannot take calls", "confidential acquisition") to intimidate the employee into compliance while preventing them from verifying the request with colleagues.',
      takeaway: 'Demands for secrecy and gift card purchases are common signatures of social engineering. Legitimate executives do not conduct corporate business via gift cards.'
    }
  }
};

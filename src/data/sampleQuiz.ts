import { QuizQuestion } from '../types';

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // QUESTION 1: PHISHING FUNDAMENTALS (MODULE 01)
  // =========================================================================
  {
    id: 'quiz-1',
    moduleId: 'mod-1',
    category: 'Phishing Fundamentals',
    difficulty: 'Beginner',
    question: 'An employee receives an email stating their corporate cloud storage quota is exceeded and all incoming emails will be permanently rejected unless they confirm their login credentials immediately. What is the threat actor\'s primary objective?',
    scenarioContext: 'Inbound email received at 8:30 AM with an urgent warning banner and an external button anchor.',
    options: [
      { id: 'opt-a', text: 'To perform network reconnaissance and test email gateway latency.' },
      { id: 'opt-b', text: 'To harvest valid credentials for unauthorized enterprise access.' },
      { id: 'opt-c', text: 'To assist the IT storage department in reallocating disk capacity.' },
      { id: 'opt-d', text: 'To trigger an automated denial-of-service condition on the server.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Storage quota alerts are among the most common credential-harvesting pretexts. The attacker manufactures urgency (threat of losing business emails) to compel the user to enter their username and password on a cloned login portal, granting the adversary direct account access.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Reconnaissance rarely involves soliciting credentials through an explicit quota warning.' },
      { optionId: 'opt-c', reason: 'Legitimate IT departments never require users to input credentials to adjust cloud storage quotas.' },
      { optionId: 'opt-d', reason: 'Denial-of-service targets network or server resources through flood traffic, not user credential entry.' }
    ],
    securityTakeaway: 'Unexpected notifications claiming account termination or quota limits are standard credential harvesting lures.',
    redFlagsIdentified: [
      'Threat of functional loss (rejected emails)',
      'Direct demand for credential re-authentication',
      'Generic corporate storage pretext'
    ]
  },

  // =========================================================================
  // QUESTION 2: PHISHING TYPE IDENTIFICATION - BEC (MODULE 02)
  // =========================================================================
  {
    id: 'quiz-2',
    moduleId: 'mod-2',
    category: 'Phishing Type Identification',
    difficulty: 'Intermediate',
    question: 'A finance specialist receives an email from an established supplier\'s authentic domain. The sender requests that the monthly $62,000 retainer wire be directed to a new bank account due to a sudden accounting audit. Which specific attack type does this represent?',
    scenarioContext: 'The email passes SPF, DKIM, and DMARC authentication because the supplier\'s account was compromised.',
    options: [
      { id: 'opt-a', text: 'Untargeted Bulk Phishing' },
      { id: 'opt-b', text: 'Business Email Compromise (BEC) via Invoice Diversion' },
      { id: 'opt-c', text: 'DNS Cache Pharming Redirection' },
      { id: 'opt-d', text: 'Automated Drive-By Malware Injection' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'This is a textbook Business Email Compromise (BEC) / Vendor Email Compromise scheme. Attackers infiltrate legitimate supplier accounts and monitor ongoing billing threads, then inject fraudulent banking coordinates into pending transactions to divert corporate funds.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Bulk phishing uses generic templates blasted to thousands, whereas this attack relies on specific context from an ongoing business relationship.' },
      { optionId: 'opt-c', reason: 'Pharming alters DNS resolution or host tables, not email messaging contents.' },
      { optionId: 'opt-d', reason: 'Drive-by malware involves stealth browser exploitation, not fraudulent banking diversion.' }
    ],
    securityTakeaway: 'Vendor banking coordinate changes must always be verified out-of-band via phone before releasing funds.',
    redFlagsIdentified: [
      'Last-minute bank routing change',
      'Pretext of sudden accounting audit',
      'High-value wire diversion attempt'
    ]
  },

  // =========================================================================
  // QUESTION 3: PHISHING TYPE IDENTIFICATION - VISHING & MULTI-CHANNEL (MODULE 02)
  // =========================================================================
  {
    id: 'quiz-3',
    moduleId: 'mod-2',
    category: 'Phishing Type Identification',
    difficulty: 'Intermediate',
    question: 'An employee receives an urgent phone call from an individual claiming to be an "IT Support Specialist." The caller states that an active cyberattack was detected on the employee\'s laptop and asks them to recite the 6-digit MFA passcode just sent to their mobile device. What attack vector is this?',
    scenarioContext: 'Inbound phone call with background call center noise, followed by an immediate SMS push notification.',
    options: [
      { id: 'opt-a', text: 'Voice Phishing (Vishing) targeting MFA interception' },
      { id: 'opt-b', text: 'Pharming via DNS host manipulation' },
      { id: 'opt-c', text: 'Spear Phishing with macro-enabled documents' },
      { id: 'opt-d', text: 'Rogue Wi-Fi Access Point Eavesdropping' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Vishing (voice phishing) leverages telephone communications and social pressure to trick targets into handing over one-time passwords or credentials. The attacker initiates a login attempt on the legitimate portal, which triggers an SMS code, and asks the victim to read it back under the guise of an IT emergency.',
    whyWeakerChoices: [
      { optionId: 'opt-b', reason: 'Pharming involves redirecting domain name lookups at the network layer.' },
      { optionId: 'opt-c', reason: 'This attack uses voice calls, not weaponized Office document attachments.' },
      { optionId: 'opt-d', reason: 'Rogue Wi-Fi involves setting up deceptive wireless access points to sniff plaintext traffic.' }
    ],
    securityTakeaway: 'Legitimate IT support will never call you and ask you to recite an MFA one-time passcode over the phone.',
    redFlagsIdentified: [
      'Unsolicited inbound phone call requesting credentials',
      'Demand for 6-digit MFA passcode',
      'Artificial emergency pretext (active cyberattack)'
    ]
  },

  // =========================================================================
  // QUESTION 4: EMAIL INSPECTION - DISPLAY NAME SPOOFING (MODULE 03)
  // =========================================================================
  {
    id: 'quiz-4',
    moduleId: 'mod-3',
    category: 'Email Inspection',
    difficulty: 'Beginner',
    question: 'In an email client, the sender field displays: "Executive Payroll Team <payroll-admin@corp-update24.co>". Which component represents the actual mailbox sending the communication?',
    scenarioContext: 'Email displays a corporate logo in the message header and requests direct deposit verification.',
    options: [
      { id: 'opt-a', text: '"Executive Payroll Team", because the display name identifies verified internal departments.' },
      { id: 'opt-b', text: '"payroll-admin@corp-update24.co", because the address in angle brackets is the RFC envelope sender.' },
      { id: 'opt-c', text: 'Both parts are cryptographically bound by email servers and must match corporate records.' },
      { id: 'opt-d', text: 'Neither, because email clients automatically replace external addresses with internal nicknames.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'The friendly display name ("Executive Payroll Team") can be configured to any arbitrary string by the sender without verification. The true origin of the message is the email address enclosed in angle brackets (`payroll-admin@corp-update24.co`), which here reveals an external lookalike domain.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Display names are unverified text strings set freely in email client headers.' },
      { optionId: 'opt-c', reason: 'There is no cryptographic requirement that display names match envelope senders.' },
      { optionId: 'opt-d', reason: 'Email clients do not automatically replace external addresses with internal company names.' }
    ],
    securityTakeaway: 'Always inspect the email address enclosed in angle brackets rather than relying on the friendly display name.',
    redFlagsIdentified: [
      'Mismatched display name and domain',
      'External lookalike top-level domain (.co)',
      'Unsolicited payroll inquiry'
    ]
  },

  // =========================================================================
  // QUESTION 5: EMAIL INSPECTION - AUTHENTICATION PROTOCOLS (MODULE 03)
  // =========================================================================
  {
    id: 'quiz-5',
    moduleId: 'mod-3',
    category: 'Email Inspection',
    difficulty: 'Intermediate',
    question: 'A security gateway marks an incoming email with: "SPF: PASS, DKIM: PASS, DMARC: PASS". The email claims your corporate laptop is scheduled for remote wipe unless you verify your password. Does the passing authentication status guarantee the email is safe?',
    scenarioContext: 'Forensic headers indicate the sending domain is `device-management-secure.org`.',
    options: [
      { id: 'opt-a', text: 'Yes, because DMARC verification mathematically proves the email contains no malicious links or phishing intent.' },
      { id: 'opt-b', text: 'No. Authentication only proves the email originated from the domain owner; attackers can configure valid SPF/DKIM on their own malicious domains.' },
      { id: 'opt-c', text: 'Yes, because email security standards require identity vetting before issuing SPF and DKIM records.' },
      { id: 'opt-d', text: 'Only if the email also contains an encrypted digital signature from a certified commercial CA.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Email authentication protocols (SPF, DKIM, DMARC) confirm message provenance and domain authorization. They do NOT evaluate the moral intent of the domain owner or the content of the message. An attacker can easily register `device-management-secure.org`, set up valid SPF/DKIM records, and deliver validly authenticated phishing emails.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'DMARC only verifies domain identifier alignment, not link safety or message intent.' },
      { optionId: 'opt-c', reason: 'Anyone can configure SPF and DKIM on any domain they register for free without identity vetting.' },
      { optionId: 'opt-d', reason: 'Digital S/MIME signatures verify specific sender keys, but do not alter how standard SPF/DKIM operates.' }
    ],
    securityTakeaway: 'SPF/DKIM/DMARC Pass proves who sent the email, but does not prove that the sender is trustworthy.',
    redFlagsIdentified: [
      'Reliance on technical authentication over behavioral context',
      'Extreme threat (laptop remote wipe)',
      'External domain impersonating internal IT'
    ]
  },

  // =========================================================================
  // QUESTION 6: URL INSPECTION - SUBDOMAIN TRICKERY (MODULE 04)
  // =========================================================================
  {
    id: 'quiz-6',
    moduleId: 'mod-4',
    category: 'URL Inspection',
    difficulty: 'Intermediate',
    question: 'A user receives an email containing a link: "https://login.microsoft.com.account-auth-gateway.info/sso". What is the true registered apex domain of this destination?',
    scenarioContext: 'Email instructs the user to review a newly shared corporate SharePoint file.',
    options: [
      { id: 'opt-a', text: 'microsoft.com' },
      { id: 'opt-b', text: 'account-auth-gateway.info' },
      { id: 'opt-c', text: 'login.microsoft.com' },
      { id: 'opt-d', text: 'sso/sharepoint' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Applying the Golden Rule of URL Inspection: locate the first single forward slash (`/sso`) and read immediately to the left. The registered apex domain is `account-auth-gateway.info`. The string `login.microsoft.com` is merely an attacker-created subdomain prefix designed to deceive the human eye.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'microsoft.com is part of the subdomain prefix, not the registered domain holding DNS authority.' },
      { optionId: 'opt-c', reason: 'login.microsoft.com is a prefix string configured on the attacker\'s DNS server.' },
      { optionId: 'opt-d', reason: '/sso is the path on the web server, not a domain.' }
    ],
    securityTakeaway: 'Always read backwards from the first single forward slash to identify the genuine apex domain.',
    redFlagsIdentified: [
      'Subdomain brand impersonation',
      'Uncommon top-level domain (.info)',
      'Redirect to external authorization endpoint'
    ]
  },

  // =========================================================================
  // QUESTION 7: URL INSPECTION - HTTPS PADLOCK MYTH (MODULE 04)
  // =========================================================================
  {
    id: 'quiz-7',
    moduleId: 'mod-4',
    category: 'URL Inspection',
    difficulty: 'Beginner',
    question: 'You click a link in an SMS message and land on a website displaying a closed padlock icon in the browser address bar. Does this padlock mean the website is legitimate and safe to enter your corporate password?',
    scenarioContext: 'Web address shows `https://company-sso-login.net` with an active SSL certificate.',
    options: [
      { id: 'opt-a', text: 'Yes, because the padlock confirms the website was verified by browser security authorities.' },
      { id: 'opt-b', text: 'No. The padlock only indicates encrypted transmission; it does not verify whether the website or its operator is legitimate.' },
      { id: 'opt-c', text: 'Yes, because modern web browsers block SSL certificates on untrusted domain names.' },
      { id: 'opt-d', text: 'Only if the website also displays the official copyright footer at the bottom of the page.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'The HTTPS padlock indicates that traffic between the user\'s browser and the web server is encrypted against on-path eavesdropping. It does not verify who operates the server or whether that entity is legitimate. Phishing websites can use valid HTTPS certificates, which encrypt data in transit but do not prove that the destination is trustworthy.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Standard domain-validation SSL certificates do not verify company legitimacy or identity.' },
      { optionId: 'opt-c', reason: 'Certificate authorities automate certificate issuance and do not curate website safety.' },
      { optionId: 'opt-d', reason: 'Copyright footers are simple HTML text that can be copied and pasted by any attacker.' }
    ],
    securityTakeaway: 'The HTTPS padlock means your connection is encrypted, not that the destination is trustworthy.',
    redFlagsIdentified: [
      'False sense of security from HTTPS padlock',
      'Unverified external SSO domain',
      'SMS delivery channel'
    ]
  },

  // =========================================================================
  // QUESTION 8: SOCIAL ENGINEERING PSYCHOLOGY (MODULE 05)
  // =========================================================================
  {
    id: 'quiz-8',
    moduleId: 'mod-5',
    category: 'Social Engineering Psychology',
    difficulty: 'Intermediate',
    question: 'Why do phishing attacks frequently combine extreme time limits ("Must complete within 30 minutes") with threats of severe consequences ("Immediate job termination or account suspension")?',
    scenarioContext: 'Inbound message received late on a Friday afternoon targeting non-technical staff.',
    options: [
      { id: 'opt-a', text: 'Because security gateway firewalls automatically drop emails that remain unread after 30 minutes.' },
      { id: 'opt-b', text: 'To create emotional pressure and time urgency that reduce critical scrutiny and encourage quick compliance.' },
      { id: 'opt-c', text: 'Because cloud email providers require all password verifications to occur within short operational windows.' },
      { id: 'opt-d', text: 'To comply with international regulatory cyber incident disclosure guidelines.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'Psychological manipulation relies on exploiting emotional pressure and divided attention. Strong emotions, time pressure, and fear of negative consequences reduce the attention people give to unusual details, making them more likely to rely on familiar cues or act quickly before verifying the request.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Email gateways do not drop messages based on user reading time limits.' },
      { optionId: 'opt-c', reason: 'Legitimate cloud providers do not enforce 30-minute password ultimatum deadlines via unprompted email.' },
      { optionId: 'opt-d', reason: 'Incident disclosure guidelines apply to regulatory reporting, not end-user email deadlines.' }
    ],
    securityTakeaway: 'Sudden emotional panic is a psychological trigger. Always apply the STOP -> THINK -> VERIFY -> ACT pause.',
    redFlagsIdentified: [
      'Artificial countdown timer',
      'Threat of punitive consequences',
      'Manufactured emotional crisis'
    ]
  },

  // =========================================================================
  // QUESTION 9: REAL-WORLD SCENARIO JUDGMENT (MODULE 06)
  // =========================================================================
  {
    id: 'quiz-9',
    moduleId: 'mod-6',
    category: 'Real-World Scenario Judgment',
    difficulty: 'Intermediate',
    question: 'You receive an email appearing to come from your CFO with the subject: "Urgent: Confidential Wire Transfer Needed Before 5 PM". The email instructs you to send $45,000 to an outside escrow account to secure an unannounced corporate acquisition, warning you not to discuss it with anyone. What should you do first?',
    scenarioContext: 'The CFO is known to be traveling at a conference in another time zone.',
    options: [
      { id: 'opt-a', text: 'Execute the wire immediately to protect the acquisition, then leave a voicemail for the CFO.' },
      { id: 'opt-b', text: 'Reply to the email asking the CFO to attach a signed PDF authorization before processing.' },
      { id: 'opt-c', text: 'Pause, recognize the whaling indicators, and verify the transaction via a known internal voice/phone channel with executive security or the CFO\'s verified office.' },
      { id: 'opt-d', text: 'Forward the message to your personal email account to inspect the message routing headers.' }
    ],
    correctOptionId: 'opt-c',
    explanation: 'This scenario presents all classic Whaling / Executive BEC indicators: urgent deadline, confidential acquisition pretext, traveling executive, and explicit instructions to bypass normal approval channels. The only safe action is out-of-band verbal confirmation through established, pre-recorded channels.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Executing the wire transfers money directly to the attacker without verification.' },
      { optionId: 'opt-b', reason: 'Replying to the email only connects you to the attacker, who will readily provide a fake signed PDF.' },
      { optionId: 'opt-d', reason: 'Forwarding corporate financial requests to personal email breaches corporate data policies.' }
    ],
    securityTakeaway: 'Never verify an executive financial request by replying to the email. Confirm out-of-band via phone.',
    redFlagsIdentified: [
      'Executive whaling targeting finance staff',
      'Demands for secrecy and confidentiality',
      'Circumvention of standard multi-party approval controls'
    ]
  },

  // =========================================================================
  // QUESTION 10: REAL-WORLD SCENARIO JUDGMENT - MFA FATIGUE (MODULE 06)
  // =========================================================================
  {
    id: 'quiz-10',
    moduleId: 'mod-6',
    category: 'Real-World Scenario Judgment',
    difficulty: 'Intermediate',
    question: 'At 11:30 PM, your mobile phone receives five consecutive Microsoft Authenticator push notification prompts asking: "Are you trying to sign in from Frankfurt, Germany?" You are asleep at home in Chicago. Immediately afterward, you receive a WhatsApp message claiming to be from "Company IT Support" asking you to tap "Approve" so they can clear an error. What should you do?',
    scenarioContext: 'Repeated unauthorized push notifications followed by an external WhatsApp message.',
    options: [
      { id: 'opt-a', text: 'Tap "Approve" so the notifications stop buzzing and you can get back to sleep.' },
      { id: 'opt-b', text: 'Tap "Deny" on the prompt, change your corporate password immediately from a trusted device, and report the unauthorized access attempt to corporate security.' },
      { id: 'opt-c', text: 'Reply to the WhatsApp message with your current password to let IT investigate the incident.' },
      { id: 'opt-d', text: 'Turn off your phone\'s Wi-Fi and ignore the notifications until Monday morning.' }
    ],
    correctOptionId: 'opt-b',
    explanation: 'This attack is known as "MFA Fatigue" or "Push Prompt Bombing." The attacker already obtained your primary password and is flooding your phone with push prompts hoping you will hit "Approve" out of frustration or confusion. Tapping "Deny", immediately resetting your password, and alerting security prevents the breach.',
    whyWeakerChoices: [
      { optionId: 'opt-a', reason: 'Tapping Approve grants the attacker immediate access to your enterprise session.' },
      { optionId: 'opt-c', reason: 'Replying with your password hands the attacker secondary credentials and confirms your mobile identity.' },
      { optionId: 'opt-d', reason: 'Ignoring the incident leaves your compromised password valid, allowing the attacker to try other bypass techniques.' }
    ],
    securityTakeaway: 'Never approve an unexpected MFA push prompt. An unprompted MFA request means your password has been compromised.',
    redFlagsIdentified: [
      'MFA fatigue push bombing at odd hours',
      'Unsolicited WhatsApp message from fake IT support',
      'Unrecognized geographic location (Frankfurt, Germany)'
    ]
  }
];

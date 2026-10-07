/**
 * SAFE EDUCATIONAL DEMONSTRATION SPECIMENS
 * 
 * NOTICE: All email and URL specimens in this catalog are safe, synthetic educational
 * examples containing simulated demonstration values only.
 * 
 * In accordance with Phase 4 security and privacy boundaries:
 * - No live WHOIS lookups are executed.
 * - No external threat intelligence or reputation APIs are queried.
 * - No remote URLs are fetched.
 * - No file payloads are downloaded or executed.
 * All analysis is performed locally and statically within the browser.
 */

export interface EmailExampleSpecimen {
  id: string;
  name: string;
  category: string;
  description: string;
  rawMime: string;
  expectedLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  isSynthetic: boolean;
  dataNotice: string;
}

export interface UrlExampleSpecimen {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  expectedLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  isSynthetic: boolean;
  dataNotice: string;
}

export const EMAIL_SPECIMENS: EmailExampleSpecimen[] = [
  {
    id: 'email-spec-1',
    name: 'Clearly Legitimate Team Update',
    category: 'Benign Corporate Communication',
    description: 'Routine internal engineering standup summary sent from an authentic corporate domain with passing SPF and DKIM.',
    expectedLevel: 'LOW',
    isSynthetic: true,
    dataNotice: 'Simulated data — educational demonstration specimen (no live network lookup)',
    rawMime: `From: "Sarah Chen" <s.chen@acmecorp.com>
To: "Alex Vance" <a.vance@acmecorp.com>
Subject: Engineering Sprint 42 Retrospective & Agenda
Message-ID: <20241014.9921@acmecorp.com>
Authentication-Results: mx01.acmecorp.com; spf=pass; dkim=pass; dmarc=pass

Hi Alex,

Attached is the agenda for our upcoming sprint retrospective scheduled for Thursday at 2:00 PM EST. Please review the backlog items prior to the meeting.

You can view the project board here:
https://acmecorp.com/engineering/projects/sprint-42

Thanks,
Sarah Chen
Staff Platform Engineer | Acme Corp`
  },
  {
    id: 'email-spec-2',
    name: 'Suspicious Urgency & Coercion',
    category: 'Cognitive Social Engineering',
    description: 'A message deploying artificial urgency and threats of account deactivation to pressure the user.',
    expectedLevel: 'MEDIUM',
    isSynthetic: true,
    dataNotice: 'Simulated data — educational demonstration specimen (no live network lookup)',
    rawMime: `From: "IT Support Notifications" <notifications@notifications-delivery-service.com>
Reply-To: <helpdesk@corporate-support-tickets.net>
To: "Alex Vance" <a.vance@acmecorp.com>
Subject: [URGENT] Immediate Action Required: Account Suspended within 24 Hours
Message-ID: <20241014.1102@delivery-service.com>
Authentication-Results: mx01.acmecorp.com; spf=pass; dkim=none; dmarc=none

Dear Employee,

Our security monitoring system flagged multiple failed logins on your workstation profile. Your account will be disabled today unless identity confirmation is performed.

Please reach out to your local system administrator or reply to this notice with your employee ID to confirm your current identity status.

Sincerely,
Corporate Account Administration Desk`
  },
  {
    id: 'email-spec-3',
    name: 'Lookalike Sender Domain',
    category: 'Brand Impersonation & Typosquatting',
    description: 'A spoofed sender claiming to be Microsoft Support using a typosquatted domain (micr0soft) and Reply-To mismatch.',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Simulated data — educational demonstration specimen (no live network lookup)',
    rawMime: `From: "Microsoft Support Desk" <security-alerts@micr0soft-security.net>
Reply-To: <inbox-collector@cloud-relays.biz>
To: "Alex Vance" <a.vance@acmecorp.com>
Subject: Action Required: Mandatory Microsoft 365 Password Expiration
Message-ID: <20241014.4419@micr0soft-security.net>
Authentication-Results: mx01.acmecorp.com; spf=fail; dkim=none; dmarc=quarantine

Dear Microsoft 365 Customer,

Your enterprise cloud access token is scheduled to expire in 4 hours. You must re-authenticate your credentials immediately to avoid disruption to your Outlook mailbox.

Please log in to verify your password:
https://micr0soft-security.net/auth/login?user=a.vance@acmecorp.com

Global Security Support Team
Microsoft Cloud Operations`
  },
  {
    id: 'email-spec-4',
    name: 'Credential Harvester (Anchor Mismatch)',
    category: 'Hyperlink Deception & Spoofing',
    description: 'A mandatory payroll verification email where the visible anchor link text displays an internal URL, but routes to an external spoofed server.',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Simulated data — educational demonstration specimen (no live network lookup)',
    rawMime: `From: "Acme Payroll Team" <support@payroII-update-internal.com>
Return-Path: <bounces@mailer-cdn38.biz>
To: "Alex Vance" <a.vance@acmecorp.com>
Subject: [URGENT] Mandated Direct Deposit Re-Verification by 17:00 EST
Message-ID: <20241012191822.4B929@mailer-cdn38.biz>
Authentication-Results: mx01.acmecorp.com; spf=fail; dkim=none; dmarc=quarantine

Dear Acme Corp Employee,

During our scheduled Q3 system migration, an encryption discrepancy was detected within your direct deposit profile. Failure to comply before 17:00 EST today will result in your upcoming payroll being placed on a 14-day administrative hold.

Please verify your direct deposit details below:
[https://payroll.acmecorp-internal.net/portal/verify](http://payroII-update-internal.com/auth/verify?session=99182)

Regards,
Automated Payroll Reconciliation Service
Acme Corporation Global Operations`
  },
  {
    id: 'email-spec-5',
    name: 'BEC Wire Transfer Request',
    category: 'Business Email Compromise (BEC)',
    description: 'Executive impersonation demanding an urgent confidential payment and banking routing change via an external Reply-To.',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Simulated data — educational demonstration specimen (no live network lookup)',
    rawMime: `From: "Arthur Vance, Chief Executive Officer" <ceo-office@exec-confidential-desk.com>
Reply-To: <ceo.office.personal88@gmail.com>
To: "Alex Vance" <a.vance@acmecorp.com>
Subject: Urgent: Confidential Vendor Wire Transfer Remittance Today
Message-ID: <20241014.7731@exec-confidential-desk.com>
Authentication-Results: mx01.acmecorp.com; spf=none; dkim=none; dmarc=none

Alex,

I am currently tied up in board negotiations and cannot take calls. We have an urgent acquisition retainer payment that must be processed immediately today before close of business.

Please process an immediate wire transfer to our secondary vendor account:
- Bank: First Sovereign Commercial Trust
- Routing Number: 021000021
- Account: 9942-8810-33

Do not discuss this via public team channels due to strict regulatory NDAs. Confirm once the wire transfer is released.

Arthur Vance
Chief Executive Officer`
  },
  {
    id: 'email-spec-6',
    name: 'Suspicious Double-Extension Attachment',
    category: 'Malware Vector Deception',
    description: 'An overdue invoice notice containing an executable payload masked behind a double extension (Invoice_Q3.pdf.exe).',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Simulated data — educational demonstration specimen (no live network lookup)',
    rawMime: `From: "Accounts Payable Remittance" <billing@invoicing-gateway.biz>
To: "Alex Vance" <a.vance@acmecorp.com>
Subject: Overdue Invoice #INV-90214 - Immediate Remittance Required
Attachment: Invoice_Overdue_Statement.pdf.exe
Message-ID: <20241014.6621@invoicing-gateway.biz>
Authentication-Results: mx01.acmecorp.com; spf=pass; dkim=none; dmarc=none

Dear Customer,

Please find attached the past-due itemized statement for your enterprise subscription. Your service is currently flagged for immediate disruption if payment is not remitted today.

Please open the attached PDF report (Invoice_Overdue_Statement.pdf.exe) to review the outstanding invoices and remit payment.

Accounts Payable Department`
  }
];

export const URL_SPECIMENS: UrlExampleSpecimen[] = [
  {
    id: 'url-spec-1',
    name: 'Legitimate Corporate Portal',
    category: 'Benign Authentication Route',
    description: 'Standard login page hosted directly on an authentic, official apex domain.',
    url: 'https://example.com/account/login',
    expectedLevel: 'LOW',
    isSynthetic: true,
    dataNotice: 'Synthetic example — demonstration value only (local static analysis)'
  },
  {
    id: 'url-spec-2',
    name: 'Typosquatting Lookalike Domain',
    category: 'Lookalike Domain Mimicry',
    description: 'Typosquatting domain using numeric substitution ("1" instead of "l") with brand affiliation.',
    url: 'https://paypa1-security-verification.com/login?token=sec-492',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Synthetic example — demonstration value only (local static analysis)'
  },
  {
    id: 'url-spec-3',
    name: 'Subdomain Brand Impersonation',
    category: 'Subdomain Deception',
    description: 'The legitimate brand is placed in the subdomain prefix, but the true apex domain belongs to an attacker portal.',
    url: 'https://login.microsoftonline.com.account-verification-portal.net/oauth2/v2.0/authorize?client_id=sec-audit',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Synthetic example — demonstration value only (local static analysis)'
  },
  {
    id: 'url-spec-4',
    name: 'Punycode IDN Homograph',
    category: 'Internationalized Homoglyph',
    description: 'Uses Cyrillic homoglyph characters under Punycode (xn--) to mimic a trusted brand.',
    url: 'https://www.apple-id.xn--80ak6aa92e.com/verify?account=locked',
    expectedLevel: 'HIGH',
    isSynthetic: true,
    dataNotice: 'Synthetic example — demonstration value only (local static analysis)'
  },
  {
    id: 'url-spec-5',
    name: 'Raw IP-Address Hostname',
    category: 'IP Hostname Deception',
    description: 'Bypasses standard DNS domain names by routing directly to a numerical IP address.',
    url: 'https://192.0.2.10/banking/signin?session=active',
    expectedLevel: 'MEDIUM',
    isSynthetic: true,
    dataNotice: 'Synthetic example — demonstration value only (local static analysis)'
  },
  {
    id: 'url-spec-6',
    name: 'Obfuscated Shortened URL',
    category: 'URL Shortener Masking',
    description: 'Conceals the true destination server behind a commercial URL redirect service.',
    url: 'https://bit.ly/3xSecUrL',
    expectedLevel: 'MEDIUM',
    isSynthetic: true,
    dataNotice: 'Synthetic example — demonstration value only (local static analysis)'
  }
];

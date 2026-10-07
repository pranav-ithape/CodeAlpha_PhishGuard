import {
  AnalysisFinding,
  EmailAnalysisResult,
  ParsedEmailData,
  RiskAssessment,
  RiskLevel,
  ScoreContribution
} from '../types/analysis';
import { parseUrl, evaluateUrlRules } from './urlAnalyzer';

/**
 * Safely parses raw RFC-style email text or structured email input into a standardized
 * ParsedEmailData object using RFC 5322-aligned heuristics.
 * Safe against malformed headers, missing fields, or empty strings.
 */
export function parseRawEmail(rawText: string): ParsedEmailData {
  const result: ParsedEmailData = {
    fromRaw: '',
    fromDisplayName: '',
    fromAddress: '',
    fromDomain: '',
    to: '',
    subject: '',
    body: '',
    links: [],
    attachments: [],
    headers: {}
  };

  const safeText = (rawText || '').slice(0, 50000);
  if (!safeText || !safeText.trim()) {
    return result;
  }

  // Split headers and body at first double newline
  const doubleNewlineIndex = safeText.search(/\r?\n\r?\n/);
  let headerBlock = safeText;
  let bodyBlock = '';

  if (doubleNewlineIndex !== -1) {
    headerBlock = safeText.slice(0, doubleNewlineIndex);
    bodyBlock = safeText.slice(doubleNewlineIndex).trim();
  } else {
    // If no double newline exists, determine if text starts with RFC headers
    const firstLines = safeText.split(/\r?\n/);
    const hasHeaderPrefix = firstLines.some(line => /^(from|to|subject|reply-to|date|received|message-id):/i.test(line));
    if (!hasHeaderPrefix) {
      // Input is body-only text without header block
      headerBlock = '';
      bodyBlock = safeText.trim();
    }
  }

  // Parse RFC headers (handling multiline unfolding)
  const headerLines = headerBlock.split(/\r?\n/);
  let currentHeaderKey = '';

  for (const line of headerLines) {
    if (/^\s+/.test(line) && currentHeaderKey) {
      // Unfold multiline header continuation
      result.headers[currentHeaderKey] += ' ' + line.trim();
    } else {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        currentHeaderKey = line.slice(0, colonIdx).trim().toLowerCase();
        result.headers[currentHeaderKey] = line.slice(colonIdx + 1).trim();
      }
    }
  }

  // Parse From header
  if (result.headers['from']) {
    result.fromRaw = result.headers['from'];
    const fromMatch = result.fromRaw.match(/^(?:"?([^"]*)"?\s*)?<?([^>@]+@[^>@]+)>?$/);
    if (fromMatch) {
      result.fromDisplayName = (fromMatch[1] || '').trim();
      result.fromAddress = (fromMatch[2] || '').trim().toLowerCase();
      result.fromDomain = result.fromAddress.split('@')[1] || '';
    } else {
      result.fromAddress = result.fromRaw.toLowerCase();
      result.fromDomain = result.fromAddress.includes('@') ? result.fromAddress.split('@')[1] : '';
    }
  }

  // Parse Reply-To header
  if (result.headers['reply-to']) {
    result.replyToRaw = result.headers['reply-to'];
    const rtMatch = result.replyToRaw.match(/^(?:"?([^"]*)"?\s*)?<?([^>@]+@[^>@]+)>?$/);
    if (rtMatch) {
      result.replyToAddress = (rtMatch[2] || '').trim().toLowerCase();
      result.replyToDomain = result.replyToAddress.split('@')[1] || '';
    } else {
      result.replyToAddress = result.replyToRaw.toLowerCase();
      result.replyToDomain = result.replyToAddress.includes('@') ? result.replyToAddress.split('@')[1] : '';
    }
  }

  // Parse Subject, To
  result.subject = result.headers['subject'] || '';
  result.to = result.headers['to'] || '';
  result.body = bodyBlock;

  // Extract hyperlinks from body text (both standard markdown/HTML and raw URLs)
  // Markdown links: [text](url)
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = mdLinkRegex.exec(bodyBlock)) !== null) {
    result.links.push({
      text: match[1],
      url: match[2]
    });
  }

  // HTML links: <a href="url">text</a>
  const htmlLinkRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  while ((match = htmlLinkRegex.exec(bodyBlock)) !== null) {
    result.links.push({
      text: match[2].replace(/<[^>]*>/g, '').trim(),
      url: match[1]
    });
  }

  // Plain text URLs: https://...
  const rawUrlRegex = /(?:https?:\/\/|www\.)[^\s<>"')]+/g;
  while ((match = rawUrlRegex.exec(bodyBlock)) !== null) {
    const rawFound = match[0];
    const exists = result.links.some(l => l.url === rawFound);
    if (!exists) {
      result.links.push({
        text: rawFound,
        url: rawFound
      });
    }
  }

  // Parse simulated attachment headers or lines if declared
  if (result.headers['x-attached-file'] || result.headers['attachment']) {
    const attList = (result.headers['x-attached-file'] || result.headers['attachment']).split(',');
    attList.forEach(name => {
      const clean = name.trim();
      if (clean) result.attachments.push({ filename: clean });
    });
  }

  return result;
}

/**
 * Evaluates deterministic educational rules on parsed email data.
 * Emphasizes that individual indicators are warning signs requiring verification, not definitive verdicts.
 */
export function evaluateEmailRules(email: ParsedEmailData): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  // 1. Sender Identity & Display Name Spoofing Check
  if (email.fromAddress) {
    const knownBrands = [
      { name: 'Microsoft', regex: /microsoft|office|outlook/i, expectedDomains: ['microsoft.com', 'office.com', 'live.com', 'outlook.com'] },
      { name: 'Apple', regex: /apple|icloud/i, expectedDomains: ['apple.com', 'icloud.com'] },
      { name: 'Google', regex: /google|workspace/i, expectedDomains: ['google.com', 'gmail.com'] },
      { name: 'PayPal', regex: /paypal/i, expectedDomains: ['paypal.com'] },
      { name: 'HR Department / IT Support', regex: /it support|service desk|payroll|human resources/i, expectedDomains: [] }
    ];

    for (const brand of knownBrands) {
      if (brand.regex.test(email.fromDisplayName)) {
        if (brand.expectedDomains.length > 0) {
          const matchesOfficial = brand.expectedDomains.some(d => email.fromDomain === d || email.fromDomain.endsWith('.' + d));
          if (!matchesOfficial) {
            findings.push({
              id: 'email-display-name-brand-spoof',
              category: 'SENDER',
              severity: 'HIGH',
              title: `Display Name Brand Mismatch (${brand.name})`,
              evidence: `Display Name: "${email.fromDisplayName}" | Actual Address: <${email.fromAddress}>`,
              explanation: `The display name suggests the message originates from ${brand.name}, but the actual sending domain is "${email.fromDomain}". Email clients prominently show the display name, which attackers exploit to masquerade as trusted entities. Always verify the address domain within the angle brackets.`,
              recommendation: `Inspect the true domain inside the angle brackets. Do not trust display names alone.`,
              weight: 30,
              moduleLink: {
                title: 'Anatomy of Phishing Emails',
                route: '/learn/phishing-emails',
                moduleNumber: 3
              }
            });
            break;
          }
        }
      }
    }

    // Lookalike sending domain checks (typosquatting in email domain)
    const typoSenderPatterns = [
      { target: 'microsoft', regex: /micr0soft|microsoft-support|office365-verify/i },
      { target: 'paypal', regex: /paypa1|paypal-security|paypal-update/i },
      { target: 'apple', regex: /app1e|apple-id-support/i },
      { target: 'internal corporate', regex: /payroii|acmec0rp/i }
    ];

    for (const typo of typoSenderPatterns) {
      if (typo.regex.test(email.fromDomain)) {
        findings.push({
          id: `email-lookalike-sender-${typo.target}`,
          category: 'SENDER',
          severity: 'HIGH',
          title: `Lookalike Sender Domain (${typo.target})`,
          evidence: email.fromDomain,
          explanation: `The sender domain "${email.fromDomain}" is visually crafted to mimic a known brand or internal service using character substitutions or hyphens. This is a strong indicator of impersonation.`,
          recommendation: `Do not reply or click links. Flag this sender address to your information security team.`,
          weight: 30,
          moduleLink: {
            title: 'Anatomy of Phishing Emails',
            route: '/learn/phishing-emails',
            moduleNumber: 3
          }
        });
        break;
      }
    }
  }

  // 2. Reply-To Mismatch Analysis
  if (email.replyToAddress && email.fromAddress) {
    if (email.replyToAddress.toLowerCase() !== email.fromAddress.toLowerCase()) {
      const fromDom = email.fromDomain.toLowerCase();
      const replyDom = (email.replyToDomain || '').toLowerCase();
      
      const isCrossDomain = fromDom && replyDom && fromDom !== replyDom;

      findings.push({
        id: 'email-reply-to-mismatch',
        category: 'SENDER',
        severity: isCrossDomain ? 'MEDIUM' : 'LOW',
        title: 'Reply-To Address Discrepancy',
        evidence: `From: <${email.fromAddress}> | Reply-To: <${email.replyToAddress}>`,
        explanation: 'The message was sent from one address, but directs recipient replies to a different mailbox. A different Reply-To address frequently occurs in legitimate situations (such as automated notification systems routing to a customer support desk or marketing platforms). In an unexpected message, it is a warning sign that deserves verification because responses will route away from the displayed sender. One indicator is not sufficient to determine malicious intent.',
        recommendation: 'Check the Reply-To address before sending sensitive data or confidential business information.',
        weight: isCrossDomain ? 15 : 5,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    }
  }

  // 3. Subject Line Social Engineering Analysis
  // Urgency & Account Suspension indicators
  const urgencyKeywords = [
    { title: 'Artificial Urgency Language', regex: /\b(urgent|immediate action|immediately|action required|within 24 hours|today|deadline|expires soon)\b/i, points: 15 },
    { title: 'Account Suspension Threat', regex: /\b(account suspended|disabled|terminated|freeze|deactivation|unauthorized access|restricted)\b/i, points: 20 },
    { title: 'Financial / Payment Pressure', regex: /\b(overdue invoice|wire transfer|payment required|salary hold|withholding|remittance)\b/i, points: 15 },
    { title: 'Prize / Unsolicited Reward', regex: /\b(lottery|winner|claim your gift|bonus reward|selected winner)\b/i, points: 15 }
  ];

  for (const item of urgencyKeywords) {
    const match = email.subject.match(item.regex);
    if (match) {
      findings.push({
        id: `email-subject-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
        category: 'SUBJECT',
        severity: 'MEDIUM',
        title: item.title,
        evidence: `Subject: "${email.subject}" (Trigger: "${match[0]}")`,
        explanation: 'Urgent language creates cognitive stress, pressuring recipients into taking action before critically verifying the request or consulting colleagues. Urgency alone is not proof of phishing, but in unexpected communications it increases the need for caution.',
        recommendation: 'Pause and perform out-of-band verification. Legitimate IT and financial administrators rarely demand instant compliance under threat of immediate disruption.',
        weight: item.points,
        moduleLink: {
          title: 'Social Engineering Psychology',
          route: '/learn/social-engineering',
          moduleNumber: 5
        }
      });
      break;
    }
  }

  // 4. Body Content Analysis: Credential Solicitation & Payment Diversion
  const bodyLower = (email.body || '').toLowerCase();
  
  if (/\b(verify your password|re-enter your password|update your credentials|confirm your account|log in to verify)\b/i.test(bodyLower)) {
    findings.push({
      id: 'email-body-credential-request',
      category: 'BODY',
      severity: 'HIGH',
      title: 'Credential Solicitation Detected',
      evidence: 'Email body requests credential re-authentication or password verification.',
      explanation: 'Authentic administrative systems seldom email users asking them to click a direct link to verify account passwords or secret credentials.',
      recommendation: 'Never type passwords into web pages accessed through links in unexpected emails. Use established corporate single sign-on (SSO) portals.',
      weight: 25,
      moduleLink: {
        title: 'Anatomy of Phishing Emails',
        route: '/learn/phishing-emails',
        moduleNumber: 3
      }
    });
  }

  if (/\b(direct deposit|routing number|wire transfer|bank account details|new bank instructions|payroll freeze)\b/i.test(bodyLower)) {
    findings.push({
      id: 'email-body-payment-diversion',
      category: 'BODY',
      severity: 'HIGH',
      title: 'Financial or Banking Diversion Request',
      evidence: 'Email body solicits changes to direct deposit or wire transfer banking instructions.',
      explanation: 'Adversaries impersonating executive staff or HR departments frequently request banking or routing changes to divert financial disbursements (Business Email Compromise).',
      recommendation: 'Always enforce secondary voice confirmation through a known trusted phone number before altering vendor banking or employee direct deposit accounts.',
      weight: 25,
      moduleLink: {
        title: 'Real-World Phishing Incidents & Case Studies',
        route: '/learn/case-studies',
        moduleNumber: 6
      }
    });
  }

  // Generic greeting check
  if (/\b(dear customer|dear user|dear employee|dear account holder)\b/i.test(bodyLower)) {
    findings.push({
      id: 'email-body-impersonal-greeting',
      category: 'BODY',
      severity: 'LOW',
      title: 'Impersonal / Generic Salutation',
      evidence: 'Uses generic greeting rather than personalized recipient name.',
      explanation: 'Mass automated communications (both marketing and phishing) rely on generic greetings; this is a low-impact informational signal, not proof of malicious intent on its own.',
      recommendation: 'Consider whether communications from internal departments or trusted partners normally address you by your formal name.',
      weight: 5
    });
  }

  // 5. Hyperlink Inspection & Anchor Text Mismatch Analysis
  for (const link of email.links) {
    const parsedTarget = parseUrl(link.url);

    // Anchor text vs actual href mismatch
    // Check if visible text looks like a URL or domain, but points somewhere different!
    const isTextUrlLike = /^https?:\/\/|^www\.|\.com|\.net|\.org|\.internal/i.test(link.text.trim());
    if (isTextUrlLike) {
      const parsedText = parseUrl(link.text.trim());
      if (parsedText.isValid && parsedTarget.isValid) {
        if (parsedText.hostname.toLowerCase() !== parsedTarget.hostname.toLowerCase()) {
          findings.push({
            id: 'email-link-anchor-mismatch',
            category: 'LINK',
            severity: 'HIGH',
            title: 'Deceptive Link Anchor Mismatch',
            evidence: `Displayed Anchor Text: "${link.text}" | Real Destination: "${link.url}"`,
            explanation: `The visible link text displays one domain ("${parsedText.hostname}"), but the actual hyperlink routes the browser to a completely different server ("${parsedTarget.hostname}"). This is a deceptive tactic designed to exploit user trust.`,
            recommendation: 'Hover over hyperlinks to inspect the status bar destination before clicking, or navigate via official bookmarks.',
            weight: 30,
            moduleLink: {
              title: 'Fake Websites & Impersonation',
              route: '/learn/fake-websites',
              moduleNumber: 4
            }
          });
        }
      }
    }

    // Run deep URL rules on link target
    const targetFindings = evaluateUrlRules(parsedTarget);
    for (const tf of targetFindings) {
      if (tf.severity === 'HIGH' && !findings.some(f => f.id === tf.id)) {
        findings.push({
          ...tf,
          id: `email-embedded-${tf.id}`,
          title: `Embedded Link: ${tf.title}`
        });
      }
    }
  }

  // 6. Attachment Inspection: Double Extensions & Executable Formats
  for (const att of email.attachments) {
    const fname = att.filename.toLowerCase();
    
    // Double extension deception (e.g. invoice.pdf.exe)
    if (/\.(pdf|docx?|xlsx?|txt|jpg)\.(exe|scr|bat|cmd|vbs|js|hta|pif|ps1)$/i.test(fname)) {
      findings.push({
        id: `email-attachment-double-ext-${fname}`,
        category: 'ATTACHMENT',
        severity: 'HIGH',
        title: 'Double-Extension Deception Detected',
        evidence: `Attachment: "${att.filename}"`,
        explanation: `The file uses a double extension where a seemingly benign format (like .pdf or .doc) precedes an executable extension (like .exe or .scr). On systems with default hidden extensions, users may mistake this for a standard document.`,
        recommendation: 'DO NOT open or run this attachment. Forward the email to your IT security team for safe isolation.',
        weight: 35,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    } else if (/\.(exe|scr|bat|cmd|vbs|js|hta|pif|ps1|iso|img)$/i.test(fname)) {
      findings.push({
        id: `email-attachment-executable-${fname}`,
        category: 'ATTACHMENT',
        severity: 'HIGH',
        title: 'Executable Attachment Format',
        evidence: `Attachment: "${att.filename}"`,
        explanation: 'Executable file formats contain native system code that can execute directly on your machine. Legitimate business documents should never arrive as direct executable programs.',
        recommendation: 'Block this file from execution. Submit it to SOC quarantine.',
        weight: 30,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    } else if (/\.(docm|xlsm|pptm|dotm)$/i.test(fname)) {
      findings.push({
        id: `email-attachment-macro-${fname}`,
        category: 'ATTACHMENT',
        severity: 'MEDIUM',
        title: 'Macro-Enabled Office Document',
        evidence: `Attachment: "${att.filename}"`,
        explanation: 'This document format supports embedded Visual Basic for Applications (VBA) macros. Attackers use macro scripts to initiate background malware downloads once opened. Macro capability alone is not proof of malice, but unexpected macro files require strict caution.',
        recommendation: 'Do not click "Enable Editing" or "Enable Macros" on unexpected documents received via email.',
        weight: 20,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    }
  }

  // 7. Header Authentication Inspection (SPF, DKIM, DMARC)
  const authResults = email.headers['authentication-results'] || '';
  if (authResults) {
    const spfFail = /spf=(?:fail|softfail)/i.test(authResults);
    const dkimNone = /dkim=(?:none|fail)/i.test(authResults);
    const dmarcQuarantine = /dmarc=(?:quarantine|reject|fail)/i.test(authResults);

    if (spfFail || dmarcQuarantine || dkimNone) {
      findings.push({
        id: 'email-header-auth-failure',
        category: 'AUTHENTICATION',
        severity: 'MEDIUM',
        title: 'Authentication Alignment Warning (SPF / DMARC / DKIM)',
        evidence: `Authentication-Results: ${authResults}`,
        explanation: 'Authentication failure is a warning sign. It can indicate spoofing or a legitimate configuration problem (such as forwarding, mailing list relays, or incomplete DNS records). Therefore, authentication failure alone does not prove phishing; it should be considered together with the sender identity, message content, links, and other indicators.',
        recommendation: 'Treat unauthenticated email with heightened caution, as the sender identity cannot be verified cryptographically. Confirm out-of-band if unexpected.',
        weight: 20,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    } else if (/spf=pass/i.test(authResults) && /dkim=pass/i.test(authResults)) {
      // Educational explanation that PASS does NOT automatically equal safe!
      findings.push({
        id: 'email-header-auth-pass-education',
        category: 'AUTHENTICATION',
        severity: 'INFO',
        title: 'Cryptographic Authentication Passed (SPF & DKIM)',
        evidence: 'SPF=pass, DKIM=pass',
        explanation: 'The sending server is authorized by the domain owner. However, passing authentication does NOT prove that a message is safe: attackers who register their own lookalike or disposable domains can easily configure valid SPF and DKIM records for their malicious attack infrastructure. Passing authentication only verifies domain authorization, not domain legitimacy or message intent.',
        recommendation: 'Evaluate message content, urgency, and domain ownership even if transport authentication passes.',
        weight: 0,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    }
  }

  return findings;
}

/**
 * Deterministically aggregates findings into an explainable RiskAssessment for an email.
 * Transparently reveals raw weighted totals and handles score capping at 100.
 */
export function calculateEmailRiskAssessment(findings: AnalysisFinding[], _email?: ParsedEmailData): RiskAssessment {
  let rawScore = 0;
  const scoreBreakdown: ScoreContribution[] = [];

  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  let infoCount = 0;

  for (const finding of findings) {
    if (finding.severity === 'HIGH') highCount++;
    else if (finding.severity === 'MEDIUM') mediumCount++;
    else if (finding.severity === 'LOW') lowCount++;
    else if (finding.severity === 'INFO') infoCount++;

    if (finding.weight > 0) {
      rawScore += finding.weight;
      scoreBreakdown.push({
        findingId: finding.id,
        title: finding.title,
        points: finding.weight
      });
    }
  }

  // Deterministically capped between 0 and 100
  const isCapped = rawScore > 100;
  const score = Math.min(100, Math.max(0, rawScore));

  let level: RiskLevel = 'LOW';
  let verdict = 'Low Concern Based on Indicators Analyzed';
  let summary = 'No high-risk impersonation tactics, deceptive links, or malicious attachments were observed in this email specimen.';
  let recommendedAction = 'Routine verification recommended. Message appears aligned with standard communication patterns.';

  if (score >= 60 || highCount >= 1) {
    level = 'HIGH';
    verdict = 'High-Risk Indicators Detected';
    summary = `Identified ${highCount} high-risk warning sign(s) indicative of identity impersonation, deceptive hyperlink routing, or credential solicitation.`;
    recommendedAction = 'Do not click links, download attachments, or reply. Report this email to your organization’s Information Security / SOC team.';
  } else if (score >= 25 || mediumCount >= 1) {
    level = 'MEDIUM';
    verdict = 'Needs Verification / Moderate Concern';
    summary = `Identified ${mediumCount} indicator(s) requiring verification, such as urgency pressure, Reply-To discrepancies, or mail authentication warnings.`;
    recommendedAction = 'Verify this communication through an independent channel (e.g. phone call or official portal) before complying with any request.';
  }

  if (isCapped) {
    summary += ` (Score capped at 100; weighted indicators produced a raw total of ${rawScore} points.)`;
  }

  return {
    score,
    rawScore,
    isCapped,
    level,
    verdict,
    summary,
    counts: {
      high: highCount,
      medium: mediumCount,
      low: lowCount,
      info: infoCount
    },
    scoreBreakdown,
    recommendedAction
  };
}

/**
 * Complete pipeline for email analysis:
 * Input (raw or structured) -> Parse -> Normalize -> Extract -> Evaluate Rules -> Findings -> Calculate Risk -> Generate Explanation
 */
export function analyzeEmail(input: string | ParsedEmailData): EmailAnalysisResult {
  const parsed = typeof input === 'string' ? parseRawEmail(input) : input;
  const findings = evaluateEmailRules(parsed);
  const riskAssessment = calculateEmailRiskAssessment(findings, parsed);

  return {
    parsed,
    findings,
    riskAssessment
  };
}

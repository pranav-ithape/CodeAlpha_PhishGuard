import {
  AnalysisFinding,
  ParsedUrlComponents,
  RiskAssessment,
  RiskLevel,
  UrlAnalysisResult,
  ScoreContribution
} from '../types/analysis';

/**
 * Common multi-label public suffixes for conservative registrable domain identification.
 * Educational note: The registrable domain is the domain a user or organization can
 * generally register beneath the applicable public suffix. Its boundary cannot always
 * be determined by simply taking the final two labels.
 * 
 * While enterprise browsers consult the comprehensive Mozilla Public Suffix List (PSL),
 * this educational analyzer uses a conservative heuristic set to demonstrate multi-label
 * public suffix boundaries without external network dependencies.
 */
const MULTI_PART_TLDS = new Set([
  'co.uk', 'org.uk', 'gov.uk', 'ac.uk',
  'com.au', 'net.au', 'org.au', 'edu.au', 'gov.au',
  'co.nz', 'net.nz', 'org.nz',
  'co.jp', 'ne.jp', 'or.jp',
  'com.br', 'com.mx', 'co.in', 'net.in', 'org.in',
  'gc.ca', 'com.sg'
]);

// Known high-value target brands frequently mimicked in phishing campaigns
const TARGET_BRANDS = [
  { name: 'Microsoft', pattern: /microsoft|office365|onedrive|outlook|azure/i, officialDomains: ['microsoft.com', 'live.com', 'office.com', 'azure.com', 'microsoftonline.com'] },
  { name: 'Google', pattern: /google|gmail|workspace|drive/i, officialDomains: ['google.com', 'gmail.com', 'google.co.uk'] },
  { name: 'Apple', pattern: /apple|icloud|appleid/i, officialDomains: ['apple.com', 'icloud.com'] },
  { name: 'PayPal', pattern: /paypal/i, officialDomains: ['paypal.com'] },
  { name: 'Amazon', pattern: /amazon|prime/i, officialDomains: ['amazon.com', 'amazon.co.uk'] },
  { name: 'Netflix', pattern: /netflix/i, officialDomains: ['netflix.com'] },
  { name: 'Chase', pattern: /chase|jpmorgan/i, officialDomains: ['chase.com'] },
  { name: 'Bank of America', pattern: /bankofamerica|bofa/i, officialDomains: ['bankofamerica.com'] },
  { name: 'Wells Fargo', pattern: /wellsfargo/i, officialDomains: ['wellsfargo.com'] },
  { name: 'Meta / Facebook', pattern: /facebook|instagram|whatsapp/i, officialDomains: ['facebook.com', 'instagram.com', 'meta.com'] },
  { name: 'Adobe', pattern: /adobe/i, officialDomains: ['adobe.com'] },
  { name: 'DocuSign', pattern: /docusign/i, officialDomains: ['docusign.com'] }
];

// Common URL Shortener services
const URL_SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'ow.ly', 'buff.ly',
  'rb.gy', 'cutt.ly', 'rebrand.ly', 'soo.gd', 's.id', 'shorturl.at'
]);

// Sensitive credential & authentication paths
const SENSITIVE_PATHS = [
  'login', 'signin', 'sign-in', 'verify', 'verification', 'password',
  'account', 'wallet', 'payment', 'secure', 'auth', 'authorize',
  'oauth2', 'credential', 're-verify', 'recover', 'banking'
];

/**
 * Safely parses arbitrary input into structured RFC 3986-aligned URL components.
 * Employs conservative public suffix handling to identify registrable domain boundaries.
 * Never throws exceptions or crashes on malformed input.
 */
export function parseUrl(rawInput: string): ParsedUrlComponents {
  const trimmed = (rawInput || '').trim().slice(0, 4096);
  if (!trimmed) {
    return {
      rawUrl: '',
      isValid: false,
      protocol: '',
      hostname: '',
      subdomain: '',
      registeredDomain: '',
      tld: '',
      pathname: '',
      search: '',
      queryParams: {},
      hash: '',
      isIpAddress: false,
      isShortened: false,
      hasPunycode: false
    };
  }

  // Prepend protocol if omitted so native URL parser succeeds
  let normalized = trimmed;
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }

  try {
    const parsed = new URL(normalized);
    const hostname = parsed.hostname.toLowerCase();
    
    // Check if host is IPv4 or IPv6
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^\[?[a-f0-9:]+\]?$/i;
    const isIpAddress = ipv4Regex.test(hostname) || (hostname.startsWith('[') && ipv6Regex.test(hostname));

    // Extract query parameters dictionary safely
    const queryParams: Record<string, string> = {};
    parsed.searchParams.forEach((val, key) => {
      queryParams[key] = val;
    });

    let tld = '';
    let registeredDomain = hostname;
    let subdomain = '';

    if (isIpAddress) {
      registeredDomain = hostname;
    } else {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const lastTwo = parts.slice(-2).join('.');
        // Check conservative multi-label public suffix list
        if (parts.length >= 3 && MULTI_PART_TLDS.has(lastTwo)) {
          tld = '.' + lastTwo;
          registeredDomain = parts[parts.length - 3] + '.' + lastTwo;
          if (parts.length > 3) {
            subdomain = parts.slice(0, parts.length - 3).join('.') + '.';
          }
        } else {
          tld = '.' + parts[parts.length - 1];
          registeredDomain = parts.slice(-2).join('.');
          if (parts.length > 2) {
            subdomain = parts.slice(0, -2).join('.') + '.';
          }
        }
      }
    }

    const isShortened = URL_SHORTENERS.has(hostname) || URL_SHORTENERS.has(registeredDomain);
    const hasPunycode = hostname.includes('xn--');

    return {
      rawUrl: trimmed,
      isValid: true,
      protocol: parsed.protocol,
      username: parsed.username || undefined,
      hostname,
      subdomain,
      registeredDomain,
      tld,
      port: parsed.port || undefined,
      pathname: parsed.pathname,
      search: parsed.search,
      queryParams,
      hash: parsed.hash,
      isIpAddress,
      isShortened,
      hasPunycode
    };
  } catch {
    return {
      rawUrl: trimmed,
      isValid: false,
      protocol: '',
      hostname: '',
      subdomain: '',
      registeredDomain: '',
      tld: '',
      pathname: '',
      search: '',
      queryParams: {},
      hash: '',
      isIpAddress: false,
      isShortened: false,
      hasPunycode: false
    };
  }
}

/**
 * Deterministically evaluates educational rules against parsed URL components.
 * Emphasizes that individual indicators are warning signs requiring verification, not definitive verdicts.
 */
export function evaluateUrlRules(parsed: ParsedUrlComponents): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  if (!parsed.isValid) {
    findings.push({
      id: 'url-invalid-format',
      category: 'STRUCTURE',
      severity: 'HIGH',
      title: 'Malformed URL Syntax',
      evidence: parsed.rawUrl,
      explanation: 'The provided input cannot be parsed as a valid RFC 3986-aligned URI. Attackers sometimes use malformed delimiters or illegal characters to confuse naive security scanners.',
      recommendation: 'Verify the complete web address from the original source. Do not attempt to visit malformed links directly.',
      weight: 35
    });
    return findings;
  }

  // 1. IP-Address Hostname Check
  if (parsed.isIpAddress) {
    findings.push({
      id: 'url-ip-hostname',
      category: 'DOMAIN',
      severity: 'MEDIUM',
      title: 'Raw IP Address Hostname',
      evidence: parsed.hostname,
      explanation: 'The link connects directly to a numerical IP address rather than a domain name. While used in internal testing, network equipment, or developer environments, connecting directly to an IP address for public logins is unusual. This is a warning sign that deserves verification, but one indicator alone is not definitive proof of phishing.',
      recommendation: 'Independently verify whether this server IP address is an authorized corporate resource before entering credentials.',
      weight: 20,
      moduleLink: {
        title: 'Fake Websites & Impersonation',
        route: '/learn/fake-websites',
        moduleNumber: 4
      }
    });
  }

  // 2. Punycode / IDN Homoglyph Detection
  if (parsed.hasPunycode) {
    findings.push({
      id: 'url-punycode-homoglyph',
      category: 'DOMAIN',
      severity: 'HIGH',
      title: 'Internationalized Punycode Homoglyph',
      evidence: parsed.hostname,
      explanation: 'The domain uses an "xn--" Punycode prefix. Attackers use Punycode with foreign character sets (like Cyrillic or Greek) to visually replicate Latin brand names (such as replacing Latin "a" with Cyrillic "а"). Punycode has legitimate internationalized uses, but on brand-like strings it requires careful verification.',
      recommendation: 'Inspect the resolved ASCII domain name carefully. Do not enter credentials on lookalike Punycode domains.',
      weight: 30,
      moduleLink: {
        title: 'Fake Websites & Impersonation',
        route: '/learn/fake-websites',
        moduleNumber: 4
      }
    });
  }

  // 3. Deceptive Subdomain Mimicry Check
  // Check if a known brand appears in the subdomain prefix, while the registrable domain belongs to another party
  if (parsed.subdomain) {
    const subClean = parsed.subdomain.replace(/\.$/, '').toLowerCase();
    for (const brand of TARGET_BRANDS) {
      if (brand.pattern.test(subClean)) {
        const isOfficialApex = brand.officialDomains.some(d => parsed.registeredDomain.toLowerCase() === d);
        if (!isOfficialApex) {
          findings.push({
            id: `url-deceptive-subdomain-${brand.name.toLowerCase()}`,
            category: 'DOMAIN',
            severity: 'HIGH',
            title: `Subdomain Brand Mimicry (${brand.name})`,
            evidence: `Subdomain: "${parsed.subdomain}" | Registrable Domain: "${parsed.registeredDomain}"`,
            explanation: `The subdomain contains the brand "${brand.name}", but the true registrable domain beneath the public suffix is "${parsed.registeredDomain}". Anyone who registers "${parsed.registeredDomain}" can create arbitrary subdomains with trusted brand names. The registrable domain is what determines actual network routing.`,
            recommendation: `Ignore the prefix and evaluate only the registrable domain ("${parsed.registeredDomain}"). Do not authenticate unless the registrable domain itself belongs to ${brand.name}.`,
            weight: 30,
            moduleLink: {
              title: 'Fake Websites & Impersonation',
              route: '/learn/fake-websites',
              moduleNumber: 4
            }
          });
          break;
        }
      }
    }
  }

  // 4. Lookalike / Typosquatting Domain Check on Registrable Domain
  const apexNameOnly = parsed.registeredDomain.split('.')[0] || '';
  const typoSubstitutions = [
    { target: 'microsoft', variations: [/micr0soft/i, /micro-soft/i, /microsoft-security/i, /microsoft-verify/i] },
    { target: 'paypal', variations: [/paypa1/i, /pay-pal/i, /paypal-support/i, /paypal-update/i] },
    { target: 'google', variations: [/g00gle/i, /google-security/i, /google-support/i] },
    { target: 'apple', variations: [/app1e/i, /apple-security/i, /apple-id-verify/i] }
  ];

  let detectedLookalike = false;
  for (const typo of typoSubstitutions) {
    for (const regex of typo.variations) {
      if (regex.test(apexNameOnly)) {
        findings.push({
          id: `url-lookalike-domain-${typo.target}`,
          category: 'DOMAIN',
          severity: 'HIGH',
          title: `Lookalike Domain Impersonation (${typo.target})`,
          evidence: parsed.registeredDomain,
          explanation: `The registrable domain uses a visual substitution or hyphenated brand affix designed to resemble "${typo.target}". The true registrant is not the official brand organization.`,
          recommendation: `Do not supply credentials or download software. Navigate directly to the official ${typo.target} website via a verified bookmark.`,
          weight: 30,
          moduleLink: {
            title: 'Fake Websites & Impersonation',
            route: '/learn/fake-websites',
            moduleNumber: 4
          }
        });
        detectedLookalike = true;
        break;
      }
    }
    if (detectedLookalike) break;
  }

  // Check for excessive hyphens in registrable domain (frequent in disposable phishing domains)
  const hyphenCount = (apexNameOnly.match(/-/g) || []).length;
  if (!detectedLookalike && hyphenCount >= 3) {
    findings.push({
      id: 'url-excessive-hyphens',
      category: 'DOMAIN',
      severity: 'MEDIUM',
      title: 'Excessive Hyphenated Keywords in Registrable Domain',
      evidence: parsed.registeredDomain,
      explanation: `The registrable domain contains ${hyphenCount} hyphens. Attackers frequently string together words (e.g., "secure-login-account-portal") to generate available domain variations that mimic legitimate services. This indicator increases the need for caution, but must be evaluated alongside other signals.`,
      recommendation: 'Scrutinize the organization controlling this domain name. Verify whether your company or the target provider officially maintains this web address.',
      weight: 15,
      moduleLink: {
        title: 'Fake Websites & Impersonation',
        route: '/learn/fake-websites',
        moduleNumber: 4
      }
    });
  }

  // 5. URL Shortener Detection
  if (parsed.isShortened) {
    findings.push({
      id: 'url-shortener-detected',
      category: 'STRUCTURE',
      severity: 'MEDIUM',
      title: 'URL Shortening Service In Use',
      evidence: parsed.hostname,
      explanation: 'A link shortening service hides the final destination URL, hostname, and registrable domain. Shortened links are frequently used in legitimate marketing and social media, but in unexpected or high-stakes communications they require verification because the true destination cannot be inspected prior to resolution. A shortener alone is not proof of phishing.',
      recommendation: 'Use a link expander tool or request the unshortened address before interacting with unexpected links.',
      weight: 15,
      moduleLink: {
        title: 'Fake Websites & Impersonation',
        route: '/learn/fake-websites',
        moduleNumber: 4
      }
    });
  }

  // 6. Open Redirect Parameter Check
  const redirectKeys = ['url', 'redirect', 'q', 'next', 'dest', 'target', 'return', 'destination'];
  for (const key of redirectKeys) {
    const val = parsed.queryParams[key];
    if (val && /^https?:\/\//i.test(val)) {
      findings.push({
        id: `url-open-redirect-${key}`,
        category: 'STRUCTURE',
        severity: 'MEDIUM',
        title: 'Open Redirection Parameter Detected',
        evidence: `Parameter "${key}=${val}"`,
        explanation: `The query string contains a full external URL destination. On unvalidated systems, this can cause a trusted host to bounce the browser to a third-party destination. Redirection parameters occur legitimately in OAuth flows, but warrant inspection when received unexpectedly.`,
        recommendation: 'Inspect the nested destination URL to see where you will ultimately land before clicking.',
        weight: 15,
        moduleLink: {
          title: 'Fake Websites & Impersonation',
          route: '/learn/fake-websites',
          moduleNumber: 4
        }
      });
      break;
    }
  }

  // 7. Non-standard Network Port Check
  if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
    findings.push({
      id: 'url-nonstandard-port',
      category: 'STRUCTURE',
      severity: 'LOW',
      title: `Non-Standard Network Port (:${parsed.port})`,
      evidence: `Port :${parsed.port}`,
      explanation: `Standard web services operate over port 80 (HTTP) or 443 (HTTPS). While common in developer and testing environments, a non-standard port alone is not proof of phishing; it is an investigative warning sign warranting verification.`,
      recommendation: 'Verify whether your network administrator or IT department officially deployed services on this specific port.',
      weight: 5
    });
  }

  // 8. Protocol Check: HTTPS Encryption vs. Authenticity Explanation
  if (parsed.protocol.toLowerCase() === 'http:') {
    findings.push({
      id: 'url-unencrypted-http',
      category: 'STRUCTURE',
      severity: 'LOW',
      title: 'Unencrypted HTTP Protocol',
      evidence: 'http://',
      explanation: 'The connection is transmitted in plaintext without TLS encryption. Any eavesdropper on the local network could view credentials or submitted form data. Unencrypted HTTP is a transport security concern rather than definitive proof of phishing on its own.',
      recommendation: 'Never submit passwords or sensitive financial details over unencrypted HTTP.',
      weight: 10
    });
  } else if (parsed.protocol.toLowerCase() === 'https:') {
    // Provide educational explanation of HTTPS trust boundary
    findings.push({
      id: 'url-https-education',
      category: 'STRUCTURE',
      severity: 'INFO',
      title: 'HTTPS Encryption Present (Transport Only)',
      evidence: 'https://',
      explanation: 'HTTPS encrypts data in transit between your browser and the server, and verifies the domain certificate. However, HTTPS does NOT guarantee the website is benign: anyone can obtain a free valid SSL certificate for a fraudulent website. HTTPS alone does not prove a site is legitimate.',
      recommendation: 'Do not treat the padlock icon as proof that the business operator is honest. Always inspect the registrable domain name itself.',
      weight: 0,
      moduleLink: {
        title: 'Fake Websites & Impersonation',
        route: '/learn/fake-websites',
        moduleNumber: 4
      }
    });
  }

  // 9. Sensitive / Authentication Path Detection
  const pathLower = parsed.pathname.toLowerCase();
  const matchedAuthPath = SENSITIVE_PATHS.find(p => pathLower.includes(p));
  if (matchedAuthPath) {
    const hasHighDomainFindings = findings.some(f => f.severity === 'HIGH' && f.category === 'DOMAIN');
    if (hasHighDomainFindings) {
      findings.push({
        id: 'url-sensitive-path-deceptive-domain',
        category: 'STRUCTURE',
        severity: 'HIGH',
        title: `Credential Solicitation on Suspicious Domain ("${matchedAuthPath}")`,
        evidence: parsed.pathname,
        explanation: `The path requests authentication or verification actions ("${matchedAuthPath}") on a domain that already exhibited deceptive naming indicators. The combination of a deceptive registrable domain with a credential path strongly indicates credential harvesting.`,
        recommendation: 'DO NOT enter credentials. Close the tab and report the link to your security team.',
        weight: 20,
        moduleLink: {
          title: 'Anatomy of Phishing Emails',
          route: '/learn/phishing-emails',
          moduleNumber: 3
        }
      });
    } else {
      // On benign or neutral domains, this is purely educational INFO
      findings.push({
        id: 'url-sensitive-path-neutral',
        category: 'STRUCTURE',
        severity: 'INFO',
        title: `Authentication Path Observed ("${matchedAuthPath}")`,
        evidence: parsed.pathname,
        explanation: `This path commonly handles user sign-in or account credentials. This is standard for legitimate services, provided that the registrable domain matches your expected organization. A login path alone is not proof of phishing.`,
        recommendation: `Confirm that the registrable domain ("${parsed.registeredDomain}") belongs to the expected service provider before entering credentials.`,
        weight: 0
      });
    }
  }

  return findings;
}

/**
 * Deterministically aggregates findings into an explainable RiskAssessment.
 * Transparently reveals raw weighted totals and handles score capping at 100.
 */
export function calculateUrlRiskAssessment(findings: AnalysisFinding[], _parsed?: ParsedUrlComponents): RiskAssessment {
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

  // Cap score deterministically between 0 and 100
  const isCapped = rawScore > 100;
  const score = Math.min(100, Math.max(0, rawScore));

  // Determine risk level deterministically
  let level: RiskLevel = 'LOW';
  let verdict = 'Low Concern Based on Indicators Analyzed';
  let summary = 'No prominent deceptive indicators were detected for this URL. The domain structure conforms to standard syntax.';
  let recommendedAction = 'Continue with normal caution. Always verify you are on the expected registrable domain before submitting login credentials.';

  if (score >= 60 || highCount >= 1) {
    level = 'HIGH';
    verdict = 'High-Risk Indicators Detected';
    summary = `Detected ${highCount} high-risk warning sign(s) indicative of brand impersonation, deceptive subdomain structuring, or credential harvesting.`;
    recommendedAction = 'Do not click or enter credentials. Navigate to the authentic service using a verified bookmark or the official known root domain.';
  } else if (score >= 25 || mediumCount >= 1) {
    level = 'MEDIUM';
    verdict = 'Needs Verification / Moderate Concern';
    summary = `Detected ${mediumCount} indicator(s) requiring verification, such as raw IP addressing, shortened links, or unusual naming patterns.`;
    recommendedAction = 'Independently verify the destination with the sender or your IT department before submitting sensitive data.';
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
 * Complete pipeline for URL analysis:
 * Input -> Parse -> Normalize -> Extract -> Evaluate Rules -> Findings -> Calculate Risk -> Generate Explanation
 */
export function analyzeUrl(rawInput: string): UrlAnalysisResult {
  const parsed = parseUrl(rawInput);
  const findings = evaluateUrlRules(parsed);
  const riskAssessment = calculateUrlRiskAssessment(findings, parsed);

  return {
    parsed,
    findings,
    riskAssessment
  };
}

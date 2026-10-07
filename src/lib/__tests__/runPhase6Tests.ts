import { parseUrl, analyzeUrl } from '../urlAnalyzer';
import { parseRawEmail, analyzeEmail } from '../emailAnalyzer';
import { loadStoredProgress, CURRENT_SCHEMA_VERSION, PROGRESS_STORAGE_KEY } from '../../hooks/useTrainingProgress';
import { TRAINING_MODULES } from '../../data/modules';
import { SAMPLE_QUIZ_QUESTIONS } from '../../data/sampleQuiz';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`PHASE 6 TEST FAILED: ${message}`);
  }
}

// Mock localStorage environment for Node runner
const mockStorage: Record<string, string> = {};
(globalThis as any).localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => { mockStorage[key] = value; },
  removeItem: (key: string) => { delete mockStorage[key]; },
  clear: () => {
    for (const k of Object.keys(mockStorage)) {
      delete mockStorage[k];
    }
  },
};

console.log('========================================');
console.log('RUNNING PHISHGUARD PHASE 6 HARDENING TESTS');
console.log('========================================\n');

// -------------------------------------------------------------
// 1. URL ANALYZER INPUT VALIDATION & RESILIENCE
// -------------------------------------------------------------
console.log('--- 1. URL Analyzer Hardening & Malformed Input ---');
{
  // A. Empty & Whitespace
  const emptyRes = analyzeUrl('');
  assert(!emptyRes.parsed.isValid, 'Empty input should result in isValid: false');
  assert(emptyRes.findings.some(f => f.id === 'url-invalid-format'), 'Empty input should flag invalid format');

  const wsRes = analyzeUrl('   \n\t  ');
  assert(!wsRes.parsed.isValid, 'Whitespace input should result in isValid: false');

  // B. XSS Payload in URL
  const xssUrl = 'javascript:alert(document.cookie);';
  const xssRes = analyzeUrl(xssUrl);
  assert(typeof xssRes.parsed.rawUrl === 'string', 'XSS input parsed safely as string');
  assert(xssRes.findings.length > 0, 'XSS input should produce findings or invalid format');

  const htmlPayload = 'https://example.com/<script>alert(1)</script>';
  const htmlRes = analyzeUrl(htmlPayload);
  assert(typeof htmlRes.parsed.pathname === 'string', 'HTML script tag in URL parsed safely without crash');

  // C. Extreme Length Input (DoS resilience)
  const hugeUrl = 'https://login.company.com.' + 'a'.repeat(20000) + '.evil.com/auth';
  const hugeRes = analyzeUrl(hugeUrl);
  assert(typeof hugeRes.parsed.hostname === 'string', 'Extreme length URL parsed safely without ReDoS crash');
  assert(hugeRes.parsed.rawUrl.length <= 4096, 'Raw URL input bounded to safe maximum length');

  // D. Multi-label Public Suffixes
  const ukUrl = parseUrl('https://portal.bank.co.uk/signin');
  assert(ukUrl.registeredDomain === 'bank.co.uk', `Expected bank.co.uk, got ${ukUrl.registeredDomain}`);
  assert(ukUrl.subdomain === 'portal.', `Expected portal., got ${ukUrl.subdomain}`);
  assert(ukUrl.tld === '.co.uk', `Expected .co.uk, got ${ukUrl.tld}`);

  const auUrl = parseUrl('https://secure.tax.gov.au/mygov');
  assert(auUrl.registeredDomain === 'tax.gov.au', `Expected tax.gov.au, got ${auUrl.registeredDomain}`);

  // E. Punycode Homoglyph
  const punyUrl = parseUrl('https://xn--pple-43d.com/store');
  assert(punyUrl.hasPunycode === true, 'Punycode domain should set hasPunycode: true');

  // F. IPv4 and IPv6 hosts
  const ipUrl = parseUrl('http://192.168.1.1/admin');
  assert(ipUrl.isIpAddress === true, 'IPv4 should set isIpAddress: true');

  console.log('✓ URL analyzer safely parses empty, whitespace, XSS payloads, extreme lengths, and multi-label suffixes');
}

// -------------------------------------------------------------
// 2. EMAIL ANALYZER INPUT VALIDATION & RESILIENCE
// -------------------------------------------------------------
console.log('\n--- 2. Email Analyzer Hardening & Malformed Input ---');
{
  // A. Empty & Whitespace
  const emptyEmail = parseRawEmail('');
  assert(emptyEmail.fromAddress === '', 'Empty email should return clean default fields');
  assert(emptyEmail.links.length === 0, 'Empty email should contain 0 links');

  const wsEmail = parseRawEmail('   \n\n   ');
  assert(wsEmail.fromAddress === '', 'Whitespace email should return clean default fields');

  // B. Missing Headers (e.g. body only)
  const bodyOnly = parseRawEmail('Hello, please click this link immediately: https://verify-login.com');
  assert(bodyOnly.body.includes('Hello'), 'Body-only input should preserve message body');
  assert(bodyOnly.links.length === 1, 'Links in body-only text should be extracted safely');

  // C. XSS / Malicious HTML in Email Headers & Body
  const xssEmail = [
    'From: "CEO <script>alert(1)</script>" <ceo@victim.com>',
    'Subject: <img src=x onerror=alert(1)> Urgent Wire',
    'To: accountant@victim.com',
    '',
    '<script>document.location="http://evil.com"</script>',
    'Please review the attached contract: https://fake-docusign.net/sign'
  ].join('\n');

  const xssRes = analyzeEmail(xssEmail);
  assert(xssRes.parsed.fromAddress === 'ceo@victim.com', 'From address extracted cleanly despite script tag');
  assert(typeof xssRes.parsed.subject === 'string', 'Subject tag parsed as plain text');
  assert(xssRes.parsed.links.length >= 1, 'Links extracted without executing markup');
  assert(xssRes.riskAssessment.score > 0, 'Risk assessment produced valid score');

  // D. Extreme Length Email (DoS protection)
  const massiveEmail = 'From: test@domain.com\nSubject: Test\n\n' + 'Click here '.repeat(10000);
  const massRes = parseRawEmail(massiveEmail);
  assert(massRes.body.length <= 50000, 'Raw email text bounded to safe maximum length');

  console.log('✓ Email analyzer safely parses missing headers, malicious markup, script tags, and extreme lengths');
}

// -------------------------------------------------------------
// 3. STORAGE INTEGRITY, MIGRATION & ISOLATION
// -------------------------------------------------------------
console.log('\n--- 3. LocalStorage Security & Schema Migration ---');
{
  localStorage.clear();

  // Test v1 to v2 migration
  const v1Legacy = {
    completedLessonIds: ['lesson-intro-1'],
    completedModuleIds: ['mod-1'],
    quizScores: {
      'assessment-v1': { score: 9, total: 10, percentage: 90, completedAt: '2026-09-01' }
    },
    bookmarkedItemIds: []
  };
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(v1Legacy));

  const migrated = loadStoredProgress();
  assert(migrated.schemaVersion === CURRENT_SCHEMA_VERSION, `Migrated schema must equal version ${CURRENT_SCHEMA_VERSION}`);
  assert(migrated.quizAttempts === 1, 'Quiz attempts should be migrated from existing records');
  assert(Boolean(migrated.bestScore && migrated.bestScore.percentage === 90), 'Best score should be migrated correctly');
  assert(migrated.completedModuleIds.includes('mod-1'), 'Completed modules must be preserved during migration');

  // Test storage corruption recovery
  localStorage.setItem('phishguard_theme', 'dark');
  localStorage.setItem(PROGRESS_STORAGE_KEY, 'CORRUPTED JSON OBJECT {{{');

  const recovered = loadStoredProgress();
  assert(recovered.completedModuleIds.length === 0, 'Corrupted progress falls back to fresh state');
  assert(localStorage.getItem('phishguard_theme') === 'dark', 'Theme preference remains intact after progress reset');

  console.log('✓ Storage migration and isolation verified: safe v1->v2 upgrade and isolated corruption recovery');
}

// -------------------------------------------------------------
// 4. EDUCATIONAL ACCURACY & TERMINOLOGY INTEGRITY
// -------------------------------------------------------------
console.log('\n--- 4. Educational Content & Terminology Integrity ---');
{
  // Canonical 9 modules verified
  assert(TRAINING_MODULES.length === 9, 'Must maintain exactly 9 canonical modules');
  const expectedSlugs = [
    'introduction',
    'phishing-types',
    'phishing-emails',
    'fake-websites',
    'social-engineering',
    'case-studies',
    'interactive-quiz',
    'prevention-guidelines',
    'incident-response'
  ];
  TRAINING_MODULES.forEach((mod, idx) => {
    assert(mod.slug === expectedSlugs[idx], `Module ${idx + 1} slug expected ${expectedSlugs[idx]}, got ${mod.slug}`);
    assert(mod.number === idx + 1, `Module ${idx + 1} number must match sequential index`);
  });

  // Verify Module 07 is the assessment quiz
  const quizMod = TRAINING_MODULES[6];
  assert(quizMod.id === 'mod-7' && quizMod.route === '/quiz', 'Module 07 must be /quiz');

  // Verify all 10 quiz questions have scenarios, explanations, takeaways, and valid options
  assert(SAMPLE_QUIZ_QUESTIONS.length === 10, 'Quiz must have 10 scenario questions');
  SAMPLE_QUIZ_QUESTIONS.forEach((q, idx) => {
    assert(Boolean(q.question && q.question.length > 10), `Q${idx + 1} must have descriptive question`);
    assert(Boolean(q.explanation && q.explanation.length > 20), `Q${idx + 1} must have detailed educational explanation`);
    assert(Boolean(q.securityTakeaway && q.securityTakeaway.length > 5), `Q${idx + 1} must have a security takeaway`);
    assert(q.options.length >= 3, `Q${idx + 1} must have at least 3 answer options`);
    assert(q.options.some(o => o.id === q.correctOptionId), `Q${idx + 1} correctOptionId must exist in options`);
  });

  console.log('✓ All 9 canonical modules and 10 scenario quiz questions verified for curriculum integrity');
}

console.log('\n========================================');
console.log('ALL PHASE 6 HARDENING TESTS PASSED!');
console.log('========================================');

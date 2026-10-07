import { analyzeUrl, parseUrl } from '../urlAnalyzer';
import { analyzeEmail } from '../emailAnalyzer';
import { EMAIL_SPECIMENS, URL_SPECIMENS } from '../../data/analysisExamples';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST FAILED: ${message}`);
  }
}

console.log('========================================');
console.log('RUNNING PHISHGUARD PHASE 4 CORRECTION TESTS');
console.log('========================================\n');

// -------------------------------------------------------------
// 1. PUBLIC SUFFIX & REGISTRABLE DOMAIN PARSER TESTS
// -------------------------------------------------------------
console.log('--- A. Public Suffix & Registrable Domain Parsing ---');
{
  // Test: example.com
  const p1 = parseUrl('https://example.com/test');
  assert(p1.registeredDomain === 'example.com', `example.com registrable domain expected example.com, got ${p1.registeredDomain}`);
  assert(p1.subdomain === '', `subdomain should be empty, got ${p1.subdomain}`);
  assert(p1.tld === '.com', `tld should be .com, got ${p1.tld}`);

  // Test: sub.example.com
  const p2 = parseUrl('https://sub.example.com/test');
  assert(p2.registeredDomain === 'example.com', `sub.example.com registrable domain expected example.com, got ${p2.registeredDomain}`);
  assert(p2.subdomain === 'sub.', `subdomain should be sub., got ${p2.subdomain}`);
  assert(p2.tld === '.com', `tld should be .com, got ${p2.tld}`);

  // Test: example.co.uk (multi-label public suffix)
  const p3 = parseUrl('https://example.co.uk/path');
  assert(p3.registeredDomain === 'example.co.uk', `example.co.uk registrable domain expected example.co.uk, got ${p3.registeredDomain}`);
  assert(p3.subdomain === '', `subdomain should be empty, got ${p3.subdomain}`);
  assert(p3.tld === '.co.uk', `tld should be .co.uk, got ${p3.tld}`);

  // Test: sub.example.co.uk
  const p4 = parseUrl('https://sub.example.co.uk/path');
  assert(p4.registeredDomain === 'example.co.uk', `sub.example.co.uk registrable domain expected example.co.uk, got ${p4.registeredDomain}`);
  assert(p4.subdomain === 'sub.', `subdomain should be sub., got ${p4.subdomain}`);
  assert(p4.tld === '.co.uk', `tld should be .co.uk, got ${p4.tld}`);

  // Test: example.com.au
  const p5 = parseUrl('https://example.com.au/login');
  assert(p5.registeredDomain === 'example.com.au', `example.com.au registrable domain expected example.com.au, got ${p5.registeredDomain}`);
  assert(p5.tld === '.com.au', `tld should be .com.au, got ${p5.tld}`);

  console.log('✓ Public suffix parsing correctly handles single and multi-label public suffixes (.co.uk, .com.au)');
}

// -------------------------------------------------------------
// 2. SYNTHETIC METADATA LABELING TESTS
// -------------------------------------------------------------
console.log('\n--- B. Synthetic Metadata Labeling ---');
{
  URL_SPECIMENS.forEach(spec => {
    assert(spec.isSynthetic === true, `URL Specimen ${spec.id} must be explicitly labeled isSynthetic: true`);
    assert(typeof spec.dataNotice === 'string' && spec.dataNotice.length > 0, `URL Specimen ${spec.id} must have a dataNotice`);
  });

  EMAIL_SPECIMENS.forEach(spec => {
    assert(spec.isSynthetic === true, `Email Specimen ${spec.id} must be explicitly labeled isSynthetic: true`);
    assert(typeof spec.dataNotice === 'string' && spec.dataNotice.length > 0, `Email Specimen ${spec.id} must have a dataNotice`);
  });

  console.log('✓ All 6 URL and 6 Email specimens explicitly labeled as synthetic demonstration data');
}

// -------------------------------------------------------------
// 3. SCORE CAPPING & TRANSPARENCY TESTS
// -------------------------------------------------------------
console.log('\n--- C. Score Capping Transparency ---');
{
  // Specimen 4 in EMAIL_SPECIMENS triggers:
  // lookalike domain (+30), anchor mismatch (+30), credential path (+20), urgency (+15), auth fail (+20), etc.
  // Raw score is > 100!
  const res = analyzeEmail(EMAIL_SPECIMENS[3].rawMime);
  assert(res.riskAssessment.rawScore > 100, `Raw weighted score should exceed 100, got ${res.riskAssessment.rawScore}`);
  assert(res.riskAssessment.score === 100, `Displayed score must be exactly capped at 100, got ${res.riskAssessment.score}`);
  assert(res.riskAssessment.isCapped === true, `isCapped must be true`);
  assert(res.riskAssessment.summary.includes('Score capped at 100'), `Summary must state score is capped at 100`);

  // An uncapped specimen:
  const uncappedRes = analyzeEmail(EMAIL_SPECIMENS[1].rawMime);
  assert(uncappedRes.riskAssessment.isCapped === false, `Uncapped specimen should have isCapped: false`);
  assert(uncappedRes.riskAssessment.score === uncappedRes.riskAssessment.rawScore, `Uncapped score must match rawScore`);

  console.log(`✓ Score capping verified: Raw weighted total (${res.riskAssessment.rawScore} pts) transparently capped to 100/100`);
}

// -------------------------------------------------------------
// 4. INDICATOR-VS-VERDICT LANGUAGE TESTS
// -------------------------------------------------------------
console.log('\n--- D. Indicator vs. Verdict Non-Certainty Language ---');
{
  // Test HTTP alone
  const httpRes = analyzeUrl('http://example.com/safe-page');
  const httpFinding = httpRes.findings.find(f => f.id === 'url-unencrypted-http');
  assert(!!httpFinding, 'HTTP finding should exist');
  assert(!httpFinding!.explanation.toLowerCase().includes('confirmed phishing'), 'HTTP explanation must not claim confirmed phishing');
  assert(!httpFinding!.explanation.toLowerCase().includes('definitely phishing'), 'HTTP explanation must not claim definitely phishing');

  // Test Shortener alone
  const shortRes = analyzeUrl('https://bit.ly/3xSecUrL');
  const shortFinding = shortRes.findings.find(f => f.id === 'url-shortener-detected');
  assert(!!shortFinding, 'Shortener finding should exist');
  assert(!shortFinding!.explanation.toLowerCase().includes('confirmed phishing'), 'Shortener must not claim confirmed phishing');

  // Test Reply-To mismatch alone
  const replyToMime = `From: "Helpdesk Notifications" <notice@internal.com>
Reply-To: <tickets@support-desk.com>
To: <user@internal.com>
Subject: Weekly System Maintenance Schedule

Hi team, routine maintenance is scheduled for Sunday.`;
  const replyRes = analyzeEmail(replyToMime);
  const replyFinding = replyRes.findings.find(f => f.id === 'email-reply-to-mismatch');
  assert(!!replyFinding, 'Reply-To finding should exist');
  assert(replyFinding!.explanation.includes('One indicator is not sufficient'), 'Reply-To must state one indicator is not sufficient');

  console.log('✓ Individual indicators avoid false certainty and reinforce warning-sign education');
}

// -------------------------------------------------------------
// 5. SPF / DKIM / DMARC REFINED EXPLANATIONS
// -------------------------------------------------------------
console.log('\n--- E. SPF / DKIM / DMARC Refined Explanations ---');
{
  const authFailMime = `From: "Support" <support@company.com>
To: <user@company.com>
Subject: Team Update
Authentication-Results: mx01.company.com; spf=fail; dkim=none; dmarc=quarantine

Hello team.`;
  const failRes = analyzeEmail(authFailMime);
  const authFailFinding = failRes.findings.find(f => f.id === 'email-header-auth-failure');
  assert(!!authFailFinding, 'Auth failure finding must be generated');
  assert(authFailFinding!.explanation.includes('configuration problem'), 'Auth failure must note possible configuration problems or forwarding');

  const authPassMime = `From: "Support" <support@company.com>
To: <user@company.com>
Subject: Team Update
Authentication-Results: mx01.company.com; spf=pass; dkim=pass; dmarc=pass

Hello team.`;
  const passRes = analyzeEmail(authPassMime);
  const authPassFinding = passRes.findings.find(f => f.id === 'email-header-auth-pass-education');
  assert(!!authPassFinding, 'Auth pass educational finding must be generated');
  assert(authPassFinding!.severity === 'INFO' && authPassFinding!.weight === 0, 'Auth pass must be INFO and 0 weight');
  assert(authPassFinding!.explanation.includes('does NOT prove that a message is safe'), 'Must explain pass does not equal safe');

  console.log('✓ Email authentication failure and pass explanations accurately reflect real-world protocols');
}

// -------------------------------------------------------------
// 6. CURRICULUM LINKS & MODULE 07 AUDIT
// -------------------------------------------------------------
console.log('\n--- F. Educational Curriculum Link Audit ---');
{
  // Test that no finding anywhere references Module 07 as a lesson
  EMAIL_SPECIMENS.forEach(spec => {
    const res = analyzeEmail(spec.rawMime);
    res.findings.forEach(f => {
      if (f.moduleLink) {
        assert(f.moduleLink.moduleNumber !== 7, `Finding ${f.id} must not reference Module 07 (Module 07 is Assessment Quiz)`);
        assert(!f.moduleLink.title.toLowerCase().includes('advanced threats'), `Finding ${f.id} must not reference "Advanced Threats"`);
      }
    });
  });

  URL_SPECIMENS.forEach(spec => {
    const res = analyzeUrl(spec.url);
    res.findings.forEach(f => {
      if (f.moduleLink) {
        assert(f.moduleLink.moduleNumber !== 7, `URL finding ${f.id} must not reference Module 07`);
      }
    });
  });

  // Verify attachment findings link to Module 03 (Anatomy of Phishing Emails)
  const attSpec = EMAIL_SPECIMENS[5];
  const attRes = analyzeEmail(attSpec.rawMime);
  const attFinding = attRes.findings.find(f => f.category === 'ATTACHMENT');
  assert(!!attFinding, 'Attachment finding must exist');
  assert(attFinding!.moduleLink?.moduleNumber === 3, `Attachment finding must link to Module 03, got ${attFinding!.moduleLink?.moduleNumber}`);
  assert(attFinding!.moduleLink?.title === 'Anatomy of Phishing Emails', 'Attachment finding title must be Anatomy of Phishing Emails');

  console.log('✓ Curriculum links verified: zero Module 07 invalid references; attachments link to Module 03');
}

// -------------------------------------------------------------
// 7. STANDARDS TERMINOLOGY AUDIT
// -------------------------------------------------------------
console.log('\n--- G. Standards Terminology Audit ---');
{
  EMAIL_SPECIMENS.forEach(spec => {
    const res = analyzeEmail(spec.rawMime);
    res.findings.forEach(f => {
      assert(!f.title.includes('RFC compliant') && !f.explanation.includes('RFC compliant'), `Finding ${f.id} must use RFC-aligned instead of RFC compliant`);
    });
  });

  URL_SPECIMENS.forEach(spec => {
    const res = analyzeUrl(spec.url);
    res.findings.forEach(f => {
      assert(!f.title.includes('RFC compliant') && !f.explanation.includes('RFC compliant'), `URL finding ${f.id} must use RFC-aligned instead of RFC compliant`);
    });
  });

  console.log('✓ All technical claims use "RFC-aligned" rather than unsupported "RFC compliant" claims');
}

// -------------------------------------------------------------
// 8. FULL SPECIMEN RE-VERIFICATION
// -------------------------------------------------------------
console.log('\n--- H. Full Specimen Re-Verification ---');
{
  URL_SPECIMENS.forEach(spec => {
    const res = analyzeUrl(spec.url);
    assert(res.riskAssessment.level === spec.expectedLevel, `URL Specimen ${spec.id} expected ${spec.expectedLevel}, got ${res.riskAssessment.level}`);
  });

  EMAIL_SPECIMENS.forEach(spec => {
    const res = analyzeEmail(spec.rawMime);
    assert(res.riskAssessment.level === spec.expectedLevel, `Email Specimen ${spec.id} expected ${spec.expectedLevel}, got ${res.riskAssessment.level}`);
  });

  console.log('✓ All 6 URL and all 6 Email specimens match expected risk tiers deterministically');
}

console.log('\n========================================');
console.log('ALL PHASE 4 CORRECTION TESTS PASSED!');
console.log('========================================');

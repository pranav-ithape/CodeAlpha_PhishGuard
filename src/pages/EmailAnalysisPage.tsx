import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EMAIL_SPECIMENS, EmailExampleSpecimen } from '../data/analysisExamples';
import { analyzeEmail } from '../lib/emailAnalyzer';
import { AnalysisFinding, EmailAnalysisResult } from '../types/analysis';

export const EmailAnalysisPage: React.FC = () => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<EmailExampleSpecimen>(EMAIL_SPECIMENS[3]); // Harvester default
  const [customMime, setCustomMime] = useState<string>('');
  const [activeMime, setActiveMime] = useState<string>(EMAIL_SPECIMENS[3].rawMime);
  const [showRawHeaders, setShowRawHeaders] = useState<boolean>(false);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);
  const [userVerdict, setUserVerdict] = useState<string | null>(null);

  // Deterministically analyze email
  const analysisResult: EmailAnalysisResult = useMemo(() => {
    return analyzeEmail(activeMime);
  }, [activeMime]);

  const { parsed, findings, riskAssessment } = analysisResult;

  // Active finding for detail card
  const activeFinding: AnalysisFinding | undefined = useMemo(() => {
    if (selectedFindingId) {
      const found = findings.find(f => f.id === selectedFindingId);
      if (found) return found;
    }
    return findings[0];
  }, [findings, selectedFindingId]);

  const handleSelectSpecimen = (specimen: EmailExampleSpecimen) => {
    setSelectedSpecimen(specimen);
    setActiveMime(specimen.rawMime);
    setCustomMime('');
    setSelectedFindingId(null);
    setUserVerdict(null);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMime.trim()) return;
    setActiveMime(customMime.trim());
    setSelectedFindingId(null);
    setUserVerdict(null);
  };

  const handleReset = () => {
    setSelectedSpecimen(EMAIL_SPECIMENS[0]);
    setActiveMime(EMAIL_SPECIMENS[0].rawMime);
    setCustomMime('');
    setSelectedFindingId(null);
    setShowRawHeaders(false);
    setUserVerdict(null);
  };

  // Severity badge style helper
  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-error-container text-on-error-container border-error/40';
      case 'MEDIUM':
        return 'bg-secondary-fixed text-on-secondary-fixed border-secondary/40';
      case 'LOW':
      case 'INFO':
      default:
        return 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/40';
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-space-lg max-w-7xl mx-auto">
      {/* Top Forensic Lab Context Bar */}
      <div className="w-full bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-sm shadow-sm border border-outline-variant/60">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[22px]">biotech</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Laboratory Simulation · Unit 03</span>
              <span className="text-outline-variant font-code text-code">/</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Explainable Inspector</span>
            </div>
            <span className="font-title text-title text-on-surface">Interactive Email Red-Flag Inspector</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest rounded text-on-surface-variant font-label-md text-label-md shadow-xs border border-outline-variant/40">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>Specimen: {selectedSpecimen.name} (Demonstration value)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded text-primary font-label-md text-label-md font-semibold">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span>Deterministic Rules</span>
          </div>
        </div>
      </div>

      {/* Specimen Selection Bar */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/60 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-sm text-label-sm uppercase font-bold text-outline mr-1">Educational Specimens:</span>
            {EMAIL_SPECIMENS.map((spec) => (
              <button
                key={spec.id}
                onClick={() => handleSelectSpecimen(spec)}
                className={`px-3 py-1.5 rounded font-label-md text-label-md font-semibold transition-colors cursor-pointer border ${
                  activeMime === spec.rawMime
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-surface-container text-on-surface border-outline-variant/40 hover:bg-surface-container-high'
                }`}
              >
                {spec.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high rounded transition-colors font-label-sm text-label-sm flex items-center gap-1 cursor-pointer border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-[15px]">refresh</span>
            <span>Reset Lab</span>
          </button>
        </div>

        {/* Specimen Synthetic Notice Banner */}
        <div className="flex items-center justify-between text-[11px] text-outline font-label-sm pt-1 border-t border-outline-variant/30">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Local Static Analysis: All specimen values are synthetic demonstration examples (no live WHOIS, reputation, or MTA relays)</span>
          </span>
          <span className="hidden sm:inline font-code">{selectedSpecimen.dataNotice}</span>
        </div>
      </div>

      {/* Primary Asymmetric Two-Column Investigation Layout (7:5 Split) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: Simulated Corporate Email Inspection Area (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-space-md">
          {/* Email Container Card */}
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/60 flex flex-col overflow-hidden">
            {/* Viewer Control Strip */}
            <div className="bg-surface-container-low px-space-lg py-space-sm flex items-center justify-between border-b border-outline-variant/40">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">inbox</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Client Mail Payload Viewer</span>
                <span className="font-code text-code text-on-surface-variant px-2 py-0.5 bg-surface-container rounded">RFC 5322-Aligned</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <button 
                  onClick={() => setShowRawHeaders(!showRawHeaders)}
                  className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high rounded transition-colors font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">code</span>
                  <span>{showRawHeaders ? 'Hide RFC Headers' : 'Inspect RFC Headers'}</span>
                </button>
              </div>
            </div>

            {/* Raw RFC Headers Drawer (Expandable) */}
            {showRawHeaders && (
              <div className="bg-surface-container-highest p-space-md font-code text-code text-on-surface border-b border-outline-variant/60">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/40">
                  <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">Parsed MIME Transport Excerpt</span>
                  <span className="text-label-sm text-outline">Deterministic Header Map (Simulated data)</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre leading-relaxed text-body-sm text-on-surface">
                  {Object.entries(parsed.headers).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join('\n') || 'No raw headers present in input.'}
                </pre>
              </div>
            )}

            {/* Structured Metadata Header Section */}
            <div className="p-space-lg bg-surface-container-lowest flex flex-col gap-3 border-b border-outline-variant/40">
              {/* FROM Line */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1">
                <div className="flex items-baseline gap-space-sm flex-wrap">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline w-24">From:</span>
                  <span className="font-body-md text-body-md font-medium text-on-surface">
                    {parsed.fromDisplayName || 'Unknown Sender'}
                  </span>
                  <div className="inline-flex items-center bg-surface-container-high px-2 py-0.5 rounded font-code text-code text-on-surface">
                    <span>&lt;{parsed.fromAddress || parsed.fromRaw || 'none'}&gt;</span>
                  </div>
                </div>
                {parsed.fromDomain && (
                  <span className="font-code text-code text-outline text-[12px]">
                    Host: {parsed.fromDomain}
                  </span>
                )}
              </div>

              {/* REPLY-TO Line (If present or different) */}
              {parsed.replyToAddress && (
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1">
                  <div className="flex items-baseline gap-space-sm flex-wrap">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline w-24">Reply-To:</span>
                    <span className="font-code text-code text-secondary font-medium bg-secondary-fixed/40 px-2 py-0.5 rounded">
                      &lt;{parsed.replyToAddress}&gt;
                    </span>
                    {parsed.replyToAddress !== parsed.fromAddress && (
                      <span className="font-label-sm text-label-sm text-secondary font-semibold italic">
                        (Mismatched Destination — Warning Sign)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* RETURN-PATH Line */}
              {parsed.headers['return-path'] && (
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1">
                  <div className="flex items-baseline gap-space-sm flex-wrap">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline w-24">Return-Path:</span>
                    <span className="font-code text-code text-outline px-2 py-0.5 rounded bg-surface-container">
                      {parsed.headers['return-path']}
                    </span>
                  </div>
                </div>
              )}

              {/* TO Line */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1">
                <div className="flex items-baseline gap-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline w-24">To:</span>
                  <span className="font-code text-code text-on-surface">{parsed.to || 'Recipient'}</span>
                </div>
              </div>

              {/* AUTHENTICATION STATUS Line (SPF / DKIM / DMARC) */}
              {parsed.headers['authentication-results'] && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 bg-surface-container-low px-3 rounded-lg border border-outline-variant/30">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline w-20">Auth Check:</span>
                    <span className="font-code text-code text-[12px] text-on-surface bg-surface-container-high px-2 py-0.5 rounded">
                      {parsed.headers['authentication-results']}
                    </span>
                  </div>
                </div>
              )}

              {/* SUBJECT Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <div className="flex items-start sm:items-center gap-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline w-24 shrink-0">Subject:</span>
                  <span className="font-title text-title text-on-surface bg-surface-container-high px-2 py-1 rounded">
                    {parsed.subject || '(No Subject Provided)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Email Message Body */}
            <div className="p-space-lg flex flex-col gap-y-space-md text-on-surface font-body-md text-body-md leading-relaxed">
              <div className="whitespace-pre-wrap font-body-md leading-relaxed text-on-surface">
                {parsed.body || 'No message body content.'}
              </div>

              {/* Attachments Section if present */}
              {parsed.attachments.length > 0 && (
                <div className="mt-4 pt-3 border-t border-outline-variant/40 flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">attachment</span>
                    <span>Attached Payload ({parsed.attachments.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {parsed.attachments.map((att, idx) => (
                      <div key={idx} className="bg-surface-container-high px-3 py-2 rounded-lg border border-outline-variant/60 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">description</span>
                        <div className="flex flex-col">
                          <span className="font-code text-code font-bold text-on-surface">{att.filename}</span>
                          <span className="font-label-sm text-label-sm text-outline">Static metadata inspection only (Safe)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links Section preview if present */}
              {parsed.links.length > 0 && (
                <div className="mt-4 pt-3 border-t border-outline-variant/40 flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">link</span>
                    <span>Embedded Hyperlinks ({parsed.links.length})</span>
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {parsed.links.map((link, idx) => (
                      <div key={idx} className="bg-surface-container p-2.5 rounded-lg border border-outline-variant/40 font-code text-code text-[12px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-outline uppercase text-[10px] font-bold">Anchor:</span>
                          <span className="text-on-surface font-medium truncate">"{link.text}"</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-outline uppercase text-[10px] font-bold">Target:</span>
                          <span className="text-secondary font-bold truncate">{link.url}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Custom Raw Email Sandbox Input Form */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-title text-title text-on-surface flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-primary text-[20px]">terminal</span>
                <span>Analyze Custom Raw Email / RFC 5322-Aligned Input</span>
              </span>
              <span className="font-label-sm text-label-sm text-outline">Local Static Analyzer</span>
            </div>
            <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2">
              <textarea
                aria-label="Raw email content to analyze"
                value={customMime}
                onChange={(e) => setCustomMime(e.target.value)}
                placeholder="Paste raw email RFC headers and body here (e.g. From:..., Subject:..., [double newline], body text...)"
                rows={4}
                className="w-full bg-surface-container-high border border-outline-variant px-3 py-2 rounded font-code text-code text-[13px] text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-5 py-2 rounded transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Analyze Raw Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Forensic Investigation Dossier & Risk Assessment (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          {/* DETERMINISTIC RISK ASSESSMENT SUMMARY CARD */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/60 p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-label-sm font-label-sm font-bold uppercase border ${getSeverityBadgeClass(riskAssessment.level)}`}>
                  {riskAssessment.level} RISK
                </span>
                <span className="font-title text-title text-on-surface font-semibold">
                  {riskAssessment.verdict}
                </span>
              </div>
              <span className="font-code text-code font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded border border-outline-variant/40">
                {riskAssessment.score} / 100 {riskAssessment.isCapped && '(Capped)'}
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {riskAssessment.summary}
            </p>

            {/* Educational Callout: Warning Sign vs. Verdict */}
            <div className="bg-surface-container rounded-lg p-space-md border border-outline-variant/40 flex items-start gap-space-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
              <div className="flex flex-col text-body-sm text-body-sm leading-relaxed">
                <span className="font-bold text-on-surface">Warning Sign vs. Verdict:</span>
                <span>
                  An individual indicator is a warning sign that increases the need for caution, not definitive proof of phishing. Automated static analysis considers the combination of multiple indicators together.
                </span>
              </div>
            </div>

            {/* Transparent Score Breakdown Formula */}
            {riskAssessment.scoreBreakdown.length > 0 && (
              <div className="bg-surface-container-high p-space-md rounded-lg flex flex-col gap-1.5 border border-outline-variant/40">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">calculate</span>
                    <span>Transparent Score Breakdown</span>
                  </span>
                  {riskAssessment.isCapped && (
                    <span className="text-[11px] font-label-sm text-secondary font-semibold">
                      Raw total: {riskAssessment.rawScore} pts (Capped at 100 max)
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {riskAssessment.scoreBreakdown.map((sb, idx) => (
                    <div key={idx} className="flex items-center justify-between font-code text-code text-[11px] text-on-surface">
                      <span>{sb.title}</span>
                      <strong className="text-secondary">+{sb.points} pts</strong>
                    </div>
                  ))}
                  <div className="pt-1 mt-1 border-t border-outline-variant/40 flex items-center justify-between font-code text-code text-[12px] font-bold">
                    <span>Final Risk Score:</span>
                    <span className="text-primary">
                      {riskAssessment.isCapped ? `${riskAssessment.score} / 100 (Capped)` : `${riskAssessment.score} / 100`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recommended Action Box */}
            <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-1 border-l-4 border-tertiary">
              <span className="font-label-sm text-label-sm uppercase font-bold text-tertiary tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span> Recommended Action
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                {riskAssessment.recommendedAction}
              </p>
            </div>
          </div>

          {/* ACTIVE INDICATOR DETAIL DEEP-DIVE CARD */}
          {activeFinding && (
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/60 p-space-lg flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/40">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-label-sm font-bold uppercase border ${getSeverityBadgeClass(activeFinding.severity)}`}>
                    {activeFinding.severity}
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
                    {activeFinding.category}
                  </span>
                </div>
                <span className="font-code text-code text-outline text-[12px]">FORENSIC DETAIL</span>
              </div>

              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {activeFinding.title}
              </h3>

              {/* Observed Forensic Evidence */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">Observed Evidence</span>
                <div className="bg-surface-container-high p-2.5 rounded font-code text-code text-[12px] text-secondary break-all border border-outline-variant/30">
                  {activeFinding.evidence}
                </div>
              </div>

              {/* Technical Underpinning / Explanation */}
              <div className="bg-surface-container rounded-lg p-space-md flex flex-col gap-1 border-l-4 border-primary">
                <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wider">Analysis Reasoning</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {activeFinding.explanation}
                </p>
              </div>

              {/* Educational Curriculum Link if present */}
              {activeFinding.moduleLink && (
                <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
                  <span className="text-[12px] text-outline">Related Curriculum:</span>
                  <Link
                    to={activeFinding.moduleLink.route}
                    className="text-primary hover:text-primary-container font-semibold text-[13px] inline-flex items-center gap-1 group"
                  >
                    <span>Learn more → {activeFinding.moduleLink.title} (Unit 0{activeFinding.moduleLink.moduleNumber})</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* FORENSIC EVIDENCE CHECKLIST */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/60 p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-title text-title text-on-surface font-semibold">Forensic Evidence Checklist</span>
              <span className="font-code text-code font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {findings.length} Finding(s) Detected
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {findings.map((f, idx) => {
                const isSelected = activeFinding?.id === f.id;

                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFindingId(f.id)}
                    className={`p-3 rounded-lg flex items-center justify-between text-left transition-colors border cursor-pointer ${
                      isSelected 
                        ? 'bg-surface-container border-primary ring-1 ring-primary' 
                        : 'bg-surface-container-low border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full text-center leading-5 text-[10px] font-bold ${
                        f.severity === 'HIGH' ? 'bg-error text-on-error' : f.severity === 'MEDIUM' ? 'bg-secondary text-on-secondary' : 'bg-tertiary text-on-tertiary'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {f.title}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${getSeverityBadgeClass(f.severity)}`}>
                            {f.severity}
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          {f.explanation}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      chevron_right
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECURITY ANALYST VERDICT INTERACTIVE EVALUATION */}
          <div className="bg-surface-container rounded-xl shadow-sm border border-outline-variant/60 p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">gavel</span>
              <span className="font-title text-title text-on-surface font-semibold">Security Analyst Verdict</span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Based on the detected indicators, headers, and content patterns, test your forensic decision:
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setUserVerdict('malicious')}
                className={`p-2.5 rounded font-label-md text-label-md font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  userVerdict === 'malicious' 
                    ? 'bg-error text-on-error border-error shadow-sm' 
                    : 'bg-surface-container-lowest text-error border-outline-variant/60 hover:bg-error-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">dangerous</span>
                <span>Malicious Phish</span>
              </button>

              <button
                onClick={() => setUserVerdict('quarantine')}
                className={`p-2.5 rounded font-label-md text-label-md font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  userVerdict === 'quarantine' 
                    ? 'bg-secondary text-on-secondary border-secondary shadow-sm' 
                    : 'bg-surface-container-lowest text-secondary border-outline-variant/60 hover:bg-secondary-fixed'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">shield</span>
                <span>Quarantine</span>
              </button>

              <button
                onClick={() => setUserVerdict('clean')}
                className={`p-2.5 rounded font-label-md text-label-md font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  userVerdict === 'clean' 
                    ? 'bg-tertiary text-on-tertiary border-tertiary shadow-sm' 
                    : 'bg-surface-container-lowest text-tertiary border-outline-variant/60 hover:bg-tertiary-fixed'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Mark Clean</span>
              </button>
            </div>

            {userVerdict && (
              <div className={`p-space-md rounded-lg flex items-start gap-3 mt-1 border ${
                (userVerdict === 'clean' && riskAssessment.level === 'LOW') ||
                (userVerdict === 'quarantine' && (riskAssessment.level === 'MEDIUM' || riskAssessment.level === 'HIGH')) ||
                (userVerdict === 'malicious' && riskAssessment.level === 'HIGH')
                  ? 'bg-surface-container-lowest border-primary'
                  : 'bg-error-container border-error text-on-error-container'
              }`}>
                <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5">
                  {(userVerdict === 'clean' && riskAssessment.level === 'LOW') ||
                   (userVerdict === 'quarantine' && (riskAssessment.level === 'MEDIUM' || riskAssessment.level === 'HIGH')) ||
                   (userVerdict === 'malicious' && riskAssessment.level === 'HIGH')
                    ? 'verified'
                    : 'cancel'}
                </span>
                <div className="flex flex-col text-body-sm text-body-sm">
                  <span className="font-bold text-on-surface">
                    {riskAssessment.level === 'HIGH' && userVerdict === 'malicious' && 'Correct Decision: High-Risk Phishing Specimen'}
                    {riskAssessment.level === 'HIGH' && userVerdict === 'quarantine' && 'Acceptable Decision: Quarantined for In-Depth Forensics'}
                    {riskAssessment.level === 'HIGH' && userVerdict === 'clean' && 'Incorrect Decision: High-Risk Indicators Present'}
                    {riskAssessment.level === 'MEDIUM' && userVerdict === 'quarantine' && 'Correct Decision: Moderate Suspicion Requires Verification'}
                    {riskAssessment.level === 'MEDIUM' && userVerdict !== 'quarantine' && 'Educational Note: Moderate signals require verification before releasing or blocking'}
                    {riskAssessment.level === 'LOW' && userVerdict === 'clean' && 'Correct Decision: Normal Benign Message Pattern'}
                    {riskAssessment.level === 'LOW' && userVerdict !== 'clean' && 'False Positive Alert: Specimen contains standard corporate communications with valid auth'}
                  </span>
                  <span className="text-on-surface-variant mt-0.5">
                    Deterministic analyzer calculated risk score of {riskAssessment.score}/100 {riskAssessment.isCapped ? '(capped from ' + riskAssessment.rawScore + ')' : ''} based on {findings.length} observed indicator(s).
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

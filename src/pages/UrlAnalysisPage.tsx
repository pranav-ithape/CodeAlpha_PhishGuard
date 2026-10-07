import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { URL_SPECIMENS, UrlExampleSpecimen } from '../data/analysisExamples';
import { analyzeUrl } from '../lib/urlAnalyzer';
import { UrlAnalysisResult } from '../types/analysis';

export const UrlAnalysisPage: React.FC = () => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<UrlExampleSpecimen>(URL_SPECIMENS[2]); // Subdomain Mimicry default
  const [customInput, setCustomInput] = useState<string>('');
  const [activeUrl, setActiveUrl] = useState<string>(URL_SPECIMENS[2].url);
  const [activeToken, setActiveToken] = useState<string>('apex');
  const [copied, setCopied] = useState<boolean>(false);

  // Deterministically analyze URL
  const analysisResult: UrlAnalysisResult = useMemo(() => {
    return analyzeUrl(activeUrl);
  }, [activeUrl]);

  const { parsed, findings, riskAssessment } = analysisResult;

  const handleSelectSpecimen = (specimen: UrlExampleSpecimen) => {
    setSelectedSpecimen(specimen);
    setActiveUrl(specimen.url);
    setCustomInput('');
    setActiveToken('apex');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setActiveUrl(customInput.trim());
    setActiveToken('apex');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSelectedSpecimen(URL_SPECIMENS[0]);
    setActiveUrl(URL_SPECIMENS[0].url);
    setCustomInput('');
    setActiveToken('apex');
  };

  // Dynamic token insight dictionary
  const tokenInsights: Record<string, { title: string; desc: string; icon: string }> = {
    protocol: {
      title: '01 Protocol (' + (parsed.protocol || 'https:') + ')',
      desc: parsed.protocol === 'http:'
        ? 'Unencrypted HTTP transport detected. Cleartext communication can be intercepted by eavesdroppers on the same network. HTTP is a transport security concern rather than definitive proof of phishing on its own.'
        : 'TLS encryption protects data in transit between browser and host. Valid HTTPS certificates encrypt transport but DO NOT verify that the site operator is benign.',
      icon: parsed.protocol === 'http:' ? 'lock_open' : 'lock'
    },
    subdomain: {
      title: '02 Subdomain (' + (parsed.subdomain || '[None]') + ')',
      desc: parsed.subdomain
        ? 'Adversaries craft subdomains containing trusted brand names to fool viewers who only inspect the start of the URL string. Subdomains are controlled entirely by whoever owns the registrable domain.'
        : 'No subdomain prefix is present. The request routes directly to the registrable domain host.',
      icon: 'visibility'
    },
    apex: {
      title: '03 Registrable Domain (' + (parsed.registeredDomain || '[Unknown]') + ')',
      desc: 'The registrable domain is the domain a user or organization can generally register beneath the applicable public suffix (such as .com or .co.uk). Its boundary cannot always be determined by simply taking the final two labels. Network routing connects exclusively to this host, regardless of how many corporate names appear in the subdomain.',
      icon: 'gavel'
    },
    tld: {
      title: '04 Public Suffix / TLD (' + (parsed.tld || '[None]') + ')',
      desc: 'The public suffix or top-level registry zone. Can be a single label (.com) or multi-label public suffix (.co.uk, .com.au). An unusual public suffix is an investigative signal, but not automatic proof of maliciousness.',
      icon: 'public'
    },
    path: {
      title: '05 Endpoint Path (' + (parsed.pathname || '/') + ')',
      desc: 'The server route endpoint. Phishing campaigns often mimic official login pathways (e.g. /oauth2/authorize or /login) to reinforce a false sense of security.',
      icon: 'folder_open'
    },
    query: {
      title: '06 Query Parameters (' + (parsed.search || '[None]') + ')',
      desc: 'Key-value pairs appended after the question mark. Often passed to track victim telemetry, pre-fill email addresses, or handle token-based redirections.',
      icon: 'data_object'
    }
  };

  const currentInsight = tokenInsights[activeToken] || tokenInsights.apex;

  // Severity styling helper matching Phase 2 palette
  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'bg-error-container text-on-error-container border-error/40';
      case 'MEDIUM':
        return 'bg-secondary-fixed text-on-secondary-fixed border-secondary/40';
      case 'LOW':
      default:
        return 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/40';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-space-xl">
      {/* Learning Context Header */}
      <section className="flex flex-col space-y-space-sm">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest bg-secondary-fixed/50 px-2 py-0.5 rounded font-semibold">
            Practical Labs • Module 04
          </span>
          <span className="font-code text-code text-outline">§ RFC 3986-Aligned Standards</span>
          <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/60 px-2 py-0.5 rounded ml-auto flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">school</span> Specimen: {selectedSpecimen.name} (Demonstration value)
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              URL &amp; Domain Forensic Deconstructor
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
              Deconstruct hyperlinks into RFC 3986-aligned grammar tokens, isolate registrable domain ownership from deceptive subdomains, and view transparent, deterministic risk assessments with plain-language explanations.
            </p>
          </div>
          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-2 rounded-xl shadow-xs border-l-4 border-primary border border-outline-variant/40">
            <span className="material-symbols-outlined text-primary text-[20px]">policy</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Engine Mode</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">Deterministic Static Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive URL Input & Token Breakdown Bar */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/60 p-space-lg flex flex-col space-y-space-lg">
        {/* Specimen Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/40">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-sm text-label-sm uppercase font-bold text-outline mr-1">Specimens:</span>
            {URL_SPECIMENS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectSpecimen(s)}
                className={`px-3 py-1.5 rounded font-label-md text-label-md font-semibold transition-colors cursor-pointer border ${
                  selectedSpecimen.id === s.id && activeUrl === s.url
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-surface-container text-on-surface border-outline-variant/40 hover:bg-surface-container-high'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-md text-label-md text-on-surface border border-outline-variant/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-md text-label-md text-on-surface border border-outline-variant/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Specimen Synthetic Notice Banner */}
        <div className="flex items-center justify-between text-[11px] text-outline font-label-sm px-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Local Static Analysis: All specimen values are synthetic demonstration examples (no live WHOIS or reputation lookups)</span>
          </span>
          <span className="hidden sm:inline font-code">{selectedSpecimen.dataNotice}</span>
        </div>

        {/* Raw Monospace URL Bar */}
        <div className="bg-surface-container-high p-space-md rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm overflow-x-auto shadow-inner border border-outline-variant/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-outline text-[18px] shrink-0">link</span>
            <span className="font-code text-code text-on-surface select-all break-all">
              {activeUrl}
            </span>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className={`font-label-sm text-label-sm uppercase px-2.5 py-0.5 rounded font-bold border ${getRiskBadgeClass(riskAssessment.level)}`}>
              {riskAssessment.level} RISK ({riskAssessment.score}/100{riskAssessment.isCapped ? ' Capped' : ''})
            </span>
          </div>
        </div>

        {/* Syntactic Breakdown Token Bar */}
        <div className="flex flex-col space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-semibold">
              RFC 3986-Aligned Grammar Tokens (Select token to inspect details)
            </span>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">tune</span> Live Deconstructor
            </span>
          </div>

          {/* Segmented Interactive Token Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
            {/* Token 1: Protocol */}
            <button
              onClick={() => setActiveToken('protocol')}
              className={`text-left p-3 rounded-lg transition-all flex flex-col justify-between group shadow-xs cursor-pointer border ${
                activeToken === 'protocol'
                  ? 'bg-surface-container ring-2 ring-primary border-primary'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-label-sm text-label-sm text-outline uppercase font-code">01 Protocol</span>
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">lock</span>
              </div>
              <span className="font-code text-code text-primary font-semibold break-all">
                {parsed.protocol || '[None]'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                {parsed.protocol === 'http:' ? 'Unencrypted' : 'TLS Transport'}
              </span>
            </button>

            {/* Token 2: Subdomain */}
            <button
              onClick={() => setActiveToken('subdomain')}
              className={`text-left p-3 rounded-lg transition-all flex flex-col justify-between group shadow-xs cursor-pointer border ${
                activeToken === 'subdomain'
                  ? 'bg-secondary-fixed/50 ring-2 ring-secondary border-secondary'
                  : 'bg-secondary-fixed/30 hover:bg-secondary-fixed/50 border-secondary/30'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-label-sm text-label-sm text-secondary uppercase font-code font-bold">02 Subdomain</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
              </div>
              <span className="font-code text-code text-secondary break-all font-medium">
                {parsed.subdomain || '[None]'}
              </span>
              <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant mt-2 font-medium">
                {parsed.subdomain ? 'Prefix Routing' : 'No Subdomain'}
              </span>
            </button>

            {/* Token 3: Registrable Domain (Apex) */}
            <button
              onClick={() => setActiveToken('apex')}
              className={`text-left p-3 rounded-lg transition-all flex flex-col justify-between group shadow-xs cursor-pointer border ${
                activeToken === 'apex'
                  ? 'bg-secondary-container ring-2 ring-secondary border-secondary'
                  : 'bg-secondary-container/80 hover:bg-secondary-container border-secondary/60'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-label-sm text-label-sm text-on-secondary-container uppercase font-code font-bold">03 Registrable Domain</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">gavel</span>
              </div>
              <span className="font-code text-code text-on-secondary-container font-bold break-all">
                {parsed.registeredDomain || '[Invalid Host]'}
              </span>
              <span className="font-label-sm text-label-sm text-on-secondary-container mt-2 font-semibold">
                {parsed.isIpAddress ? 'Raw IP Address' : 'Registrable Host'}
              </span>
            </button>

            {/* Token 4: Public Suffix / TLD */}
            <button
              onClick={() => setActiveToken('tld')}
              className={`text-left p-3 rounded-lg transition-all flex flex-col justify-between group shadow-xs cursor-pointer border ${
                activeToken === 'tld'
                  ? 'bg-surface-container ring-2 ring-primary border-primary'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-label-sm text-label-sm text-outline uppercase font-code">04 Public Suffix</span>
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">public</span>
              </div>
              <span className="font-code text-code text-on-surface font-semibold">
                {parsed.tld || '[None]'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">Public Registry</span>
            </button>

            {/* Token 5: Path */}
            <button
              onClick={() => setActiveToken('path')}
              className={`text-left p-3 rounded-lg transition-all flex flex-col justify-between group shadow-xs cursor-pointer border ${
                activeToken === 'path'
                  ? 'bg-surface-container ring-2 ring-primary border-primary'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-label-sm text-label-sm text-outline uppercase font-code">05 Path</span>
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">folder_open</span>
              </div>
              <span className="font-code text-code text-on-surface break-all">
                {parsed.pathname || '/'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">Endpoint Route</span>
            </button>

            {/* Token 6: Query Param */}
            <button
              onClick={() => setActiveToken('query')}
              className={`text-left p-3 rounded-lg transition-all flex flex-col justify-between group shadow-xs cursor-pointer border ${
                activeToken === 'query'
                  ? 'bg-surface-container ring-2 ring-primary border-primary'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-label-sm text-label-sm text-outline uppercase font-code">06 Query</span>
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">data_object</span>
              </div>
              <span className="font-code text-code text-outline break-all">
                {parsed.search || '[None]'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">Parameters</span>
            </button>
          </div>

          {/* Token Insight Dynamic Banner */}
          <div className="bg-surface-container p-space-md rounded-lg flex items-start gap-space-sm border border-outline-variant/50 transition-all duration-200">
            <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5">
              {currentInsight.icon}
            </span>
            <div className="flex flex-col">
              <span className="font-title text-title text-on-surface">
                Inspecting: {currentInsight.title}
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                {currentInsight.desc}
              </p>
            </div>
          </div>
        </div>

        {/* DETERMINISTIC RISK ASSESSMENT SUMMARY CARD */}
        <div className="bg-surface-container-low rounded-xl p-space-lg border border-outline-variant/60 flex flex-col space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/40">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className={`px-3 py-1 rounded font-label-md text-label-md font-bold uppercase tracking-wider border ${getRiskBadgeClass(riskAssessment.level)}`}>
                {riskAssessment.level} CONCERN
              </span>
              <h2 className="font-title text-title text-on-surface font-semibold">
                {riskAssessment.verdict}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-outline uppercase font-bold">Deterministic Score:</span>
              <span className="font-code text-code font-bold text-on-surface bg-surface-container-high px-2.5 py-0.5 rounded border border-outline-variant/40">
                {riskAssessment.score} / 100 {riskAssessment.isCapped && '(Capped)'}
              </span>
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
            {riskAssessment.summary}
          </p>

          {/* Educational Callout: Warning Sign vs. Verdict */}
          <div className="bg-surface-container rounded-lg p-space-md border border-outline-variant/40 flex items-start gap-space-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
            <div className="flex flex-col text-body-sm text-body-sm leading-relaxed">
              <span className="font-bold text-on-surface">Warning Sign vs. Verdict:</span>
              <span>
                An individual indicator is a warning sign that increases the need for caution, not definitive proof of phishing. One indicator is not sufficient to determine malicious intent on its own; automated static analysis considers the combination of multiple indicators together.
              </span>
            </div>
          </div>

          {/* Counts & Transparent Score Contribution Formula */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
            <div className="p-3 bg-surface-container rounded-lg flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-error font-bold">High Indicators</span>
              <span className="font-code text-code font-bold text-error">{riskAssessment.counts.high}</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">Medium Warnings</span>
              <span className="font-code text-code font-bold text-secondary">{riskAssessment.counts.medium}</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-outline font-bold">Low Signals</span>
              <span className="font-code text-code font-bold text-on-surface">{riskAssessment.counts.low}</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-tertiary font-bold">Informational</span>
              <span className="font-code text-code font-bold text-tertiary">{riskAssessment.counts.info}</span>
            </div>
          </div>

          {/* Transparent Score Breakdown (Why this number was computed) */}
          {riskAssessment.scoreBreakdown.length > 0 && (
            <div className="bg-surface-container-high p-space-md rounded-lg flex flex-col gap-2 border border-outline-variant/40">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">calculate</span> Transparent Score Derivation:
                </span>
                {riskAssessment.isCapped && (
                  <span className="text-[12px] font-label-sm text-secondary font-semibold">
                    Raw weighted total: {riskAssessment.rawScore} pts (Capped at 100 maximum)
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {riskAssessment.scoreBreakdown.map((sb, idx) => (
                  <span key={idx} className="font-code text-code text-[12px] bg-surface-container px-2 py-1 rounded border border-outline-variant/40 text-on-surface">
                    <strong className="text-secondary font-bold">+{sb.points} pts</strong> {sb.title}
                  </span>
                ))}
                <span className="font-code text-code text-[12px] bg-primary text-on-primary px-2.5 py-1 rounded font-bold ml-auto">
                  {riskAssessment.isCapped 
                    ? `Raw Total: ${riskAssessment.rawScore} pts → Final Score: 100 / 100 (Capped)`
                    : `Total = ${riskAssessment.score} pts`}
                </span>
              </div>
            </div>
          )}

          {/* Recommended Action Card */}
          <div className="bg-surface-container rounded-lg p-space-md border-l-4 border-tertiary flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">verified_user</span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold uppercase text-tertiary tracking-wider">
                Recommended Action
              </span>
              <p className="font-body-sm text-body-sm text-on-surface mt-0.5 leading-relaxed">
                {riskAssessment.recommendedAction}
              </p>
            </div>
          </div>
        </div>

        {/* DETECTED FINDINGS LIST WITH EVIDENCE & EDUCATIONAL LINKS */}
        <div className="flex flex-col space-y-space-md">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-title text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">list_alt</span>
              <span>Detected Forensic Findings ({findings.length})</span>
            </h3>
            <span className="font-label-sm text-label-sm text-outline">Evidence &amp; Educational Context</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {findings.map((finding) => (
              <div
                key={finding.id}
                className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/50 flex flex-col space-y-space-xs transition-all hover:border-outline-variant"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-label-sm font-bold uppercase border ${getRiskBadgeClass(finding.severity)}`}>
                      {finding.severity}
                    </span>
                    <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">
                      {finding.category}
                    </span>
                    <h4 className="font-title text-title text-on-surface font-semibold">
                      {finding.title}
                    </h4>
                  </div>
                  {finding.weight > 0 && (
                    <span className="font-code text-code text-[12px] bg-surface-container-high px-2 py-0.5 rounded text-secondary font-bold">
                      +{finding.weight} pts
                    </span>
                  )}
                </div>

                {/* Evidence Monospace Box */}
                <div className="bg-surface-container-high px-3 py-1.5 rounded font-code text-code text-[12px] text-on-surface border border-outline-variant/30 flex items-center gap-2">
                  <span className="text-outline uppercase text-[10px] font-bold">Observed Evidence:</span>
                  <span className="font-semibold text-secondary break-all">{finding.evidence}</span>
                </div>

                {/* Plain-Language Explanation */}
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {finding.explanation}
                </p>

                {/* Recommendation & Module Link */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-outline-variant/30 text-[12px]">
                  <span className="text-on-surface font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">check_circle</span>
                    <strong>Remedy:</strong> {finding.recommendation}
                  </span>
                  {finding.moduleLink && (
                    <Link
                      to={finding.moduleLink.route}
                      className="text-primary hover:text-primary-container font-semibold inline-flex items-center gap-1 shrink-0 group"
                    >
                      <span>Learn more → {finding.moduleLink.title} (Unit 0{finding.moduleLink.moduleNumber})</span>
                      <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Core Rule Box (Burnt Copper Accent) */}
        <div className="bg-surface-container-high p-space-lg rounded-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-space-md border-l-[6px] border-secondary shadow-sm border border-outline-variant/40">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-secondary-container text-[26px]">lightbulb</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm uppercase font-bold text-secondary tracking-wider">
              The Core Rule of Registrable Domain Identification
            </span>
            <h4 className="font-title text-title text-on-surface font-semibold">
              Locate the Registrable Domain beneath the Public Suffix
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              In any standard web address, network routing is determined by the registrable domain immediately preceding the public suffix. The registrable domain is the domain a user or organization can generally register beneath the applicable public suffix (such as "example.com" under .com, or "example.co.uk" under .co.uk). Its boundary cannot always be determined by simply taking the final two labels. Everything to the left of this registrable boundary is a subdomain that an adversary can name anything they choose—including trusted trademarks like "microsoft" or "paypal".
            </p>
          </div>
        </div>

        {/* Custom URL Deconstructor Sandbox Form */}
        <div className="pt-2 border-t border-outline-variant/40 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-title text-title text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">science</span>
              <span>Test Any Arbitrary Link or Specimen</span>
            </span>
            <span className="font-label-sm text-label-sm text-outline">Real-Time Deterministic Parser</span>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              aria-label="URL to analyze"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Paste any link to analyze (e.g., https://hr-portal.acme.com.attacker-zone.net/login)"
              className="flex-1 bg-surface-container-lowest border border-outline-variant px-3 py-2 rounded font-code text-code text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-5 py-2 rounded transition-colors shadow-xs shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Analyze Link
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

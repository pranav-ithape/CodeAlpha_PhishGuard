import React from 'react';
import { Link } from 'react-router-dom';
import { Checklist } from '../components/common/Checklist';
import { TipCard } from '../components/common/TipCard';
import { WarningCard } from '../components/common/WarningCard';
import { useTrainingProgress } from '../hooks/useTrainingProgress';

export const PreventionPage: React.FC = () => {
  const { markModuleComplete, unmarkModuleComplete, isModuleCompleted, recordVisit } = useTrainingProgress();

  React.useEffect(() => {
    recordVisit('/prevention', 'mod-8');
  }, [recordVisit]);

  const isCompleted = isModuleCompleted('mod-8');

  const layer1Habits = [
    'Inspect Sender Addresses: Check the actual mailbox domain inside angle brackets (<user@domain.com>), not just the display name.',
    'Verify Unexpected Requests: Treat unscheduled demands for funds, passwords, or data as unverified by default.',
    'Attachment Restraint: Never open unexpected HTML files, macro-enabled documents (.docm, .xlsm), or password-protected ZIP archives.',
    'Preview Links Before Clicking: Hover over hyperlinks to confirm the registered apex domain immediately before the first single slash.',
    'Use Dedicated Bookmarks: Navigate to high-value portals (banking, payroll, cloud consoles) exclusively via saved bookmarks.',
    'Eliminate Password Reuse: Never use the same password across multiple corporate or personal services.',
    'Deploy a Password Manager: Password managers automatically verify registered domain origins and refuse to autofill on lookalike sites.'
  ];

  const layer3VerificationSteps = [
    'Establish Out-of-Band Channels: Confirm financial or credential requests via a secondary communication method (e.g., phone call if request arrived via email).',
    'Use Pre-Recorded Trusted Numbers: Call vendors using the phone number recorded in their official master contract, NEVER numbers supplied in the email itself.',
    'Verify Internal Corporate Colleague Inquiries: Confirm executive directives via verified internal directory channels or corporate chat (Slack/Teams).',
    'Reject Secret Wire Directives: Treat any email claiming an executive transaction must be kept secret from peers as an active fraud attempt.'
  ];

  const handleToggleComplete = () => {
    if (isCompleted) {
      unmarkModuleComplete('mod-8');
    } else {
      markModuleComplete('mod-8');
    }
  };

  return (
    <div className="flex flex-col gap-y-space-xl max-w-[1000px] pb-16">
      {/* Header */}
      <header className="flex flex-col gap-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            Module 08 • Defense &amp; Prevention Protocols
          </span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          Multi-Layered Defense &amp; Prevention Protocols
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[76ch] leading-relaxed">
          Effective security is not a single tool; it is defense-in-depth organized into four disciplined operational layers: individual habits, phishing-resistant authentication, out-of-band verification, and organizational controls.
        </p>
      </header>

      {/* LAYER 1: INDIVIDUAL HABITS */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-code">
              L1
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Layer 1: Individual Habits &amp; Cognitive Discipline
            </h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded font-code">
            PERSONAL HYGIENE
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          The individual employee is the critical sensor at the perimeter. Cultivating disciplined daily digital habits prevents the vast majority of social engineering compromises before technical filters are even tested.
        </p>

        <Checklist
          title="Daily Individual Defensive Habits"
          items={layer1Habits}
        />
      </section>

      {/* LAYER 2: AUTHENTICATION TIERS */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs font-code">
              L2
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Layer 2: Authentication Tiers (MFA &amp; Phishing Resistance)
            </h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase bg-secondary-fixed text-on-secondary-fixed font-bold px-2.5 py-0.5 rounded font-code">
            CREDENTIAL SECURITY
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Not all Multi-Factor Authentication (MFA) is created equal. Understanding the difference between traditional MFA and <strong>phishing-resistant authentication</strong> is essential in modern threat landscapes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Tier 1: Hardware Keys & Passkeys */}
          <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-4 border-l-4 border-l-tertiary space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-on-surface font-title">
                Tier 1: FIDO2 / Passkeys
              </span>
              <span className="text-[10px] bg-tertiary/10 text-tertiary font-bold px-1.5 py-0.5 rounded">
                Phishing-Resistant
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              YubiKeys, Google Titan Keys, Windows Hello, Touch ID passkeys. Cryptographically binds authentication to the exact domain origin in the browser address bar. Even if a user enters credentials on a fake lookalike site, the hardware key refuses to sign the authentication request.
            </p>
          </div>

          {/* Tier 2: Authenticator Apps (TOTP) */}
          <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-4 border-l-4 border-l-secondary space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-on-surface font-title">
                Tier 2: Authenticator TOTP
              </span>
              <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold px-1.5 py-0.5 rounded">
                Standard Multi-Factor
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              Google Authenticator, Microsoft Authenticator 6-digit codes. Protects against credential stuffing and automated password guessing. Traditional TOTP can still be phished or relayed in some attack scenarios (such as reverse-proxy phishing kits), whereas phishing-resistant methods provide cryptographic origin binding.
            </p>
          </div>

          {/* Tier 3: SMS & Phone Calls */}
          <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-4 border-l-4 border-l-error space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-on-surface font-title">
                Tier 3: SMS &amp; Voice OTP
              </span>
              <span className="text-[10px] bg-error-container text-on-error-container font-bold px-1.5 py-0.5 rounded">
                Basic Fallback
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              SMS codes sent via cellular networks provide a basic additional layer over single passwords, but remain vulnerable to SIM-swapping, mobile carrier redirection, and direct credential harvesting. Where possible, stronger app-based or hardware-bound authentication is recommended.
            </p>
          </div>
        </div>

        <WarningCard title="Authentication Realities: Why Multi-Factor Needs Layered Verification">
          Multi-factor authentication significantly raises the barrier against unauthorized access, but it does not make security review unnecessary. Traditional TOTP and SMS codes can still be intercepted or relayed in real-time Adversary-in-the-Middle scenarios, which is why phishing-resistant authentication (such as FIDO2/passkeys) and independent verification habits remain essential.
        </WarningCard>
      </section>

      {/* LAYER 3: VERIFICATION PROTOCOLS */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-xs font-code">
              L3
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Layer 3: Out-of-Band Verification Protocols
            </h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase bg-tertiary/10 text-tertiary font-bold px-2.5 py-0.5 rounded font-code">
            PROCEDURAL INTEGRITY
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          When an email requests banking changes, wire transfers, or employee confidential data, technical email filters cannot determine whether the sender was coerced. Verification must step outside the email channel entirely:
        </p>

        <Checklist
          title="Out-of-Band Verification Rules"
          items={layer3VerificationSteps}
        />
      </section>

      {/* LAYER 4: ORGANIZATIONAL CONTROLS */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-outline-variant text-on-surface flex items-center justify-center font-bold text-xs font-code">
              L4
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Layer 4: Organizational Controls &amp; Infrastructure
            </h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase bg-surface-container-high text-on-surface-variant font-bold px-2.5 py-0.5 rounded font-code">
            SYSTEM CONTROLS
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Individual vigilance must be reinforced by institutional safeguards. High-performing organizations implement systemic controls that minimize blast radiuses:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-on-surface uppercase tracking-wider block font-code">
              1. Inbound Gateway Filtering &amp; DMARC Enforcement
            </span>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              Enforce strict DMARC `p=reject` policies on corporate domains to prevent direct domain spoofing, and implement AI-based linguistic anomaly scanning on inbound external email.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-on-surface uppercase tracking-wider block font-code">
              2. One-Click Reporting Mechanisms
            </span>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              Deploy integrated "Report Phishing" buttons in email clients so employees can submit threats directly to the Security Operations Center (SOC) with automated header extraction.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-on-surface uppercase tracking-wider block font-code">
              3. Principle of Least Privilege (PoLP)
            </span>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              Restrict administrative workstation privileges. Users should operate with standard user accounts so that executing an accidental malicious attachment cannot install rootkits.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-on-surface uppercase tracking-wider block font-code">
              4. Endpoint Detection &amp; Response (EDR)
            </span>
            <p className="text-xs text-on-surface-variant font-body-sm leading-relaxed">
              Equip workstations with real-time behavioral endpoint agents that automatically isolate devices upon detecting unauthorized script execution or command-and-control beaconing.
            </p>
          </div>
        </div>
      </section>

      {/* Tip Card */}
      <TipCard title="The Verification Pause">
        When an unexpected request involves money, login credentials, or sensitive files, take a brief moment to inspect: <strong>Who is the true envelope sender? What is the root domain before the first slash? Did I expect this transaction?</strong> A brief verification pause helps interrupt urgency and allows you to inspect unexpected requests critically.
      </TipCard>

      {/* Completion & Next Navigation */}
      <div className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <Link to="/quiz" className="w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors w-full sm:w-auto justify-center cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Module 07: Assessment</span>
          </button>
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded font-label-md text-label-md font-semibold transition-colors shadow-xs w-full sm:w-auto cursor-pointer ${
              isCompleted
                ? 'bg-tertiary text-on-tertiary hover:bg-tertiary-container'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
            title={isCompleted ? 'Click to unmark completion' : 'Click to complete module'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCompleted ? 'verified' : 'check_circle'}
            </span>
            <span>{isCompleted ? 'Module 08 Completed (Undo)' : 'Complete Module 08'}</span>
          </button>

          <Link to="/incident-response" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded border border-primary text-primary hover:bg-primary/10 font-label-md text-label-md font-semibold transition-colors w-full sm:w-auto cursor-pointer">
              <span>Next: Module 09 (Incident Response)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

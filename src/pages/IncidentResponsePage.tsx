import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TipCard } from '../components/common/TipCard';
import { useTrainingProgress } from '../hooks/useTrainingProgress';

interface ScenarioAction {
  id: string;
  tag: string;
  title: string;
  urgency: 'Critical Priority' | 'High Priority' | 'Moderate Priority';
  steps: string[];
  explanation: string;
}

const SCENARIOS: Record<string, ScenarioAction> = {
  scenarioA: {
    id: 'scenarioA',
    tag: 'Scenario A',
    title: 'Clicked a Suspicious Link (Entered Nothing)',
    urgency: 'Moderate Priority',
    steps: [
      '1. STOP: Immediately close the browser tab or window. Do not click on any additional buttons or prompts on the page.',
      '2. REPORT: Report the suspicious message or website to your organization\'s IT/security team using official reporting procedures.',
      '3. FOLLOW GUIDANCE: Follow your organization\'s guidance regarding web security checks or endpoint scans.',
      '4. MONITOR: Pay extra attention to any unexpected follow-up communications, as visiting the link may indicate to attackers that your address is active.'
    ],
    explanation: 'Simply opening a website without entering information or running files is generally lower risk on modern, up-to-date web browsers. However, reporting the link allows your security team to block the domain organization-wide and protect colleagues.'
  },
  scenarioB: {
    id: 'scenarioB',
    tag: 'Scenario B',
    title: 'Entered Username & Password into a Fake Portal',
    urgency: 'Critical Priority',
    steps: [
      '1. STOP: Stop using the suspicious website immediately.',
      '2. SECURE: Change your password right away using a trusted route (such as navigating directly to the authentic portal from a clean browser or device).',
      '3. DO NOT REUSE: Ensure the compromised password is not reused across any other accounts or services.',
      '4. REVOKE SESSIONS: Sign out of all existing active sessions and revoke authorized devices where supported in account settings.',
      '5. REPORT: Inform your organization\'s security or IT team immediately so they can monitor for unauthorized login activity or anomalous token usage.'
    ],
    explanation: 'When credentials are submitted on a phishing site, attackers may attempt to use them within minutes. Changing the password promptly through an official, trusted channel and ending existing sessions closes the window of access.'
  },
  scenarioC: {
    id: 'scenarioC',
    tag: 'Scenario C',
    title: 'Entered Financial or Banking Information',
    urgency: 'Critical Priority',
    steps: [
      '1. STOP: Cease interaction with the fraudulent website immediately.',
      '2. CONTACT FINANCIAL PROVIDER: Contact your bank, card issuer, or payment provider immediately using an official contact number (e.g., from the back of your card or official website).',
      '3. REQUEST ACCOUNT SAFEGUARDS: Ask your provider to freeze or secure the account, block or investigate suspicious transactions, and issue replacement credentials.',
      '4. INTERNAL REPORT: Alert your organization\'s internal finance controller or security team if corporate payment methods were involved.',
      '5. MONITOR STATEMENTS: Regularly review recent and upcoming transactions according to your provider\'s guidance.'
    ],
    explanation: 'Financial institutions maintain round-the-clock fraud teams equipped to place holds on cards, halt unauthorized transfers, and dispute fraudulent activity if notified promptly.'
  },
  scenarioD: {
    id: 'scenarioD',
    tag: 'Scenario D',
    title: 'Opened or Executed a Suspicious Attachment',
    urgency: 'Critical Priority',
    steps: [
      '1. STOP: Stop interacting with the file or application immediately.',
      '2. REPORT IMMEDIATELY: Contact your organization\'s IT or security team right away to report that an unexpected attachment was opened.',
      '3. NETWORK ISOLATION (IF DIRECTED): If your organization\'s incident-response procedure instructs you to disconnect the device from the network (such as unplugging the Ethernet cable or disconnecting Wi-Fi), follow that procedure.',
      '4. DO NOT INVESTIGATE MANUALLY: Do not attempt to analyze, open, or delete suspected malware files yourself, as this can trigger further payloads or complicate investigation.',
      '5. FOLLOW IT INSTRUCTIONS: Await instructions from your IT or security team regarding endpoint verification or remediation.'
    ],
    explanation: 'Suspicious files can initiate background processes or network connections. Prompt reporting enables security specialists to assess the endpoint using enterprise security tools without placing technical diagnostic burdens on end users.'
  },
  scenarioE: {
    id: 'scenarioE',
    tag: 'Scenario E',
    title: 'Approved an Unexpected MFA Prompt',
    urgency: 'Critical Priority',
    steps: [
      '1. STOP: Deny any subsequent unexpected authentication requests that appear on your authenticator app or phone.',
      '2. CHANGE CREDENTIALS: Change your account password immediately through a trusted, official route, as an unexpected prompt indicates an attacker may already possess your password.',
      '3. REVOKE SESSIONS: Terminate all active browser sessions and connected devices in your corporate security portal.',
      '4. REPORT: Notify your IT or security team that an unexpected authentication prompt was mistakenly approved.',
      '5. AUDIT AUTHENTICATION METHODS: Review your registered MFA devices and methods according to organizational procedure to ensure no unauthorized devices were added.'
    ],
    explanation: 'Multi-factor authentication prompts only fire when a login attempt has supplied valid primary credentials. An unexpected prompt means your password is known; rotating it and revoking sessions terminates unauthorized access.'
  },
  scenarioF: {
    id: 'scenarioF',
    tag: 'Scenario F',
    title: 'Sent Money Due to a Fraudulent Request',
    urgency: 'Critical Priority',
    steps: [
      '1. STOP: Halt any additional or pending disbursements immediately.',
      '2. CONTACT PAYMENT PROVIDER: Contact your bank or payment provider immediately and request that the transaction be stopped, recalled, or investigated according to the payment method and provider\'s procedures.',
      '3. INTERNAL ESCALATION: Notify executive leadership, finance management, and legal counsel within your organization.',
      '4. PRESERVE COMMUNICATION RECORDS: Keep copies of the original deceptive emails, payment instructions, and transaction receipts for investigation.',
      '5. LOCAL REPORTING: Follow applicable local reporting requirements and file an incident report with relevant local or national authorities (e.g., IC3 in the U.S., or equivalent national cybercrime reporting agencies).'
    ],
    explanation: 'Financial institutions have established interbank recall and dispute procedures that have the highest chance of halting or recovering funds if initiated immediately after the transaction occurs.'
  }
};

export const IncidentResponsePage: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string>('scenarioA');
  const { markModuleComplete, unmarkModuleComplete, isModuleCompleted, recordVisit } = useTrainingProgress();

  React.useEffect(() => {
    recordVisit('/incident-response', 'mod-9');
  }, [recordVisit]);

  const isCompleted = isModuleCompleted('mod-9');

  const current = SCENARIOS[activeScenario];

  const handleToggleComplete = () => {
    if (isCompleted) {
      unmarkModuleComplete('mod-9');
    } else {
      markModuleComplete('mod-9');
    }
  };

  return (
    <div className="flex flex-col gap-y-space-xl max-w-[1000px] pb-16">
      {/* Header */}
      <header className="flex flex-col gap-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-semibold">
            Module 09 • Emergency Response Playbook
          </span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          Post-Interaction Incident Response Playbook
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[76ch] leading-relaxed">
          The critical first minutes: practical, safe guidance for six distinct post-interaction scenarios. If you clicked a link, entered credentials, opened an attachment, or transferred funds, prompt and disciplined escalation minimizes impact.
        </p>
      </header>

      {/* THE 5-STEP RESPONSE MODEL */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">published_with_changes</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              The Universal Response Model: STOP → CONTAIN → SECURE → REPORT → MONITOR
            </h2>
          </div>
          <span className="font-label-sm text-label-sm uppercase bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded font-code">
            5-STEP TRIAGE
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Every suspected compromise should follow this accessible, practical five-step sequence:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-primary font-code uppercase tracking-wider block">
              1. STOP
            </span>
            <p className="text-xs text-on-surface leading-snug">
              Stop interacting with the suspicious message, link, or site immediately.
            </p>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-error font-code uppercase tracking-wider block">
              2. CONTAIN
            </span>
            <p className="text-xs text-on-surface leading-snug">
              Follow organizational guidance; do not attempt manual file investigations yourself.
            </p>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-secondary font-code uppercase tracking-wider block">
              3. SECURE
            </span>
            <p className="text-xs text-on-surface leading-snug">
              Reset compromised credentials via trusted channels and revoke active sessions.
            </p>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-tertiary font-code uppercase tracking-wider block">
              4. REPORT
            </span>
            <p className="text-xs text-on-surface leading-snug">
              Contact your IT or security team promptly using established reporting pathways.
            </p>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/40 space-y-1">
            <span className="font-bold text-xs text-outline font-code uppercase tracking-wider block">
              5. MONITOR
            </span>
            <p className="text-xs text-on-surface leading-snug">
              Watch for unexpected account activity or follow-up communications according to guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Immediate Containment Philosophy Banner */}
      <div className="bg-surface-container rounded-xl p-space-lg border-l-4 border-primary flex items-start gap-4 shadow-sm border border-outline-variant/60">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">verified_user</span>
        </div>
        <div className="space-y-1">
          <h3 className="font-title text-title text-on-surface">Prompt Disclosure Over Hesitation</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            <strong>Security teams value early transparency.</strong> Reporting an accidental click or submitted credential quickly is the single most valuable action an employee can take. Prompt reporting allows defenders to revoke tokens, block deceptive destinations, and protect the organization.
          </p>
        </div>
      </div>

      {/* SCENARIOS SELECTOR */}
      <div className="space-y-space-md">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-2">
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline">
            Select Your Post-Interaction Scenario:
          </span>
          <span className="text-xs text-on-surface-variant font-code">6 Dedicated Playbooks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(SCENARIOS).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveScenario(key)}
              className={`p-3 text-left rounded-lg transition-all cursor-pointer border flex flex-col gap-1 ${
                activeScenario === key
                  ? 'bg-primary text-on-primary border-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/50'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider font-code ${
                activeScenario === key ? 'text-primary-container' : 'text-primary'
              }`}>
                {item.tag}
              </span>
              <span className="font-body-sm text-body-sm font-semibold line-clamp-2 leading-snug">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Scenario Action Guide */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/40">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary font-code">
                {current.tag}
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Action Protocol: {current.title}
              </h2>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider shrink-0 self-start sm:self-auto font-code ${
              current.urgency === 'Critical Priority'
                ? 'bg-error-container text-on-error-container border border-error/30'
                : 'bg-secondary-fixed text-on-secondary-fixed border border-secondary/30'
            }`}>
              {current.urgency}
            </span>
          </div>

          {/* Sequential Action Steps */}
          <div className="space-y-3">
            <h4 className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline">
              Immediate Sequential Actions:
            </h4>
            <div className="space-y-2.5">
              {current.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/40 flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Rationale */}
          <div className="bg-surface-container rounded-lg p-5 border-l-4 border-primary space-y-1 border border-outline-variant/40">
            <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">info</span> Educational Rationale
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {current.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Tip Card */}
      <TipCard title="Preserve Message Integrity">
        Avoid forwarding suspicious emails to colleagues to ask "Does this look real?" Forwarding spreads the message to additional inboxes. Use your email client\'s official <strong>Report Phishing</strong> button or follow your organization\'s instructions to submit message headers directly to IT security.
      </TipCard>

      {/* Module 09 Completion & Curriculum Wrap */}
      <div className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <Link to="/prevention" className="w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors w-full sm:w-auto justify-center cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Module 08: Defense</span>
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
            <span>{isCompleted ? 'Module 09 Completed (Undo)' : 'Complete Module 09'}</span>
          </button>

          <Link to="/dashboard" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors w-full sm:w-auto cursor-pointer shadow-xs">
              <span>View Training Dashboard</span>
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

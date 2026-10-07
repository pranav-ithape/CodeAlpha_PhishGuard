import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TRAINING_MODULES } from '../data/modules';
import { ModuleCard } from '../components/common/ModuleCard';
import { useTrainingProgress } from '../hooks/useTrainingProgress';

export const DashboardPage: React.FC = () => {
  const { 
    progress,
    continueAction,
    completedModulesCount,
    totalModulesCount,
    overallPercentage,
    isCurriculumCompleted,
    isModuleCompleted,
    isModuleInProgress,
    inFlightCount,
    remainingCount,
    weakAreaRecommendations,
    resetProgress,
    recordVisit
  } = useTrainingProgress();

  const [showResetModal, setShowResetModal] = useState(false);
  const cancelBtnRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    recordVisit('/dashboard');
  }, [recordVisit]);

  // Handle ESC key and auto-focus for modal accessibility
  useEffect(() => {
    if (showResetModal) {
      cancelBtnRef.current?.focus();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showResetModal) {
        setShowResetModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResetModal]);

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetModal(false);
  };

  const hasQuizScore = Boolean(progress.quizScores && Object.keys(progress.quizScores).length > 0);
  const bestQuizScore = progress.bestScore;

  return (
    <div className="flex flex-col gap-y-space-xl pb-16">
      {/* Editorial Header */}
      <header className="flex flex-col gap-y-3 max-w-[800px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            Cybersecurity Education &amp; Awareness
          </span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          Know what you're looking at.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[72ch] leading-relaxed">
          PhishGuard trains people to recognize subtle indicators of social engineering, deceptive domains, and fraudulent messaging before an incident occurs.
        </p>
      </header>

      {/* Completion Banner or Continue Learning Hero Plate */}
      {isCurriculumCompleted ? (
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-sm border border-tertiary/40 flex flex-col gap-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-outline-variant/40 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[32px]">verified</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-bold">
                  Curriculum Finalized
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  PhishGuard Training Complete
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary font-label-md text-label-md rounded font-semibold">
                9 of 9 Modules Completed (100%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-on-surface">
            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/40">
              <div className="text-xs font-code uppercase text-outline">Modules Passed</div>
              <div className="text-2xl font-bold font-display text-primary mt-1">9 / 9</div>
              <p className="text-xs text-on-surface-variant mt-1">
                Completed all instructional units, case studies, and defense playbooks.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/40">
              <div className="text-xs font-code uppercase text-outline">Assessment Record</div>
              <div className="text-2xl font-bold font-display text-on-surface mt-1">
                {bestQuizScore ? `${bestQuizScore.score}/${bestQuizScore.total} (${bestQuizScore.percentage}%)` : 'Completed'}
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                {progress.quizAttempts} diagnostic attempt{progress.quizAttempts === 1 ? '' : 's'} recorded.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/40">
              <div className="text-xs font-code uppercase text-outline">Defensive Posture</div>
              <div className="text-sm font-semibold text-tertiary mt-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Active Threat Discernment</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Equipped with the 12-point email check and the Golden Rule of URLs.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-surface-container p-4 text-xs text-on-surface-variant leading-relaxed border-l-4 border-l-tertiary">
            <strong className="text-on-surface font-semibold block mb-1">Educational Training Summary:</strong>
            Completion indicates successful review of PhishGuard's educational scenarios, email header inspection, and domain deconstruction. It does not certify absolute immunity against novel cyber attacks. Continue applying the STOP-THINK-VERIFY-ACT mental pause and standard organization reporting protocols.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link to="/learn" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-5 py-2.5 rounded transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                  <span>Review Curriculum</span>
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                </button>
              </Link>
              <Link to="/quiz" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold px-4 py-2.5 rounded border border-outline-variant transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <span>Retake Assessment</span>
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
              </Link>
            </div>

            <button
              onClick={() => setShowResetModal(true)}
              className="text-outline hover:text-error text-xs font-label-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">history</span>
              <span>Reset Progress</span>
            </button>
          </div>
        </section>
      ) : (
        /* Primary "Continue Learning" Hero Plate */
        <section className="w-full bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-semibold">
                {continueAction.badgeText}
              </span>
              <span className="font-code text-code text-outline flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {continueAction.estimatedMinutes > 0 ? `${continueAction.estimatedMinutes} mins estimated` : 'Self-paced'}
              </span>
            </div>

            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              Module {String(continueAction.moduleNumber).padStart(2, '0')}: {continueAction.moduleTitle}
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant">
              {continueAction.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-48 h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
              <span className="font-label-sm text-label-sm text-outline">
                {completedModulesCount} of {totalModulesCount} modules completed ({overallPercentage}%)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 w-full md:w-auto shrink-0">
            <Link to={continueAction.route} className="w-full sm:w-auto">
              <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-title text-title px-6 py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-sm text-center cursor-pointer">
                <span>{continueAction.actionLabel}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </Link>
            <div className="flex items-center justify-between md:justify-end gap-3 w-full">
              <span className="font-label-sm text-label-sm text-outline text-center md:text-right">
                Auto-saved in browser
              </span>
              {completedModulesCount > 0 && (
                <button
                  onClick={() => setShowResetModal(true)}
                  className="font-label-sm text-label-sm text-outline hover:text-secondary flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset curriculum progress"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Assessment Status Plate (when completed or in progress) */}
      {hasQuizScore && (
        <section className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-title text-title text-on-surface">Module 07: Assessment Record</span>
                <span className="font-code text-xs px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold">
                  Best: {bestQuizScore?.score}/{bestQuizScore?.total} ({bestQuizScore?.percentage}%)
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {bestQuizScore && bestQuizScore.percentage >= 80
                  ? 'Strong threat identification across email headers, deceptive apex domains, and psychological manipulation.'
                  : 'Diagnostic complete. Reinforce weak areas identified during the scenario evaluation.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {weakAreaRecommendations.length > 0 && (
              <Link to={weakAreaRecommendations[0].moduleRoute} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-3.5 py-1.5 rounded border border-secondary text-secondary hover:bg-secondary/10 font-label-md text-label-md font-semibold transition-colors cursor-pointer">
                  Review Weak Areas ({weakAreaRecommendations.length})
                </button>
              </Link>
            )}
            <Link to="/quiz" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-3.5 py-1.5 rounded border border-outline-variant bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors cursor-pointer">
                Retake Quiz
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Structured Course Curriculum */}
      <section className="flex flex-col gap-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-outline-variant/40">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              Curriculum Syllabus
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Comprehensive, sequential casework organized for analytical retention.
            </p>
          </div>
          <div className="flex items-center gap-4 text-outline font-label-sm text-label-sm">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> 
              {completedModulesCount} Completed
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> 
              {inFlightCount} In Flight
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span> 
              {remainingCount} Remaining
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {TRAINING_MODULES.map((mod) => {
            const isCompleted = isModuleCompleted(mod.id);
            const isInProgress = isModuleInProgress(mod.id);

            return (
              <ModuleCard
                key={mod.id}
                module={mod}
                isCompleted={isCompleted}
                isInProgress={isInProgress}
                isLocked={false}
              />
            );
          })}
        </div>
      </section>

      {/* Educational Practice & Key Takeaways Row (7:5 Split) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        {/* Interactive Practice Labs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-y-space-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              Interactive Practice Labs
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Applied analytical environments with sanitized real-world artifacts. Note: Labs reinforce learning and do not award curriculum module credit.
            </p>
          </div>

          <div className="flex flex-col gap-y-space-sm h-full justify-between">
            {/* Lab A: Email Inspector */}
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm border border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">mark_email_unread</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title text-title text-on-surface">Email Red-Flag Inspector</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Examine realistic employee emails and identify deceptive markers in header fields, body copy, and signature blocks. (Reinforces Module 03)
                  </p>
                  <div className="flex items-center gap-3 mt-2 font-code text-code text-outline">
                    <span>12 active cases</span>
                    <span>·</span>
                    <span>Avg: 6m per review</span>
                  </div>
                </div>
              </div>
              <Link to="/email-analysis" className="shrink-0 w-full sm:w-auto">
                <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-4 py-2 rounded shrink-0 transition-colors shadow-sm w-full sm:w-auto cursor-pointer">
                  Open Email Lab
                </button>
              </Link>
            </div>

            {/* Lab B: URL Deconstructor */}
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm border border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">link</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title text-title text-on-surface">URL &amp; Domain Deconstructor</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Dissect deceptive hyperlinks down to RFC-aligned root domains, subdomains, and obfuscated redirect paths. (Reinforces Module 04)
                  </p>
                  <div className="flex items-center gap-3 mt-2 font-code text-code text-outline">
                    <span>Interactive sandbox</span>
                    <span>·</span>
                    <span>Unicode decoder</span>
                  </div>
                </div>
              </div>
              <Link to="/url-analysis" className="shrink-0 w-full sm:w-auto">
                <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-4 py-2 rounded shrink-0 transition-colors shadow-sm w-full sm:w-auto cursor-pointer">
                  Open Domain Lab
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Key Takeaway (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-y-space-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              Defensive Mental Model
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Core mental model for fast-paced digital communications.
            </p>
          </div>

          <aside className="bg-surface-container rounded-lg p-space-md border-l-4 border-secondary flex flex-col justify-between h-full gap-y-4 shadow-sm border border-outline-variant/40">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">lightbulb</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  The Golden Rule of URLs
                </span>
              </div>
              <h4 className="font-title text-title text-on-surface">
                Always inspect the first single forward slash (/)
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                The authentic domain host is always the segment immediately to the left of the very first single slash after the protocol. Subdomains before it can be named anything an attacker chooses.
              </p>

              {/* Visual anatomical diagram of a URL */}
              <div className="bg-surface-container-high rounded p-3 font-code text-code overflow-x-auto text-on-surface border border-outline-variant/50">
                <div className="text-outline text-[11px] mb-1 font-semibold uppercase tracking-wider">URL ANATOMY BREAKDOWN</div>
                <div className="whitespace-nowrap">
                  <span className="text-outline">https://</span>
                  <span className="text-secondary font-bold">login.company.com.attacker.org</span>
                  <span className="bg-secondary/20 text-secondary font-bold px-1 rounded">/</span>
                  <span className="text-outline">portal/auth</span>
                </div>
                <div className="text-[11px] text-secondary mt-1 font-sans font-medium">
                  ↑ Actual destination host is <strong>attacker.org</strong>, not login.company.com
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest/80 rounded p-3 flex items-start gap-2.5 border border-outline-variant/40">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">verified_user</span>
              <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                <strong>Practical tip:</strong> Never trust padlock icons alone. HTTPS protects the connection between your browser and the website, but it does not prove that the website itself is legitimate.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Educational Session Footer */}
      <footer className="bg-surface-container-low rounded-lg p-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2 border border-outline-variant/50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">school</span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              PhishGuard Educational Platform
            </span>
            <span className="font-body-sm text-body-sm text-outline">
              Canonical 9-Module Defensive Curriculum · Client-Side Local State
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/prevention">
            <button className="bg-surface-container-lowest hover:bg-surface-container font-label-md text-label-md text-on-surface px-3 py-1.5 rounded transition-colors shadow-xs border border-outline-variant/60 cursor-pointer">
              Defense Field Guide
            </button>
          </Link>
          <Link to="/incident-response">
            <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-3 py-1.5 rounded transition-colors shadow-xs cursor-pointer">
              Incident Response Triage
            </button>
          </Link>
        </div>
      </footer>

      {/* Accessible Reset Confirmation Modal */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-6 shadow-xl border border-outline-variant/80 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div>
                <h3 id="reset-modal-title" className="font-headline-sm text-headline-sm text-on-surface">
                  Reset Training Progress?
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  This will clear your completed module checkmarks, lesson progress, and assessment quiz scores back to a fresh learner state.
                </p>
                <p className="font-body-xs text-xs text-outline mt-2">
                  Your theme preference (light/dark mode) and all other browser settings will NOT be changed.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/40">
              <button
                ref={cancelBtnRef}
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded border border-outline-variant text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded bg-error text-on-error hover:bg-error/90 font-label-md text-label-md font-semibold transition-colors cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

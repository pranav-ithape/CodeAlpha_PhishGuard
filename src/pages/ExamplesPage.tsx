import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_CASE_STUDIES } from '../data/sampleCaseStudies';
import { useTrainingProgress } from '../hooks/useTrainingProgress';

export const ExamplesPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('case-1');
  const { markModuleComplete, unmarkModuleComplete, isModuleCompleted, recordVisit } = useTrainingProgress();

  React.useEffect(() => {
    recordVisit('/examples', 'mod-6');
  }, [recordVisit]);

  const isCompleted = isModuleCompleted('mod-6');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      unmarkModuleComplete('mod-6');
    } else {
      markModuleComplete('mod-6');
    }
  };

  return (
    <div className="flex flex-col gap-y-space-xl max-w-[1040px] pb-16">
      {/* Header */}
      <header className="flex flex-col gap-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            Module 06 • Case Studies Archive &amp; Incident Analyses
          </span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          Real-World Phishing Incident Post-Mortems
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[76ch] leading-relaxed">
          Forensic analyses of major organizational compromises triggered by deceptive messaging. Each case study clearly identifies documented historical incidents versus composite educational scenarios, examining attack vectors, missed warning signs, and defensive takeaways.
        </p>
      </header>

      {/* Case Studies List */}
      <div className="space-y-space-md">
        {SAMPLE_CASE_STUDIES.map((study) => {
          const isExpanded = expandedId === study.id;
          const isDocumented = study.caseType === 'Documented Case';
          const factOrDesignTag = isDocumented ? 'FACT' : 'CASE DESIGN';

          return (
            <div
              key={study.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header Clickable */}
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggleExpand(study.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(study.id);
                  }
                }}
                className="p-space-lg cursor-pointer hover:bg-surface-container-low/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-xl transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Provenance Badge */}
                    <span className={`px-2.5 py-0.5 rounded font-label-sm text-label-sm font-bold uppercase font-code tracking-wider ${
                      isDocumented
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'bg-secondary-fixed text-on-secondary-fixed border border-secondary/30'
                    }`}>
                      {study.caseType}
                    </span>

                    <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded font-label-sm text-label-sm font-semibold">
                      {study.attackMethod}
                    </span>
                    <span className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[15px] text-outline">apartment</span>
                      {study.industry}
                    </span>
                    <span className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[15px] text-outline">calendar_today</span>
                      {study.year}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors leading-snug">
                    {study.title}
                  </h3>

                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                <div className="shrink-0 p-1.5 rounded border border-outline-variant text-on-surface-variant mt-1">
                  <span className="material-symbols-outlined text-[18px]">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {/* Expanded Detailed 11-Point Breakdown */}
              {isExpanded && (
                <div className="border-t border-outline-variant/60 bg-surface-container-low/40 p-6 sm:p-8 space-y-6 text-sm">
                  
                  {/* 1. Incident Overview & Threat Architecture */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
                      <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                        1. Incident Overview &amp; Scenario Description
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-container-highest text-primary border border-outline-variant/60 font-code">
                        {factOrDesignTag}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      {study.incidentOverview}
                    </p>
                  </div>

                  {/* 2 & 3. Target & Attack Vector Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-secondary">person_alert</span>
                          2. Target
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-surface-container text-outline font-code">
                          {factOrDesignTag}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        {study.target}
                      </p>
                    </div>

                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">alt_route</span>
                          3. Attack Vector
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-surface-container text-outline font-code">
                          {factOrDesignTag}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        {study.attackVector}
                      </p>
                    </div>
                  </div>

                  {/* 4 & 5. Initial Deception & Victim Interaction */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-error">theater_comedy</span>
                          4. Initial Deception
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-surface-container text-outline font-code">
                          {factOrDesignTag}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        {study.initialDeception}
                      </p>
                    </div>

                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">touch_app</span>
                          5. Victim Interaction
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-surface-container text-outline font-code">
                          {factOrDesignTag}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        {study.victimInteraction}
                      </p>
                    </div>
                  </div>

                  {/* 6. Attacker Objective */}
                  <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">target</span>
                        6. Attacker Objective
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-surface-container text-outline font-code">
                        {factOrDesignTag}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      {study.attackerObjective}
                    </p>
                  </div>

                  {/* 7 & 8. Missed Signals & Why Attack Succeeded */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {/* 7. Warning Signs Missed */}
                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-error font-bold text-xs uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[18px]">warning</span>
                          <span>7. Missed Warning Signals</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-secondary/10 text-secondary font-code">
                          EDUCATIONAL INTERPRETATION
                        </span>
                      </div>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-on-surface-variant leading-relaxed font-body-sm">
                        {study.warningSignsMissed.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 8. Why Attack Succeeded */}
                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                          <span>8. Why the Attack Succeeded</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-secondary/10 text-secondary font-code">
                          EDUCATIONAL INTERPRETATION
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        {study.whyAttackSucceeded}
                      </p>
                    </div>
                  </div>

                  {/* 9. Impact */}
                  <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-on-surface font-bold text-xs uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[18px] text-error">monetization_on</span>
                        <span>9. Impact (Financial &amp; Operational)</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-surface-container text-outline font-code">
                        {factOrDesignTag}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface font-semibold leading-relaxed">
                      {study.financialOrDataImpact}
                    </p>
                  </div>

                  {/* 10. Defensive Lessons Learned */}
                  <div className="bg-surface-container rounded-lg p-space-md border-l-4 border-tertiary space-y-2 border border-outline-variant/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-tertiary font-bold text-xs uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>10. Defensive Lessons Learned</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-tertiary/10 text-tertiary font-code">
                        EDUCATIONAL INTERPRETATION
                      </span>
                    </div>
                    <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-on-surface leading-relaxed font-body-sm">
                      {study.lessonsLearned.map((lesson, idx) => (
                        <li key={idx}>{lesson}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 11. What Should Have Happened Instead */}
                  <div className="bg-surface-container-lowest p-space-md rounded-lg border-l-4 border-primary space-y-1.5 border border-outline-variant/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>11. What Should Have Happened Instead</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase bg-primary/10 text-primary font-code">
                        EDUCATIONAL INTERPRETATION
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      {study.whatShouldHaveHappened}
                    </p>
                  </div>

                  {/* SOURCES & FURTHER READING */}
                  {study.sources && study.sources.length > 0 && (
                    <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/50 space-y-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-outline flex items-center gap-1 font-code">
                        <span className="material-symbols-outlined text-[16px] text-outline">library_books</span>
                        Sources &amp; Authoritative References
                      </span>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-on-surface-variant font-body-sm leading-relaxed">
                        {study.sources.map((src, sIdx) => (
                          <li key={sIdx}>
                            <strong className="text-on-surface">{src.title}: </strong>
                            <span>{src.citation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Module 06 Completion & Next Navigation */}
      <div className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <Link to="/learn/social-engineering" className="w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors w-full sm:w-auto justify-center cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Module 05: Psychology</span>
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
            <span>{isCompleted ? 'Module 06 Completed (Undo)' : 'Complete Module 06'}</span>
          </button>

          <Link to="/quiz" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded border border-primary text-primary hover:bg-primary/10 font-label-md text-label-md font-semibold transition-colors w-full sm:w-auto cursor-pointer">
              <span>Take Assessment (Mod 07)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

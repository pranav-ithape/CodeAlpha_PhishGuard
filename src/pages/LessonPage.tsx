import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_LESSONS } from '../data/sampleLessons';
import { TRAINING_MODULES } from '../data/modules';
import { TipCard } from '../components/common/TipCard';
import { WarningCard } from '../components/common/WarningCard';
import { Checklist } from '../components/common/Checklist';
import { useTrainingProgress } from '../hooks/useTrainingProgress';

export const LessonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { markLessonComplete, markModuleComplete, unmarkModuleComplete, isLessonCompleted, recordVisit } = useTrainingProgress();

  // Knowledge check state
  const [selectedKnowledgeOption, setSelectedKnowledgeOption] = useState<string | null>(null);
  const [showKnowledgeFeedback, setShowKnowledgeFeedback] = useState<boolean>(false);

  // Progressive disclosure expanded levels per section
  const [activeDisclosureLevel, setActiveDisclosureLevel] = useState<Record<string, number>>({});

  const normalizedSlug = slug ? (
    slug === 'intro-to-phishing' ? 'introduction' :
    slug === 'types-of-phishing' ? 'phishing-types' :
    slug === 'anatomy-of-phishing-emails' ? 'phishing-emails' :
    slug === 'fake-websites-impersonation' ? 'fake-websites' :
    slug === 'social-engineering-psychology' ? 'social-engineering' :
    slug
  ) : '';

  const lesson = normalizedSlug ? SAMPLE_LESSONS[normalizedSlug] : null;
  const parentModule = TRAINING_MODULES.find((m) => m.slug === normalizedSlug);

  React.useEffect(() => {
    if (lesson) {
      recordVisit(`/learn/${slug}`, lesson.moduleId);
    }
  }, [lesson, slug, recordVisit]);

  if (!lesson) {
    return (
      <div className="max-w-[800px] mx-auto py-16 text-center space-y-4">
        <h2 className="font-headline-md text-headline-md text-on-surface">Module Content in Preparation</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          The requested module syllabus is being formatted according to archival standards. You can explore the active modules or interactive labs.
        </p>
        <Link to="/learn">
          <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md px-5 py-2.5 rounded transition-colors shadow-xs">
            Back to All Modules
          </button>
        </Link>
      </div>
    );
  }

  const isCompleted = isLessonCompleted(lesson.id);

  const handleToggleComplete = () => {
    if (isCompleted) {
      if (lesson.moduleId) {
        unmarkModuleComplete(lesson.moduleId);
      }
    } else {
      markLessonComplete(lesson.id);
      if (lesson.moduleId) {
        markModuleComplete(lesson.moduleId);
      }
    }
  };

  const setSectionLevel = (sectionId: string, level: number) => {
    setActiveDisclosureLevel((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === level ? 0 : level,
    }));
  };

  // Find previous and next modules
  const currentModuleIndex = parentModule ? TRAINING_MODULES.findIndex((m) => m.id === parentModule.id) : -1;
  const prevModule = currentModuleIndex > 0 ? TRAINING_MODULES[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex >= 0 && currentModuleIndex < TRAINING_MODULES.length - 1 ? TRAINING_MODULES[currentModuleIndex + 1] : null;

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full max-w-[840px] px-space-md sm:px-space-lg flex flex-col gap-y-space-xl pb-16">
        {/* Lesson Top Navigation & Metadata Strip */}
        <header className="flex flex-col gap-y-space-sm pt-2">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <Link to="/learn" className="hover:text-primary transition-colors">
              Curriculum
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary transition-colors">
              Module {parentModule ? String(parentModule.number).padStart(2, '0') : '01'}
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">{lesson.category}</span>
          </nav>

          {/* Editorial Module Pill */}
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2.5 py-1 bg-surface-container-high text-primary font-label-sm text-label-sm rounded uppercase tracking-wider font-semibold">
              Module {parentModule ? String(parentModule.number).padStart(2, '0') : '01'} • {parentModule ? parentModule.title : 'Fundamentals'}
            </span>
            <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Canonical Curriculum
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
            {lesson.title}
          </h1>

          {/* Metadata Line */}
          <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs pt-1 text-on-surface-variant font-label-md text-label-md">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
              {lesson.estimatedMinutes} min read
            </span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
              {lesson.difficulty} Difficulty
            </span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
              Canonical Standard
            </span>
          </div>

          {/* Reading Progress Line */}
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden mt-3">
            <div 
              className={`h-full bg-primary rounded-full transition-all duration-300 ${
                isCompleted ? 'w-full' : 'w-2/5'
              }`} 
            />
          </div>
        </header>

        {/* Learning Objective Box */}
        <section className="bg-surface-container-low rounded-lg p-space-lg shadow-sm border border-outline-variant/60 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex items-start gap-space-md pl-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
              target
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
                Core Learning Objective
              </span>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {lesson.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Cognitive Heuristics Visual Figure */}
        <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-3 border border-outline-variant/60 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className="uppercase tracking-wider font-semibold text-primary">
              Cognitive Inspection Heatmap Simulation
            </span>
            <span className="font-code text-code text-outline">
              Diagnostic Exposure Matrix
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-surface-container-lowest p-3 rounded shadow-xs flex flex-col gap-1 border border-outline-variant/40">
              <div className="flex items-center gap-1.5 text-secondary">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span className="font-label-md text-label-md font-bold">Initial Glance (0.8s)</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Display Name &amp; Familiar Brand triggers rapid obedience bias.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded shadow-xs flex flex-col gap-1 border border-outline-variant/40">
              <div className="flex items-center gap-1.5 text-tertiary">
                <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                <span className="font-label-md text-label-md font-bold">Unseen Reality</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                True envelope sender or registered apex domain is overlooked.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded shadow-xs flex flex-col gap-1 border border-outline-variant/40">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[18px]">pan_tool_alt</span>
                <span className="font-label-md text-label-md font-bold">Target Reflex</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Urgent call to action induces clicking before mental verification.
              </p>
            </div>
          </div>
        </div>

        {/* Article Content Sheet */}
        <article className="bg-surface-container-lowest rounded-xl p-6 sm:p-10 shadow-sm border border-outline-variant/60 flex flex-col gap-y-space-xl">
          {lesson.sections.map((section, sIndex) => (
            <section key={section.id} className="flex flex-col gap-y-space-md">
              <div className="flex items-baseline gap-2 pb-2 border-b border-outline-variant/40">
                <span className="font-code text-code text-primary font-bold">
                  {String(sIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  {section.title}
                </h2>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface leading-loose text-justify whitespace-pre-line">
                {section.content}
              </p>

              {/* PROGRESSIVE DISCLOSURE COMPONENT */}
              {section.progressiveDisclosure && (
                <div className="my-space-xs rounded-lg border border-outline-variant/60 bg-surface-container-low/60 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">layers</span>
                      Progressive Depth Explorer
                    </span>
                    <span className="text-[11px] text-outline font-code">Click depth level to explore</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSectionLevel(section.id, 1)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                        activeDisclosureLevel[section.id] === 1
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/50'
                      }`}
                    >
                      Level 1: Simple
                    </button>
                    <button
                      onClick={() => setSectionLevel(section.id, 2)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                        activeDisclosureLevel[section.id] === 2
                          ? 'bg-secondary text-on-secondary border-secondary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/50'
                      }`}
                    >
                      Level 2: Scenario Example
                    </button>
                    <button
                      onClick={() => setSectionLevel(section.id, 3)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                        activeDisclosureLevel[section.id] === 3
                          ? 'bg-tertiary text-on-tertiary border-tertiary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/50'
                      }`}
                    >
                      Level 3: Technical
                    </button>
                    {section.progressiveDisclosure.level4DeepDive && (
                      <button
                        onClick={() => setSectionLevel(section.id, 4)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                          activeDisclosureLevel[section.id] === 4
                            ? 'bg-surface-container-highest text-primary border-primary'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/50'
                        }`}
                      >
                        Level 4: RFC / Deep Dive
                      </button>
                    )}
                  </div>

                  {/* Active Disclosure Content Panel */}
                  {activeDisclosureLevel[section.id] === 1 && (
                    <div className="bg-surface-container-lowest p-3.5 rounded border border-primary/30 text-xs sm:text-sm text-on-surface leading-relaxed animate-fadeIn">
                      <strong className="text-primary block mb-1">Level 1: Simple Concept:</strong>
                      {section.progressiveDisclosure.level1Simple}
                    </div>
                  )}

                  {activeDisclosureLevel[section.id] === 2 && (
                    <div className="bg-surface-container-lowest p-3.5 rounded border border-secondary/30 text-xs sm:text-sm text-on-surface leading-relaxed animate-fadeIn">
                      <strong className="text-secondary block mb-1">Level 2: Practical Scenario:</strong>
                      {section.progressiveDisclosure.level2Example}
                    </div>
                  )}

                  {activeDisclosureLevel[section.id] === 3 && (
                    <div className="bg-surface-container-lowest p-3.5 rounded border border-tertiary/30 text-xs sm:text-sm text-on-surface leading-relaxed animate-fadeIn">
                      <strong className="text-tertiary block mb-1">Level 3: Technical Explanation:</strong>
                      {section.progressiveDisclosure.level3Technical}
                    </div>
                  )}

                  {activeDisclosureLevel[section.id] === 4 && section.progressiveDisclosure.level4DeepDive && (
                    <div className="bg-surface-container-lowest p-3.5 rounded border border-outline-variant/60 font-code text-xs text-on-surface leading-relaxed animate-fadeIn">
                      <strong className="text-primary block mb-1 font-sans">Level 4: Protocol &amp; RFC Deep Dive:</strong>
                      {section.progressiveDisclosure.level4DeepDive}
                    </div>
                  )}
                </div>
              )}

              {/* Visual Highlight / Matrix breakdown */}
              {section.visualHighlight && (
                <div className="my-space-sm bg-surface-container rounded-lg p-space-md font-code text-code flex flex-col gap-2 border border-outline-variant/50">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest text-on-surface-variant">
                    <span className="font-bold text-label-sm uppercase tracking-wider text-on-surface">
                      {section.visualHighlight.title}
                    </span>
                    <span className="text-label-sm text-secondary font-semibold">Diagnostic Breakdown</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-on-surface">
                    {section.visualHighlight.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-surface-container-lowest p-2.5 rounded border border-outline-variant/30 text-xs"
                      >
                        <div className="flex flex-col">
                          <span className="text-on-surface-variant font-sans font-medium text-[11px]">{item.label}:</span>
                          <span className="text-primary font-bold break-all">{item.value}</span>
                          {item.explanation && (
                            <span className="text-on-surface-variant font-sans text-[11px] mt-0.5">↳ {item.explanation}</span>
                          )}
                        </div>
                        {item.isSuspicious !== undefined && (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                            item.isSuspicious 
                              ? 'bg-error-container text-on-error-container border border-error/30' 
                              : 'bg-tertiary/10 text-tertiary border border-tertiary/30'
                          }`}>
                            {item.isSuspicious ? 'Flagged Risk' : 'Authenticated'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {section.keyTakeaways && (
                <div className="bg-surface-container rounded-lg p-space-md border border-outline-variant/50 space-y-2 mt-1">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider block">
                    Key Defensive Takeaways:
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {section.keyTakeaways.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warning Callout */}
              {section.warningNote && (
                <WarningCard title="Adversary Vector Warning">
                  {section.warningNote}
                </WarningCard>
              )}

              {/* Pro Tip */}
              {section.proTip && (
                <TipCard title="Security Analyst Recommendation">
                  {section.proTip}
                </TipCard>
              )}
            </section>
          ))}
        </article>

        {/* REINFORCING INTERACTIVE LAB LINK (Modules 03 & 04) */}
        {lesson.reinforcingLab && (
          <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 border-2 border-primary/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">
                  {lesson.reinforcingLab.iconName || 'science'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary font-code">
                    Reinforcing Hands-on Lab
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {lesson.reinforcingLab.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl leading-relaxed">
                  {lesson.reinforcingLab.description}
                </p>
              </div>
            </div>

            <Link to={lesson.reinforcingLab.route} className="shrink-0 w-full sm:w-auto">
              <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md px-5 py-3 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 w-full sm:w-auto font-semibold cursor-pointer">
                <span>{lesson.reinforcingLab.buttonLabel}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </Link>
          </div>
        )}

        {/* Practical Verification Checklist */}
        {lesson.practicalChecklist && (
          <Checklist
            title="Practical Forensic Habit Checklist"
            items={lesson.practicalChecklist}
          />
        )}

        {/* EMBEDDED KNOWLEDGE CHECK COMPONENT */}
        {lesson.knowledgeCheck && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-code">
                <span className="material-symbols-outlined text-[20px]">quiz</span>
                <span>Module Knowledge Check</span>
              </div>
              <span className="text-[11px] text-outline font-code">Scenario-Based Check</span>
            </div>

            {lesson.knowledgeCheck.scenarioContext && (
              <div className="bg-surface-container-low p-3.5 rounded border border-outline-variant/40 text-xs text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface font-code mr-1 uppercase">Scenario Context:</strong>
                {lesson.knowledgeCheck.scenarioContext}
              </div>
            )}

            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
              {lesson.knowledgeCheck.question}
            </h3>

            <div className="space-y-2.5">
              {lesson.knowledgeCheck.options.map((opt) => {
                const isSelected = selectedKnowledgeOption === opt.id;
                const isCorrect = opt.id === lesson.knowledgeCheck?.correctOptionId;

                let optStyle = 'border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface';

                if (showKnowledgeFeedback) {
                  if (isCorrect) {
                    optStyle = 'border-tertiary bg-tertiary-fixed/30 text-on-surface ring-1 ring-tertiary font-medium';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'border-error bg-error-container text-on-error-container ring-1 ring-error';
                  } else {
                    optStyle = 'border-outline-variant/30 opacity-60 text-outline';
                  }
                } else if (isSelected) {
                  optStyle = 'border-primary bg-primary/10 ring-1 ring-primary text-on-surface font-medium';
                }

                return (
                  <div
                    key={opt.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={showKnowledgeFeedback ? -1 : 0}
                    onClick={() => {
                      if (!showKnowledgeFeedback) {
                        setSelectedKnowledgeOption(opt.id);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (!showKnowledgeFeedback && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setSelectedKnowledgeOption(opt.id);
                      }
                    }}
                    className={`flex items-start gap-3 rounded-lg border p-3.5 text-xs sm:text-sm cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${optStyle}`}
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-outline-variant mt-0.5 text-xs font-code font-bold">
                      {showKnowledgeFeedback && isCorrect ? (
                        <span className="material-symbols-outlined text-[16px] text-tertiary">check</span>
                      ) : showKnowledgeFeedback && isSelected && !isCorrect ? (
                        <span className="material-symbols-outlined text-[16px] text-error">close</span>
                      ) : (
                        opt.id.replace('opt-', '').toUpperCase()
                      )}
                    </div>
                    <span className="font-body-md text-body-md leading-relaxed">{opt.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Knowledge Check Feedback Display */}
            {showKnowledgeFeedback && (
              <div className="bg-surface-container p-4 rounded-lg border-l-4 border-primary space-y-2 text-xs leading-relaxed border border-outline-variant/40">
                <span className="font-bold text-on-surface text-xs uppercase tracking-wider block">
                  Forensic Explanation:
                </span>
                <p className="text-on-surface-variant font-body-sm leading-relaxed">
                  {lesson.knowledgeCheck.explanation}
                </p>
                <div className="pt-2 border-t border-outline-variant/30 flex items-center gap-1.5 text-tertiary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Rule: {lesson.knowledgeCheck.takeaway}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-outline-variant/40">
              <span className="text-xs text-outline font-code">
                {selectedKnowledgeOption ? 'Option Selected' : 'Choose one answer to verify'}
              </span>

              {!showKnowledgeFeedback ? (
                <button
                  onClick={() => setShowKnowledgeFeedback(true)}
                  disabled={!selectedKnowledgeOption}
                  className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-label-md text-label-md font-semibold px-4 py-2 rounded transition-colors shadow-xs cursor-pointer"
                >
                  Verify Answer
                </button>
              ) : (
                <span className="text-xs text-tertiary font-code font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                  <span>Knowledge Check Reviewed</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contextual Reinforcement Lab Links */}
        {parentModule?.id === 'mod-3' && (
          <div className="rounded-xl border border-primary/40 bg-surface-container-low p-space-md sm:p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">mark_email_unread</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Applied Practice Lab
                  </span>
                  <span className="font-code text-[11px] px-2 py-0.5 rounded bg-surface-container text-outline">
                    Reinforces Module 03
                  </span>
                </div>
                <h3 className="font-title text-title text-on-surface">Try Email Red-Flag Inspector</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Examine authentic synthetic headers, display name spoofing, and RFC envelope paths in the applied forensic sandbox.
                </p>
                <span className="text-[11px] text-outline font-code block">
                  * Note: Practice labs provide investigative reinforcement and do not award module completion credit.
                </span>
              </div>
            </div>
            <Link to="/email-analysis" className="shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 rounded bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-xs cursor-pointer">
                Open Email Lab →
              </button>
            </Link>
          </div>
        )}

        {parentModule?.id === 'mod-4' && (
          <div className="rounded-xl border border-secondary/40 bg-surface-container-low p-space-md sm:p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">link</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Applied Practice Lab
                  </span>
                  <span className="font-code text-[11px] px-2 py-0.5 rounded bg-surface-container text-outline">
                    Reinforces Module 04
                  </span>
                </div>
                <h3 className="font-title text-title text-on-surface">Try URL &amp; Domain Deconstructor</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dissect multi-label public suffixes (.co.uk, .com.au), apex domains, and test the Golden Rule of URLs in real time.
                </p>
                <span className="text-[11px] text-outline font-code block">
                  * Note: Practice labs provide investigative reinforcement and do not award module completion credit.
                </span>
              </div>
            </div>
            <Link to="/url-analysis" className="shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 rounded bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary/90 transition-colors shadow-xs cursor-pointer">
                Open Domain Lab →
              </button>
            </Link>
          </div>
        )}

        {/* Navigation & Completion Footer */}
        <div className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          {prevModule ? (
            <Link to={prevModule.route} className="w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors w-full sm:w-auto justify-center cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Mod {String(prevModule.number).padStart(2, '0')}: {prevModule.title.split(' ')[0]}</span>
              </button>
            </Link>
          ) : (
            <Link to="/learn" className="w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors w-full sm:w-auto justify-center cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Curriculum Overview</span>
              </button>
            </Link>
          )}

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
              <span>{isCompleted ? 'Completed (Undo)' : 'Mark Module Complete'}</span>
            </button>

            {nextModule && (
              <Link to={nextModule.route} className="w-full sm:w-auto">
                <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded border border-primary text-primary hover:bg-primary/10 font-label-md text-label-md font-semibold transition-colors w-full sm:w-auto cursor-pointer">
                  <span>Mod {String(nextModule.number).padStart(2, '0')}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

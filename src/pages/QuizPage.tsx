import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_QUIZ_QUESTIONS } from '../data/sampleQuiz';
import { useTrainingProgress, computeWeakAreaRecommendations } from '../hooks/useTrainingProgress';
import { WeakAreaRecommendation } from '../types';

export const QuizPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [lastMissedIds, setLastMissedIds] = useState<string[]>([]);

  const { progress, saveQuizScore, recordVisit } = useTrainingProgress();

  useEffect(() => {
    recordVisit('/quiz', 'mod-7');
  }, [recordVisit]);

  const currentQuestion = SAMPLE_QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = SAMPLE_QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    if (showExplanation) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleVerify = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      let correct = 0;
      const missed: string[] = [];
      SAMPLE_QUIZ_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctOptionId) {
          correct += 1;
        } else {
          missed.push(q.id);
        }
      });

      setLastMissedIds(missed);
      // Authoritatively save score, attempt record, and missed question IDs
      saveQuizScore('assessment-v1', correct, totalQuestions, missed);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
    setCurrentIdx(0);
  };

  const score = SAMPLE_QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctOptionId
  ).length;
  const scorePercent = Math.round((score / totalQuestions) * 100);

  // Compute weak areas from the current completed attempt
  const activeWeakAreas: WeakAreaRecommendation[] = computeWeakAreaRecommendations(lastMissedIds);

  const bestScore = progress.bestScore || {
    score,
    total: totalQuestions,
    percentage: scorePercent,
    completedAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-[840px] mx-auto flex flex-col gap-y-space-xl pb-16">
      {/* Header */}
      <header className="flex flex-col gap-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            Module 07 • Evaluative Assessment
          </span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          PhishGuard Comprehensive Assessment
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[72ch] leading-relaxed">
          Scenario-driven assessment measuring real-world discernment across email headers, deceptive subdomains, social engineering hooks, and high-stakes incident judgments.
        </p>
      </header>

      {!isFinished ? (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-code text-code text-on-surface-variant">
              <span>QUESTION {currentIdx + 1} OF {totalQuestions}</span>
              <span className="font-semibold text-primary">{currentQuestion.category}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Context */}
          {currentQuestion.scenarioContext && (
            <div className="rounded-lg border border-outline-variant/50 bg-surface-container-low p-4 text-xs text-on-surface-variant">
              <span className="font-bold text-on-surface mr-1.5 uppercase font-code tracking-wider">Scenario Context:</span>
              {currentQuestion.scenarioContext}
            </div>
          )}

          {/* Question Text */}
          <h2 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
            {currentQuestion.question}
          </h2>

          {/* Options List */}
          <div role="radiogroup" aria-label="Answer options" className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option.id;
              const isCorrect = option.id === currentQuestion.correctOptionId;

              let optionStyle = 'border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface';

              if (showExplanation) {
                if (isCorrect) {
                  optionStyle = 'border-tertiary bg-tertiary-fixed/40 text-on-surface ring-1 ring-tertiary font-medium';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-error bg-error-container text-on-error-container ring-1 ring-error';
                } else {
                  optionStyle = 'border-outline-variant/30 opacity-60 text-outline';
                }
              } else if (isSelected) {
                optionStyle = 'border-primary bg-primary/10 ring-1 ring-primary text-on-surface font-medium';
              }

              return (
                <div
                  key={option.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={showExplanation ? -1 : 0}
                  onClick={() => handleSelectOption(option.id)}
                  onKeyDown={(e) => {
                    if (!showExplanation && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSelectOption(option.id);
                    }
                  }}
                  className={`flex items-start gap-3.5 rounded-lg border p-4 text-sm cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${optionStyle}`}
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-outline-variant mt-0.5 text-xs font-code font-bold">
                    {showExplanation && isCorrect ? (
                      <span className="material-symbols-outlined text-[16px] text-tertiary">check</span>
                    ) : showExplanation && isSelected && !isCorrect ? (
                      <span className="material-symbols-outlined text-[16px] text-error">close</span>
                    ) : (
                      option.id.replace('opt-', '').toUpperCase()
                    )}
                  </div>
                  <span className="font-body-md text-body-md leading-relaxed">{option.text}</span>
                </div>
              );
            })}
          </div>

          {/* Explanation Callout */}
          {showExplanation && (
            <div className="rounded-lg border border-outline-variant/50 bg-surface-container p-5 space-y-4 text-xs leading-relaxed border-l-4 border-l-primary shadow-xs">
              <div className="flex items-center gap-2 font-bold text-on-surface font-title text-title">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                <span>Forensic Analysis &amp; Explanation</span>
              </div>
              <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">{currentQuestion.explanation}</p>

              {/* Why Weaker Choices Are Flawed */}
              {currentQuestion.whyWeakerChoices && currentQuestion.whyWeakerChoices.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                  <span className="font-bold text-on-surface text-[11px] uppercase tracking-wider block font-code">
                    Analysis of Alternative Options:
                  </span>
                  <div className="space-y-1.5">
                    {currentQuestion.whyWeakerChoices.map((item, idx) => (
                      <div key={idx} className="bg-surface-container-lowest p-2.5 rounded border border-outline-variant/30 text-xs">
                        <span className="font-bold font-code text-error mr-1.5">
                          {item.optionId.replace('opt-', '').toUpperCase()}:
                        </span>
                        <span className="text-on-surface-variant font-body-sm">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Takeaway */}
              {currentQuestion.securityTakeaway && (
                <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant/40 flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div>
                    <span className="font-bold text-on-surface text-xs uppercase tracking-wider block">Security Rule:</span>
                    <span className="text-on-surface-variant font-body-sm">{currentQuestion.securityTakeaway}</span>
                  </div>
                </div>
              )}

              {/* Diagnostic Red Flags */}
              {currentQuestion.redFlagsIdentified && (
                <div className="space-y-1.5 pt-2 border-t border-outline-variant/40">
                  <span className="font-bold text-on-surface text-[11px] uppercase tracking-wider block font-code">
                    Identified Warning Signals:
                  </span>
                  <ul className="list-disc pl-4 text-on-surface-variant space-y-1 text-xs">
                    {currentQuestion.redFlagsIdentified.map((flag, fIdx) => (
                      <li key={fIdx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-between items-center pt-2 border-t border-outline-variant/40">
            <span className="text-xs text-outline font-code">
              {selectedAnswers[currentQuestion.id] ? 'Option Selected' : 'Choose one answer'}
            </span>

            {!showExplanation ? (
              <button
                onClick={handleVerify}
                disabled={!selectedAnswers[currentQuestion.id]}
                className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-label-md text-label-md font-semibold px-5 py-2.5 rounded transition-colors shadow-xs cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-5 py-2.5 rounded transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentIdx + 1 < totalQuestions ? 'Next Scenario' : 'View Final Score'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Diagnostic Feedback Panel */
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Header Status & Badge */}
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
              scorePercent >= 80 ? 'bg-tertiary/10 text-tertiary' : 'bg-secondary/10 text-secondary'
            }`}>
              <span className="material-symbols-outlined text-[36px]">
                {scorePercent >= 80 ? 'military_tech' : 'verified_user'}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold">
                {scorePercent >= 80 ? 'Assessment Completed — Strong Performance' : 'Assessment Completed — Review Recommended'}
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {scorePercent >= 80 ? 'Strong Threat Discrimination' : 'Diagnostic Assessment Finished'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
                {scorePercent >= 80
                  ? 'Outstanding discernment across email header spoofing, deceptive apex domains, psychological urgency levers, and real-world incident response.'
                  : 'Good effort. Review the forensic explanations and re-examine the recommended modules below to reinforce your defensive intuition.'}
              </p>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto py-4 border-y border-outline-variant/50">
            <div className="text-center">
              <div className="font-display text-display text-primary font-bold">{score}/{totalQuestions}</div>
              <div className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Score ({scorePercent}%)</div>
            </div>
            <div className="text-center">
              <div className="font-display text-display text-on-surface font-bold">
                {bestScore.score}/{bestScore.total}
              </div>
              <div className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                Best Score ({bestScore.percentage}%)
              </div>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <div className="font-display text-display text-on-surface-variant font-bold">
                #{progress.quizAttempts || 1}
              </div>
              <div className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Attempts Completed</div>
            </div>
          </div>

          {/* Weak Areas & Targeted Curriculum Reinforcement */}
          {activeWeakAreas.length > 0 ? (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title text-title text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">flag</span>
                    <span>Targeted Curriculum Reinforcement</span>
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Based on your incorrect choices, we recommend reviewing these specific core curriculum modules:
                  </p>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-1 bg-secondary/10 text-secondary rounded font-semibold hidden sm:inline-block">
                  {activeWeakAreas.length} {activeWeakAreas.length === 1 ? 'Area' : 'Areas'} Identified
                </span>
              </div>

              <div className="space-y-3">
                {activeWeakAreas.map((area) => (
                  <div
                    key={area.moduleId}
                    className="p-4 rounded-lg border border-outline-variant/60 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                          Module {String(area.moduleNumber).padStart(2, '0')}
                        </span>
                        <span className="font-title text-title text-on-surface">{area.moduleTitle}</span>
                        <span className="text-xs text-secondary font-medium font-code">
                          ({area.missedQuestionsCount} missed)
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {area.recommendedAction}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {area.topicNames.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-code bg-surface-container text-outline"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to={area.moduleRoute} className="shrink-0 w-full sm:w-auto">
                      <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded border border-primary text-primary hover:bg-primary/10 font-label-md text-label-md font-semibold transition-colors w-full sm:w-auto cursor-pointer">
                        <span>Review Module</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-lg border border-tertiary/40 bg-tertiary-fixed/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-tertiary font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>All Scenarios Answered Correctly</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                You answered all 10 scenario questions correctly without error. You demonstrated precise discrimination across sender display spoofing, apex domain extraction, psychological levers, and executive incident response.
              </p>
            </div>
          )}

          {/* Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/40">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors cursor-pointer w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Retake Assessment</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link to="/learn" className="w-full sm:w-auto">
                <button className="px-5 py-2.5 rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors cursor-pointer w-full sm:w-auto text-center">
                  Review All Modules
                </button>
              </Link>

              <Link to="/prevention" className="w-full sm:w-auto">
                <button className="bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold px-6 py-2.5 rounded transition-colors shadow-xs cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5">
                  <span>Continue to Module 08</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

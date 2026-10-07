import { useState, useEffect, useCallback, useMemo } from 'react';
import { UserProgress, QuizAttemptRecord, WeakAreaRecommendation, ContinueLearningAction } from '../types';
import { TRAINING_MODULES } from '../data/modules';
import { SAMPLE_QUIZ_QUESTIONS } from '../data/sampleQuiz';

export const PROGRESS_STORAGE_KEY = 'phishguard_user_progress';
export const CURRENT_SCHEMA_VERSION = 2;

export const defaultProgress: UserProgress = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  completedLessonIds: [],
  completedModuleIds: [],
  quizAttempts: 0,
  quizScores: {},
  bookmarkedItemIds: [],
};

// Map instructional lesson modules to their primary lesson identifiers
export const MODULE_LESSON_MAPPING: Record<string, string[]> = {
  'mod-1': ['lesson-intro-1'],
  'mod-2': ['lesson-types-1'],
  'mod-3': ['lesson-emails-1'],
  'mod-4': ['lesson-web-1'],
  'mod-5': ['lesson-soceng-1'],
};

/**
 * Safely parses and validates stored user progress from localStorage.
 * Handles schema migration and malformed data gracefully without crashing
 * or touching unrelated localStorage keys.
 */
export function loadStoredProgress(): UserProgress {
  if (typeof window === 'undefined' && typeof localStorage === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return defaultProgress;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      console.warn('PhishGuard: Invalid stored progress format, initializing default state.');
      return defaultProgress;
    }

    // Sanitize arrays and objects
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds.filter((id: unknown): id is string => typeof id === 'string')
      : [];

    const completedModuleIds = Array.isArray(parsed.completedModuleIds)
      ? parsed.completedModuleIds.filter((id: unknown): id is string => typeof id === 'string')
      : [];

    const quizScores: Record<string, QuizAttemptRecord> = {};
    if (parsed.quizScores && typeof parsed.quizScores === 'object') {
      for (const [key, val] of Object.entries(parsed.quizScores)) {
        if (val && typeof val === 'object' && typeof (val as any).score === 'number') {
          const rec = val as any;
          quizScores[key] = {
            score: rec.score,
            total: typeof rec.total === 'number' ? rec.total : 10,
            percentage: typeof rec.percentage === 'number' ? rec.percentage : Math.round((rec.score / (rec.total || 10)) * 100),
            completedAt: typeof rec.completedAt === 'string' ? rec.completedAt : new Date().toISOString(),
            missedQuestionIds: Array.isArray(rec.missedQuestionIds) ? rec.missedQuestionIds : [],
          };
        }
      }
    }

    const quizAttempts = typeof parsed.quizAttempts === 'number' && parsed.quizAttempts >= 0
      ? parsed.quizAttempts
      : Object.keys(quizScores).length;

    let bestScore = parsed.bestScore;
    if (!bestScore && Object.keys(quizScores).length > 0) {
      // Recompute best score from existing records
      const scores = Object.values(quizScores);
      scores.sort((a, b) => b.percentage - a.percentage);
      bestScore = scores[0];
    }

    const bookmarkedItemIds = Array.isArray(parsed.bookmarkedItemIds)
      ? parsed.bookmarkedItemIds.filter((id: unknown): id is string => typeof id === 'string')
      : [];

    const missedQuestionIds = Array.isArray(parsed.missedQuestionIds)
      ? parsed.missedQuestionIds.filter((id: unknown): id is string => typeof id === 'string')
      : [];

    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      completedLessonIds,
      completedModuleIds,
      quizAttempts,
      quizScores,
      bestScore,
      missedQuestionIds,
      bookmarkedItemIds,
      lastVisitedRoute: typeof parsed.lastVisitedRoute === 'string' ? parsed.lastVisitedRoute : undefined,
      lastVisitedModuleId: typeof parsed.lastVisitedModuleId === 'string' ? parsed.lastVisitedModuleId : undefined,
    };
  } catch (err) {
    console.warn('PhishGuard: Corrupted progress detected in localStorage. Falling back to fresh learner state.', err);
    try {
      // Clear ONLY the invalid phishguard progress key, preserve all other keys (like theme)
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    return defaultProgress;
  }
}

/**
 * Maps missed quiz question IDs to curriculum modules and targeted recommendations
 */
export function computeWeakAreaRecommendations(missedQuestionIds: string[]): WeakAreaRecommendation[] {
  if (!missedQuestionIds || missedQuestionIds.length === 0) {
    return [];
  }

  const moduleMap = new Map<string, {
    moduleId: string;
    categories: Set<string>;
    questionIds: string[];
  }>();

  for (const qId of missedQuestionIds) {
    const question = SAMPLE_QUIZ_QUESTIONS.find((q) => q.id === qId);
    if (!question || !question.moduleId) continue;

    const existing = moduleMap.get(question.moduleId) || {
      moduleId: question.moduleId,
      categories: new Set<string>(),
      questionIds: [],
    };

    existing.categories.add(question.category);
    existing.questionIds.push(question.id);
    moduleMap.set(question.moduleId, existing);
  }

  const recommendations: WeakAreaRecommendation[] = [];

  for (const [modId, info] of moduleMap.entries()) {
    const mod = TRAINING_MODULES.find((m) => m.id === modId);
    if (!mod) continue;

    let actionText = `Review Module ${String(mod.number).padStart(2, '0')} (${mod.title})`;
    if (mod.id === 'mod-3') {
      actionText = 'Review email header deconstruction and display name spoofing in Module 03.';
    } else if (mod.id === 'mod-4') {
      actionText = 'Reinforce registered apex domain inspection and the HTTPS padlock reality in Module 04.';
    } else if (mod.id === 'mod-5') {
      actionText = 'Revisit psychological levers and the STOP-THINK-VERIFY mental pause in Module 05.';
    } else if (mod.id === 'mod-6') {
      actionText = 'Analyze executive whaling and MFA push bombing case studies in Module 06.';
    } else if (mod.id === 'mod-1') {
      actionText = 'Refresh foundational concepts and the 5-stage attack lifecycle in Module 01.';
    } else if (mod.id === 'mod-2') {
      actionText = 'Review BEC and multi-channel vishing attack variants in Module 02.';
    }

    recommendations.push({
      moduleId: mod.id,
      moduleNumber: mod.number,
      moduleTitle: mod.title,
      moduleRoute: mod.route,
      category: mod.category,
      topicNames: Array.from(info.categories),
      missedQuestionsCount: info.questionIds.length,
      questionIds: info.questionIds,
      recommendedAction: actionText,
    });
  }

  // Sort by module number
  return recommendations.sort((a, b) => a.moduleNumber - b.moduleNumber);
}

export function useTrainingProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadStoredProgress);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const recordVisit = useCallback((route: string, moduleId?: string) => {
    setProgress((prev) => {
      if (prev.lastVisitedRoute === route && prev.lastVisitedModuleId === moduleId) return prev;
      return {
        ...prev,
        lastVisitedRoute: route,
        lastVisitedModuleId: moduleId || prev.lastVisitedModuleId,
      };
    });
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      };
    });
  }, []);

  const markModuleComplete = useCallback((moduleId: string) => {
    setProgress((prev) => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModuleIds: [...prev.completedModuleIds, moduleId],
      };
    });
  }, []);

  const unmarkModuleComplete = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const correspondingLessons = MODULE_LESSON_MAPPING[moduleId] || [];
      return {
        ...prev,
        completedModuleIds: prev.completedModuleIds.filter((id) => id !== moduleId),
        completedLessonIds: prev.completedLessonIds.filter((id) => !correspondingLessons.includes(id)),
      };
    });
  }, []);

  const saveQuizScore = useCallback((quizId: string, score: number, total: number, missedQuestionIds?: string[]) => {
    const percentage = Math.round((score / total) * 100);
    const completedAt = new Date().toISOString();
    const missed = missedQuestionIds || [];

    setProgress((prev) => {
      const newAttempts = (prev.quizAttempts || 0) + 1;
      const attemptRecord: QuizAttemptRecord = {
        score,
        total,
        percentage,
        completedAt,
        missedQuestionIds: missed,
      };

      const updatedScores = {
        ...prev.quizScores,
        [quizId]: attemptRecord,
      };

      const currentBest = prev.bestScore;
      const newBest = !currentBest || percentage >= currentBest.percentage
        ? { score, total, percentage, completedAt }
        : currentBest;

      const completedMods = prev.completedModuleIds.includes('mod-7')
        ? prev.completedModuleIds
        : [...prev.completedModuleIds, 'mod-7'];

      return {
        ...prev,
        completedModuleIds: completedMods,
        quizAttempts: newAttempts,
        quizScores: updatedScores,
        bestScore: newBest,
        missedQuestionIds: missed,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset progress in localStorage', e);
    }
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessonIds.includes(lessonId),
    [progress.completedLessonIds]
  );

  const isModuleCompleted = useCallback(
    (moduleId: string): boolean => {
      // 1. Explicitly marked module complete
      if (progress.completedModuleIds.includes(moduleId)) return true;

      // 2. All required lessons for lesson-based modules completed
      const reqLessons = MODULE_LESSON_MAPPING[moduleId];
      if (reqLessons && reqLessons.length > 0) {
        return reqLessons.every((lid) => progress.completedLessonIds.includes(lid));
      }

      // 3. Quiz module completion check
      if (moduleId === 'mod-7') {
        return Boolean(progress.quizScores && Object.keys(progress.quizScores).length > 0);
      }

      return false;
    },
    [progress.completedModuleIds, progress.completedLessonIds, progress.quizScores]
  );

  // Authoritative Derived Progress Metrics
  const completedModulesCount = useMemo(() => {
    return TRAINING_MODULES.filter((m) => isModuleCompleted(m.id)).length;
  }, [isModuleCompleted]);

  const totalModulesCount = TRAINING_MODULES.length; // Exactly 9

  const overallPercentage = useMemo(() => {
    return Math.min(100, Math.round((completedModulesCount / totalModulesCount) * 100));
  }, [completedModulesCount, totalModulesCount]);

  const isCurriculumCompleted = completedModulesCount === totalModulesCount;

  // The active/next incomplete module in sequential order, or the last module if all are complete
  const currentModule = useMemo(() => {
    const nextIncomplete = TRAINING_MODULES.find((m) => !isModuleCompleted(m.id));
    return nextIncomplete || TRAINING_MODULES[TRAINING_MODULES.length - 1];
  }, [isModuleCompleted]);

  const isModuleInProgress = useCallback(
    (moduleId: string) => {
      if (isCurriculumCompleted) return false;
      return currentModule?.id === moduleId;
    },
    [isCurriculumCompleted, currentModule]
  );

  // Authoritative "Continue Learning" Action
  const continueAction: ContinueLearningAction = useMemo(() => {
    if (isCurriculumCompleted) {
      return {
        moduleId: 'mod-1',
        moduleNumber: 1,
        moduleTitle: 'Curriculum Completed',
        route: '/learn',
        badgeText: 'Curriculum Complete · 9 of 9 Modules Finalized',
        actionLabel: 'Review Syllabus',
        description: 'You have completed all 9 core educational modules. You can review forensic case notes below or test your skills in the Interactive Practice Labs.',
        estimatedMinutes: 0,
        isCurriculumCompleted: true,
      };
    }

    if (completedModulesCount === 0) {
      return {
        moduleId: currentModule.id,
        moduleNumber: currentModule.number,
        moduleTitle: currentModule.title,
        route: currentModule.route,
        badgeText: `Ready to Start · Module 01 of ${String(totalModulesCount).padStart(2, '0')}`,
        actionLabel: 'Begin Module 01',
        description: currentModule.description,
        estimatedMinutes: currentModule.estimatedMinutes,
        isCurriculumCompleted: false,
      };
    }

    const modNumStr = String(currentModule.number).padStart(2, '0');
    const isQuiz = currentModule.id === 'mod-7';

    return {
      moduleId: currentModule.id,
      moduleNumber: currentModule.number,
      moduleTitle: currentModule.title,
      route: currentModule.route,
      badgeText: isQuiz
        ? `Assessment Pending · Step 07 of ${String(totalModulesCount).padStart(2, '0')}`
        : `In Progress · Step ${modNumStr} of ${String(totalModulesCount).padStart(2, '0')}`,
      actionLabel: isQuiz
        ? 'Take PhishGuard Assessment'
        : `Continue Module ${modNumStr}`,
      description: currentModule.description,
      estimatedMinutes: currentModule.estimatedMinutes,
      isCurriculumCompleted: false,
    };
  }, [isCurriculumCompleted, completedModulesCount, currentModule, totalModulesCount]);

  // Breakdown for legends
  const inFlightCount = isCurriculumCompleted ? 0 : 1;
  const remainingCount = Math.max(0, totalModulesCount - completedModulesCount - inFlightCount);

  // Weak area recommendations derived from the latest assessment attempt
  const weakAreaRecommendations = useMemo(() => {
    return computeWeakAreaRecommendations(progress.missedQuestionIds || []);
  }, [progress.missedQuestionIds]);

  return {
    progress,
    recordVisit,
    markLessonComplete,
    markModuleComplete,
    unmarkModuleComplete,
    saveQuizScore,
    resetProgress,
    isLessonCompleted,
    isModuleCompleted,
    isModuleInProgress,
    currentModule,
    continueAction,
    completedModulesCount,
    totalModulesCount,
    overallPercentage,
    isCurriculumCompleted,
    inFlightCount,
    remainingCount,
    weakAreaRecommendations,
  };
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CategoryType = 
  | 'Fundamentals'
  | 'Attack Vectors'
  | 'Email Defense'
  | 'Web Defense'
  | 'Human Psychology'
  | 'Case Studies'
  | 'Remediation'
  | 'Practical Defense';

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  progressiveDisclosure?: {
    level1Simple: string;
    level2Example: string;
    level3Technical: string;
    level4DeepDive?: string;
  };
  keyTakeaways?: string[];
  warningNote?: string;
  proTip?: string;
  visualHighlight?: {
    type: 'comparison' | 'code' | 'breakdown' | 'redflags';
    title: string;
    items: {
      label: string;
      value: string;
      isSuspicious?: boolean;
      explanation?: string;
    }[];
  };
}

export interface LessonKnowledgeCheck {
  question: string;
  scenarioContext?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  takeaway: string;
}

export interface ReinforcingLabLink {
  title: string;
  description: string;
  route: string;
  buttonLabel: string;
  iconName: string;
}

export interface Lesson {
  id: string;
  slug: string;
  moduleId: string;
  title: string;
  shortDescription: string;
  category: CategoryType;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  sections: LessonSection[];
  practicalChecklist?: string[];
  knowledgeCheck?: LessonKnowledgeCheck;
  reinforcingLab?: ReinforcingLabLink;
}

export interface TrainingModule {
  id: string;
  number: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  category: CategoryType;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  lessonsCount: number;
  topics: string[];
  route: string;
  isAvailable: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  moduleId?: string;
  question: string;
  scenarioContext?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  category: string;
  difficulty: DifficultyLevel;
  whyWeakerChoices?: {
    optionId: string;
    reason: string;
  }[];
  securityTakeaway: string;
  redFlagsIdentified?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  targetOrganization: string;
  industry: string;
  year: number;
  attackMethod: string;
  summary: string;
  // 11 Canonical fields
  incidentOverview: string;
  target: string;
  attackVector: string;
  initialDeception: string;
  victimInteraction: string;
  attackerObjective: string;
  warningSignsMissed: string[];
  whyAttackSucceeded: string;
  financialOrDataImpact: string;
  lessonsLearned: string[];
  whatShouldHaveHappened: string;
  // Provenance & Sources
  caseType: 'Documented Case' | 'Composite Educational Case' | 'Simulated Scenario';
  sources?: {
    title: string;
    citation: string;
    url?: string;
  }[];
  // Backwards compatibility aliases
  whatHappened?: string;
}

export interface QuickTip {
  id: string;
  title: string;
  content: string;
  category: 'Email' | 'Browsing' | 'Passwords' | 'Incident' | 'Social Engineering';
  urgency: 'high' | 'medium' | 'standard';
}

export interface QuizAttemptRecord {
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  missedQuestionIds?: string[];
}

export interface UserProgress {
  schemaVersion?: number;
  completedLessonIds: string[];
  completedModuleIds: string[];
  quizAttempts: number;
  quizScores: {
    [quizId: string]: QuizAttemptRecord;
  };
  bestScore?: {
    score: number;
    total: number;
    percentage: number;
    completedAt: string;
  };
  missedQuestionIds?: string[];
  bookmarkedItemIds: string[];
  lastVisitedRoute?: string;
  lastVisitedModuleId?: string;
}

export interface WeakAreaRecommendation {
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  moduleRoute: string;
  category: string;
  topicNames: string[];
  missedQuestionsCount: number;
  questionIds: string[];
  recommendedAction: string;
}

export interface ContinueLearningAction {
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  route: string;
  badgeText: string;
  actionLabel: string;
  description: string;
  estimatedMinutes: number;
  isCurriculumCompleted: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type LanguageId =
  | "spanish"
  | "french"
  | "japanese"
  | "korean"
  | "german"
  | "chinese";

export type LessonLevel = "beginner" | "early-intermediate";

export type ActivityType =
  | "listen-and-repeat"
  | "multiple-choice"
  | "translate"
  | "match-pairs"
  | "speaking-practice"
  | "ai-teacher";

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase"
  | "interjection";

export type SupportedLanguage = {
  id: LanguageId;
  name: string;
  nativeName: string;
  locale: string;
  level: LessonLevel;
  accentColor: string;
  description: string;
  learnerCountLabel: string;
  unitIds: string[];
  flag: string;
};

export type LearningUnit = {
  id: string;
  languageId: LanguageId;
  title: string;
  description: string;
  order: number;
  level: LessonLevel;
  lessonIds: string[];
};

export type LessonGoal = {
  id: string;
  title: string;
  description: string;
};

export type VocabularyItem = {
  id: string;
  term: string;
  translation: string;
  pronunciation: string;
  partOfSpeech: PartOfSpeech;
  example?: string;
};

export type PhraseItem = {
  id: string;
  text: string;
  translation: string;
  pronunciation: string;
  usageNote?: string;
};

export type AiTeacherPrompt = {
  persona: string;
  lessonContext: string;
  teachingGoals: string[];
  speakingInstructions: string[];
  fallbackResponse: string;
};

type BaseActivity = {
  id: string;
  type: ActivityType;
  prompt: string;
  xpReward: number;
};

export type ListenAndRepeatActivity = BaseActivity & {
  type: "listen-and-repeat";
  phraseId: string;
};

export type MultipleChoiceActivity = BaseActivity & {
  type: "multiple-choice";
  question: string;
  choices: string[];
  correctAnswer: string;
};

export type TranslateActivity = BaseActivity & {
  type: "translate";
  sourceText: string;
  correctAnswer: string;
};

export type MatchPairsActivity = BaseActivity & {
  type: "match-pairs";
  pairs: {
    term: string;
    translation: string;
  }[];
};

export type SpeakingPracticeActivity = BaseActivity & {
  type: "speaking-practice";
  phraseId: string;
  expectedText: string;
};

export type AiTeacherActivity = BaseActivity & {
  type: "ai-teacher";
  scenario: string;
};

export type LessonActivity =
  | ListenAndRepeatActivity
  | MultipleChoiceActivity
  | TranslateActivity
  | MatchPairsActivity
  | SpeakingPracticeActivity
  | AiTeacherActivity;

export type Lesson = {
  id: string;
  languageId: LanguageId;
  unitId: string;
  title: string;
  subtitle: string;
  order: number;
  level: LessonLevel;
  estimatedMinutes: number;
  xpReward: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: LessonActivity[];
  aiTeacherPrompt: AiTeacherPrompt;
};

import type { LearningUnit } from "@/types/learning";

export const units: LearningUnit[] = [
  {
    id: "spanish-unit-1",
    languageId: "spanish",
    title: "First Conversations",
    description: "Meet someone, say hello, and answer with confidence.",
    order: 1,
    level: "beginner",
    lessonIds: ["spanish-greetings-1", "spanish-introductions-1"],
  },
  {
    id: "french-unit-1",
    languageId: "french",
    title: "Polite Hellos",
    description: "Use common greetings and polite words in simple conversations.",
    order: 1,
    level: "beginner",
    lessonIds: ["french-greetings-1", "french-lesson-2", "french-lesson-3", "french-lesson-4", "french-lesson-5", "french-lesson-6"],
  },
  {
    id: "japanese-unit-1",
    languageId: "japanese",
    title: "Everyday Greetings",
    description: "Practice short greetings you can use right away.",
    order: 1,
    level: "beginner",
    lessonIds: ["japanese-greetings-1", "japanese-lesson-2", "japanese-lesson-3", "japanese-lesson-4", "japanese-lesson-5", "japanese-lesson-6"],
  },
  {
    id: "korean-unit-1",
    languageId: "korean",
    title: "First Korean Hellos",
    description: "Greet someone, say thanks, and answer with a friendly yes.",
    order: 1,
    level: "beginner",
    lessonIds: ["korean-greetings-1", "korean-lesson-2", "korean-lesson-3", "korean-lesson-4", "korean-lesson-5", "korean-lesson-6"],
  },
  {
    id: "german-unit-1",
    languageId: "german",
    title: "Simple German Greetings",
    description: "Start with hello, thanks, and a confident goodbye.",
    order: 1,
    level: "beginner",
    lessonIds: ["german-greetings-1", "german-lesson-2", "german-lesson-3", "german-lesson-4", "german-lesson-5", "german-lesson-6"],
  },
  {
    id: "chinese-unit-1",
    languageId: "chinese",
    title: "Mandarin Greeting Basics",
    description: "Practice hello, thank you, and meeting a teacher.",
    order: 1,
    level: "beginner",
    lessonIds: ["chinese-greetings-1", "chinese-lesson-2", "chinese-lesson-3", "chinese-lesson-4", "chinese-lesson-5", "chinese-lesson-6"],
  },
];

export const getUnitsByLanguage = (languageId: LearningUnit["languageId"]) =>
  units.filter((unit) => unit.languageId === languageId);

export const getUnitById = (unitId: LearningUnit["id"]) =>
  units.find((unit) => unit.id === unitId);

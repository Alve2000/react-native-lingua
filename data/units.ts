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
    lessonIds: ["french-greetings-1"],
  },
  {
    id: "japanese-unit-1",
    languageId: "japanese",
    title: "Everyday Greetings",
    description: "Practice short greetings you can use right away.",
    order: 1,
    level: "beginner",
    lessonIds: ["japanese-greetings-1"],
  },
  {
    id: "korean-unit-1",
    languageId: "korean",
    title: "First Korean Hellos",
    description: "Greet someone, say thanks, and answer with a friendly yes.",
    order: 1,
    level: "beginner",
    lessonIds: ["korean-greetings-1"],
  },
  {
    id: "german-unit-1",
    languageId: "german",
    title: "Simple German Greetings",
    description: "Start with hello, thanks, and a confident goodbye.",
    order: 1,
    level: "beginner",
    lessonIds: ["german-greetings-1"],
  },
  {
    id: "chinese-unit-1",
    languageId: "chinese",
    title: "Mandarin Greeting Basics",
    description: "Practice hello, thank you, and meeting a teacher.",
    order: 1,
    level: "beginner",
    lessonIds: ["chinese-greetings-1"],
  },
];

export const getUnitsByLanguage = (languageId: LearningUnit["languageId"]) =>
  units.filter((unit) => unit.languageId === languageId);

export const getUnitById = (unitId: LearningUnit["id"]) =>
  units.find((unit) => unit.id === unitId);

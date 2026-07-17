import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  {
    id: "spanish-greetings-1",
    languageId: "spanish",
    unitId: "spanish-unit-1",
    title: "Say Hello",
    subtitle: "Greet people and ask how they are.",
    order: 1,
    level: "beginner",
    estimatedMinutes: 5,
    xpReward: 15,
    goals: [
      {
        id: "spanish-greetings-goal-1",
        title: "Recognize common greetings",
        description: "Understand hola, buenos días, and buenas noches.",
      },
      {
        id: "spanish-greetings-goal-2",
        title: "Ask how someone is",
        description: "Use ¿Cómo estás? in a short conversation.",
      },
    ],
    vocabulary: [
      {
        id: "spanish-vocab-hola",
        term: "hola",
        translation: "hello",
        pronunciation: "OH-lah",
        partOfSpeech: "interjection",
        example: "Hola, Ana.",
      },
      {
        id: "spanish-vocab-gracias",
        term: "gracias",
        translation: "thank you",
        pronunciation: "GRAH-syahs",
        partOfSpeech: "interjection",
        example: "Gracias, Luis.",
      },
      {
        id: "spanish-vocab-bien",
        term: "bien",
        translation: "well",
        pronunciation: "byen",
        partOfSpeech: "adverb",
        example: "Estoy bien.",
      },
    ],
    phrases: [
      {
        id: "spanish-phrase-buenos-dias",
        text: "Buenos días",
        translation: "Good morning",
        pronunciation: "BWEH-nos DEE-ahs",
        usageNote: "Use this in the morning.",
      },
      {
        id: "spanish-phrase-como-estas",
        text: "¿Cómo estás?",
        translation: "How are you?",
        pronunciation: "KOH-moh ehs-TAHS",
      },
      {
        id: "spanish-phrase-estoy-bien",
        text: "Estoy bien",
        translation: "I am well",
        pronunciation: "ehs-TOY byen",
      },
    ],
    activities: [
      {
        id: "spanish-greetings-activity-1",
        type: "listen-and-repeat",
        prompt: "Listen to the greeting, then repeat it out loud.",
        phraseId: "spanish-phrase-buenos-dias",
        xpReward: 3,
      },
      {
        id: "spanish-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        question: "What does hola mean?",
        choices: ["hello", "goodbye", "please"],
        correctAnswer: "hello",
        xpReward: 3,
      },
      {
        id: "spanish-greetings-activity-3",
        type: "speaking-practice",
        prompt: "Say the phrase as naturally as you can.",
        phraseId: "spanish-phrase-como-estas",
        expectedText: "¿Cómo estás?",
        xpReward: 4,
      },
      {
        id: "spanish-greetings-activity-4",
        type: "ai-teacher",
        prompt: "Practice a tiny greeting conversation with your AI teacher.",
        scenario: "The learner meets a neighbor in the morning.",
        xpReward: 5,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a warm Spanish teacher who speaks slowly and encourages beginners.",
      lessonContext: "The learner is practicing greetings, asking how someone is, and answering politely.",
      teachingGoals: [
        "Help the learner say Buenos días clearly.",
        "Prompt the learner to ask ¿Cómo estás?",
        "Have the learner answer with Estoy bien.",
      ],
      speakingInstructions: [
        "Keep each turn under two short sentences.",
        "Use Spanish first, then a quick English hint only when needed.",
        "Correct pronunciation gently and ask the learner to repeat once.",
      ],
      fallbackResponse: "Try saying it slowly with me: Buenos días.",
    },
  },
  {
    id: "spanish-introductions-1",
    languageId: "spanish",
    unitId: "spanish-unit-1",
    title: "Introduce Yourself",
    subtitle: "Say your name and ask for someone else's.",
    order: 2,
    level: "beginner",
    estimatedMinutes: 6,
    xpReward: 15,
    goals: [
      {
        id: "spanish-intros-goal-1",
        title: "Say your name",
        description: "Use Me llamo to introduce yourself.",
      },
      {
        id: "spanish-intros-goal-2",
        title: "Ask for a name",
        description: "Use ¿Cómo te llamas? with a new friend.",
      },
    ],
    vocabulary: [
      {
        id: "spanish-vocab-me",
        term: "me",
        translation: "myself",
        pronunciation: "meh",
        partOfSpeech: "phrase",
      },
      {
        id: "spanish-vocab-llamo",
        term: "llamo",
        translation: "I am called",
        pronunciation: "YAH-moh",
        partOfSpeech: "verb",
      },
      {
        id: "spanish-vocab-nombre",
        term: "nombre",
        translation: "name",
        pronunciation: "NOHM-breh",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        id: "spanish-phrase-me-llamo",
        text: "Me llamo Alex",
        translation: "My name is Alex",
        pronunciation: "meh YAH-moh AH-leks",
      },
      {
        id: "spanish-phrase-como-te-llamas",
        text: "¿Cómo te llamas?",
        translation: "What is your name?",
        pronunciation: "KOH-moh teh YAH-mahs",
      },
    ],
    activities: [
      {
        id: "spanish-intros-activity-1",
        type: "translate",
        prompt: "Translate this phrase into English.",
        sourceText: "Me llamo Alex",
        correctAnswer: "My name is Alex",
        xpReward: 4,
      },
      {
        id: "spanish-intros-activity-2",
        type: "match-pairs",
        prompt: "Match each Spanish word to its meaning.",
        pairs: [
          { term: "nombre", translation: "name" },
          { term: "gracias", translation: "thank you" },
          { term: "hola", translation: "hello" },
        ],
        xpReward: 5,
      },
      {
        id: "spanish-intros-activity-3",
        type: "ai-teacher",
        prompt: "Introduce yourself to the AI teacher.",
        scenario: "The learner meets their Spanish teacher for the first time.",
        xpReward: 6,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a cheerful Spanish tutor helping a complete beginner introduce themself.",
      lessonContext: "The learner needs to say Me llamo plus their name and ask ¿Cómo te llamas?",
      teachingGoals: [
        "Model Me llamo with a natural pace.",
        "Ask the learner for their name in Spanish.",
        "Guide the learner to ask your name back.",
      ],
      speakingInstructions: [
        "Give one clear example before asking the learner to speak.",
        "Celebrate correct attempts with short encouragement.",
        "If the learner freezes, offer a fill-in-the-blank prompt.",
      ],
      fallbackResponse: "You can start with Me llamo, then say your name.",
    },
  },
  {
    id: "french-greetings-1",
    languageId: "french",
    unitId: "french-unit-1",
    title: "Bonjour Basics",
    subtitle: "Say hello, thanks, and goodbye politely.",
    order: 1,
    level: "beginner",
    estimatedMinutes: 5,
    xpReward: 15,
    goals: [
      {
        id: "french-greetings-goal-1",
        title: "Use polite greetings",
        description: "Recognize bonjour, merci, and au revoir.",
      },
      {
        id: "french-greetings-goal-2",
        title: "Practice a short exchange",
        description: "Greet someone and thank them in French.",
      },
    ],
    vocabulary: [
      {
        id: "french-vocab-bonjour",
        term: "bonjour",
        translation: "hello",
        pronunciation: "bohn-ZHOOR",
        partOfSpeech: "interjection",
        example: "Bonjour, Marie.",
      },
      {
        id: "french-vocab-merci",
        term: "merci",
        translation: "thank you",
        pronunciation: "mehr-SEE",
        partOfSpeech: "interjection",
      },
      {
        id: "french-vocab-revoir",
        term: "au revoir",
        translation: "goodbye",
        pronunciation: "oh ruh-VWAHR",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        id: "french-phrase-bonjour",
        text: "Bonjour",
        translation: "Hello",
        pronunciation: "bohn-ZHOOR",
      },
      {
        id: "french-phrase-merci",
        text: "Merci beaucoup",
        translation: "Thank you very much",
        pronunciation: "mehr-SEE boh-KOO",
      },
    ],
    activities: [
      {
        id: "french-greetings-activity-1",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        question: "What does merci mean?",
        choices: ["thank you", "good night", "my name is"],
        correctAnswer: "thank you",
        xpReward: 4,
      },
      {
        id: "french-greetings-activity-2",
        type: "listen-and-repeat",
        prompt: "Listen, then repeat the phrase.",
        phraseId: "french-phrase-merci",
        xpReward: 4,
      },
      {
        id: "french-greetings-activity-3",
        type: "ai-teacher",
        prompt: "Practice greeting your AI teacher in French.",
        scenario: "The learner walks into a small cafe and greets the owner.",
        xpReward: 7,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a patient French teacher with a friendly cafe-owner tone.",
      lessonContext: "The learner is practicing bonjour, merci, and au revoir in a polite exchange.",
      teachingGoals: [
        "Help the learner pronounce bonjour clearly.",
        "Prompt the learner to say merci beaucoup.",
        "End the exchange with au revoir.",
      ],
      speakingInstructions: [
        "Speak slowly and keep the conversation beginner-friendly.",
        "Repeat French phrases once before asking the learner to try.",
        "Use English only for short pronunciation hints.",
      ],
      fallbackResponse: "Let's try the first word together: bonjour.",
    },
  },
  {
    id: "japanese-greetings-1",
    languageId: "japanese",
    unitId: "japanese-unit-1",
    title: "Friendly Greetings",
    subtitle: "Say hello and thank you in Japanese.",
    order: 1,
    level: "beginner",
    estimatedMinutes: 6,
    xpReward: 15,
    goals: [
      {
        id: "japanese-greetings-goal-1",
        title: "Recognize everyday greetings",
        description: "Understand こんにちは and ありがとう.",
      },
      {
        id: "japanese-greetings-goal-2",
        title: "Speak with confidence",
        description: "Repeat short phrases with beginner-friendly pronunciation.",
      },
    ],
    vocabulary: [
      {
        id: "japanese-vocab-konnichiwa",
        term: "こんにちは",
        translation: "hello",
        pronunciation: "kon-nee-chee-wah",
        partOfSpeech: "interjection",
      },
      {
        id: "japanese-vocab-arigatou",
        term: "ありがとう",
        translation: "thank you",
        pronunciation: "ah-ree-gah-toh",
        partOfSpeech: "interjection",
      },
      {
        id: "japanese-vocab-sensei",
        term: "先生",
        translation: "teacher",
        pronunciation: "sen-say",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        id: "japanese-phrase-konnichiwa",
        text: "こんにちは",
        translation: "Hello",
        pronunciation: "kon-nee-chee-wah",
      },
      {
        id: "japanese-phrase-arigatou",
        text: "ありがとうございます",
        translation: "Thank you very much",
        pronunciation: "ah-ree-gah-toh goh-zah-ee-mahs",
        usageNote: "A polite way to say thank you.",
      },
    ],
    activities: [
      {
        id: "japanese-greetings-activity-1",
        type: "listen-and-repeat",
        prompt: "Listen to the greeting, then repeat it.",
        phraseId: "japanese-phrase-konnichiwa",
        xpReward: 4,
      },
      {
        id: "japanese-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        question: "What does ありがとう mean?",
        choices: ["thank you", "hello", "teacher"],
        correctAnswer: "thank you",
        xpReward: 4,
      },
      {
        id: "japanese-greetings-activity-3",
        type: "ai-teacher",
        prompt: "Practice a polite greeting with your AI teacher.",
        scenario: "The learner greets a teacher before class.",
        xpReward: 7,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a gentle Japanese teacher helping a beginner practice slowly.",
      lessonContext: "The learner is practicing こんにちは and ありがとうございます with polite classroom tone.",
      teachingGoals: [
        "Model こんにちは at a slow pace.",
        "Help the learner say ありがとうございます in small chunks.",
        "Explain when to use the polite thank-you phrase.",
      ],
      speakingInstructions: [
        "Break longer Japanese phrases into short sound groups.",
        "Keep corrections kind and concise.",
        "Ask the learner to repeat only one phrase at a time.",
      ],
      fallbackResponse: "Let's split it into parts: a-ri-ga-tou.",
    },
  },
  {
    id: "korean-greetings-1",
    languageId: "korean",
    unitId: "korean-unit-1",
    title: "Korean Hellos",
    subtitle: "Say hello, thank you, and yes politely.",
    order: 1,
    level: "beginner",
    estimatedMinutes: 6,
    xpReward: 15,
    goals: [
      {
        id: "korean-greetings-goal-1",
        title: "Recognize polite greetings",
        description: "Understand 안녕하세요 and 감사합니다.",
      },
      {
        id: "korean-greetings-goal-2",
        title: "Answer simply",
        description: "Use 네 to say yes in a short exchange.",
      },
    ],
    vocabulary: [
      {
        id: "korean-vocab-annyeonghaseyo",
        term: "안녕하세요",
        translation: "hello",
        pronunciation: "ahn-nyawng-hah-seh-yoh",
        partOfSpeech: "interjection",
      },
      {
        id: "korean-vocab-gamsahamnida",
        term: "감사합니다",
        translation: "thank you",
        pronunciation: "kahm-sah-hahm-nee-dah",
        partOfSpeech: "interjection",
      },
      {
        id: "korean-vocab-ne",
        term: "네",
        translation: "yes",
        pronunciation: "neh",
        partOfSpeech: "interjection",
      },
    ],
    phrases: [
      {
        id: "korean-phrase-annyeonghaseyo",
        text: "안녕하세요",
        translation: "Hello",
        pronunciation: "ahn-nyawng-hah-seh-yoh",
        usageNote: "A polite greeting you can use with most people.",
      },
      {
        id: "korean-phrase-gamsahamnida",
        text: "감사합니다",
        translation: "Thank you",
        pronunciation: "kahm-sah-hahm-nee-dah",
      },
    ],
    activities: [
      {
        id: "korean-greetings-activity-1",
        type: "listen-and-repeat",
        prompt: "Listen to the Korean greeting, then repeat it.",
        phraseId: "korean-phrase-annyeonghaseyo",
        xpReward: 4,
      },
      {
        id: "korean-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        question: "What does 감사합니다 mean?",
        choices: ["thank you", "hello", "goodbye"],
        correctAnswer: "thank you",
        xpReward: 4,
      },
      {
        id: "korean-greetings-activity-3",
        type: "speaking-practice",
        prompt: "Say the phrase as clearly as you can.",
        phraseId: "korean-phrase-gamsahamnida",
        expectedText: "감사합니다",
        xpReward: 4,
      },
      {
        id: "korean-greetings-activity-4",
        type: "ai-teacher",
        prompt: "Practice a tiny greeting conversation with your AI teacher.",
        scenario: "The learner greets a Korean teacher before class.",
        xpReward: 3,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a kind Korean teacher who helps beginners speak slowly and politely.",
      lessonContext: "The learner is practicing 안녕하세요, 감사합니다, and 네 in a short greeting.",
      teachingGoals: [
        "Model 안녕하세요 in small sound groups.",
        "Help the learner say 감사합니다 politely.",
        "Prompt the learner to answer with 네.",
      ],
      speakingInstructions: [
        "Keep each turn short and beginner-friendly.",
        "Break longer Korean phrases into manageable chunks.",
        "Use English only for quick pronunciation hints.",
      ],
      fallbackResponse: "Let's try it slowly together: 안녕하세요.",
    },
  },
  {
    id: "german-greetings-1",
    languageId: "german",
    unitId: "german-unit-1",
    title: "Hallo Basics",
    subtitle: "Greet people, say thanks, and goodbye.",
    order: 1,
    level: "beginner",
    estimatedMinutes: 5,
    xpReward: 15,
    goals: [
      {
        id: "german-greetings-goal-1",
        title: "Use everyday greetings",
        description: "Recognize hallo, danke, and tschüss.",
      },
      {
        id: "german-greetings-goal-2",
        title: "Practice a short exchange",
        description: "Greet someone and thank them in German.",
      },
    ],
    vocabulary: [
      {
        id: "german-vocab-hallo",
        term: "hallo",
        translation: "hello",
        pronunciation: "HAH-loh",
        partOfSpeech: "interjection",
        example: "Hallo, Emma.",
      },
      {
        id: "german-vocab-danke",
        term: "danke",
        translation: "thank you",
        pronunciation: "DAHN-kuh",
        partOfSpeech: "interjection",
      },
      {
        id: "german-vocab-tschuess",
        term: "tschüss",
        translation: "bye",
        pronunciation: "chooss",
        partOfSpeech: "interjection",
      },
    ],
    phrases: [
      {
        id: "german-phrase-hallo",
        text: "Hallo",
        translation: "Hello",
        pronunciation: "HAH-loh",
      },
      {
        id: "german-phrase-danke-schoen",
        text: "Danke schön",
        translation: "Thank you very much",
        pronunciation: "DAHN-kuh shern",
        usageNote: "A friendly, polite way to say thank you.",
      },
    ],
    activities: [
      {
        id: "german-greetings-activity-1",
        type: "listen-and-repeat",
        prompt: "Listen to the German greeting, then repeat it.",
        phraseId: "german-phrase-hallo",
        xpReward: 4,
      },
      {
        id: "german-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        question: "What does danke mean?",
        choices: ["thank you", "hello", "teacher"],
        correctAnswer: "thank you",
        xpReward: 4,
      },
      {
        id: "german-greetings-activity-3",
        type: "translate",
        prompt: "Translate this phrase into English.",
        sourceText: "Danke schön",
        correctAnswer: "Thank you very much",
        xpReward: 4,
      },
      {
        id: "german-greetings-activity-4",
        type: "ai-teacher",
        prompt: "Practice greeting your AI teacher in German.",
        scenario: "The learner meets a German teacher at the start of class.",
        xpReward: 3,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a cheerful German teacher helping a complete beginner.",
      lessonContext: "The learner is practicing hallo, danke schön, and tschüss in a simple exchange.",
      teachingGoals: [
        "Help the learner pronounce hallo naturally.",
        "Prompt the learner to say danke schön.",
        "End the exchange with tschüss.",
      ],
      speakingInstructions: [
        "Use one German phrase at a time.",
        "Offer short pronunciation hints when the learner needs help.",
        "Celebrate correct attempts with simple encouragement.",
      ],
      fallbackResponse: "Start with a friendly Hallo.",
    },
  },
  {
    id: "chinese-greetings-1",
    languageId: "chinese",
    unitId: "chinese-unit-1",
    title: "Ni Hao Basics",
    subtitle: "Say hello, thank you, and teacher in Mandarin.",
    order: 1,
    level: "beginner",
    estimatedMinutes: 6,
    xpReward: 15,
    goals: [
      {
        id: "chinese-greetings-goal-1",
        title: "Recognize first Mandarin words",
        description: "Understand 你好, 谢谢, and 老师.",
      },
      {
        id: "chinese-greetings-goal-2",
        title: "Practice tones gently",
        description: "Repeat short phrases with beginner-friendly tone hints.",
      },
    ],
    vocabulary: [
      {
        id: "chinese-vocab-nihao",
        term: "你好",
        translation: "hello",
        pronunciation: "nee how",
        partOfSpeech: "interjection",
      },
      {
        id: "chinese-vocab-xiexie",
        term: "谢谢",
        translation: "thank you",
        pronunciation: "syeh-syeh",
        partOfSpeech: "interjection",
      },
      {
        id: "chinese-vocab-laoshi",
        term: "老师",
        translation: "teacher",
        pronunciation: "laow-shrr",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        id: "chinese-phrase-nihao",
        text: "你好",
        translation: "Hello",
        pronunciation: "nee how",
      },
      {
        id: "chinese-phrase-xiexie-laoshi",
        text: "谢谢老师",
        translation: "Thank you, teacher",
        pronunciation: "syeh-syeh laow-shrr",
        usageNote: "Use this when thanking a teacher politely.",
      },
    ],
    activities: [
      {
        id: "chinese-greetings-activity-1",
        type: "listen-and-repeat",
        prompt: "Listen to the Mandarin greeting, then repeat it.",
        phraseId: "chinese-phrase-nihao",
        xpReward: 4,
      },
      {
        id: "chinese-greetings-activity-2",
        type: "multiple-choice",
        prompt: "Choose the correct meaning.",
        question: "What does 老师 mean?",
        choices: ["teacher", "hello", "thank you"],
        correctAnswer: "teacher",
        xpReward: 4,
      },
      {
        id: "chinese-greetings-activity-3",
        type: "speaking-practice",
        prompt: "Say the phrase as naturally as you can.",
        phraseId: "chinese-phrase-xiexie-laoshi",
        expectedText: "谢谢老师",
        xpReward: 4,
      },
      {
        id: "chinese-greetings-activity-4",
        type: "ai-teacher",
        prompt: "Practice a short classroom greeting with your AI teacher.",
        scenario: "The learner greets and thanks a Mandarin teacher.",
        xpReward: 3,
      },
    ],
    aiTeacherPrompt: {
      persona: "You are a patient Mandarin teacher who introduces tones gently for beginners.",
      lessonContext: "The learner is practicing 你好, 谢谢, and 老师 in a classroom greeting.",
      teachingGoals: [
        "Model 你好 with a simple tone hint.",
        "Help the learner say 谢谢老师 in two parts.",
        "Keep the learner focused on clear, confident repetition.",
      ],
      speakingInstructions: [
        "Keep tone explanations short and practical.",
        "Ask for one phrase at a time.",
        "Use English only to clarify meaning or tone movement.",
      ],
      fallbackResponse: "Let's begin with 你好: nee how.",
    },
  },
];

const supplementalLessonTitles: Record<
  Exclude<Lesson["languageId"], "spanish">,
  string[]
> = {
  chinese: ["Meet Your Teacher", "Numbers 1–10", "At the Café", "Daily Routines", "Family & Friends"],
  french: ["Introduce Yourself", "At the Café", "Daily Life", "Travel & Directions", "Shopping"],
  german: ["Meet New People", "At the Café", "Daily Life", "Travel & Directions", "Family & Friends"],
  japanese: ["Meet Your Teacher", "At the Café", "Daily Life", "Travel & Directions", "Family & Friends"],
  korean: ["Introduce Yourself", "At the Café", "Daily Life", "Shopping", "Family & Friends"],
};

const createSupplementalLessons = (): Lesson[] =>
  (Object.entries(supplementalLessonTitles) as [
    Exclude<Lesson["languageId"], "spanish">,
    string[],
  ][]).flatMap(([languageId, titles]) =>
    titles.map((title, index) => {
      const number = index + 2;
      const id = `${languageId}-lesson-${number}`;

      return {
        id,
        languageId,
        unitId: `${languageId}-unit-1`,
        title,
        subtitle: `Build confidence with useful ${languageId} phrases.`,
        order: number,
        level: "beginner",
        estimatedMinutes: 6,
        xpReward: 15,
        imageUrl: `https://picsum.photos/seed/${id}/900/520`,
        goals: [
          {
            id: `${id}-goal`,
            title: `Practice ${title.toLowerCase()}`,
            description: "Use a few practical phrases with confidence.",
          },
        ],
        vocabulary: [
          {
            id: `${id}-word`,
            term: "hello",
            translation: "hello",
            pronunciation: "hello",
            partOfSpeech: "interjection",
          },
        ],
        phrases: [
          {
            id: `${id}-phrase`,
            text: "Hello",
            translation: "Hello",
            pronunciation: "hello",
          },
        ],
        activities: [
          {
            id: `${id}-activity`,
            type: "listen-and-repeat",
            prompt: "Listen, then repeat the phrase.",
            phraseId: `${id}-phrase`,
            xpReward: 5,
          },
        ],
        aiTeacherPrompt: {
          persona: `You are a warm ${languageId} teacher for beginners.`,
          lessonContext: `The learner is practicing ${title.toLowerCase()}.`,
          teachingGoals: ["Help the learner use a useful phrase clearly."],
          speakingInstructions: ["Keep every response short and encouraging."],
          fallbackResponse: "Let's try that phrase together.",
        },
      };
    }),
  );

lessons.push(...createSupplementalLessons());

export const getLessonsByUnit = (unitId: Lesson["unitId"]) =>
  lessons.filter((lesson) => lesson.unitId === unitId);

export const getLessonsByLanguage = (languageId: Lesson["languageId"]) =>
  lessons.filter((lesson) => lesson.languageId === languageId);

export const getLessonById = (lessonId: Lesson["id"]) =>
  lessons.find((lesson) => lesson.id === lessonId);

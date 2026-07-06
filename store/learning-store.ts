import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageId } from "@/types/learning";

type LearningState = {
  hasHydrated: boolean;
  selectedLanguageId: LanguageId | null;
  clearSelectedLanguage: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setSelectedLanguageId: (languageId: LanguageId) => void;
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      selectedLanguageId: null,
      clearSelectedLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setSelectedLanguageId: (languageId) =>
        set({ selectedLanguageId: languageId }),
    }),
    {
      name: "lingua-learning-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        selectedLanguageId: state.selectedLanguageId,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

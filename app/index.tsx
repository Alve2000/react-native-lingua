import { useAuth } from "@clerk/clerk-expo";
import { Redirect, type Href } from "expo-router";

import { useLearningStore } from "@/store/learning-store";

const languageSelectionHref = "/language-selection" as Href;
const homeHref = "/home" as Href;

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasHydrated = useLearningStore((state) => state.hasHydrated);
  const selectedLanguageId = useLearningStore(
    (state) => state.selectedLanguageId,
  );

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!hasHydrated) {
    return null;
  }

  if (!selectedLanguageId) {
    return <Redirect href={languageSelectionHref} />;
  }

  return <Redirect href={homeHref} />;
}

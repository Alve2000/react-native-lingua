import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";

import { CustomTabBar } from "@/components/navigation/custom-tab-bar";
import { useLearningStore } from "@/store/learning-store";

export default function TabLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasHydrated = useLearningStore((state) => state.hasHydrated);
  const selectedLanguageId = useLearningStore(
    (state) => state.selectedLanguageId,
  );

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="ai-teacher" options={{ title: "AI Teacher" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

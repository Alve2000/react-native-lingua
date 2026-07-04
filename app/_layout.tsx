import "../global.css";

import { useEffect } from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { colors, fonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file.");
}

const clerkPublishableKey = publishableKey;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: require("@/assets/assets/fonts/Poppins-Regular.ttf"),
    [fonts.medium]: require("@/assets/assets/fonts/Poppins-Medium.ttf"),
    [fonts.semiBold]: require("@/assets/assets/fonts/Poppins-SemiBold.ttf"),
    [fonts.bold]: require("@/assets/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.surface },
          headerShown: false,
        }}
      />
    </ClerkProvider>
  );
}

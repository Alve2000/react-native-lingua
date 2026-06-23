import "../global.css";

import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { colors, fonts } from "@/theme";

SplashScreen.preventAutoHideAsync();

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
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.surface },
        headerShown: false,
      }}
    />
  );
}

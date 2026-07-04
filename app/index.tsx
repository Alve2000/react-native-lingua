import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-5 bg-background px-6">
      <Text className="text-h1 text-center color-lingua-purple">
        Lingua App
      </Text>
      <Text className="text-center font-poppins-medium text-[17px] leading-[25px] text-text-secondary">
        Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
      </Text>
      <TouchableOpacity
        activeOpacity={0.86}
        onPress={() => signOut()}
        style={{
          alignItems: "center",
          backgroundColor: colors.linguaDeepPurple,
          borderRadius: 16,
          paddingHorizontal: 24,
          paddingVertical: 14,
        }}
      >
        <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { Link, type Href } from "expo-router";
import { Text, View } from "react-native";

const onboardingHref = "/onboarding" as Href;

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-5 bg-background px-6">
      <Text className="text-h1 text-center color-lingua-purple">
        Lingua App
      </Text>
      <Link
        className="rounded-2xl bg-lingua-deep-purple px-6 py-4 font-poppins-semibold text-[17px] leading-[24px] text-white"
        href={onboardingHref}
      >
        Open onboarding
      </Link>
    </View>
  );
}

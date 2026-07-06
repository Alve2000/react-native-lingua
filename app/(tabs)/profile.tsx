import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8 pb-28">
      <Text className="font-poppins-semibold text-[24px] leading-[32px] text-text-primary">
        Profile
      </Text>
      <Text className="mt-2 text-center font-poppins-medium text-[16px] leading-[24px] text-text-secondary">
        Progress and account settings will appear here.
      </Text>
    </View>
  );
}

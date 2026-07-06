import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8 pb-28">
      <Text className="font-poppins-semibold text-[24px] leading-[32px] text-text-primary">
        Home
      </Text>
      <Text className="mt-2 text-center font-poppins-medium text-[16px] leading-[24px] text-text-secondary">
        Home screen UI will be built next.
      </Text>
    </View>
  );
}

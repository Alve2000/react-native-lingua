import { Link, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

const signUpHref = "/sign-up" as Href;

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-1 px-8 pb-5 pt-10">
          <View className="flex-row items-center justify-center">
            <Image
              accessibilityLabel="Lingua mascot logo"
              className="h-[76px] w-[76px]"
              resizeMode="contain"
              source={images.mascotLogo}
            />
            <Text className="font-poppins-semibold text-[36px] leading-[42px] text-text-primary">
              Lingua
            </Text>
          </View>

          <View className="mt-9">
            <Text className="font-poppins-semibold text-[42px] leading-[47px] text-text-primary">
              Your AI language
            </Text>
            <Text className="font-poppins-semibold text-[38px] leading-[47px] text-lingua-deep-purple">
              teacher.
            </Text>
            <Text className="mt-3.5 font-poppins text-[18px] leading-[30px] text-[#5F657C]">
              Real conversations, personalized{"\n"}lessons, anytime, anywhere.
            </Text>
          </View>

          <View className="relative mt-8 h-[330px] w-full">
            <View style={[styles.bubble, styles.helloBubble]}>
              <Text className="font-poppins-medium text-[24px] leading-[30px] text-text-primary">
                Hello!
              </Text>
              <View style={[styles.tail, styles.helloTail]} />
            </View>

            <View style={[styles.bubble, styles.holaBubble]}>
              <Text className="font-poppins-medium text-[24px] leading-[30px] text-lingua-deep-purple">
                ¡Hola!
              </Text>
              <View style={[styles.tail, styles.holaTail]} />
            </View>

            <View style={[styles.bubble, styles.nihaoBubble]}>
              <Text className="font-poppins-medium text-[24px] leading-[30px] text-[#FF4B3E]">
                你好!
              </Text>
              <View style={[styles.tail, styles.nihaoTail]} />
            </View>

            <Image
              accessibilityLabel="Waving Lingua mascot"
              className="absolute bottom-0 left-1/3 h-[320px] w-[320px]"
              resizeMode="contain"
              source={images.mascotWelcome}
              style={styles.mascot}
            />
          </View>

          <View className="mt-auto">
            <Link href={signUpHref} asChild>
              <TouchableOpacity activeOpacity={0.86} style={styles.cta}>
                <Text className="font-poppins-semibold text-[20px] leading-[26px] text-white">
                  Get Started
                </Text>
                <View style={styles.ctaIcon}>
                  <Ionicons color="#FFFFFF" name="chevron-forward" size={32} />
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
  bubble: {
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "center",
    position: "absolute",
  },
  helloBubble: {
    backgroundColor: "#EEF7FF",
    height: 62,
    left: 0,
    top: 8,
    transform: [{ rotate: "-7deg" }],
    width: 114,
  },
  holaBubble: {
    backgroundColor: "#F7F5FF",
    height: 62,
    right: 10,
    top: 0,
    transform: [{ rotate: "10deg" }],
    width: 108,
  },
  nihaoBubble: {
    backgroundColor: "#FFF4EE",
    height: 62,
    right: 0,
    top: 104,
    transform: [{ rotate: "8deg" }],
    width: 100,
  },
  tail: {
    bottom: -16,
    height: 0,
    position: "absolute",
    width: 0,
  },
  helloTail: {
    borderLeftColor: "transparent",
    borderLeftWidth: 18,
    borderRightColor: "transparent",
    borderRightWidth: 0,
    borderTopColor: "#EEF7FF",
    borderTopWidth: 20,
    right: 20,
  },
  holaTail: {
    borderLeftColor: "transparent",
    borderLeftWidth: 0,
    borderRightColor: "transparent",
    borderRightWidth: 18,
    borderTopColor: "#F7F5FF",
    borderTopWidth: 20,
    left: 22,
  },
  nihaoTail: {
    borderLeftColor: "transparent",
    borderLeftWidth: 0,
    borderRightColor: "transparent",
    borderRightWidth: 18,
    borderTopColor: "#FFF4EE",
    borderTopWidth: 20,
    left: 20,
  },
  mascot: {
    transform: [{ translateX: -130 }, { translateY: 40 }],
  },
  cta: {
    alignItems: "center",
    backgroundColor: colors.linguaDeepPurple,
    borderRadius: 18,
    boxShadow: "0 4px 0 #4B2CE5",
    flexDirection: "row",
    height: 68,
    justifyContent: "center",
    position: "relative",
  },
  ctaIcon: {
    position: "absolute",
    right: 34,
  },
});

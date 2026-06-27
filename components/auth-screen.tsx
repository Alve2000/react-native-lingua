import { useRef, useState } from "react";
import { Link, router, type Href } from "expo-router";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const authCopy = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    buttonLabel: "Sign Up",
    footerText: "Already have an account?",
    footerLink: "Log in",
    footerHref: "/sign-in" as Href,
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    buttonLabel: "Sign In",
    footerText: "Don't have an account?",
    footerLink: "Sign up",
    footerHref: "/sign-up" as Href,
  },
} as const;

const socialOptions = [
  {
    icon: <AntDesign color="#4285F4" name="google" size={30} />,
    label: "Continue with Google",
  },
  {
    icon: <Entypo color="#1877F2" name="facebook-with-circle" size={32} />,
    label: "Continue with Facebook",
  },
  {
    icon: <FontAwesome color={colors.textPrimary} name="apple" size={34} />,
    label: "Continue with Apple",
  },
] as const;

export function AuthScreen({ mode }: AuthScreenProps) {
  const copy = authCopy[mode];
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const codeInputRef = useRef<TextInput>(null);

  const openVerification = () => {
    setVerificationCode("");
    setIsVerificationOpen(true);
    requestAnimationFrame(() => codeInputRef.current?.focus());
  };

  const handleVerificationChange = (value: string) => {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);

    setVerificationCode(nextCode);

    if (nextCode.length === 6) {
      setIsVerificationOpen(false);
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-1 px-8 pb-8 pt-5">
          <TouchableOpacity
            accessibilityLabel="Go back"
            activeOpacity={0.75}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons color={colors.textPrimary} name="chevron-back" size={34} />
          </TouchableOpacity>

          <View className="mt-12">
            <Text className="font-poppins-bold text-[30px] leading-[38px] text-text-primary">
              {copy.title}
            </Text>
            <Text className="mt-4 font-poppins-medium text-[19px] leading-[28px] text-[#737992]">
              {copy.subtitle}
            </Text>
          </View>

          <View className="mt-4 h-[170px] items-center justify-end">
            <Text style={[styles.sparkle, styles.sparkleOrange]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleBlue]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleYellow]}>✦</Text>
            <Image
              accessibilityLabel="Waving Lingua mascot"
              className="h-[205px] w-[305px]"
              resizeMode="contain"
              source={images.mascotAuth}
            />
          </View>

          <View className="-mt-3 gap-4">
            <View style={styles.inputShell}>
              <Text className="font-poppins-medium text-[16px] leading-[22px] text-[#7D849B]">
                Email
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                inputMode="email"
                keyboardType="email-address"
                placeholder="alex@gmail.com"
                placeholderTextColor={colors.textPrimary}
                style={styles.input}
              />
            </View>

            {mode === "sign-up" ? (
              <View style={styles.inputShell}>
                <Text className="font-poppins-medium text-[16px] leading-[22px] text-[#7D849B]">
                  Password
                </Text>
                <View className="flex-row items-center">
                  <TextInput
                    placeholder="•••••••••"
                    placeholderTextColor={colors.textPrimary}
                    secureTextEntry
                    style={[styles.input, styles.passwordInput]}
                  />
                  <Ionicons color="#7D849B" name="eye-outline" size={30} />
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={openVerification}
              style={styles.primaryButton}
            >
              <Text className="font-poppins-semibold text-[22px] leading-[30px] text-white">
                {copy.buttonLabel}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-7 flex-row items-center gap-5">
            <View className="h-px flex-1 bg-border" />
            <Text className="font-poppins-medium text-[17px] leading-[24px] text-[#737992]">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="gap-3.5">
            {socialOptions.map((option) => (
              <TouchableOpacity
                activeOpacity={0.82}
                key={option.label}
                onPress={openVerification}
                style={styles.socialButton}
              >
                <View style={styles.socialIcon}>{option.icon}</View>
                <Text className="font-poppins-medium text-[18px] leading-[26px] text-text-primary">
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-auto items-center pt-16">
            <Text className="font-poppins text-[17px] leading-[25px] text-[#737992]">
              {copy.footerText}{" "}
              <Link
                className="font-poppins-semibold text-[17px] leading-[25px] text-lingua-deep-purple"
                href={copy.footerHref}
              >
                {copy.footerLink}
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsVerificationOpen(false)}
        transparent
        visible={isVerificationOpen}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.modalKeyboard}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsVerificationOpen(false)}
            style={styles.modalBackdrop}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
              <Text className="font-poppins-bold text-[25px] leading-[32px] text-text-primary">
                Check your email
              </Text>
              <Text className="mt-3 font-poppins text-[15px] leading-[23px] text-[#737992]">
                You received a verification code. Enter it below to continue.
              </Text>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => codeInputRef.current?.focus()}
                style={styles.codeRow}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.codeBox,
                      verificationCode.length === index && styles.codeBoxActive,
                    ]}
                  >
                    <Text className="font-poppins-semibold text-[24px] leading-[30px] text-text-primary">
                      {verificationCode[index] ?? ""}
                    </Text>
                  </View>
                ))}
              </TouchableOpacity>

              <TextInput
                autoFocus
                caretHidden
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={handleVerificationChange}
                ref={codeInputRef}
                style={styles.hiddenCodeInput}
                textContentType="oneTimeCode"
                value={verificationCode}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    marginLeft: -8,
    width: 44,
  },
  sparkle: {
    fontSize: 28,
    position: "absolute",
    zIndex: 2,
  },
  sparkleOrange: {
    color: "#FF8A00",
    left: 94,
    top: 42,
  },
  sparkleBlue: {
    color: "#76B7FF",
    right: 78,
    top: 50,
  },
  sparkleYellow: {
    color: "#F9C84A",
    right: 94,
    top: 96,
  },
  inputShell: {
    backgroundColor: colors.background,
    borderColor: "#ECEEF4",
    borderCurve: "continuous",
    borderRadius: 18,
    borderWidth: 1.5,
    height: 82,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  input: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    lineHeight: 25,
    marginTop: 8,
    padding: 0,
  },
  passwordInput: {
    flex: 1,
    marginTop: 8,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.linguaDeepPurple,
    borderCurve: "continuous",
    borderRadius: 16,
    boxShadow: "0 4px 0 #4B2CE5",
    height: 72,
    justifyContent: "center",
    marginTop: 4,
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: "#F0F1F5",
    borderCurve: "continuous",
    borderRadius: 18,
    borderWidth: 1.5,
    flexDirection: "row",
    height: 66,
    justifyContent: "center",
    position: "relative",
  },
  socialIcon: {
    left: 54,
    position: "absolute",
  },
  modalKeyboard: {
    flex: 1,
  },
  modalBackdrop: {
    backgroundColor: "rgba(13, 19, 43, 0.45)",
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.background,
    borderCurve: "continuous",
    borderRadius: 28,
    padding: 24,
  },
  codeRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    marginTop: 24,
  },
  codeBox: {
    alignItems: "center",
    borderColor: "#E6E8F0",
    borderCurve: "continuous",
    borderRadius: 14,
    borderWidth: 1.5,
    flex: 1,
    height: 56,
    justifyContent: "center",
  },
  codeBoxActive: {
    borderColor: colors.linguaDeepPurple,
  },
  hiddenCodeInput: {
    height: 1,
    opacity: 0,
    position: "absolute",
    width: 1,
  },
});

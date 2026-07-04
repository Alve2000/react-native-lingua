import { useRef, useState, type ReactNode } from "react";
import { useSignIn, useSignUp, useSSO } from "@clerk/clerk-expo";
import { Link, router, type Href } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
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

WebBrowser.maybeCompleteAuthSession();

type AuthMode = "sign-up" | "sign-in";
type SocialStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";

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
    strategy: "oauth_google",
  },
  {
    icon: <Entypo color="#1877F2" name="facebook-with-circle" size={32} />,
    label: "Continue with Facebook",
    strategy: "oauth_facebook",
  },
  {
    icon: <FontAwesome color={colors.textPrimary} name="apple" size={34} />,
    label: "Continue with Apple",
    strategy: "oauth_apple",
  },
] satisfies readonly {
  icon: ReactNode;
  label: string;
  strategy: SocialStrategy;
}[];

function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return "Something went wrong. Please try again.";
  }

  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  if ("errors" in error && Array.isArray(error.errors)) {
    const [firstError] = error.errors;

    if (
      firstError &&
      typeof firstError === "object" &&
      "message" in firstError &&
      typeof firstError.message === "string"
    ) {
      return firstError.message;
    }
  }

  return "Something went wrong. Please try again.";
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const copy = authCopy[mode];
  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const codeInputRef = useRef<TextInput>(null);
  const isSignUp = mode === "sign-up";
  const isClerkLoaded = isSignInLoaded && isSignUpLoaded;
  const isSubmitting = isEmailLoading || isSocialLoading;
  const visibleError = authError;

  const openVerification = () => {
    setVerificationCode("");
    setIsVerificationOpen(true);
    requestAnimationFrame(() => codeInputRef.current?.focus());
  };

  const finishAuth = () => {
    setIsVerificationOpen(false);
    router.replace("/");
  };

  const handleEmailAuth = async () => {
    if (!signIn || !signUp) {
      return;
    }

    setAuthError("");
    setIsEmailLoading(true);

    try {
      if (isSignUp) {
        await signUp.create({
          emailAddress,
          password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      } else {
        await signIn.create({
          identifier: emailAddress,
          strategy: "email_code",
        });
      }

      openVerification();
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleVerificationSubmit = async (code: string) => {
    if (!signIn || !signUp || !setSignInActive || !setSignUpActive) {
      return;
    }

    setAuthError("");
    setIsEmailLoading(true);

    try {
      if (isSignUp) {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (signUpAttempt.status === "complete" && signUpAttempt.createdSessionId) {
          await setSignUpActive({
            session: signUpAttempt.createdSessionId,
          });
          finishAuth();
          return;
        }
      } else {
        const signInAttempt = await signIn.attemptFirstFactor({
          code,
          strategy: "email_code",
        });

        if (signInAttempt.status === "complete" && signInAttempt.createdSessionId) {
          await setSignInActive({
            session: signInAttempt.createdSessionId,
          });
          finishAuth();
          return;
        }
      }

      setAuthError("Verification is not complete yet. Please try again.");
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleVerificationChange = (value: string) => {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);

    setVerificationCode(nextCode);

    if (nextCode.length === 6) {
      handleVerificationSubmit(nextCode);
    }
  };

  const handleSocialAuth = async (strategy: SocialStrategy) => {
    setAuthError("");
    setIsSocialLoading(true);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("oauth-callback"),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
        return;
      }

      setAuthError("Social sign in could not be completed. Please try again.");
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setIsSocialLoading(false);
    }
  };

  const isPrimaryDisabled =
    !isClerkLoaded || isSubmitting || !emailAddress || (isSignUp && !password);

  if (!isClerkLoaded) {
    return null;
  }

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
                onChangeText={setEmailAddress}
                placeholder="alex@gmail.com"
                placeholderTextColor={colors.textPrimary}
                style={styles.input}
                value={emailAddress}
              />
            </View>
            {mode === "sign-up" ? (
              <>
                <View style={styles.inputShell}>
                  <Text className="font-poppins-medium text-[16px] leading-[22px] text-[#7D849B]">
                    Password
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      onChangeText={setPassword}
                      placeholder="•••••••••"
                      placeholderTextColor={colors.textPrimary}
                      secureTextEntry={!isPasswordVisible}
                      style={[styles.input, styles.passwordInput]}
                      value={password}
                    />
                    <TouchableOpacity
                      accessibilityLabel={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      accessibilityRole="button"
                      activeOpacity={0.7}
                      onPress={() => setIsPasswordVisible((current) => !current)}
                      style={styles.passwordVisibilityButton}
                    >
                      <Ionicons
                        color="#7D849B"
                        name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : null}

            <TouchableOpacity
              activeOpacity={0.88}
              disabled={isPrimaryDisabled}
              onPress={handleEmailAuth}
              style={[
                styles.primaryButton,
                isPrimaryDisabled && styles.disabledButton,
              ]}
            >
              <Text className="font-poppins-semibold text-[22px] leading-[30px] text-white">
                {copy.buttonLabel}
              </Text>
            </TouchableOpacity>
            {visibleError ? (
              <Text style={styles.errorText}>{visibleError}</Text>
            ) : null}

            {mode === "sign-up" ? <View nativeID="clerk-captcha" /> : null}
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
                disabled={isSubmitting}
                onPress={() => handleSocialAuth(option.strategy)}
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
              {visibleError ? (
                <Text style={styles.modalErrorText}>{visibleError}</Text>
              ) : null}
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
  passwordVisibilityButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    marginRight: -6,
    width: 44,
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
  disabledButton: {
    opacity: 0.55,
  },
  errorText: {
    color: colors.error,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    lineHeight: 19,
    marginTop: -8,
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
  modalErrorText: {
    color: colors.error,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 14,
  },
});

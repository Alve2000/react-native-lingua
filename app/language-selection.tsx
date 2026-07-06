import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLearningStore } from "@/store/learning-store";
import { colors, fonts } from "@/theme";
import type { LanguageId, SupportedLanguage } from "@/types/learning";

export default function LanguageSelectionScreen() {
  const savedLanguageId = useLearningStore((state) => state.selectedLanguageId);
  const setSavedLanguageId = useLearningStore(
    (state) => state.setSelectedLanguageId,
  );
  const [selectedLanguageId, setSelectedLanguageId] =
    useState<LanguageId>(savedLanguageId ?? "spanish");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return languages;
    }

    return languages.filter((language) => {
      const searchableText = `${language.name} ${language.nativeName}`.toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  const handleContinue = () => {
    setSavedLanguageId(selectedLanguageId);
    router.replace("/home" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-1 px-7 pb-0 pt-3">
          <View className="h-[54px] flex-row items-center justify-center">
            <TouchableOpacity
              accessibilityLabel="Go back"
              activeOpacity={0.72}
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons color={colors.textPrimary} name="chevron-back" size={34} />
            </TouchableOpacity>
            <Text className="font-poppins-semibold text-[23px] leading-[31px] text-text-primary">
              Choose a language
            </Text>
          </View>

          <View style={styles.searchBox}>
            <Ionicons color="#687089" name="search-outline" size={28} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setSearchQuery}
              placeholder="Search languages"
              placeholderTextColor="#687089"
              style={styles.searchInput}
              value={searchQuery}
            />
          </View>

          <Text className="mt-8 font-poppins-semibold text-[19px] leading-[27px] text-text-primary">
            Popular
          </Text>

          <View className="mt-5 gap-2.5">
            {visibleLanguages.map((language) => (
              <LanguageRow
                isSelected={language.id === selectedLanguageId}
                key={language.id}
                language={language}
                onPress={() => setSelectedLanguageId(language.id)}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.86}
            onPress={handleContinue}
            style={styles.confirmButton}
          >
            <Text className="font-poppins-semibold text-[18px] leading-[25px] text-white">
              Continue
            </Text>
          </TouchableOpacity>

          <View className="mt-5 h-[145px] w-full overflow-hidden">
            <Image
              accessibilityLabel="Illustrated world landmarks on Earth"
              className="h-[190px] w-full"
              resizeMode="contain"
              source={images.earth}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type LanguageRowProps = {
  isSelected: boolean;
  language: SupportedLanguage;
  onPress: () => void;
};

function LanguageRow({ isSelected, language, onPress }: LanguageRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[styles.languageRow, isSelected && styles.selectedLanguageRow]}
    >
      <Image
        accessibilityLabel={`${language.name} flag`}
        resizeMode="cover"
        source={{ uri: language.flag }}
        style={styles.flag}
      />
      <View className="flex-1">
        <Text className="font-poppins-semibold text-[21px] leading-[27px] text-text-primary">
          {language.name}
        </Text>
        <Text className="mt-1 font-poppins-medium text-[16px] leading-[22px] text-[#687089]">
          {language.learnerCountLabel}
        </Text>
      </View>
      {isSelected ? (
        <View style={styles.checkCircle}>
          <Ionicons color="#FFFFFF" name="checkmark" size={26} />
        </View>
      ) : (
        <Ionicons color="#687089" name="chevron-forward" size={28} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  backButton: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    left: -4,
    position: "absolute",
    width: 48,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#FAFAFC",
    borderColor: "#E8EAF1",
    borderRadius: 28,
    borderWidth: 1.5,
    flexDirection: "row",
    height: 62,
    marginTop: 28,
    paddingHorizontal: 20,
  },
  searchInput: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 18,
    lineHeight: 25,
    marginLeft: 14,
    padding: 0,
  },
  languageRow: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: "#F0F1F5",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    gap: 20,
    minHeight: 94,
    paddingHorizontal: 16,
  },
  selectedLanguageRow: {
    backgroundColor: "#F8F7FF",
    borderColor: "#8A68FF",
    borderWidth: 2,
  },
  flag: {
    borderColor: "#EEF0F5",
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    width: 44,
  },
  checkCircle: {
    alignItems: "center",
    backgroundColor: "#6C4EF5",
    borderColor: "#8A68FF",
    borderRadius: 18,
    borderWidth: 2,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  confirmButton: {
    alignItems: "center",
    backgroundColor: colors.linguaDeepPurple,
    borderRadius: 24,
    boxShadow: "0 4px 0 #4B2CE5",
    flexDirection: "row",
    height: 68,
    justifyContent: "center",
    marginTop: 24,
  },
});

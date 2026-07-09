import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  type DimensionValue,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getLanguageById } from "@/data/languages";
import { getLessonsByLanguage } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { images } from "@/constants/images";
import { useLearningStore } from "@/store/learning-store";
import type { ActivityType } from "@/types/learning";

const dailyGoalXp = 20;

const activityIconByType: Record<ActivityType, keyof typeof Ionicons.glyphMap> =
  {
    "ai-teacher": "headset",
    "listen-and-repeat": "volume-high",
    "match-pairs": "chatbox-ellipses",
    "multiple-choice": "book",
    "speaking-practice": "mic",
    translate: "language",
  };

const planTitleByType: Record<ActivityType, string> = {
  "ai-teacher": "AI Conversation",
  "listen-and-repeat": "Audio practice",
  "match-pairs": "New words",
  "multiple-choice": "Lesson",
  "speaking-practice": "Speaking",
  translate: "Translate",
};

const formatLevel = (level: string) =>
  level
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguageId = useLearningStore(
    (state) => state.selectedLanguageId,
  );

  const language = selectedLanguageId
    ? getLanguageById(selectedLanguageId)
    : undefined;
  const languageLessons = selectedLanguageId
    ? getLessonsByLanguage(selectedLanguageId)
    : [];
  const currentLesson = languageLessons[0];
  const currentUnit = currentLesson ? getUnitById(currentLesson.unitId) : undefined;
  const dailyXp = Math.min(currentLesson?.xpReward ?? 0, dailyGoalXp);
  const progressWidth: DimensionValue = `${Math.round(
    (dailyXp / dailyGoalXp) * 100,
  )}%`;
  const displayName =
    user?.firstName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "Alex";
  const planItems = currentLesson?.activities.slice(0, 3) ?? [];

  return (
    <View className="flex-1 bg-background">

      {/* Fixed Header */}
      <View 
        style={styles.header}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          <Image
            contentFit="cover"
            source={{ uri: language?.flag }}
            style={styles.flag}
          />
          <Text
            className="font-poppins-semibold text-[20px] leading-[25px] text-[#232747]"
            numberOfLines={1}
          >
            Hola, {displayName}! 👋
          </Text>
        </View>

        <View className="flex-row items-center gap-5">
          <View className="flex-row items-center">
            <Image
              contentFit="contain"
              source={images.streakFire}
              style={styles.streak}
            />
            <Text className="font-poppins-semibold text-[22px] leading-[24px] text-[#59617C]">
              12
            </Text>
          </View>
          <Ionicons color="#222642" name="notifications-outline" size={28} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View className="mt-10 overflow-hidden rounded-[18px] bg-[#FFF8EE] px-6 py-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-poppins-semibold text-[16px] leading-[22px] text-[#263050]">
                Daily goal
              </Text>
              <View className="mt-3 flex-row items-end gap-2">
                <Text className="font-poppins-bold text-[31px] leading-[36px] text-[#101735]">
                  {dailyXp}
                </Text>
                <Text className="pb-1 font-poppins-semibold text-[18px] leading-[24px] text-[#7D86A1]">
                  / {dailyGoalXp} XP
                </Text>
              </View>
            </View>
            <Image
              contentFit="contain"
              source={images.treasure}
              style={styles.treasure}
            />
          </View>

          <View className="mt-5 h-2 overflow-hidden rounded-full bg-[#FFE3BF]">
            <View
              className="h-full rounded-full bg-[#FF7A00]"
              style={{ width: progressWidth }}
            />
          </View>
        </View>

        <View className="mt-7 overflow-hidden rounded-[18px] bg-[#6848F5]">
          <View className="absolute bottom-0 right-0 top-0 w-[52%] bg-[#7357F7]" />
          <View className="absolute bottom-0 left-[34%] h-20 w-24 rounded-t-[42px] bg-[#593EDB]" />
          <View className="absolute bottom-0 left-[46%] h-28 w-20 rounded-t-[34px] bg-[#553BD2]" />
          <View className="flex-row items-center justify-between px-6 py-6">
            <View className="z-10 flex-1">
              <Text className="font-poppins-medium text-[16px] leading-[22px] text-white">
                Continue learning
              </Text>
              <Text
                className="mt-3 font-poppins-semibold text-[28px] leading-[34px] text-white"
                numberOfLines={1}
              >
                {language?.name ?? "Spanish"}
              </Text>
              <Text className="mt-1 font-poppins-medium text-[18px] leading-[25px] text-white">
                {formatLevel(currentLesson?.level ?? "beginner")} · Unit{" "}
                {currentUnit?.order ?? 1}
              </Text>
              <View className="mt-5 self-start rounded-[14px] bg-white px-6 py-3">
                <Text className="font-poppins-semibold text-[18px] leading-[24px] text-[#6848F5]">
                  Continue
                </Text>
              </View>
            </View>

            <Image
              contentFit="contain"
              source={images.palace}
              style={styles.palace}
            />
          </View>
        </View>

        <View className="mt-7 flex-row items-center justify-between">
          <Text className="font-poppins-semibold text-[20px] leading-[27px] text-[#101735]">
            Today&apos;s plan
          </Text>
          <Text className="font-poppins-semibold text-[19px] leading-[26px] text-[#6848F5]">
            View all
          </Text>
        </View>

        <View className="mt-6 mb-9 gap-7">
          {planItems.map((activity, index) => {
            const isComplete = index === 0;
            const isVocabulary = activity.type === "match-pairs";
            const iconName = isVocabulary
              ? "chatbox-ellipses"
              : activityIconByType[activity.type];
            const iconColor = isVocabulary ? "#FF565F" : "#6848F5";
            const subtitle = isVocabulary
              ? `${currentLesson?.vocabulary.length ?? 0} words`
              : activity.type === "ai-teacher"
                ? "Talk about your day"
                : currentLesson?.title ?? activity.prompt;

            return (
              <View
                className="flex-row items-center justify-between"
                key={activity.id}
              >
                <View className="flex-row items-center gap-5">
                  <View
                    className="h-[52px] w-[52px] items-center justify-center rounded-[11px]"
                    style={{ backgroundColor: iconColor }}
                  >
                    <Ionicons color="#FFFFFF" name={iconName} size={28} />
                  </View>
                  <View>
                    <Text className="font-poppins-semibold text-[17px] leading-[24px] text-[#242947]">
                      {planTitleByType[activity.type]}
                    </Text>
                    <Text className="mt-1 font-poppins-medium text-[15px] leading-[21px] text-[#858BA4]">
                      {subtitle}
                    </Text>
                  </View>
                </View>

                <View
                  className={`h-[29px] w-[29px] items-center justify-center rounded-full ${
                    isComplete ? "bg-[#6848F5]" : "border-2 border-[#8A91A8]"
                  }`}
                >
                  {isComplete ? (
                    <Ionicons color="#FFFFFF" name="checkmark" size={19} />
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10, // Android
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    paddingTop: 58,
    paddingBottom: 18,
  },
  content: {
    paddingBottom: 126,
    paddingHorizontal: 30,
    paddingTop: 120,
  },
  flag: {
    borderRadius: 22,
    height: 44,
    width: 44,
  },
  palace: {
    height: 170,
    marginBottom: -14,
    marginRight: -18,
    width: 178,
  },
  streak: {
    height: 40,
    width: 40,
  },
  teacher: {
    borderRadius: 43,
    height: 86,
    width: 86,
  },
  treasure: {
    height: 104,
    width: 116,
  },
});

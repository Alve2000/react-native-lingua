import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { getLessonSceneImage } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonsByLanguage } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLearningStore } from "@/store/learning-store";
import type { Lesson } from "@/types/learning";

type LessonStatus = "completed" | "in-progress" | "available";

const getLessonStatus = (index: number): LessonStatus => {
  if (index < 2) return "completed";
  if (index === 2) return "in-progress";
  return "available";
};

export default function LearnScreen() {
  const router = useRouter();
  const selectedLanguageId = useLearningStore((state) => state.selectedLanguageId);
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  const language = selectedLanguageId ? getLanguageById(selectedLanguageId) : undefined;
  const languageLessons = useMemo(
    () => (selectedLanguageId ? getLessonsByLanguage(selectedLanguageId) : []),
    [selectedLanguageId],
  );
  const currentIndex = Math.min(2, Math.max(0, languageLessons.length - 1));
  const currentLesson = languageLessons[currentIndex];
  const unit = currentLesson ? getUnitById(currentLesson.unitId) : undefined;
  const completedCount = languageLessons.filter((_, index) => getLessonStatus(index) === "completed").length;

  const openLesson = (lesson: Lesson) => {
    router.push({
      pathname: "/lesson/[lessonId]" as never,
      params: { lessonId: lesson.id },
    });
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 126 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-4 pt-[58px]">
          <View className="flex-row items-center gap-4">
            <Ionicons color="#111B43" name="chevron-back" size={31} />
            <View className="flex-1">
              <Text className="font-poppins-semibold text-[24px] leading-[31px] text-text-primary">
                {currentLesson?.title ?? "Your lessons"}
              </Text>
              <Text className="mt-1 font-poppins-medium text-[16px] leading-[23px] text-[#74809B]">
                Unit {unit?.order ?? 1} · {completedCount + 1} / {languageLessons.length} lessons
              </Text>
            </View>
            <Ionicons color="#FF9D00" name="bookmark" size={29} />
          </View>
        </View>

        <View className="h-[258px] overflow-hidden bg-[#DFF1FF]">
          <Image
            contentFit="cover"
            source={currentLesson?.imageUrl ? { uri: currentLesson.imageUrl } : getLessonSceneImage(currentLesson?.id ?? "lesson")}
            style={{ height: "100%", width: "100%" }}
          />
          <View className="absolute inset-0 bg-[#162E4D]/10" />
          <View className="absolute bottom-4 left-5 rounded-[14px] bg-white/90 px-4 py-2">
            <Text className="font-poppins-semibold text-[14px] leading-[20px] text-[#313956]">
              {language?.name ?? "Language"} · {unit?.title ?? "First conversations"}
            </Text>
          </View>
        </View>

        <View className="-mt-1 flex-row bg-[#F9F9FD] px-5 pt-2">
          {(["lessons", "practice"] as const).map((tab) => {
            const isActive = tab === activeTab;
            return (
              <Pressable
                className={`flex-1 items-center rounded-t-[22px] py-5 ${isActive ? "bg-background" : "bg-transparent"}`}
                key={tab}
                onPress={() => setActiveTab(tab)}
              >
                <Text className={`font-poppins-semibold text-[19px] leading-[25px] ${isActive ? "text-lingua-deep-purple" : "text-[#66708E]"}`}>
                  {tab === "lessons" ? "Lessons" : "Practice"}
                </Text>
                {isActive ? <View className="absolute bottom-0 h-[4px] w-full rounded-t-full bg-lingua-deep-purple" /> : null}
              </Pressable>
            );
          })}
        </View>

        <View className="gap-3 bg-background px-6 pb-7 pt-6">
          {activeTab === "lessons" ? (
            languageLessons.map((lesson, index) => (
              <LessonCard
                index={index}
                key={lesson.id}
                lesson={lesson}
                onPress={() => openLesson(lesson)}
                status={getLessonStatus(index)}
              />
            ))
          ) : (
            <View className="items-center rounded-card border border-border bg-[#FBFBFE] px-6 py-9">
              <Ionicons color="#6C4EF5" name="barbell-outline" size={38} />
              <Text className="mt-3 font-poppins-semibold text-[18px] leading-[25px] text-text-primary">Practice room</Text>
              <Text className="mt-1 text-center font-poppins-medium text-[14px] leading-[21px] text-text-secondary">
                Review your {language?.name ?? "language"} words and phrases here soon.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function LessonCard({ index, lesson, onPress, status }: { index: number; lesson: Lesson; onPress: () => void; status: LessonStatus }) {
  const isCurrent = status === "in-progress";

  return (
    <Pressable
      accessibilityLabel={`Open lesson ${index + 1}: ${lesson.title}`}
      className={`min-h-[108px] flex-row items-center rounded-[19px] border bg-background px-6 py-5 ${isCurrent ? "border-[#8A6BFF] bg-[#FBFAFF]" : "border-[#ECEEF4]"}`}
      onPress={onPress}
    >
      <View className="flex-1 pr-3">
        <Text className={`font-poppins-medium text-[16px] leading-[22px] ${isCurrent ? "text-lingua-deep-purple" : "text-[#7A849E]"}`}>
          Lesson {index + 1}
        </Text>
        <Text className="mt-2 font-poppins-semibold text-[18px] leading-[24px] text-text-primary">
          {lesson.title}
        </Text>
        {isCurrent ? <Text className="mt-1 font-poppins-medium text-[15px] leading-[21px] text-lingua-deep-purple">In progress</Text> : null}
        {status === "available" ? <Text className="mt-1 font-poppins-medium text-[14px] leading-[20px] text-[#7A849E]">{lesson.activities.length} activities</Text> : null}
      </View>
      {status === "completed" ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-[#21C16B]">
          <Ionicons color="#FFFFFF" name="checkmark" size={22} />
        </View>
      ) : status === "in-progress" ? (
        <Ionicons color="#6C4EF5" name="school" size={35} />
      ) : (
        <Ionicons color="#6B7796" name="lock-closed-outline" size={27} />
      )}
    </Pressable>
  );
}

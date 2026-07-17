import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";

const feedbackColors = ["#21C16B", "#4D8BFF", "#6C4EF5"];

export default function AudioLessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const [showTeacherPreview, setShowTeacherPreview] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isResponsePlaying, setIsResponsePlaying] = useState(false);

  const lesson = getLessonById(lessonId);
  const language = lesson ? getLanguageById(lesson.languageId) : undefined;
  const leadPhrase = lesson?.phrases[0];
  const feedback = useMemo(
    () => [
      { label: "Speaking", value: "Excellent" },
      { label: "Pronunciation", value: "Great" },
      { label: "Goal", value: "On track" },
    ],
    [],
  );

  if (!lesson || !language || !leadPhrase) {
    return null;
  }

  const teacherMessage = lesson.aiTeacherPrompt.fallbackResponse;

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 118 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center px-5 pb-4 pt-3">
          <Pressable
            accessibilityLabel="Back to lessons"
            className="h-11 w-11 items-center justify-center"
            hitSlop={8}
            onPress={() => router.back()}
          >
            <Ionicons color="#111B43" name="chevron-back" size={32} />
          </Pressable>

          <View className="flex-1 pl-2">
            <Text className="font-poppins-semibold text-[23px] leading-[29px] text-text-primary">
              AI Teacher
            </Text>
            <View className="mt-0.5 flex-row items-center gap-2">
              <View className="h-3 w-3 rounded-full bg-[#21C16B]" />
              <Text className="font-poppins-medium text-[14px] leading-[20px] text-[#75809B]">
                Online · {language.name} · {lesson.title}
              </Text>
            </View>
          </View>

          <View className="h-12 w-12 items-center justify-center rounded-full border border-[#E8EAF2] bg-[#FBFBFD]">
            <Ionicons color="#111B43" name="videocam-outline" size={24} />
          </View>
          <View className="ml-2 h-12 min-w-12 items-center justify-center rounded-full border border-[#E8EAF2] bg-[#FBFBFD] px-2">
            <Text className="font-poppins-semibold text-[18px] leading-[24px] text-text-primary">
              {lesson.estimatedMinutes}
            </Text>
          </View>
          <View className="ml-2 h-12 w-12 items-center justify-center rounded-full border border-[#E8EAF2] bg-[#FBFBFD]">
            <Ionicons color="#111B43" name="notifications-outline" size={23} />
          </View>
        </View>

        <View className="mx-4 overflow-hidden rounded-[30px] bg-[#E8DED4]">
          <View className="absolute -right-8 top-6 h-44 w-44 rounded-full bg-[#F7EFE9]" />
          <View className="absolute -left-14 bottom-5 h-36 w-36 rounded-full bg-[#D8C4B4]" />
          <View className="absolute bottom-0 left-0 right-0 h-[38%] bg-[#D1C2B7]" />

          <View className="min-h-[410px] justify-between px-5 pb-6 pt-5">
            <View className="items-end">
              {showTeacherPreview ? (
                <View className="h-[140px] w-[116px] overflow-hidden rounded-[22px] border-2 border-white bg-[#D7E7D7] p-2">
                  <Image
                    contentFit="cover"
                    source={images.aiTeacherAvatar}
                    style={{ height: "100%", width: "100%" }}
                  />
                </View>
              ) : null}
            </View>

            <View className="items-center">
              <Image
                contentFit="contain"
                source={images.mascotHy}
                style={{ height: 300, width: "100%" }}
              />
            </View>
          </View>

          {showSubtitles ? (
            <View className="absolute bottom-5 left-5 right-20 rounded-[22px] bg-white px-5 py-4">
              <View className="flex-row items-start gap-3">
                <View className="flex-1">
                  <Text className="font-poppins-semibold text-[18px] leading-[25px] text-text-primary">
                    {leadPhrase.text}
                  </Text>
                  <Text className="mt-1 font-poppins-medium text-[15px] leading-[22px] text-[#59637D]">
                    {teacherMessage}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel={isResponsePlaying ? "Pause teacher response" : "Play teacher response"}
                  className="h-10 w-10 items-center justify-center rounded-full bg-[#F1EEFF]"
                  onPress={() => setIsResponsePlaying((value) => !value)}
                >
                  <Ionicons color="#5B3BF6" name={isResponsePlaying ? "pause" : "volume-high"} size={23} />
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>

        <View className="flex-row justify-around px-6 pb-6 pt-7">
          <SessionControl
            icon="videocam"
            label="Camera"
            onPress={() => setShowTeacherPreview((value) => !value)}
            selected={showTeacherPreview}
          />
          <SessionControl
            icon={isMicOn ? "mic" : "mic-outline"}
            label={isMicOn ? "Listening" : "Mic"}
            onPress={() => setIsMicOn((value) => !value)}
            selected={isMicOn}
          />
          <SessionControl
            icon="language-outline"
            label="Subtitles"
            onPress={() => setShowSubtitles((value) => !value)}
            selected={showSubtitles}
          />
          <SessionControl
            icon="call"
            label="End lesson"
            onPress={() => router.back()}
            tone="danger"
          />
        </View>

        <View className="mx-5 overflow-hidden rounded-[24px] border border-[#EBECF2] bg-white px-1 py-5">
          <View className="flex-row">
            {feedback.map((item, index) => (
              <View
                className={`flex-1 items-center px-2 ${index < feedback.length - 1 ? "border-r border-[#E6E8F0]" : ""}`}
                key={item.label}
              >
                <Text className="text-center font-poppins-medium text-[13px] leading-[19px] text-text-primary">
                  {item.label}
                </Text>
                <Text
                  className="mt-2 text-center font-poppins-semibold text-[15px] leading-[21px]"
                  style={{ color: feedbackColors[index] }}
                >
                  {index === feedback.length - 1 ? lesson.goals[0]?.title ?? item.value : item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
      {/* <SessionTabBar /> */}
    </SafeAreaView>
  );
}

function SessionControl({
  icon,
  label,
  onPress,
  selected = false,
  tone = "default",
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  selected?: boolean;
  tone?: "default" | "danger";
}) {
  const isDanger = tone === "danger";
  const backgroundColor = isDanger ? "bg-[#FF4D4F]" : selected ? "bg-[#EEE9FF]" : "bg-white";

  return (
    <Pressable accessibilityLabel={label} className="items-center" onPress={onPress}>
      <View className={`h-[62px] w-[62px] items-center justify-center rounded-full border ${backgroundColor} ${isDanger ? "border-[#FF4D4F]" : "border-[#E8EAF1]"}`}>
        <Ionicons color={isDanger ? "#FFFFFF" : selected ? "#5B3BF6" : "#111B43"} name={icon} size={29} />
      </View>
      <Text className={`mt-2 font-poppins-medium text-[13px] leading-[19px] ${isDanger ? "text-[#FF4D4F]" : "text-[#6E7894]"}`}>
        {label}
      </Text>
    </Pressable>
  );
}

// function SessionTabBar() {
//   const router = useRouter();
//   const tabs: {
//     icon: keyof typeof Ionicons.glyphMap;
//     label: string;
//     route: "/home" | "/learn" | "/ai-teacher" | "/chat" | "/profile";
//   }[] = [
//     { icon: "home-outline", label: "Home", route: "/home" },
//     { icon: "book", label: "Learn", route: "/learn" },
//     { icon: "headset-outline", label: "AI Teacher", route: "/ai-teacher" },
//     { icon: "chatbubble-outline", label: "Chat", route: "/chat" },
//     { icon: "person-outline", label: "Profile", route: "/profile" },
//   ];

//   return (
//     <View
//       className="absolute bottom-0 left-0 right-0 flex-row border-t border-[#F0F1F5] bg-white px-3 pb-2 pt-3"
//       style={{ boxShadow: "0 -6px 22px rgba(13, 19, 43, 0.08)" }}
//     >
//       {tabs.map((tab) => {
//         const isActive = tab.label === "Learn";

//         return (
//           <Pressable
//             accessibilityLabel={`Go to ${tab.label}`}
//             className="flex-1 items-center"
//             key={tab.label}
//             onPress={() => router.replace(tab.route)}
//           >
//             <Ionicons color={isActive ? "#5B3BF6" : "#7F86A3"} name={tab.icon} size={27} />
//             <Text className={`mt-1 text-[10px] leading-[15px] ${isActive ? "font-poppins-semibold text-lingua-deep-purple" : "font-poppins-medium text-[#7F86A3]"}`}>
//               {tab.label}
//             </Text>
//           </Pressable>
//         );
//       })}
//     </View>
//   );
// }

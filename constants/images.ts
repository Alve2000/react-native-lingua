import mascotLogo from "@/assets/assets/images/moscot-logo.png";
import mascotAuth from "@/assets/assets/images/mascot-auth.png";
import mascotWelcome from "@/assets/assets/images/mascot-welcome.png";
import mascotHy from "@/assets/assets/images/mascot-hy.png";
import lessonBackground from "@/assets/assets/images/lesson-background.png";
import earth from "@/assets/assets/images/earth.png";
import palace from "@/assets/assets/images/palace.png";
import streakFire from "@/assets/assets/images/streak-fire.png";
import treasure from "@/assets/assets/images/treasure.png";

export const images = {
  aiTeacherAvatar: {
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=face",
  },
  earth,
  mascotAuth,
  mascotLogo,
  mascotWelcome,
  mascotHy,
  lessonBackground,
  palace,
  streakFire,
  treasure,
} as const;

export const getLessonSceneImage = (lessonId: string) => ({
  uri: `https://picsum.photos/seed/${lessonId}/900/520`,
});

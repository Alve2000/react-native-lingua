import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts } from "@/theme";

type TabIconName = keyof typeof Ionicons.glyphMap;

const activeTabIcons: Record<string, TabIconName> = {
  home: "home",
  learn: "book",
  "ai-teacher": "headset",
  chat: "chatbubble",
  profile: "person",
};

const inactiveTabIcons: Record<string, TabIconName> = {
  home: "home-outline",
  learn: "book-outline",
  "ai-teacher": "headset-outline",
  chat: "chatbubble-outline",
  profile: "person-outline",
};

const tabLabels: Record<string, string> = {
  home: "Home",
  learn: "Learn",
  "ai-teacher": "AI Teacher",
  chat: "Chat",
  profile: "Profile",
};

export function CustomTabBar({ descriptors, navigation, state }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        height: 76 + insets.bottom,
        paddingBottom: Math.max(insets.bottom, 8),
      },
    ],
    [insets.bottom],
  );

  return (
    <View style={containerStyle}>
      {state.routes.map((route, index) => {
        const options = descriptors[route.key]?.options;
        const isFocused = state.index === index;
        const label = tabLabels[route.name] ?? String(options?.title ?? route.name);
        const iconName = isFocused
          ? activeTabIcons[route.name] ?? "ellipse"
          : inactiveTabIcons[route.name] ?? "ellipse-outline";

        const handlePress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: "tabPress",
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const handleLongPress = () => {
          navigation.emit({
            target: route.key,
            type: "tabLongPress",
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            key={route.key}
            onLongPress={handleLongPress}
            onPress={handlePress}
            style={styles.tabButton}
          >
            <Ionicons
              color={isFocused ? colors.linguaDeepPurple : "#7F86A3"}
              name={iconName}
              size={30}
            />
            <Text
              numberOfLines={1}
              style={[styles.label, isFocused ? styles.activeLabel : null]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    backgroundColor: colors.background,
    borderColor: "#F0F1F5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    bottom: 0,
    boxShadow: "0 -6px 22px rgba(13, 19, 43, 0.08)",
    flexDirection: "row",
    left: 0,
    paddingHorizontal: 12,
    paddingTop: 14,
    position: "absolute",
    right: 0,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  label: {
    color: "#7F86A3",
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  activeLabel: {
    color: colors.linguaDeepPurple,
    fontFamily: fonts.semiBold,
  },
});

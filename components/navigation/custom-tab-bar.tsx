import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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

const indicatorSize = 52;

export function CustomTabBar({ descriptors, navigation, state }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [barWidth, setBarWidth] = useState(width);
  const activeIndex = useSharedValue(state.index);
  const tabWidth = barWidth / state.routes.length;
  const activeRouteName = state.routes[state.index]?.name ?? "home";
  const activeIcon = activeTabIcons[activeRouteName] ?? "ellipse";

  useEffect(() => {
    activeIndex.value = withTiming(state.index, {
      duration: 260,
    });
  }, [activeIndex, state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          activeIndex.value * tabWidth + tabWidth / 2 - indicatorSize / 2,
      },
    ],
  }));

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
    <View
      onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      style={containerStyle}
    >
      <Animated.View style={[styles.indicator, indicatorStyle]}>
        <Ionicons color="#FFFFFF" name={activeIcon} size={28} />
      </Animated.View>

      {state.routes.map((route, index) => {
        const options = descriptors[route.key]?.options;
        const isFocused = state.index === index;
        const label = tabLabels[route.name] ?? String(options?.title ?? route.name);
        const iconName = inactiveTabIcons[route.name] ?? "ellipse-outline";

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
            {isFocused ? (
              <View style={styles.activeSpacer} />
            ) : (
              <>
                <Ionicons color="#7F86A3" name={iconName} size={29} />
                <Text numberOfLines={1} style={styles.label}>
                  {label}
                </Text>
              </>
            )}
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    bottom: 0,
    boxShadow: "0 -6px 18px rgba(13, 19, 43, 0.06)",
    flexDirection: "row",
    left: 0,
    paddingTop: 10,
    position: "absolute",
    right: 0,
  },
  indicator: {
    alignItems: "center",
    backgroundColor: colors.linguaDeepPurple,
    borderRadius: indicatorSize / 2,
    height: indicatorSize,
    justifyContent: "center",
    position: "absolute",
    top: 8,
    width: indicatorSize,
    zIndex: 2,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    height: 58,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  activeSpacer: {
    height: indicatorSize,
    width: indicatorSize,
  },
  label: {
    color: "#7F86A3",
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
});

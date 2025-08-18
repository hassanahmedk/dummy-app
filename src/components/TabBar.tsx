import { Ionicons } from "@expo/vector-icons";
import { PlatformPressable, Text } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View } from "react-native";

function MyTabBar({ state, descriptors, navigation }: any) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.card,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 60,
          alignItems: "center",
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Icon names (per route)
          const iconName =
            route.name === "Home"
              ? isFocused
                ? "home"
                : "home-outline"
              : isFocused
              ? "person"
              : "person-outline";

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? colors.primary : colors.text}
              />
              <Text
                style={{
                  color: isFocused ? colors.primary : colors.text,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {label}
              </Text>
            </PlatformPressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default MyTabBar;

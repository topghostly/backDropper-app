import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

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

        return (
          <TouchableOpacity
            key={route.name}
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 6,
              borderRadius: 25,
              paddingHorizontal: 12,
              borderCurve: "continuous",
              backgroundColor: isFocused ? "black" : null,
              paddingVertical: 8,
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Text
              style={{
                color: isFocused ? "#ffffff" : "#000000",
                fontFamily: "NeueMontreal-Medium",
                fontSize: 16,
                textTransform: "capitalize",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    width: 250,
    left: "50%",
    transform: [{ translateX: -125 }],
    paddingVertical: 7,
    borderRadius: 25,
    borderCurve: "continuous",
  },
  tabButtons: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 25,
    paddingHorizontal: 10,
    borderCurve: "continuous",
  },
});

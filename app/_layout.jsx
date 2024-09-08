import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaView>
      <View className="h-full justify-center items-center">
        <Text className="text-red-700">RootLayout</Text>
      </View>
    </SafeAreaView>
  );
};

export default RootLayout;

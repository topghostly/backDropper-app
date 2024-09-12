import React, { useEffect } from "react";
import { SplashScreen, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import TabBar from "../components/TabBar";
import "react-native-reanimated";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, error] = useFonts({
    "NeueMontreal-Medium": require("../assets/fonts/NeueMontreal-Medium.otf"),
    "NeueMontreal-Regular": require("../assets/fonts/NeueMontreal-Regular.otf"),
    "NeueMontreal-Bold": require("../assets/fonts/NeueMontreal-Bold.otf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{}}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="downloads"
          options={{
            title: "Downloads",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="detail/[id]"
          options={{
            title: "Details",
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default RootLayout;

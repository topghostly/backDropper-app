import React, { useEffect } from "react";
import { SplashScreen, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import TabBar from "../components/TabBar";

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
    <Tabs
      initialRouteName="index"
      screenOptions={{}}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          titleL: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          titleL: "Search",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="downloads"
        options={{
          titleL: "Downloads",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

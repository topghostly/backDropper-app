import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import test from "../constants/testImages";
import NavBar from "../components/NavBar";
import ImageCard from "../components/ImageCard";
import MasonryList from "react-native-masonry-list";

const Index = () => {
  const list = [
    {
      uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg",
    },
    {
      source: {
        uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg",
      },
    },
    {
      uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",

      dimensions: { width: 1080, height: 1920 },
    },
    {
      URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",

      id: "blpccx4cn",
    },
    {
      url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
    },
    {
      URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg",
    },
    {
      URL: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1lfGVufDB8fDB8fHww",
    },
    {
      URL: "https://images.unsplash.com/photo-1548827752-6301e20b3be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFuaW1lfGVufDB8fDB8fHww",
    },
  ];
  return (
    <SafeAreaView className="flex-1">
      <View className="h-[55]">
        <NavBar />
      </View>
      <View className="flex-1 ">
        <MasonryList
          images={list}
          columns={2}
          spacing={2}
          imageContainerStyle={{
            borderRadius: "18px",
          }}
          onPressImage={() => {
            console.log("pressed");
          }}
          onLongPressImage={() => {
            console.log("long Pressed");
          }}
          renderIndividualFooter={() => {
            return <Text>Thanks</Text>;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

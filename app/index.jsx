import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import MasonryList from "react-native-masonry-list";

import usePixel from "../hooks/usePixel";
import { getIndexData } from "../lib/Pixels";
const Index = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading } = usePixel({
    type: "index",
    pageNumber: 1,
  });

  const newList = [];

  data.map((item) => {
    newList.push({
      uri: item.src.medium,
      dimensions: {
        width: item.width,
        height: item.height,
      },
      imageId: item.id,
      avg_color: item.avg_color,
      photographer: item.photographer,
    });
  });

  const getNewContent = async () => {
    setPageNumber((prevPageNumeber) => (prevPageNumeber += 1));

    try {
      const responce = await getIndexData(pageNumber);
    } catch (error) {
      Alert.alert("Error", error);
    }
    const newContent = await getIndexData(pageNumber);
    newContent.map((item) => {
      newList.push({
        uri: item.src.medium,
        dimensions: {
          width: item.width,
          height: item.height,
        },
        imageId: item.id,
        avg_color: item.avg_color,
        photographer: item.photographer,
      });
    });

    console.log(pageNumber);
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="h-[55]">
        <NavBar />
      </View>
      <View className="flex-1 ">
        <MasonryList
          images={newList}
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
          renderIndividualFooter={(item) => {
            return (
              <Text className="text-sm font-nbold pl-2 mb-3">
                {item.photographer}
              </Text>
            );
          }}
          onEndReached={getNewContent}
          rerender={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

import { View, Text, FlatList, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import MasonryList from "react-native-masonry-list";

import usePixel from "../hooks/usePixel";
import { getIndexData } from "../lib/Pixels";

const Index = () => {
  const [pageNumber, setPageNumber] = useState(2);
  const [newList, setNewList] = useState([]);

  const { data, loading } = usePixel({
    type: "index",
    pageNumber: 1,
  });

  useEffect(() => {
    const initialList = data.map((item) => ({
      uri: item.src.medium,
      dimensions: {
        width: item.width,
        height: item.height,
      },
      imageId: item.id,
      avg_color: item.avg_color,
      photographer: item.photographer,
    }));

    setNewList(initialList);
  }, [data]);

  const getNewContent = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);

    try {
      const response = await getIndexData(pageNumber + 1);
      const newContent = response.map((item) => ({
        uri: item.src.medium,
        dimensions: {
          width: item.width,
          height: item.height,
        },
        imageId: item.id,
        avg_color: item.avg_color,
        photographer: item.photographer,
      }));

      // Update newList state with the new data
      setNewList((prevList) => [...prevList, ...newContent]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[55]">
        <NavBar />
      </View>
      <View className="flex-1">
        <MasonryList
          images={newList}
          columns={2}
          spacing={2}
          imageContainerStyle={{
            borderRadius: 18,
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

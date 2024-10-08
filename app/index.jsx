import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import MasonryList from "react-native-masonry-list";
import "react-native-reanimated";
import usePixel from "../hooks/usePixel";
import { getIndexData } from "../lib/Pixels";
import { router } from "expo-router";
import ModalScreen from "../components/ModalScreen";

const Index = () => {
  const [pageNumber, setPageNumber] = useState(2);
  const [newList, setNewList] = useState([]);
  const [showModalScreen, setShowModalScreen] = useState(false);
  const [downlaodLink, setDownloadLink] = useState("");

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
      photographer: item.alt,
      downloadUri: item.src.large2x,
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
        photographer: item.alt,
        downloadUri: item.src.large2x,
      }));

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
          onPressImage={(item) => {
            router.push(`/detail/${item.imageId}`);
          }}
          onLongPressImage={(item) => {
            setDownloadLink(item.downloadUri);
            setShowModalScreen(true);
          }}
          onEndReached={getNewContent}
          rerender={true}
        />
        {showModalScreen && (
          <ModalScreen
            setShowModalScreen={setShowModalScreen}
            downloadUri={downlaodLink}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;

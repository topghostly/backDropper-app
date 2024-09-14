import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import arrow from "../../assets/icons/arrow.png";
import { router } from "expo-router";
import MasonryList from "react-native-masonry-list";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import "react-native-reanimated";
import LoadingAnimation from "../../components/LoadingAnimation";

const requestStoragePermission = async () => {
  if (Platform.OS === "android") {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    return status === "granted";
  }
  return true;
};

const downloadImage = async (imageUri) => {
  try {
    // Request media library permission
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Media Library permission is required to save the image."
      );
      return;
    }

    // Download the image to a local file
    const fileUri = FileSystem.documentDirectory + "image.jpg"; // You can change the file name
    const downloadedFile = await FileSystem.downloadAsync(imageUri, fileUri);

    // Save the file to the media library
    const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
    await MediaLibrary.createAlbumAsync("Downloads", asset, false);

    Alert.alert("Success", "Image downloaded successfully");
  } catch (error) {
    console.log("Error downloading image:", error);
    Alert.alert("Error", "Failed to download the image");
  }
};

const Return = () => {
  return (
    <TouchableOpacity
      className="absolute top-[30px] left-3 rounded-full flex-1 justify-center items-center bg-gray-100 shadow-sm shadow-black/20"
      style={{
        paddingBottom: 15,
        paddingTop: 20,
        paddingHorizontal: 18,
        zIndex: 99,
      }}
      onPress={() => router.back()}
    >
      <Text>
        <Image source={arrow} className="w-3 h-3" resizeMode="contain" />
      </Text>
    </TouchableOpacity>
  );
};

const BottomBar = ({ downloadUrl, avgColor }) => {
  return (
    <View
      className="absolute bottom-0 right-0 w-full flex-row bg-white h-20 p-0 m-0 justify-center items-center border-t-gray-600"
      style={{
        zIndex: 99,
        gap: 20,
        borderTopColor: "#dbdbdb",
        borderTopWidth: 1,
      }}
    >
      <TouchableOpacity className="bg-gray-200 w-24 h-12 justify-center items-center  rounded-full">
        <Text className="text-lg font-nmedium">Share</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`bg-[#000000] w-24 h-12 justify-center items-center rounded-full`}
        onPress={() => [downloadImage(downloadUrl)]}
      >
        <Text className="text-lg font-nmedium text-white">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const Details = () => {
  const { id } = useLocalSearchParams();

  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const options = {
      headers: {
        Authorization:
          "tNaneYYkO9T6mjIhcgcIS5crjz1M9VopPHorQWM7CROXoNLfAUmNPZEH",
      },
    };
    const url = `https://api.pexels.com/v1/photos/${id}`;
    try {
      const request = await fetch(url, options);
      const data = await request.json();
      setImageData([
        {
          uri: data.src.medium,
          avgColor: data.avg_color,
          dimensions: {
            width: data.width,
            height: data.height,
          },
          imageId: data.id,
          avg_color: data.avg_color,
          photographer: data.alt,
          downloadSource: data.src.large2x,
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Return />
      {!loading && imageData.length > 0 ? (
        <>
          <View className="flex-1 w-full">
            <MasonryList
              images={imageData}
              columns={1}
              imageContainerStyle={{
                borderRadius: 18,
              }}
            />
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <LoadingAnimation size={38} />
        </View>
      )}

      {!loading && (
        <BottomBar
          downloadUrl={imageData[0].downloadSource}
          avgColor={imageData[0].avgColor}
        />
      )}
    </SafeAreaView>
  );
};

export default Details;

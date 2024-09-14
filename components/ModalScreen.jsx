import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const ModalScreen = ({ downloadUri, setShowModalScreen }) => {
  const bottomSheetRef = useRef(null);
  const [isDownlaodDone, setisDownlaodDone] = useState(true);

  const snapPoints = useMemo(() => ["35%", "43%", "100%"]);

  const renderBackDrop = useCallback((props) => [
    <BottomSheetBackdrop
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
    />,
  ]);

  const downloadImage = async (imageUri) => {
    try {
      setisDownlaodDone(false);
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
    } finally {
      setisDownlaodDone(true);
      bottomSheetRef.current?.close();
    }
  };

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        setShowModalScreen(false);
      }}
      backdropComponent={renderBackDrop}
    >
      <BottomSheetView
        className="flex-1 items-center px-5"
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 8,
          gap: 9,
        }}
      >
        <TouchableOpacity
          className={`w-full h-14 justify-center items-center rounded-full`}
          style={{
            backgroundColor: isDownlaodDone ? "black" : "#e4e4e4",
          }}
          onPress={() => [downloadImage(downloadUri)]}
        >
          <Text className="text-lg font-nmedium text-white">Save</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 w-full h-14 justify-center items-center  rounded-full">
          <Text className="text-lg font-nmedium">Share</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ModalScreen;

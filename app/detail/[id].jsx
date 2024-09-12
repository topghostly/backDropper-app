import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { API_KEY } from "@env";
import arrow from "../../assets/icons/arrow.png";
import { router } from "expo-router";
import MasonryList from "react-native-masonry-list";
import "react-native-reanimated";
import LoadingAnimation from "../../components/LoadingAnimation";

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

const BottomBar = () => {
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
        <Text className="text-lg font-nmedium">Save</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-black w-24 h-12 justify-center items-center  rounded-full">
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
        Authorization: API_KEY,
      },
    };
    const url = `https://api.pexels.com/v1/photos/${id}`;
    try {
      const request = await fetch(url, options);
      const data = await request.json();
      setImageData([
        {
          uri: data.src.medium,
          dimensions: {
            width: data.width,
            height: data.height,
          },
          imageId: data.id,
          avg_color: data.avg_color,
          photographer: data.photographer,
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
          <LoadingAnimation size={40} />
        </View>
      )}

      {!loading && <BottomBar />}
    </SafeAreaView>
  );
};

export default Details;

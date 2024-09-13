import { View, TextInput, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getQueryData } from "../lib/Pixels";
import MasonryList from "react-native-masonry-list";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import "react-native-reanimated";
import LoadingAnimation from "../components/LoadingAnimation";

const Search = () => {
  const [query, setQuery] = useState("");
  const [navSearch, setNavSearch] = useState("");
  const [data, setDate] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  const route = useRoute();

  const getSearchData = async (search) => {
    if (search === "") return;

    setIsLoading(true);
    setList([]);
    const response = await getQueryData(search, pageNumber);
    setDate(response);
    setQuery(search);
  };

  useEffect(() => {
    setNavSearch("");
    setIsLoading(true);
    setList([]);
    if (route.params) {
      const { navQuery } = route.params;
      setNavSearch(navQuery);
      getSearchData(navSearch);
    }
  }, [route.params, navSearch]);

  useEffect(() => {
    const updatedList = data.map((item) => ({
      uri: item.src.medium,
      dimensions: {
        width: item.width,
        height: item.height,
      },
      imageId: item.id,
      avg_color: item.avg_color,
      photographer: item.alt,
    }));

    setList(updatedList);
    if (updatedList.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setList([]);
    const response = await getQueryData(query, pageNumber);
    setDate(response);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-10 mx-2 my-2 rounded-lg items-center flex-row bg-gray-200 px-3">
        <TextInput
          className="flex-1 text-black font-nmedium bg-red w-full h-full text-lg items-center"
          value={query}
          placeholder="Search for dope backgrounds"
          placeholderTextColor={"#818181"}
          onChangeText={(e) => {
            setQuery(e);
          }}
          onSubmitEditing={handleSubmit}
        />
      </View>

      {!isLoading && list.length > 0 ? (
        <View className="flex-1 ">
          <MasonryList
            images={list}
            columns={2}
            spacing={2}
            imageContainerStyle={{
              borderRadius: 18,
            }}
            onPressImage={(item) => {
              router.push(`/detail/${item.imageId}`);
            }}
            onLongPressImage={() => {
              console.log("long Pressed");
            }}
            renderIndividualFooter={(item) => {
              return (
                <Text
                  className="text-sm font-nbold pl-2 mb-3 w-[170px]"
                  numberOfLines={2}
                >
                  {item.photographer}
                </Text>
              );
            }}
            rerender={true}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <LoadingAnimation size={38} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

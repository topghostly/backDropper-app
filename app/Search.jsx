import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import serchIcon from "../assets/icons/search.png";
import usePixel from "../hooks/usePixel";
import { getQueryData } from "../lib/Pixels";

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setDate] = useState([]);

  const list = [];

  useEffect(() => {}, [data]);

  const handleSubmit = async () => {
    const responce = await getQueryData(query, 1);
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
    </SafeAreaView>
  );
};

export default Search;

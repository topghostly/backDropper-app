import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import links from "../constants/navLinks";
import { useNavigation } from "@react-navigation/native";

const LinkList = ({ link }) => {
  const navigation = useNavigation();
  const [active, setActive] = useState(false);

  const handlePress = () => {
    navigation.navigate("search", { navQuery: link.uri });
  };
  useEffect(() => {
    if (link.uri === "All") {
      setActive(true);
    }
  });
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
      <View
        className={`bg-gray-200 mr-1 ml-2 rounded-[100px] ${
          active && "bg-black"
        }`}
      >
        <Text
          className={`font-nmedium text-lg px-4 py-1 ${active && "text-white"}`}
        >
          {link.uri}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NavBar = () => {
  return (
    <FlatList
      className="space-x-4 mt-1 py-2 bg-white"
      data={links}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <LinkList link={item} />}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
};

export default NavBar;

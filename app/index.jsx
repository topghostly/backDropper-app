import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import test from "../constants/testImages";
import NavBar from "../components/NavBar";

const Index = () => {
  return (
    <SafeAreaView>
      <NavBar />
      <FlatList
        data={test}
        keyExtractor={(item, index) => index.toString()}
        // renderItem={({ item }) => <LinkList link={item} />}
      />
    </SafeAreaView>
  );
};

export default Index;

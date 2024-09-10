import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const ImageCard = ({ image }) => {
  return (
    <TouchableOpacity className="h-fit mb-2">
      <View className="h-fit">
        <Image source={image} className="w-full" resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

export default ImageCard;

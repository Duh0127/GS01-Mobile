import React from "react";
import { styles } from "./styles";
import { Pressable, Text, View } from "react-native";
import { Image } from "react-native";

export default function Footer({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

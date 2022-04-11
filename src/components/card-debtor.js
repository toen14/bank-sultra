import React from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CardDDebtor(props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome
          name={props.icon ?? "?"}
          size={Dimensions.get("window").width * 0.095}
          color={props.iconColor ?? "#C4C4C4"}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{props.title ?? "Title"}</Text>
        <TextInput
          style={styles.text}
          onChangeText={props.onChangeText ?? (() => {})}
          value={props.name}
          placeholder=". . ."
          placeholderTextColor={"#1c1a1a"}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: Dimensions.get("window").width * 0.2,
    borderRadius: Dimensions.get("window").width * 0.02,
    borderWidth: 1,
    borderColor: "#938888",
    borderStyle: "solid",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: Dimensions.get("window").width * 0.025,
  },
  content: {
    flex: 1,
  },
  text: {
    fontFamily: "Rubik-Bold",
  },
});

import React from "react";
import { View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TextInput(props) {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={props.icon ?? "at"}
          size={Dimensions.get("window").width * 0.09}
          color={props.iconColor ?? "#404040"}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <ScrollView horizontal={true}>
            <Text>{props.text ?? "..."}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: 30,
  },
  iconContainer: {
    marginHorizontal: "6%",
    width: "10%",
  },
  textContainer: {
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
});

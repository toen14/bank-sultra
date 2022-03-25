import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

export default function CardReceiveMassage(props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.icon}>
          <Text style={styles.iconName}>{props.iconName ?? "QQ"}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentName}>{props.name ?? "Name"}</Text>
          <Text style={styles.contentRole}>{props.role ?? "Role"}</Text>
        </View>
        <Text style={styles.date}>
          {props.date ?? new Date().toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.border}></View>
        <Text style={styles.description}>Description : {props.description} </Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    minHeight: Dimensions.get("window").width * 0.25,
    borderRadius: (Dimensions.get("window").width * 0.5) / 30,
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "#938888",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1.5,
    flexDirection: "row",
    flexDirection: "column",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottom: {},
  contentContainer: {
    flex: 1,
  },
  contentName: {
    fontFamily: "Rubik-Bold",
  },
  contentRole: {
    fontFamily: "Rubik-Italic",
  },
  date: {
    fontFamily: "Rubik-Bold",
    fontSize: Dimensions.get("window").width * 0.032
  },
  icon: {
    height: (Dimensions.get("window").width * 0.15) / 2,
    width: (Dimensions.get("window").width * 0.15) / 2,
    backgroundColor: "#ECA6A6",
    borderRadius: (Dimensions.get("window").width * 0.15) / 2 / 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Dimensions.get("window").width * 0.01,
  },
  iconName: {
    fontFamily: "Rubik-Bold",
    color: "white",
  },
  border: {
    width: "85%",
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginVertical: Dimensions.get("window").width * 0.01,
    marginLeft: Dimensions.get("window").width * 0.1,
  },
  description: {
    marginLeft: Dimensions.get("window").width * 0.1,
    fontFamily: "Rubik",
  }
});

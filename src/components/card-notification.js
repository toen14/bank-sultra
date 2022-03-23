import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

export default function CardNotification(props) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}></View>
      <View style={styles.contentContainer}>
        <View style={styles.contentIcon}>
          <Text style={styles.iconName}>{props.iconName ?? "LL"}</Text>
        </View>
        <View style={styles.contentBody}>
          <View style={styles.textContainer}>
            <Text style={styles.contentName}>Lisa Lestary</Text>
            <Text style={styles.contentDescription}>
              "Membuat riwayat baru"
            </Text>
          </View>
          <Text style={styles.contentTime}>35 m</Text>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    flex: 1,
    height: Dimensions.get("window").width * 0.13,
    backgroundColor: "green",
    marginRight: Dimensions.get("window").width * 0.015,
    borderRadius: (Dimensions.get("window").width * 0.1) / 4,
  },
  contentContainer: {
    flex: 40,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "#FBFBFB",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  contentIcon: {
    height: (Dimensions.get("window").width * 0.15) / 2,
    width: (Dimensions.get("window").width * 0.15) / 2,
    backgroundColor: "blue",
    borderRadius: (Dimensions.get("window").width * 0.15) / 2 / 2,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  iconName: {
    fontFamily: "Rubik-Bold",
    color: "white",
    opacity: 0.75,
  },
  contentBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 6,
  },
  textContainer: {
    marginLeft: 5,
  },
  contentName: {
    fontFamily: "Rubik-Bold",
  },
  contentDescription: {
    fontFamily: "Rubik",
  },
  contentTime: {
    fontFamily: "Rubik",
    marginHorizontal: 5,
  },
});

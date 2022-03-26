import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function CardUser(props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.no}>{props.no ?? "no"}</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.contentLeft}>
          <Text style={styles.contentText}>{props.name ?? "Name"}</Text>
          <Text style={styles.contentText}>{props.role ?? "role"}</Text>
        </View>
        <View style={styles.contentRight}>
          <TouchableOpacity>
            <Text style={styles.dot}>. . .</Text>
          </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: "#F1EEEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1.5,
  },
  left: {
    flex: 1,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "#C4C4C4",
    opacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
  no: {
    color: "white",
    fontFamily: "Rubik-Bold",
    fontSize: (Dimensions.get("window").width * 0.15) / 2.8,
  },
  contentText: {
    fontFamily: "Rubik",
  },
  right: {
    flex: 6,
    flexDirection: "row",
    height: Dimensions.get("window").width * 0.15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentLeft: {
    marginLeft: 10,
  },
  contentRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
  },
  dot: {
    // position: "absolute",
    // bottom: Dimensions.get("window").width * 0.005,
    // right: Dimensions.get("window").width * 0.006,
    marginBottom: Dimensions.get("window").width * 0.06,
    marginRight: Dimensions.get("window").width * 0.02,
    color: "black",
    fontFamily: "Rubik-Bold",
    fontSize: Dimensions.get("window").width * 0.05,
  },
  status: {
    fontSize: (Dimensions.get("window").width * 0.05) / 1.5,
    fontFamily: "Rubik-Bold",
    color: "white",
    elevation: 10,
  },
});

import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

export default function CardDocument(props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.no}>{props.no ?? 'no'}</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.contentLeft}>
          <Text style={styles.contentText}>{props.name ?? "Name"}</Text>
          <Text style={styles.contentText}>{props.address ?? "Address"}</Text>
        </View>
        <View style={styles.contentRight}>
          <Text style={styles.dot}>
            . . .
          </Text>
          <View style={styles.stick}>
            <Text style={styles.status}>{props.status ?? "status"}</Text>
          </View>
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
    backgroundColor: "#FF0000",
    opacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
  no: {
    color: "white",
    fontSize: Dimensions.get("window").width * 0.15 / 2.8,
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
    position: "absolute", 
    bottom: 18,
    right: 10,
    color: "black",
    fontFamily: "Rubik-Bold",
    fontSize: Dimensions.get("window").width * 0.05,

  },
  stick: {
    height: Dimensions.get("window").width * 0.05,
    width: Dimensions.get("window").width * 0.2,
    marginRight: Dimensions.get("window").width * 0.03,
    backgroundColor: "#FF0000",
    borderRadius: (Dimensions.get("window").width * 0.05) / 4,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.75,
  },
  status: { 
    fontSize: (Dimensions.get("window").width * 0.05) / 1.5,
    fontFamily: "Rubik-Bold",
    color: "white",
    elevation: 10,
  },
});

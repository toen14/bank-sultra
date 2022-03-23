import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

export default function CardDocument(props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}></View>
      <View style={styles.right}>
        <View style={styles.contentLeft}>
          <Text>Name</Text>
          <Text>Alamat</Text>
        </View>
        <View style={styles.contentRight}>
        <Text style={{position: "absolute", bottom: 25, color: 'red'}}>. . .</Text>
          {/* <View>
            <Text>...</Text>
          </View> */}
          <View style={styles.stick}></View>
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
  left: {
    flex: 1,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "red",
  },
  right: {
    flex: 6,
    flexDirection: "row",
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentLeft: {
    marginLeft: 10,
  },
  contentRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
  },
  stick: {
    height: Dimensions.get("window").width * 0.05,
    width: Dimensions.get("window").width * 0.2,
    // marginRight: Dimensions.get("window").width * 0.05,
    backgroundColor: "yellow",
    borderRadius: (Dimensions.get("window").width * 0.05) / 4,
  },
});

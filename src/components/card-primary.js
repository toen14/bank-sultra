import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CardPrimary(props) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.cardFirst, ...props.style }}></View>
      <View style={styles.cardSecond}>
        <FontAwesome style={styles.icon} name={props.icon ?? "" } size={30} color={props.iconColor ?? "black"} />
        <Text style={styles.title} >{props.title ?? "Title"}</Text>
      </View>
      <View style={{ ...styles.cardThird, ...props.style }}>
        <Text style={styles.value}>{props.value ?? 0}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 10,
  },
  cardFirst: {
    height: Dimensions.get("window").width * 0.15,
    flex: 0.2,
    backgroundColor: "blue",
    opacity: 0.75,
  },
  cardSecond: {
    height: Dimensions.get("window").width * 0.15,
    flex: 6.8,
    opacity: 0.75,
    flexDirection: "row",
    alignItems: 'center',
  },
  cardThird: {
    height: Dimensions.get("window").width * 0.15,
    flex: 3,
    backgroundColor: "green",
    opacity: 0.75,
    alignItems: "center",
    justifyContent: 'center',
  },
  title: {
    marginLeft: 5,
    fontFamily: "Rubik-Bold",
  },
  icon: {
    marginLeft: 5,
  },
  value: {
    color: "white",
    fontFamily: "Rubik"
  }
});

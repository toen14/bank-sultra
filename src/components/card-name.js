import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

export default function CardName(props) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.textName}>{props.name ?? "Name"}</Text>
        <Text style={styles.textId}>ID {props.id ?? new Date().getTime()}</Text>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.containerTextLeft}>
          <Text style={styles.textGeneral}>Tanggal</Text>
          <Text style={styles.textGeneral}>Status</Text>
          <Text style={styles.textGeneral}>Description</Text>
        </View>
        <View style={styles.containerTextRight}>
          <Text style={styles.textGeneral}>: {props.tanggal}</Text>
          <Text style={styles.textGeneral}>: {props.status}</Text>
          <ScrollView>
            <Text style={styles.textGeneral}>: {props.description}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: Dimensions.get("window").width * 0.5,
    backgroundColor: "#C38E13",
    borderRadius: (Dimensions.get("window").width * 0.5) / 18,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  containerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Dimensions.get("window").width * 0.03,
  },
  containerBottom: {
    flexDirection: "row",
  },
  containerTextLeft: { 
      marginLeft: Dimensions.get("window").width * 0.04 
    },
    containerTextRight: {
        marginLeft: Dimensions.get("window").width * 0.015
    },
  textName: {
    fontFamily: "Rubik-Bold",
    fontSize: Dimensions.get("window").width * 0.08,
    color: "#FCF4F4",
    marginLeft: Dimensions.get("window").width * 0.04,
  },
  textId: {
    fontFamily: "Rubik",
    fontSize: Dimensions.get("window").width * 0.033,
    marginRight: Dimensions.get("window").width * 0.033,
    color: "#FCF4F4",
  },
  textGeneral: {
    fontFamily: "Rubik",
    color: "#FCF4F4",
  },
});

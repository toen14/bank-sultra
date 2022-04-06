import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileHeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconName}>{props.nameIcon ?? "LP"}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <ScrollView horizontal={true}>
            <Text style={styles.name}>{props.name ?? "Name"}</Text>
          </ScrollView>
        </View>
        <View>
          <ScrollView horizontal={true}>
            <Text style={styles.address}>{props.address ?? "Address"}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.settingContainer}>
        <TouchableOpacity>
          <FontAwesome
            name={props.icon ?? "cog"}
            size={Dimensions.get("window").width * 0.095}
            color={props.iconColor ?? "#5DB075"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 85,
    borderColor: "black",
    borderBottomWidth: 1,
    borderStyle: "solid",
    elevation: 1,
  },
  imgContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 2.5,
    overflow: "hidden",
  },
  settingContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: "5%",
  },
  icon: {
    height: (Dimensions.get("window").width * 0.3) / 2,
    minHeight: 50,
    width: (Dimensions.get("window").width * 0.3) / 2,
    minWidth: 50,
    backgroundColor: "#ECA6A6",
    borderRadius: (Dimensions.get("window").width * 0.3) / 2 / 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  iconName: {
    fontFamily: "Rubik-Bold",
    color: "white",
  },
  name: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
    alignSelf: "auto",
  },
  address: {
    fontFamily: "Rubik-Italic",
    alignSelf: "center",
  },
});

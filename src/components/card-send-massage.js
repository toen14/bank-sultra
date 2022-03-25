import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CardSendMassage(props) {
  const [massage, setMassage] = useState("");

  return (
    <View style={styles.container}>
      <FontAwesome
        style={styles.icon}
        name={props.icon ?? "comment"}
        size={Dimensions.get("window").width * 0.095}
        color={props.iconColor ?? "#C4C4C4"}
      />

      <TextInput
        style={styles.input}
        onChangeText={setMassage}
        value={massage}
        placeholder="Kirim pesan..."
      />

      <TouchableOpacity
        style={styles.massageIcon}
      >
        <FontAwesome
          name={props.icon ?? "paper-plane"}
          size={Dimensions.get("window").width * 0.04}
          color={props.iconColor ?? "white"}
        />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: Dimensions.get("window").width * 0.11,
    borderRadius: (Dimensions.get("window").width * 0.5) / 30,
    backgroundColor: "#F1EEEE",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
    marginLeft: Dimensions.get("window").width * 0.01,
  },
  input: {
    flex: 1,
    marginHorizontal: Dimensions.get("window").width * 0.01,
    fontFamily: "Rubik",
  },
  massageIcon: {
    backgroundColor: "#C4C4C4",
    width: Dimensions.get("window").width * 0.095,
    height: Dimensions.get("window").width * 0.095,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (Dimensions.get("window").width * 0.095) / 2,
    marginRight: Dimensions.get("window").width * 0.01,
  }
});

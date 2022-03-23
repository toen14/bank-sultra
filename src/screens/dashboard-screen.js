import React, { useState } from "react";
import {
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

import CardPrimary from "../components/card-primary";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <CardPrimary
        icon="book" title="Total Document"
        style={{ ...styles.card, ...styles.cardFirst }}
      />
      <CardPrimary
        icon="check-square" title="Done"
        iconColor={styles.cardSecond.backgroundColor}
        style={{ ...styles.card, ...styles.cardSecond }}
      />
      <CardPrimary
        iconColor={styles.cardThird.backgroundColor}
        icon="hourglass-half" title="Progress"
        style={{ ...styles.card, ...styles.cardThird }}
      />
      <CardPrimary
        iconColor={styles.cardFourth.backgroundColor}
        icon="info-circle" title="Pending"
        style={{ ...styles.card, ...styles.cardFourth }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // width: Dimensions.get("window").width * 0.9,
  },
  card: {
    marginVertical: 5,
    opacity: 0.75,
  },
  cardFirst: {
    backgroundColor: "#061A11",
  },
  cardSecond: {
    backgroundColor: "#28A745",
  },
  cardThird: {
    backgroundColor: "#FFC107",
  },
  cardFourth: {
    backgroundColor: "#FF0000",
  },
});

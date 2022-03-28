import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import CardPrimary from "../components/card-primary";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <CardPrimary
          icon="book"
          title="Total Document"
          style={{ ...styles.card, ...styles.cardFirst }}
        />
      </View>
      <View style={styles.cardWrapper}>
        <CardPrimary
          icon="check-square"
          title="Done"
          iconColor={styles.cardSecond.backgroundColor}
          style={{ ...styles.card, ...styles.cardSecond }}
        />
      </View>
      <View style={styles.cardWrapper}>
        <CardPrimary
          iconColor={styles.cardThird.backgroundColor}
          icon="hourglass-half"
          title="Progress"
          style={{ ...styles.card, ...styles.cardThird }}
        />
      </View>
      <View style={styles.cardWrapper}>
        <CardPrimary
          iconColor={styles.cardFourth.backgroundColor}
          icon="info-circle"
          title="Pending"
          style={{ ...styles.card, ...styles.cardFourth }}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardWrapper: {
    width: "90%",
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

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Search from "../components/search";
import Filter from "../components/filter-date";
import CardDocument from "../components/card-document";

export default function Document() {
  return (
    <View style={{ width: "90%", alignItems: "center" }}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View
          style={{
            width: "65%",
            marginRight: Dimensions.get("window").width * 0.01,
          }}
        >
          <Search />
        </View>
        <View style={{ width: "35%" }}>
          <Filter />
        </View>
      </View>
      <View>
        <View style={styles.cardDocumentContainer}>
          <CardDocument
            no="1"
            name="La Egex"
            address="Raha"
            color={{ backgroundColor: "#FF0000" }}
            status="pending"
          />
        </View>
        <View style={styles.cardDocumentContainer}>
          <CardDocument
            no="2"
            name="Andi"
            address="Konawe"
            color={{ backgroundColor: "#FFC107" }}
            status="pending"
          />
        </View>
        <View style={styles.cardDocumentContainer}>
          <CardDocument
            no="3"
            name="Lisa"
            address="Kendari"
            color={{ backgroundColor: "#28A745" }}
            status="done"
          />
        </View>
        <View style={styles.cardDocumentContainer}>
          <CardDocument
            no="4"
            name="Munarman"
            address="Kendari"
            color={{ backgroundColor: "#28A745" }}
            status="done"
          />
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  cardDocumentContainer: {
    marginTop: "2%",
    width: "100%",
  },
});

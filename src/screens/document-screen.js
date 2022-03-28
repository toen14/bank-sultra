import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Search from "../components/search";
import Filter from "../components/filter-date";
import CardDocument from "../components/card-document";

export default function Document() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <Search />
        </View>
        <View style={styles.filter}>
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
  container: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
  },
  search: {
    width: "65%",
    marginRight: Dimensions.get("window").width * 0.01,
  },
  filter: {
    width: "35%",
  },
  cardDocumentContainer: {
    marginTop: "2%",
    width: "91%",
    alignItems: "center",
  },
});

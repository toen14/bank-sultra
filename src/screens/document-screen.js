import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

import Search from "../components/search";
import Filter from "../components/filter-date";
import CardDocument from "../components/card-document";
import Bottom from "../components/bottom";

export default function Document(props) {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "68%" }}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.search}>
              <Search />
            </View>
            <View style={styles.filter}>
              <Filter />
            </View>
          </View>
          <View style={{ alignSelf: "center" }}>
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
            <View style={styles.cardDocumentContainer}>
              <CardDocument
                no="4"
                name="Munarman"
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
            <View style={styles.cardDocumentContainer}>
              <CardDocument
                no="4"
                name="Munarman"
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
            <View style={styles.cardDocumentContainer}>
              <CardDocument
                no="4"
                name="Munarman"
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
            <View style={styles.cardDocumentContainer}>
              <CardDocument
                no="4"
                name="Munarman"
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
        </ScrollView>
      </View>

      <View
        style={{
          width: "100%",
          height: "32%",
          marginTop: 5,
        }}
      >
        <Bottom navigation={props.navigation} />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: Dimensions.get("window").height,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
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

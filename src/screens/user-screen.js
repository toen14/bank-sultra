import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

import Search from "../components/search";
import CardUser from "../components/card-user";
import Bottom from "../components/bottom";

export default function User(props) {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1 }}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.search}>
              <Search />
            </View>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.cardBranchContainer}>
              <CardUser no="1" name="Rizik" role="Administrator" />
            </View>
            <View style={styles.cardBranchContainer}>
              <CardUser no="2" name="Samarah" role="Admin Pusat" />
            </View>
            <View style={styles.cardBranchContainer}>
              <CardUser no="3" name="Lisa" role="Apraisal" />
            </View>
            <View style={styles.cardBranchContainer}>
              <CardUser no="4" name="Munarman" role="Notaris" />
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          width: "100%",
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
    flex: 1,
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
    width: "100%",
    marginRight: Dimensions.get("window").width * 0.01,
  },
  cardBranchContainer: {
    marginTop: "2%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

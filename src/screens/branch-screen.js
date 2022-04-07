import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

import Search from "../components/search";
import CardBranch from "../components/card-branch";
import Bottom from "../components/bottom";

export default function Branch(props) {
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
              <CardBranch no="1" branch="Cabang Raha" />
            </View>
            <View style={styles.cardBranchContainer}>
              <CardBranch no="2" branch="Cabang Unaha" />
            </View>
            <View style={styles.cardBranchContainer}>
              <CardBranch no="3" branch="Cabang Kendari" />
            </View>
            <View style={styles.cardBranchContainer}>
              <CardBranch no="4" branch="Cabang Buton" />
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
    borderColor: "#C4C4C4",
    borderWidth: 1,
    justifyContent: "center",
  },
});

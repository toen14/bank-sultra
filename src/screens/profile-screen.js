import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ProfileHeader from "../components/profile-header";
import TextInput from "../components/text-input";
import Bottom from "../components/bottom";

export default function Profile(props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <ProfileHeader name="Leo Prabu" address="Kendari" />
        </View>
        <View style={{ flex: 1, marginVertical: "2.5%" }}>
          <ScrollView style={{ height: 5000 }}>
            <TextInput
              text="leoprabu@mail.com"
              icon="at"
              style={{ marginVertical: 2 }}
            />
            <TextInput
              text="Kendari"
              icon="map-marker"
              style={{ marginVertical: 2 }}
            />
          </ScrollView>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <Bottom navigation={props.navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // minHeight: Dimensions.get("window").height,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  textWrapper: {
    marginVertical: 2,
  },
});

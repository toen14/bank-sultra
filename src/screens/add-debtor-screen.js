import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

import CardDDebtor from "../components/card-debtor";

export default function AddDebtor(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Nama Debitur" name=" " icon="user-o" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Jenis Pengurusan" name=" " icon="building" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Notaris" name=" " icon="address-book" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Data Agunan" name=" " icon="book" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Cabang" name=" " icon="font-awesome" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Nomor" name=" " icon="openid" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Tanggal Penyerahan" name=" " icon="calendar" />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor title="Tanggal Berakhir" name=" " icon="calendar" />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="save" color="#003399" />
            </View>
            <View style={styles.button}>
              <Button title="validasi" color="#FFB84E" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
  },
  contentWrapper: {
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  button: {
    width: "35%",
  },
});

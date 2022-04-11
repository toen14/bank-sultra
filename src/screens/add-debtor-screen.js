import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

import CardDDebtor from "../components/card-debtor";

export default function AddDebtor(props) {
  const [namaDebitur, setNamaDebitur] = useState("");
  const [jenisPengurusan, setJenisPengurusan] = useState("");
  const [notaris, setNotaris] = useState("");
  const [dataAgunan, setDataAgunan] = useState("");
  const [cabang, setCabang] = useState("");
  const [nomor, setNomor] = useState("");
  const [tanggalPenyerahan, setTanggalPenyerahan] = useState("");
  const [tanggalBerakhir, setTanggalBerakhir] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              onChangeText={setNamaDebitur}
              name={namaDebitur}
              title="Nama Debitur"
              icon="user-o"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Jenis Pengurusan"
              onChangeText={setJenisPengurusan}
              name={jenisPengurusan}
              icon="building"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Notaris"
              onChangeText={setNotaris}
              name={notaris}
              icon="address-book"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Data Agunan"
              onChangeText={setDataAgunan}
              name={dataAgunan}
              icon="book"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Cabang"
              onChangeText={setCabang}
              name={cabang}
              icon="font-awesome"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Nomor"
              onChangeText={setNomor}
              name={nomor}
              icon="openid"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Tanggal Penyerahan"
              onChangeText={setTanggalPenyerahan}
              name={tanggalPenyerahan}
              icon="calendar"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Tanggal Berakhir"
              onChangeText={setTanggalBerakhir}
              name={tanggalBerakhir}
              icon="calendar"
            />
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

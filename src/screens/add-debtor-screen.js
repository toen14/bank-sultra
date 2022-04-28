import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Button, Keyboard, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import CardDDebtor from "../components/card-debtor";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { baseUrl } from "../constants/base-url";
import { debtorType } from "../constants/type";
import { DebtorsContext } from "../store/debtor-contex";

export default function AddDebtor(props) {
  const [namaDebitur, setNamaDebitur] = useState("");
  const [jenisPengurusan, setJenisPengurusan] = useState("");
  const [notaris, setNotaris] = useState("");
  const [dataAgunan, setDataAgunan] = useState("");
  const [cabang, setCabang] = useState("");
  const [nomor, setNomor] = useState("");
  const [tanggalPenyerahan, setTanggalPenyerahan] = useState("");
  const [tanggalBerakhir, setTanggalBerakhir] = useState("");
  const [alamat, setAlamat] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [date] = useState(new Date());
  const [isShowTanggalPenyerahan, setIsShowTanggalPenyerahan] = useState(false);
  const [isShowTanggalBerakhir, setIsShowTanggalBerakhir] = useState(false);

  const debtorsCtx = useContext(DebtorsContext);

  async function addDebtors() {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/debitors`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: namaDebitur,
          jenis_pengurusan: jenisPengurusan,
          notaris_id: notaris,
          cabang_id: cabang,
          data_agunan: dataAgunan,
          nomor: nomor,
          tanggal_penyerahan: tanggalPenyerahan,
          tanggal_berakhir: tanggalBerakhir,
          alamat: alamat,
        }),
      });
      
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const debtors = await res.json();
      console.log(debtors);
      debtorsCtx.addDebtor(debtors);
    } catch (error) {
      // setError("Gagal membuat data debitur!");
      Alert.alert('Terjadi kesalahan', 'Gagal membuat data debitur!')
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isLoading) {
      setNamaDebitur("");
      setJenisPengurusan("");
      setNotaris("");
      setDataAgunan("");
      setCabang("");
      setNomor("");
      setTanggalPenyerahan("");
      setTanggalBerakhir("");
      setAlamat("");
    }
  }, [isLoading]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
              title="Alamat"
              onChangeText={setAlamat}
              name={alamat}
              icon="address-card-o"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Tanggal Penyerahan"
              onChange={() => setIsShowTanggalPenyerahan(true)}
              name={tanggalPenyerahan}
              icon="calendar"
            />
          </View>
          <View style={styles.contentWrapper}>
            <CardDDebtor
              title="Tanggal Berakhir"
              onChange={() => setIsShowTanggalBerakhir(true)}
              name={tanggalBerakhir}
              icon="calendar"
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button onPress={addDebtors} title="save" color="#003399" />
            </View>
            <View style={styles.button}>
              <Button title="validasi" color="#FFB84E" />
            </View>
          </View>
        </View>
      </ScrollView>
      {isShowTanggalPenyerahan && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={({ type }, date) => {
            setIsShowTanggalPenyerahan(false);
            Keyboard.dismiss();

            // cek if user triger ok
            if (type === "set") {
              // return;
              setTanggalPenyerahan(date.toLocaleDateString());
            }
          }}
        />
      )}
      {isShowTanggalBerakhir && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={({ type }, date) => {
            setIsShowTanggalBerakhir(false);
            Keyboard.dismiss();

            // cek if user triger ok
            if (type === "set") {
              setTanggalBerakhir(date.toLocaleDateString());
            }
          }}
        />
      )}
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

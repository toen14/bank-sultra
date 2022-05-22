import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import ProfileHeader from "../components/profile-header";
import TextInput from "../components/text-input";
import Bottom from "../components/bottom";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { baseUrl } from "../constants/base-url";
import { AuthContext } from "../store/auth-contex";
import { iconName } from "../constants/icon-name";

export default function Profile(props) {
  const authCtx = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmal] = useState("");
  const [address, setAddress] = useState("");
  const [kabKot, setKabKot] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  function getProfile() {
    setIsFetching(true);
    fetch(`${baseUrl}/api/login/me`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setName(resJson.me.name);
        setEmal(resJson.me.email);
        setAddress(resJson.me.alamat);
        setKabKot(
          resJson.me?.branch?.kabupaten_kota?.name ?? resJson.me.alamat
        );
      })
      .catch((e) => console.log(e))
      .finally(() => setIsFetching(false));
  }

  useEffect(() => {
    setIsFetching(true);
    getProfile();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <ProfileHeader
            nameIcon={iconName(name)}
            name={name}
            address={kabKot}
          />
        </View>
        <View style={{ flex: 1, marginVertical: "2.5%" }}>
          <ScrollView
            style={{ height: 5000 }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => getProfile()}
              />
            }
          >
            <TextInput text={email} icon="at" style={{ marginVertical: 2 }} />
            <TextInput
              text={address}
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

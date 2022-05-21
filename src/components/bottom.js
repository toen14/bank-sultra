import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { RoleContext } from "../store/role-contex";
import { role } from "../constants/role";

export default function Bottom(props) {
  const roleCtx = useContext(RoleContext);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.button }}
        onPress={() => props.navigation?.navigate("Dashboard")}
      >
        <FontAwesome
          name="home"
          size={Dimensions.get("window").width / 10}
          color="#003399"
        />
        <Text
          style={{
            marginTop: -(Dimensions.get("window").width / 53.333333333333336),
          }}
        >
          Home
        </Text>
      </TouchableOpacity>
      <View style={{ ...styles.button }}>
        <TouchableOpacity
          style={{
            top: -44,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 50,
          }}
          onPress={() => props.navigation?.navigate("AddDebtor")}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: "#003399",
              alignItems: "center",
              justifyContent: "center",
              display: roleCtx.role === role.Notaris ? 'none' : 'flex',
            }}
          >
            <FontAwesome
              name="plus"
              size={Dimensions.get("window").width / 10}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ ...styles.button }}
        onPress={() => props.navigation?.navigate("Profile")}
      >
        <FontAwesome
          name="user"
          size={Dimensions.get("window").width / 10.666666666666666}
          color="#003399"
        />
        <Text style={{ marginTop: -(Dimensions.get("window").width / 160) }}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    elevation: 10,
    backgroundColor: "#ffffff",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    height: 90,
    borderTopWidth: 2,
    borderTopColor: "#003399",
  },
  button: {
    alignItems: "center",
  },
  plus: {
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

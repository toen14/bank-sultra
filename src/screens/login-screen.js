import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { baseUrl } from "../constants/base-url";
import { AuthContext } from "../store/auth-contex";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const onSumbit = useCallback(
    function () {
      setIsLoading(true);
      fetch(`${baseUrl}/api/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((resJson) =>
          resJson.token
            ? authCtx.authenticate(resJson.token)
            : !setIsLoading(false) && Alert.alert(resJson.message)
        )
        .catch((e) => console.log("err", e));
    },
    [email, password]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />
      </View>

      {isLoading && (
        <View style={{ width: "100%", marginBottom: -13 }}>
          <ActivityIndicator size={"small"} color={"blue"} />
        </View>
      )}

      <View style={styles.button}>
        <Button onPress={() => onSumbit()} color="#003399" title="Login" />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#E8E8E8",
    marginVertical: Dimensions.get("window").width * 0.01,
    borderRadius: 5,
    paddingLeft: 10,
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontSize: Dimensions.get("window").width * 0.1,
    marginTop: Dimensions.get("window").height * 0.08,
    marginBottom: Dimensions.get("window").height * 0.02,
    color: "#C38E13",
  },
  input: {
    fontFamily: "Rubik",
    fontSize: Dimensions.get("window").width * 0.08,
    height: Dimensions.get("window").height * 0.1,
  },
  button: {
    borderRadius: 6,
    width: "90%",
    marginTop: 15,
  },
  forgotPassword: {
    fontFamily: "Rubik",
    color: "#C38E13",
    marginTop: Dimensions.get("window").width * 0.02,
  },
});

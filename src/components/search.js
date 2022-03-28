import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Search(props) {
  const [isSearch, setSearch] = useState(false);
  const [keyowrd, setKeyowrd] = useState("");

  const cantSearch = (
    <TouchableOpacity onPress={() => setSearch(true)}>
      <View style={styles.container}>
        <FontAwesome
          style={styles.icon}
          name={props.icon ?? "search"}
          size={Dimensions.get("window").width * 0.095}
          color={props.iconColor ?? "#C4C4C4"}
        />
        <Text style={styles.textSearch}>Search</Text>
      </View>
    </TouchableOpacity>
  );

  const canSearch = (
    <View style={styles.container}>
      <TextInput
        style={styles.inputSearch}
        autoFocus={true}
        onChangeText={setKeyowrd}
          onEndEditing={({ nativeEvent: { text } }) => {
            const isHaveTextValue = text.length > 0;
            if (!isHaveTextValue) {
              return setSearch(false);
            }
            setKeyowrd(text);
          }}
        value={keyowrd}
      />
    </View>
  );

  return !isSearch ? cantSearch : canSearch;
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").width * 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#F1EEEE",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1.5,
  },
  icon: {
    flex: 1,
    marginLeft: "5%",
  },
  textSearch: {
    flex: 5,
    color: "#C4C4C4",
    marginLeft: "5%",
  },
  inputSearch: {
    alignSelf: "center",
    color: "#C4C4C4",
  },
});

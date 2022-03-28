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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Filter(props) {
  const [isFilter, setFilter] = useState(false);
  const [date, setDate] = useState(new Date());
  const [filterText, setFilterText] = useState("Filter");

  const cantSearch = (
    <TouchableOpacity onPress={() => setFilter(true)}>
      <View style={styles.container}>
        <FontAwesome
          style={styles.icon}
          name={props.icon ?? "calendar"}
          size={Dimensions.get("window").width * 0.095}
          color={props.iconColor ?? "#C4C4C4"}
        />
        <View style={styles.textSearchContainer}>
          <Text style={styles.textSearch}>{filterText}</Text>
        </View>
      </View>
      {isFilter && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={(_, date) => {
            setDate(date);
            setFilterText(date.toLocaleDateString());
            setFilter(false);
          }}
        />
      )}
    </TouchableOpacity>
  );

  //   const canSearch = (
  //     <View style={styles.container}>
  //       <TextInput
  //         style={styles.inputSearch}
  //         autoFocus={true}
  //         onChangeText={setKeyowrd}
  //         onEndEditing={({ nativeEvent: { text } }) => {
  //           const isHaveTextValue = text.length > 0;
  //           if (!isHaveTextValue) {
  //             return setFilter(false);
  //           }
  //           setKeyowrd(text);
  //         }}
  //         value={keyowrd}
  //       />
  //     </View>
  //   );

  return cantSearch;
}

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").width * 0.15,
    flexDirection: "row",
    minWidth: Dimensions.get("window").width * 0.3,
    alignItems: "center",
    justifyContent: "flex-start",
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
    marginLeft: "5%",
  },
  textSearchContainer: {
    flex: 1,
  },
  textSearch: {
    color: "#C4C4C4",
    alignSelf: "center",
  },
  inputSearch: {
    alignSelf: "center",
    color: "#C4C4C4",
  },
});

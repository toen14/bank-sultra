import "react-native-gesture-handler"; // https://reactnavigation.org/docs/drawer-navigator#installation
import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./src/navigations/drawer-navigation";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

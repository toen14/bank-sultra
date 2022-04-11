import "react-native-gesture-handler"; // https://reactnavigation.org/docs/drawer-navigator#installation
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import DrawerNavigation from "./src/navigations/drawer-navigation";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./src/screens/profile-screen";
import AddDebtor from "./src/screens/add-debtor-screen";
import DebtorsContextProvider from "./src/store/debtor-contex";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigation} />
      <Stack.Screen
        options={{ headerShown: true, headerTitle: "Tambah Debitur" }}
        name="AddDebtor"
        component={AddDebtor}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik: require("./assets/fonts/Rubik.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Italic": require("./assets/fonts/Rubik-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <DebtorsContextProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </DebtorsContextProvider>
  );
}

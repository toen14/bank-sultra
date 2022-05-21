import "react-native-gesture-handler"; // https://reactnavigation.org/docs/drawer-navigator#installation
import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import DrawerNavigation from "./src/navigations/drawer-navigation";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./src/screens/profile-screen";
import AddDebtor from "./src/screens/add-debtor-screen";
import DebtorsContextProvider from "./src/store/debtor-contex";
import DebtorDetail from "./src/screens/debtor-detail-screen";
import Notification from "./src/screens/notification-screen";
import Login from "./src/screens/login-screen";
import AuthContextProvider, { AuthContext } from "./src/store/auth-contex";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={Login} /> */}
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
      <Stack.Screen
        options={{ headerShown: true }}
        name="Detail Debitur"
        component={DebtorDetail}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Notification"
        component={Notification}
      />
    </Stack.Navigator>
  );
}


function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <Login />}
      {authCtx.isAuthenticated && <MyStack />}
    </NavigationContainer>
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
      <AuthContextProvider>
        {/* <NavigationContainer>
          <MyStack />
        </NavigationContainer> */}
        <Navigation/>
      </AuthContextProvider>
    </DebtorsContextProvider>
  );
}

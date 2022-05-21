import "react-native-gesture-handler"; // https://reactnavigation.org/docs/drawer-navigator#installation
import React, { useContext } from "react";
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
import { baseUrl } from "./src/constants/base-url";
import RoleContextProvider, { RoleContext } from "./src/store/role-contex";
import LoadingOverlay from "./src/components/UI/LoadingOverlay";

const Stack = createNativeStackNavigator();

function MyStack() {
  const authCtx = useContext(AuthContext);
  const roleCtx = useContext(RoleContext);

  fetch(`${baseUrl}/api/login/me`, {
    headers: {
      Authorization: `Bearer ${authCtx.token}`,
    },
  })
    .then((res) => res.json())
    .then((resJson) => roleCtx.setRole(resJson.me.role))
    .catch((e) => console.log("error", e));

  if (!roleCtx.role) {
    return <LoadingOverlay />;
  }

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
        <RoleContextProvider>
          <Navigation />
        </RoleContextProvider>
      </AuthContextProvider>
    </DebtorsContextProvider>
  );
}

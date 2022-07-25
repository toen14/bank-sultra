import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";

import { HomeNavigator, assets as homeAssets } from "./src/Home";
import {
  assets as authenticationAssets,
  AuthenticationNavigator,
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { ThemeProvider } from "./src/components/Theme";
import { AppRoutes } from "./src/components/Navigation";
import NotificationScreen from "./src/Home/Notifications";
import AuthContextProvider, {
  AuthContext,
} from "./src/Authentication/store/AuthContex";
import Logout from "./src/Authentication/Logout";
import BadgeContextProvider from "./src/Authentication/store/BadgeContex";
const assets = [...authenticationAssets, ...homeAssets];
const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  Rubik: require("./assets/fonts/Rubik.ttf"),
  "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  "Rubik-Italic": require("./assets/fonts/Rubik-Italic.ttf"),
};

const AppStack = createStackNavigator<AppRoutes>();

const Navigation = () => {
  const authCtx = React.useContext(AuthContext);

  return (
    <AppStack.Navigator headerMode="none">
      {authCtx.isAuthenticated && (
        <AppStack.Screen name="Home" component={HomeNavigator} />
      )}

      <AppStack.Screen
        name="Authentication"
        component={AuthenticationNavigator}
      />
      <AppStack.Screen name="Notification" component={NotificationScreen} />
      <AppStack.Screen name="Logout" component={Logout} />
    </AppStack.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NativeBaseProvider>
        <LoadAssets {...{ fonts, assets }}>
          <SafeAreaProvider>
            <AuthContextProvider>
              <BadgeContextProvider>
                <Navigation />
              </BadgeContextProvider>
            </AuthContextProvider>
          </SafeAreaProvider>
        </LoadAssets>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}

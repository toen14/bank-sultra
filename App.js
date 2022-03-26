import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import Login from "./src/screens/login-screen";
import Dashboard from "./src/screens/dashboard-screen";

// import { Login, Dashboard } from "./src/screens"

import CardNotification from "./src/components/card-notification";
import CardDocument from "./src/components/card-document";
import Search from "./src/components/search";
import Filter from "./src/components/filter-date";
import CardName from "./src/components/card-name";
import CardSendMassage from "./src/components/card-send-massage";
import CardReceiveMassage from "./src/components/card-receive-massage";
import CardDDebtor from "./src/components/card-debtor";
import CardUser from "./src/components/card-user";
import CardBranch from "./src/components/card-branch";

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
    <ScrollView>
      <View style={styles.container}>
        {/* <Login/> */}
        <Dashboard />
        <CardNotification />
        <CardDocument />
        <Search />
        <Filter />
        <CardName />
        <CardSendMassage />
        <CardReceiveMassage />
        <CardDDebtor />
        <CardUser />
        <CardBranch />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

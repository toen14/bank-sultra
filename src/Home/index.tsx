import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeRoutes } from "../components/Navigation";

import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import Dashboard from "./Dashboards";
import FavoriteOutfits from "./FavoriteOutfits";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import Cart from "./Cart";
import Debitor from "./Debitors/Debitor";
import Branch from "./Branches/Branch";
import User from "./Users";
import DebitorDetail from "./DebitorDetail";
import CreateDebitor from "./Debitors/CreateDebitor/CreateDebitor";
export { assets } from "./Drawer";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    drawerStyle={{
      width: DRAWER_WIDTH,
    }}
  >
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Debitor" component={Debitor} />
    <Drawer.Screen name="Branch" component={Branch} />
    <Drawer.Screen name="User" component={User} />
    <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
    <Drawer.Screen name="EditProfile" component={EditProfile} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="DebitorDetail" component={DebitorDetail} />
    <Drawer.Screen name="CreateDebitor" component={CreateDebitor} />
  </Drawer.Navigator>
);
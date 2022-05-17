import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import Dashboard from "../screens/dashboard-screen";
import Document from "../screens/document-screen";
import Branch from "../screens/branch-screen";
import User from "../screens/user-screen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#45A820",
        swipeMinDistance: 100,
        headerRight: () => (
          <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate('Notification')}>
            <FontAwesome
                name="bell"
                size={22}
                color={"#a3a0a0"}
              />
          </TouchableOpacity>
        ),
      }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen
        options={{
          drawerLabel: (props) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="home"
                size={Dimensions.get("window").width * 0.085}
                color={props.focused ? props.color : "#C4C4C4"}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#C4C4C4",
                }}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Drawer.Screen
        options={{
          drawerLabel: (props) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="bank"
                size={Dimensions.get("window").width * 0.065}
                color={props.focused ? props.color : "#C4C4C4"}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#C4C4C4",
                }}
              >
                Daftar Berkas
              </Text>
            </View>
          ),
          headerTitle: "Daftar Berkas",
        }}
        name="Document"
        component={Document}
      />
      <Drawer.Screen
        options={{
          drawerLabel: (props) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="indent"
                size={Dimensions.get("window").width * 0.065}
                color={props.focused ? props.color : "#C4C4C4"}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#C4C4C4",
                }}
              >
                Daftar Cabang
              </Text>
            </View>
          ),
          headerTitle: "Daftar Cabang",
        }}
        name="Branch"
        component={Branch}
      />
      <Drawer.Screen
        options={{
          drawerLabel: (props) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="users"
                size={Dimensions.get("window").width * 0.065}
                color={props.focused ? props.color : "#C4C4C4"}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#C4C4C4",
                }}
              >
                Daftar Pengguna
              </Text>
            </View>
          ),
          headerTitle: "Daftar Pengguna",
        }}
        name="User"
        component={User}
      />
      {/* <Drawer.Screen
        options={{
          drawerLabel: (props) => null,
          drawerIcon: () => null,
          headerPressColor: 'white',
          drawerActiveTintColor: 'white',
        }}
        name="Profile"
        component={User}
      /> */}
    </Drawer.Navigator>
  );
}

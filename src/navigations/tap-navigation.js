import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import Dashboard from "../screens/dashboard-screen";
import Document from "../screens/document-screen";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

function PlusScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text>Plus!</Text> */}
    </View>
  );
}

function PlusBarButtom(params) {
  return (
    <TouchableOpacity
      style={{
        top: -32,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#003399",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome name="plus" size={50} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const Tab = createBottomTabNavigator();
let counter = 0;

export default function TapNavigation(props) {
  console.log(props.navigation.reset({}));
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        },
        tabBarIcon: () => null,
        headerShown: false,
      }}
      initialRouteName={`Tap-${props.route.name}`}
      // screenListeners={}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => <Text>Home</Text>,
          // tabBarButton:
        }}
        
        
      />

      <Tab.Screen
        name="Plus"
        component={PlusScreen}
        options={{
          // tabBarIcon: (props) => <Text>Oy</Text>,
          tabBarButton: () => <PlusBarButtom />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => <Text>Profile</Text>,
        }}
      />

      <Tab.Screen
        name="Tap-Dashboar"
        component={Dashboard}
        options={{ tabBarIcon: () => null, tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

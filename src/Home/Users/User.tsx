import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { Platform, FlatList } from "react-native";
import { NativeBaseProvider } from "native-base";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";

import List, { ListProps } from "./List";

type Users = {
  id: number;
} & Omit<ListProps, "no">;

const users: Users[] = [];

let number = 1;
for (const later of "abcdefghijkl".toUpperCase()) {
  users.push({
    name: later,
    id: number++,
    role: number % 2 ? "notaris" : "apraisal",
  });
}

const User = ({ navigation }: HomeNavigationProps<"User">) => {
  const [search, setSearch] = useState("");

  return (
    <NativeBaseProvider>
      <Box flex={1} backgroundColor="background">
        <Header
          title="Daftar Pengguna"
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{
            icon: "bell",
            onPress: () => navigation.navigate("Notification"),
          }}
        />
        <Box flex={1}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            platform={Platform.OS === "android" ? "android" : "ios"}
            containerStyle={{ marginHorizontal: 20 }}
          />
          <FlatList
            data={users}
            renderItem={({ item, index }) => (
              <List role={item.role} no={index + 1} name={item.name} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default User;

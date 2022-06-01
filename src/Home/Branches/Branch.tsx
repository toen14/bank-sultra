import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { Platform, FlatList } from "react-native";
import { NativeBaseProvider } from "native-base";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";

import List, { ListProps } from "./List";

type Branches = {
  id: number;
} & Omit<ListProps, "no">;

const branches: Branches[] = [];

let number = 1;
for (const later of "abcdefghijkl".toUpperCase()) {
  branches.push({
    name: later,
    id: number++,
  });
}

const Branch = ({ navigation }: HomeNavigationProps<"Branch">) => {
  const [search, setSearch] = useState("");

  return (
    <NativeBaseProvider>
      <Box flex={1} backgroundColor="background">
        <Header
          title="Daftar Cabang"
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
            data={branches}
            renderItem={({ item, index }) => (
              <List no={index + 1} name={item.name} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Branch;

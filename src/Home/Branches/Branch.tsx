import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { Platform, FlatList, RefreshControl } from "react-native";
import { Heading, HStack, NativeBaseProvider, Spinner } from "native-base";
import axios from "axios";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { baseUrl } from "../../constants/base-url";
import { AuthContext } from "../../Authentication/store/AuthContex";

import List from "./List";

type TBranches = {
  id: number;
  name: string;
};

const Branch = ({ navigation }: HomeNavigationProps<"Branch">) => {
  const authCtx = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [branches, setBranches] = useState<TBranches[]>();
  const [isLoading, setIsLoading] = useState(false);

  function searchBranch() {
    setIsSearch(true);
    axios
      .get(`${baseUrl}/branches?search=${search}`, {
        headers: {
          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
        },
      })
      .then((res) => {
        setBranches(res.data.data);
      })
      .catch((e) => console.log("err", e))
      .finally(() => setIsSearch(false));
  }

  const fetchBranch = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/branches`, {
        headers: {
          "content-type": "aplication/json",
          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
        },
      })
      .then((res) => setBranches(res.data.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBranch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onEndEditing={() => {
              setBranches([]);
              searchBranch();
            }}
            onClear={() => {
              setBranches([]);
              fetchBranch();
            }}
            showLoading={isSearch}
            value={search}
            onChangeText={setSearch}
            placeholder="Cari cabang"
            platform={Platform.OS === "android" ? "android" : "ios"}
            containerStyle={{ marginHorizontal: 20 }}
          />
          {isLoading && (
            <HStack
              height="full"
              space={2}
              justifyContent="center"
              alignItems="center"
            >
              <Spinner
                color="darkBlue.600"
                size="lg"
                accessibilityLabel="Loading posts"
              />
              <Heading color="darkBlue.600" fontSize="md">
                Sedang memuat . . .
              </Heading>
            </HStack>
          )}
          {!isLoading && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    setBranches([]);
                    setSearch("");
                    fetchBranch();
                  }}
                />
              }
              data={branches}
              renderItem={({ item, index }) => (
                <List no={index + 1} name={item.name} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Branch;

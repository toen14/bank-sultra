import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchBar } from "@rneui/themed";
import { Platform, FlatList, RefreshControl } from "react-native";
import { HStack, NativeBaseProvider, Spinner } from "native-base";
import axios from "axios";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { baseUrl } from "../../constants/base-url";
import { AuthContext } from "../../Authentication/store/AuthContex";

import List, { ListProps } from "./List";

type User = {
  id: number;
} & ListProps;

const MemoList = memo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ id, name, role, no }: User) => {
    return <List role={role} no={no} name={name} />;
  },
  () => true
);

const User = ({ navigation }: HomeNavigationProps<"User">) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCanFetch, setIsCanFetch] = useState(true);

  const [page, setPage] = useState(1);

  const authCtx = useContext(AuthContext);

  function fetchData(p: number) {
    setIsLoading(true);
    return axios
      .get(`${baseUrl}/users?limit=10&page=${p}`, {
        headers: {
          Authorization: `Bearer ${authCtx.currentUser.token}`,
        },
      })
      .then((res) => {
        if (res.data.data.length) {
          setUsers((prev) => [...prev, ...res.data.data]);
        } else {
          setIsCanFetch(false);
        }
      })
      .catch((e) => console.log("err", e))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoader = () => {
    return isLoading ? (
      <HStack space={8} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </HStack>
    ) : null;
  };

  const loadMoreItem = async () => {
    if (isCanFetch) {
      setPage((previousPage) => previousPage + 1);
      await fetchData(page);
    }
  };

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
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
            renderItem={useCallback(
              ({ item, index }) => (
                <MemoList
                  role={item.role}
                  no={index + 1}
                  name={item.name}
                  id={item.id}
                />
              ),
              []
            )}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setUsers([]);
                  setPage(1);
                  setIsCanFetch(true);
                  setTimeout(() => fetchData(1), 500);
                }}
              />
            }
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default User;

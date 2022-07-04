import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { SearchBar } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Button,
  HStack,
  Icon,
  NativeBaseProvider,
  Spinner,
  Theme,
  Fab,
} from "native-base";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { baseUrl } from "../../constants/base-url";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { DebitorEnum } from "../../constants/debitor-enum";
import { RoleEnum } from "../../constants/role-enum";

import List from "./List";

export type Debitor = {
  id: number;
  no: number;
  name: string;
  boxColor: keyof Theme["colors"];
  status: DebitorEnum;
  branch: {
    name: string;
  };
};

const MemoList = memo(
  ({ no, name, status, branch, id }: Debitor) => {
    const nav = useNavigation();

    return (
      <TouchableOpacity
        onPress={() =>
          nav.navigate("DebitorDetail", {
            debitorId: id,
          })
        }
      >
        <List
          no={no}
          name={name}
          branch={branch.name}
          boxColor={
            // eslint-disable-next-line no-nested-ternary
            status === DebitorEnum.Done
              ? "primary"
              : status === DebitorEnum.Progress
              ? "drawer2"
              : "danger"
          }
          status={status}
        />
      </TouchableOpacity>
    );
  },
  (prev, next) => prev.id === next.id
);

const Debitor = ({ navigation }: HomeNavigationProps<"Debitor">) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState<Date | string>("Tanggal");
  const [debitors, setDebitors] = useState<Debitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCanFetch, setIsCanFetch] = useState(true);

  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [page, setPage] = useState(1);

  const authCtx = useContext(AuthContext);

  function searchDebitor() {
    setIsSearch(true);
    axios
      .get(
        `${baseUrl}/users/${authCtx?.currentUser?.user.id}/debitors?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx?.currentUser?.token}`,
          },
        }
      )
      .then((res) => {
        setDebitors(res.data.data);
      })
      .catch((e) => console.log("err", e))
      .finally(() => setIsSearch(false));
  }

  function fetchData(p: number) {
    setIsLoading(true);
    axios
      .get(
        `${baseUrl}/users/${authCtx?.currentUser?.user.id}/debitors?limit=12&page=${p}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx?.currentUser?.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.data.length) {
          setDebitors([...debitors, ...res.data.data]);
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

  const loadMoreItem = () => {
    if (isCanFetch && !isSearch) {
      setPage((previousPage) => previousPage + 1);
      fetchData(page);
    }
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} backgroundColor="background">
        <Header
          title="Daftar Berkas"
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{
            icon: "bell",
            onPress: () => navigation.navigate("Notification"),
          }}
        />
        <Box flex={1}>
          <Box height={Platform.OS === "android" ? 50 : 70} flexDirection="row">
            <Box width={"66%"} height="100%" paddingLeft={"m"}>
              <SearchBar
                onClear={() => {
                  setDebitors([]);
                  setPage(1);
                  setIsCanFetch(true);
                  fetchData(1);
                }}
                onEndEditing={() => {
                  searchDebitor();
                }}
                showLoading={isSearch}
                value={search}
                onChangeText={setSearch}
                placeholder="Search"
                containerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                style={{ fontSize: 15 }}
                searchIcon={
                  <Icon
                    as={Ionicons}
                    color="gray.500"
                    name="search"
                    size="sm"
                  />
                }
                cancelButtonProps={{ buttonTextStyle: { fontSize: 13 } }}
                platform={Platform.OS === "android" ? "android" : "ios"}
              />
            </Box>
            <Box width="32%" height={"100%"} mr="m">
              <Button
                rounded="none"
                leftIcon={
                  <Icon
                    as={Ionicons}
                    color="gray.500"
                    name="calendar"
                    size="lg"
                  />
                }
                width={"full"}
                height="full"
                style={{ backgroundColor: "white" }}
                onPress={() => setShowDate(true)}
              >
                <Text style={{ color: "#707179" }}>{date}</Text>
              </Button>
            </Box>
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date instanceof Date ? date : new Date()}
                mode={"date"}
                is24Hour={true}
                onChange={({ type }, date) => {
                  setShowDate(false);
                  if (type === "set") {
                    setDate(
                      `${date!.getFullYear()}/${date!.getMonth()}/${date!.getDay()}`
                    );
                  }
                }}
              />
            )}
          </Box>

          {useMemo(
            () => (
              <FlatList
                style={{ height: "100%" }}
                data={_.uniqWith(
                  debitors,
                  (l: Debitor, r: Debitor) => l.id === r.id
                )}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                renderItem={({ item, index }) => (
                  <MemoList
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    no={index + 1}
                    status={item.status}
                    branch={item.branch}
                    boxColor={"black"}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                      setDebitors([]);
                      setPage(1);
                      setIsCanFetch(true);
                      setSearch("");
                      setDate("Tanggal");
                      fetchData(1);
                    }}
                  />
                }
              />
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [debitors]
          )}
        </Box>
      </Box>
      {authCtx.currentUser?.user.role !== RoleEnum.Notaris && (
        <Fab
          onPress={() => navigation.navigate("CreateDebitor")}
          colorScheme="blue"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
        />
      )}
    </NativeBaseProvider>
  );
};

export default Debitor;

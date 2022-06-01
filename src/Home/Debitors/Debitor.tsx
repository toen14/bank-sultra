import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Text, Platform, FlatList, TouchableOpacity } from "react-native";
import { Button, Icon, NativeBaseProvider } from "native-base";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";

import List, { ListProps } from "./List";

type Debitors = {
  id: number;
} & Omit<ListProps, "no">;

const debitors: Debitors[] = [
  {
    id: 1,
    name: "La Ege",
    branch: "Raha",
    boxColor: "drawer2",
    status: "progress",
  },
  {
    id: 2,
    name: "Andi",
    branch: "Kendari",
    boxColor: "danger",
    status: "pending",
  },
  {
    id: 3,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 4,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 5,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 6,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 7,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 8,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 9,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 10,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
  {
    id: 11,
    name: "Total Dokumen",
    branch: "Raha",
    boxColor: "primary",
    status: "done",
  },
];

const Debitor = ({ navigation }: HomeNavigationProps<"Debitor">) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState<Date | string>("Tanggal");
  const [search, setSearch] = useState("");

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
          <Box
            height={66}
            marginVertical={"s"}
            width={"100%"}
            flexDirection="row"
          >
            <Box width={"66%"}>
              <SearchBar
                value={search}
                onChangeText={setSearch}
                lightTheme
                platform={Platform.OS === "android" ? "default" : "ios"}
              />
            </Box>
            <Box width="32%" height={"100%"} ml="s">
              <Button
                rounded="none"
                leftIcon={
                  <Icon
                    as={Ionicons}
                    color="gray.500"
                    name="calendar"
                    size="3xl"
                  />
                }
                width={"full"}
                height="full"
                style={{ backgroundColor: "#DDE4EA" }}
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
                      `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
                    );
                  }
                }}
              />
            )}
          </Box>
          <FlatList
            data={debitors}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <List
                  no={index + 1}
                  name={item.name}
                  branch={item.branch}
                  boxColor={item.boxColor}
                  status={item.status}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default Debitor;

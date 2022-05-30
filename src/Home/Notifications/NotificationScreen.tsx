import React from "react";
import { FlatList } from "react-native";

import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

import Notification from "./Notification";

const list = [
  {
    name: "Amy Farha",
    role: "Admin",
    description: "Tambah berkas",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-04-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T10:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:27:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2021-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
  {
    name: "Chris Jackson",
    role: "Notaris",
    description: "Berkas tidak lengkap",
    createdAt: "2022-05-08T13:55:25",
  },
];

const NotificationScreen = ({
  navigation,
}: HomeNavigationProps<"Notification">) => {
  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
        title="Notifications"
      />
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Notification
            name={item.name}
            description={item.description}
            role={item.role}
            createdAt={item.createdAt}
          />
        )}
      />
    </Box>
  );
};

export default NotificationScreen;

import React from "react";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";

import List from "./List";

const Dashboard = ({ navigation }: HomeNavigationProps<"Dashboard">) => {
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Dashboard"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "bell",
          onPress: () => navigation.navigate("Notification"),
        }}
      />
      <Box flex={1}>
        <List
          title="Total Dokumen"
          value={50}
          boxColor="info"
          icon="book"
          iconColor="#808080"
        />

        <List
          title="Done"
          value={45}
          boxColor="primary"
          icon="check-square"
          iconColor="#2CB9B0"
        />

        <List
          title="Progress"
          value={4}
          boxColor="drawer2"
          icon="hourglass-half"
          iconColor="#FFC641"
        />

        <List
          title="Pending"
          value={1}
          boxColor="danger"
          icon="info-circle"
          iconColor="#FE0058"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;

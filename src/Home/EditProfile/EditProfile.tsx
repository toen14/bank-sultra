import { DrawerActions } from "@react-navigation/native";
import React, { useContext } from "react";

import { Box, Header, Text, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { AuthContext } from "../../Authentication/store/AuthContex";

import PersonalInfo from "./PersonalInfo";

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  const authCtc = useContext(AuthContext);
  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.25} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Edit Profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
            dark
          />
        </Box>
      </Box>
      <Box>
        {/* <Box
          position="absolute"
          left={width / 2 - 50}
          top={-50}
          backgroundColor="primary"
          width={100}
          height={100}
          style={{ borderRadius: 50 }}
        /> */}
        <Box marginVertical="m" style={{ marginTop: 50 + theme.spacing.m }}>
          <Text variant="title1" textAlign="center">
            {authCtc.currentUser?.user.name}
          </Text>
          <Text variant="body" textAlign="center">
            {authCtc.currentUser?.user.email}
          </Text>
        </Box>
      </Box>
      {/* <Tabs tabs={tabs}>
        <Configuration />
        <PersonalInfo />
      </Tabs> */}
      <Box>
        <PersonalInfo />
      </Box>
    </Box>
  );
};

export default EditProfile;

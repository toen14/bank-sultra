import React, { useContext } from "react";
import { Dimensions, Image } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { Box, useTheme, Text, Header } from "../../components";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { RoleEnum } from "../../constants/role-enum";

import DrawerItem, { DrawerItemProps } from "./DrawerItem";

export const assets = [require("./assets/drawer.png")];
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;
const items: DrawerItemProps[] = [
  // {
  //   icon: "zap",
  //   label: "Dashboard",
  //   screen: "Dashboard",
  //   color: "primary",
  // },
  {
    icon: "book",
    label: "Daftar Berkas",
    screen: "Debitor",
    color: "drawer1",
  },
  // {
  //   icon: "briefcase",
  //   label: "Cabang",
  //   screen: "Branch",
  //   color: "drawer3",
  // },
  // {
  //   icon: "heart",
  //   label: "Favorites Outfits",
  //   screen: "FavoriteOutfits",
  //   color: "drawer1",
  // },
  // {
  //   icon: "users",
  //   label: "Daftar Pengguna",
  //   screen: "User",
  //   color: "info",
  // },
  {
    icon: "user",
    label: "Profile",
    screen: "EditProfile",
    color: "drawer2",
  },
  // {
  //   icon: "clock",
  //   label: "Transaction History",
  //   screen: "TransactionHistory",
  //   color: "drawer3",
  // },
  // {
  //   icon: "settings",
  //   label: "Notifications Settings",
  //   screen: "Settings",
  //   color: "drawer4",
  // },
  // {
  //   icon: "log-out",
  //   label: "Logout",
  //   onPress: (navigation) => {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "Logout" }],
  //       })
  //     );
  //   },
  //   color: "secondary",
  // },
];
const Drawer = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const authCtx = useContext(AuthContext);

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="background">
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
            title="Menu"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            // right={{
            //   icon: "shopping-bag",
            //   onPress: () => navigation.navigate("Cart"),
            // }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="background"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl"
        >
          {/* <Box
            position="absolute"
            left={DRAWER_WIDTH / 2 - 50}
            top={-50}
            backgroundColor="primary"
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
          /> */}
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              {authCtx.currentUser?.user.name}
            </Text>
            <Text variant="body" textAlign="center">
              {authCtx.currentUser?.user.email}
            </Text>
          </Box>

          {(authCtx.currentUser?.user.role === RoleEnum.AdminPusat ||
            authCtx.currentUser?.user.role === RoleEnum.Administrator) && (
            <>
              <DrawerItem
                key={"zap"}
                {...{
                  icon: "zap",
                  label: "Dashboard",
                  screen: "Dashboard",
                  color: "primary",
                }}
              />

              <DrawerItem
                key={"users"}
                {...{
                  icon: "users",
                  label: "Daftar Pengguna",
                  screen: "User",
                  color: "info",
                }}
              />

              <DrawerItem
                key={"briefcase"}
                {...{
                  icon: "briefcase",
                  label: "Daftar Cabang",
                  screen: "Branch",
                  color: "drawer3",
                }}
              />
            </>
          )}

          {items.map((item) => (
            <DrawerItem key={item.icon} {...item} />
          ))}

          <DrawerItem
            key={"logout"}
            {...{
              icon: "log-out",
              label: "Logout",
              onPress: () => {
                if (authCtx.logout) {
                  authCtx.logout();
                }
              },
              color: "secondary",
            }}
          />

          {(authCtx.currentUser?.user.role === RoleEnum.Apraisal ||
            authCtx.currentUser?.user.role === RoleEnum.Notaris) && (
            <>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
            </>
          )}
        </Box>
      </Box>
      <Box
        backgroundColor="secondary"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.61}
        borderTopLeftRadius={"xl"}
      >
        {/* <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default Drawer;

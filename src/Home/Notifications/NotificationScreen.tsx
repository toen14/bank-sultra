import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import axios, { AxiosError } from "axios";
import { Heading, HStack, NativeBaseProvider, Spinner } from "native-base";

import { AuthContext } from "../../Authentication/store/AuthContex";
import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { baseUrl } from "../../constants/base-url";
import { StatusNotifEnum } from "../../constants/status-notif-enum";

import Notification from "./Notification";

type TNotification = {
  id: number;
  name: string;
  role: string;
  status: StatusNotifEnum;
  // eslint-disable-next-line camelcase
  created_at: string;
  note: {
    description: string;
    user: {
      name: string;
      role: string;
      id: string;
    };
    // eslint-disable-next-line camelcase
    debitor_id: string;
  };
};

const NotificationScreen = ({
  navigation,
}: HomeNavigationProps<"Notification">) => {
  const authCtx = React.useContext(AuthContext);

  const [notifications, setNotifications] = useState<TNotification[]>();
  const [isLoading, setIsLoading] = useState(false);

  if (!authCtx.isAuthenticated) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate("Authentication");
  }

  const fetchData = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/users/${authCtx.currentUser?.user.id}/notifications`, {
        headers: {
          "content-type": "aplication/json",
          Authorization: `Bearer ${authCtx.currentUser?.token}`,
        },
      })
      .then((res) => {
        const parseNotif = (res.data.data as TNotification[]).filter(
          (notif) => authCtx.currentUser?.user.id !== notif.note.user.id
        );
        setNotifications(parseNotif);
      })
      .catch((e: AxiosError) => console.log("error notif", e.response?.data))
      .finally(() => setIsLoading(false));
  }, [authCtx.currentUser?.token, authCtx.currentUser?.user.id]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box backgroundColor="background" flex={1}>
      <Header
        left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
        title="Notifications"
      />
      {isLoading && (
        <NativeBaseProvider>
          <HStack
            height="full"
            space={2}
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              color="darkBlue.600"
              size="sm"
              accessibilityLabel="Loading posts"
            />
            <Heading color="darkBlue.600" fontSize="2xs">
              Sedang memuat . . .
            </Heading>
          </HStack>
        </NativeBaseProvider>
      )}

      {!isLoading && (
        <FlatList
          data={notifications}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                setNotifications([]);
                fetchData();
              }}
            />
          }
          renderItem={({ item }) => {
            let desc = item.note.description.substring(0, 24);

            const descArr = desc.split("\n");
            if (descArr.length >= 2) {
              desc = descArr[0] + "\n" + descArr[1] + "...";
            }

            if (item.note.description.length >= 25) {
              desc = desc + "...";
            }

            return (
              <Notification
                name={item.note.user.name}
                description={desc}
                role={item.note.user.role}
                createdAt={item.created_at}
                debitorId={item.note.debitor_id}
                backgroundColor={
                  item.status === StatusNotifEnum.Unread ? "#F9F9C5" : "white"
                }
                status={item.status}
                id={item.id}
              />
            );
          }}
        />
      )}
    </Box>
  );
};

export default NotificationScreen;

import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { Heading, HStack, NativeBaseProvider, Spinner } from "native-base";

import { AuthContext } from "../../Authentication/store/AuthContex";
import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { baseUrl } from "../../constants/base-url";

import Notification from "./Notification";

type TNotification = {
  id: number;
  name: string;
  role: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  note: {
    description: string;
    user: {
      name: string;
      role: string;
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/users/${authCtx.currentUser?.user.id}/notifications`, {
        headers: {
          "content-type": "aplication/json",
          Authorization: `Bearer ${authCtx.currentUser?.token}`,
        },
      })
      .then((res) => setNotifications(res.data.data))
      .finally(() => setIsLoading(false));
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
              />
            );
          }}
        />
      )}
    </Box>
  );
};

export default NotificationScreen;

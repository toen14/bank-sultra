import React, { useCallback, useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl, TouchableOpacity } from "react-native";
import {
  Icon,
  NativeBaseProvider,
  Spinner,
  Box as BoxN,
  HStack,
  Input,
  FlatList,
  Heading,
  Fab,
} from "native-base";
import axios, { AxiosError } from "axios";
import { useFocusEffect } from "@react-navigation/native";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { baseUrl } from "../../constants/base-url";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { DebitorEnum } from "../../constants/debitor-enum";
import { RoleEnum } from "../../constants/role-enum";
import { StatusNotifEnum } from "../../constants/status-notif-enum";

import CardDebitor from "./CardDebitor";
import NoteList from "./NoteList";

type TNoteFetch = {
  id: number;
  description: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  user: {
    name: string;
    role: RoleEnum;
  };
};

const DebitorDetail = ({
  navigation,
  route,
}: HomeNavigationProps<"DebitorDetail">) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isSendMessage, setIsSendMessage] = useState(false);
  const [error, setError] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNomor, setCardNomor] = useState("");
  const [cardStatus, setCardStatus] = useState<DebitorEnum | undefined>();
  const [cardPenyerahan, setCardPenyerahan] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const [message, setMessage] = useState("");

  const [notes, setNotes] = useState<TNoteFetch[]>();

  const authCtx = useContext(AuthContext);

  if (route.params.status === StatusNotifEnum.Unread) {
    axios
      .post(
        `${baseUrl}/users/${authCtx.currentUser?.user?.id}/notifications/${route.params.notifId}/status`,
        {
          status: StatusNotifEnum.Read,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authCtx?.currentUser?.token}`,
          },
        }
      )
      .catch((e: AxiosError) => console.log(e.response?.data));
  }

  const fetchData = useCallback(() => {
    setIsFetching(true);
    setError("");
    axios
      .get(`${baseUrl}/debitors/${route.params.debitorId}`, {
        headers: {
          Authorization: `Bearer ${authCtx.currentUser?.token}`,
        },
      })
      .then(({ data }) => {
        setCardName(data.name);
        setCardNomor(data.nomor);
        setCardStatus(data.status);
        setCardPenyerahan(data.tanggal_penyerahan);
        setCardDescription(data?.notes[0]?.description ?? "");

        setNotes(data?.notes as TNoteFetch[]);
      })
      .catch(() => setError("Terjadi kesalahan!"))
      .finally(() => {
        setIsFetching(false);
        setIsReady(true);
      });

    return () => {
      // Do something when the screen is unfocused
      // Useful for cleanup functions
      setCardName("");
      setCardNomor("");
      setCardStatus(undefined);
      setCardPenyerahan("");
      setCardDescription("");

      setNotes([]);
      setIsReady(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.debitorId]);

  const updateStatus = useCallback(
    (status: DebitorEnum) => {
      axios(`${baseUrl}/debitors/${route.params.debitorId}`, {
        headers: {
          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "PATCH",
        data: {
          status,
        },
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((e: AxiosError) => console.log(e.response?.data));
    },
    [authCtx?.currentUser?.token, route.params.debitorId]
  );

  const sendMessage = useCallback(() => {
    setIsSendMessage(true);
    axios(`${baseUrl}/notes/users/${authCtx.currentUser?.user.id}`, {
      headers: {
        Authorization: `Bearer ${authCtx.currentUser?.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      data: {
        /* eslint-disable camelcase */
        user_id: authCtx.currentUser?.user.id,
        debitor_id: route.params.debitorId,
        /* eslint-enable camelcase */
        description: message,
      },
    })
      .then(({ data }) => {
        data.user = authCtx.currentUser?.user;
        setNotes((currentNotes) => [data, ...currentNotes!]);
        setCardDescription(data.description);
        setMessage("");
      })
      .catch(() => setError("Terjadi kesalahan!"))
      .finally(() => setTimeout(() => setIsSendMessage(false), 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useFocusEffect(fetchData);

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

        {isFetching && !error && (
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
        )}

        {!!error && (
          <HStack
            height="full"
            space={2}
            justifyContent="center"
            alignItems="center"
          >
            <Heading color="darkBlue.600" fontSize="sm">
              {error}
            </Heading>
          </HStack>
        )}

        {isReady && (
          <>
            <CardDebitor
              date={new Date(cardPenyerahan.replace(/ /g, "T"))}
              desc={cardDescription}
              id={cardNomor}
              name={cardName}
              status={cardStatus!}
            />

            <BoxN px="0.5">
              <Input
                mx="1"
                w="full"
                onChangeText={setMessage}
                _focus={{
                  bg: "white",
                  borderColor: "gray.300",
                }}
                bg="white"
                shadow="2"
                maxHeight="24"
                multiline
                placeholder="Kirim note..."
                InputLeftElement={
                  <BoxN mr="-8px" ml="1">
                    {isSendMessage ? (
                      <Spinner
                        color="darkBlue.600"
                        size="sm"
                        accessibilityLabel="Loading posts"
                      />
                    ) : (
                      <Icon size={6} as={<MaterialIcons name="comment" />} />
                    )}
                  </BoxN>
                }
                InputRightElement={
                  <TouchableOpacity
                    disabled={message ? false : true}
                    onPress={sendMessage}
                  >
                    <BoxN
                      mr="2"
                      background="blueGray.100"
                      borderRadius="full"
                      alignItems="center"
                      height="10"
                      width="10"
                      justifyContent="center"
                      style={{ transform: [{ rotate: "-40deg" }] }}
                    >
                      <Icon size="lg" as={<MaterialIcons name="send" />} />
                    </BoxN>
                  </TouchableOpacity>
                }
                width="3/4"
                alignSelf="center"
                mt="2"
              />
            </BoxN>

            <FlatList
              px="1"
              data={notes}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    setNotes([]);
                    fetchData();
                  }}
                />
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <NoteList
                  date={new Date(item.created_at)}
                  desc={item.description}
                  name={item.user.name}
                  role={item.user.role}
                />
              )}
            />

            {authCtx.currentUser?.user.role !== RoleEnum.Notaris && (
              <Fab
                renderInPortal={false}
                onPress={() => {
                  const arStatus = Object.values(DebitorEnum).filter(
                    (v) => v !== cardStatus
                  );

                  const status =
                    Math.random() > 0.5 ? arStatus[0] : arStatus[1];

                  updateStatus(status);
                  setCardStatus(status);
                }}
                colorScheme={
                  // eslint-disable-next-line no-nested-ternary
                  cardStatus === DebitorEnum.Done
                    ? "green"
                    : cardStatus === DebitorEnum.Progress
                    ? "yellow"
                    : "danger"
                }
                shadow={2}
                size="sm"
                icon={
                  <Icon
                    color="white"
                    as={MaterialIcons}
                    name="swipe"
                    size="sm"
                  />
                }
              />
            )}
          </>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default DebitorDetail;

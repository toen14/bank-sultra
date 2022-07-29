import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  HStack,
  Spinner,
  Heading,
  ScrollView,
  Box as BoxN,
  VStack,
  Text,
  Icon,
} from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { baseUrl } from "../../constants/base-url";
import { DebitorEnum } from "../../constants/debitor-enum";

type TDebitor = {
  status: DebitorEnum;
};

const Dashboard = ({ navigation }: HomeNavigationProps<"Dashboard">) => {
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [totalDocument, setTotalDocument] = useState<number>(0);
  const [done, setDone] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [pending, setPending] = useState<number>(0);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/debitors`, {
        headers: {
          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
        },
      })
      .then((res) => {
        const clasificDebitors = [0, 0, 0];
        const debitors = res.data as TDebitor[];

        debitors.forEach((debitor) => {
          if (debitor.status === DebitorEnum.Done) {
            clasificDebitors[0]++;
          } else if (debitor.status === DebitorEnum.Progress) {
            clasificDebitors[1]++;
          } else {
            clasificDebitors[2]++;
          }
        });

        setTotalDocument(debitors.length);
        setDone(clasificDebitors[0]);
        setProgress(clasificDebitors[1]);
        setPending(clasificDebitors[2]);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {isLoading && (
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
      {!isLoading && (
        <Box flex={1}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setDone(0);
                  setPending(0);
                  setProgress(0);

                  setTimeout(() => fetchData(), 500);
                }}
              />
            }
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Debitor", {
                  status: " ",
                });
              }}
            >
              <BoxN
                h="32"
                w="5/6"
                alignSelf="center"
                bg="coolGray.500"
                rounded="sm"
                mb="2.5"
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  px="4"
                >
                  <Icon
                    as={FontAwesome5}
                    name="book"
                    size={"6xl"}
                    color="white"
                  />
                  <VStack alignItems="flex-end">
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="3xl">
                      {totalDocument}
                    </Text>
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="lg">
                      Total Document
                    </Text>
                  </VStack>
                </HStack>
              </BoxN>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Debitor", {
                  status: DebitorEnum.Done,
                })
              }
            >
              <BoxN
                h="32"
                w="5/6"
                alignSelf="center"
                bg="cyan.400"
                rounded="sm"
                mb="2.5"
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  px="4"
                >
                  <Icon
                    as={FontAwesome5}
                    name="check-square"
                    size={"6xl"}
                    color="white"
                  />
                  <VStack alignItems="flex-end">
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="3xl">
                      {done}
                    </Text>
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="lg">
                      Done
                    </Text>
                  </VStack>
                </HStack>
              </BoxN>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Debitor", {
                  status: DebitorEnum.Progress,
                })
              }
            >
              <BoxN
                h="32"
                w="5/6"
                alignSelf="center"
                bg="yellow.400"
                rounded="sm"
                mb="2.5"
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  px="4"
                >
                  <Icon
                    as={FontAwesome5}
                    name="hourglass-half"
                    size={"6xl"}
                    color="white"
                  />
                  <VStack alignItems="flex-end">
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="3xl">
                      {progress}
                    </Text>
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="lg">
                      On Progress
                    </Text>
                  </VStack>
                </HStack>
              </BoxN>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Debitor", {
                  status: DebitorEnum.Pending,
                })
              }
            >
              <BoxN
                h="32"
                w="5/6"
                alignSelf="center"
                bg="danger.500"
                rounded="sm"
                mb="2.5"
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  px="4"
                >
                  <Icon
                    as={FontAwesome5}
                    name="info-circle"
                    size={"6xl"}
                    color="white"
                  />
                  <VStack alignItems="flex-end">
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="3xl">
                      {pending}
                    </Text>
                    <Text color="white" fontFamily="Rubik-Bold" fontSize="lg">
                      Pending
                    </Text>
                  </VStack>
                </HStack>
              </BoxN>
            </TouchableOpacity>
          </ScrollView>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

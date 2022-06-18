import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { HStack, Spinner, Heading, ScrollView } from "native-base";
import { RefreshControl } from "react-native";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { baseUrl } from "../../constants/base-url";
import { DebitorEnum } from "../../constants/debitor-enum";
import { RoleEnum } from "../../constants/role-enum";

import List from "./List";

type TDebitor = {
  status: DebitorEnum;
};

const Dashboard = ({ navigation }: HomeNavigationProps<"Dashboard">) => {
  const authCtx = useContext(AuthContext);

  if (
    authCtx.currentUser?.user.role === RoleEnum.Apraisal ||
    authCtx.currentUser?.user.role === RoleEnum.Notaris
  ) {
    navigation.navigate("Debitor");
  }

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
          } else if (debitor.status === DebitorEnum.Pending) {
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
            <List
              title="Total Dokumen"
              value={totalDocument}
              boxColor="info"
              icon="book"
              iconColor="#808080"
            />

            <List
              title="Done"
              value={done}
              boxColor="primary"
              icon="check-square"
              iconColor="#2CB9B0"
            />

            <List
              title="Progress"
              value={progress}
              boxColor="drawer2"
              icon="hourglass-half"
              iconColor="#FFC641"
            />

            <List
              title="Pending"
              value={pending}
              boxColor="danger"
              icon="info-circle"
              iconColor="#FE0058"
            />
          </ScrollView>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

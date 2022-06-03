import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NativeBaseProvider, HStack, Spinner, Heading } from "native-base";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { baseUrl } from "../../constants/base-url";
import { DebitorEnum } from "../../constants/debitor-enum";

import List from "./List";

type TDebitor = {
  status: DebitorEnum;
};

const Dashboard = ({ navigation }: HomeNavigationProps<"Dashboard">) => {
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [totalDocument, setTotalDocument] = useState<number>();
  const [done, setDone] = useState<number>();
  const [progress, setProgress] = useState<number>();
  const [pending, setPending] = useState<number>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/debitors`, {
        headers: {
          Authorization: `Bearer ${authCtx.currentUser.token}`,
        },
      })
      .then((res) => {
        const clasificDebitors = [0, 0, 0];
        const debitors = res.data.data as TDebitor[];

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
        <NativeBaseProvider>
          <HStack
            height="full"
            space={2}
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              color="darkBlue.600"
              size="lg"
              accessibilityLabel="Loading posts"
            />
            <Heading color="darkBlue.600" fontSize="md">
              Sedang memuat . . .
            </Heading>
          </HStack>
        </NativeBaseProvider>
      )}
      {!isLoading && (
        <Box flex={1}>
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
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

import CardPrimary from "../components/card-primary";
import Bottom from "../components/bottom";
import { baseUrl } from "../constants/base-url";
import { debtorType } from "../constants/type";
import { DebtorsContext } from "../store/debtor-contex";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function Dashboard(props) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const debtorsCtx = useContext(DebtorsContext);

  async function getDebtors() {
    setIsFetching(true);
    try {
      const res = await fetch(`${baseUrl}/api/debitors`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const debtors = await res.json();
      debtorsCtx.setDebtors(debtors.data);
    } catch (error) {
      setError("Could not fetch debtors!");
    }
    setIsFetching(false);
  }

  useEffect(() => {
    getDebtors();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentDebtors = debtorsCtx.debtors;

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1 }}>
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={getDebtors} />
            }
          >
            <View style={styles.cardWrapper}>
              <CardPrimary
                value={recentDebtors.length}
                icon="book"
                title="Total Document"
                style={{ ...styles.card, ...styles.cardFirst }}
              />
            </View>
            <View style={styles.cardWrapper}>
              <CardPrimary
                value={
                  recentDebtors.filter(
                    (debtor) => debtor.status === debtorType.Done
                  ).length
                }
                icon="check-square"
                title="Done"
                iconColor={styles.cardSecond.backgroundColor}
                style={{ ...styles.card, ...styles.cardSecond }}
              />
            </View>
            <View style={styles.cardWrapper}>
              <CardPrimary
                value={
                  recentDebtors.filter(
                    (debtor) => debtor.status === debtorType.Progress
                  ).length
                }
                iconColor={styles.cardThird.backgroundColor}
                icon="hourglass-half"
                title="Progress"
                style={{ ...styles.card, ...styles.cardThird }}
              />
            </View>
            <View style={styles.cardWrapper}>
              <CardPrimary
                value={
                  recentDebtors.filter(
                    (debtor) => debtor.status === debtorType.Pending
                  ).length
                }
                iconColor={styles.cardFourth.backgroundColor}
                icon="info-circle"
                title="Pending"
                style={{ ...styles.card, ...styles.cardFourth }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <Bottom navigation={props.navigation} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "90%",
    alignSelf: "center",
  },
  card: {
    marginVertical: 5,
    opacity: 0.75,
  },
  cardFirst: {
    backgroundColor: "#061A11",
  },
  cardSecond: {
    backgroundColor: "#28A745",
  },
  cardThird: {
    backgroundColor: "#FFC107",
  },
  cardFourth: {
    backgroundColor: "#FF0000",
  },
});

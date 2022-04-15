import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";

import Search from "../components/search";
import Filter from "../components/filter-date";
import CardDocument from "../components/card-document";
import Bottom from "../components/bottom";
import { baseUrl } from "../constants/base-url";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const colors = Object.freeze({
  done: "#28A745",
  pending: "#FF0000",
  progress: "#FFC107",
});

export default function Document(props) {
  const [debtors, setDebtors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getDebtors = () => {
    setIsLoading(true);
    fetch(`${baseUrl}/debtor/?page=${currentPage}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        setDebtors([...debtors, ...res]);
      })
      .catch(() => setError("Could not fetch debtors!"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ alignSelf: "center" }}>
        <View style={styles.cardDocumentContainer}>
          <CardDocument
            no={index + 1}
            name={item.name}
            address={item.alamat}
            color={{ backgroundColor: colors[item.status] }}
            status={item.status}
          />
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? <LoadingOverlay /> : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getDebtors();
  }, [currentPage]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading && !debtors.length) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1, marginBottom: 5 }}>
        <View style={styles.header}>
          <View style={styles.search}>
            <Search />
          </View>
          <View style={styles.filter}>
            <Filter />
          </View>
        </View>
        <FlatList
          data={debtors}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                setDebtors([]);
                setCurrentPage(1);
              }}
            />
          }
        />
      </View>

      <View
        style={{
          width: "100%",
        }}
      >
        <Bottom navigation={props.navigation} />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  search: {
    width: "65%",
    marginRight: Dimensions.get("window").width * 0.01,
  },
  filter: {
    width: "35%",
  },
  cardDocumentContainer: {
    marginTop: "2%",
    width: "91%",
    alignItems: "center",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
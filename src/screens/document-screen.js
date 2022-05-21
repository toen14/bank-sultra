import React, { useEffect, useState, useCallback, memo, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import Search from "../components/search";
import Filter from "../components/filter-date";
import CardDocument from "../components/card-document";
import Bottom from "../components/bottom";
import { baseUrl } from "../constants/base-url";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-contex";

const colors = Object.freeze({
  done: "#28A745",
  pending: "#FF0000",
  progress: "#FFC107",
});

const MemorizeCardDocument = memo(
  (props) => {
    return (
      <View style={{ alignSelf: "center" }}>
        <View style={styles.cardDocumentContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Detail Debitur")}
          >
            <CardDocument
              no={props.index + 1}
              name={props.item.name}
              address={props.item.alamat}
              color={{ backgroundColor: colors[props.item.status] }}
              status={props.item.status}
              id={props.item.id}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => true
);

export default function Document(props) {
  const [debtors, setDebtors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAvailableDebtors, setIsAvailableDebtors] = useState(true);

  const authCtx = useContext(AuthContext)

  const getDebtors = useCallback((currentPageParameter) => {
    setIsLoading(true);
    fetch(`${baseUrl}/api/debitors?page=${currentPageParameter}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${authCtx.token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.data.length) {
          setIsAvailableDebtors(false);
          return;
        }
        setDebtors((currentDebtors) => [...currentDebtors, ...res.data]);
      })
      .catch(() => setError("Could not fetch debtors!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <MemorizeCardDocument
        navigation={props.navigation}
        item={item}
        index={index}
      />
    );
  }, []);

  const renderLoader = () => {
    return isLoading ? <LoadingOverlay /> : null;
  };

  const loadMoreItem = () => {
    if (isAvailableDebtors) {
      setCurrentPage(currentPage + 1);
      getDebtors(currentPage + 1);
    }
  };

  useEffect(() => {
    getDebtors(1);
  }, []);

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
                setIsAvailableDebtors(true);
                setDebtors([]);
                setCurrentPage(1);
                getDebtors(1);
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

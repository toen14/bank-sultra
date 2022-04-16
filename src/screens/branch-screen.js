import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";

import Search from "../components/search";
import CardBranch from "../components/card-branch";
import Bottom from "../components/bottom";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { baseUrl } from "../constants/base-url";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function Branch(props) {
  const [branchs, setBranchs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAvailableBranchs, setIsAvailableBranchs] = useState(true);

  const getBranchs = useCallback((currentPageParameter) => {
    setIsLoading(true);
    fetch(`${baseUrl}/branchs/?page=${currentPageParameter}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.length) {
          setIsAvailableBranchs(false);
          return;
        }
        setBranchs((currentBranchs) => [...currentBranchs, ...res]);
      })
      .catch(() => setError("Could not fetch branchs!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.cardBranchContainer}>
        <CardBranch no={index + 1} branch={item.branch} />
      </View>
    );
  }, []);

  const renderLoader = () => {
    return isLoading ? <LoadingOverlay /> : null;
  };

  const loadMoreItem = () => {
    if (isAvailableBranchs) {
      setCurrentPage(currentPage + 1);
      getBranchs(currentPage + 1);
    }
  };

  useEffect(() => {
    getBranchs(1);
  }, []);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading && !branchs.length) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.search}>
            <Search />
          </View>
        </View>
        <FlatList
          style={{ width: "100%" }}
          data={branchs}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.id + Date.now().toString()}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                setIsAvailableBranchs(true);
                setBranchs([]);
                setCurrentPage(1);
                getBranchs(1);
              }}
            />
          }
        />
      </View>

      <View
        style={{
          width: "100%",
          marginTop: 5,
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
    width: "100%",
    marginRight: Dimensions.get("window").width * 0.01,
  },
  cardBranchContainer: {
    marginTop: "2%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";

import Search from "../components/search";
import CardUser from "../components/card-user";
import Bottom from "../components/bottom";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { baseUrl } from "../constants/base-url";

export default function User(props) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = () => {
    setIsLoading(true);
    fetch(`${baseUrl}/users/?page=${currentPage}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        setUsers([...users, ...res]);
      })
      .catch(() => setError("Could not fetch users!"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardBranchContainer}>
        <CardUser no={index + 1} name={item.name} role={item.role} />
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
    getUsers();
  }, [currentPage]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading && !users.length) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <View style={styles.search}>
            <Search />
          </View>
        </View>
        <FlatList
          style={{ width: "100%" }}
          data={users}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={5}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                setUsers([]);
                setCurrentPage(1);
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

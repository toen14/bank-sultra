import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import CardNotification from "../components/card-notification";
import { baseUrl } from "../constants/base-url";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { timeSince } from "../constants/time-since";
import { iconName } from "../constants/icon-name";

export default function Notification(props) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

  const fetchNotif = useCallback(() => {
    setIsFetching(true);
    fetch(`${baseUrl}/api/notifications`)
      .then((res) => res.json())
      .then(({ data }) => setNotifications(data))
      .catch((e) => setError("Could not fetch notifications!"))
      .finally(() => setIsFetching(false));
  }, []);

  useFocusEffect(fetchNotif);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <FlatList
      style={{ marginTop: 2.5 }}
      data={notifications}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 2 }}>
          <TouchableOpacity>
            <CardNotification
              name={item.note.user.name}
              description={item.note.description}
              createAt={timeSince(new Date(item.created_at))}
              iconName={iconName(item.note.user.name)}
            />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

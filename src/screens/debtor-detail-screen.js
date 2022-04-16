import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import CardName from "../components/card-name";
import CardReceiveMessage from "../components/card-receive-message";
import CardSendMessage from "../components/card-send-message";
import Bottom from "../components/bottom";

const user = {
  name: "M. Arthan",
  tanggal: "03/26/22",
  status: "pending",
};

export default function DebtorDetail(props) {
  const [conversations, setConversations] = useState([
    {
      name: "La Ege",
      role: "Apraisal",
      date: "04/16/22",
    },
    {
      name: "Adi",
      role: "Notaris",
      date: "04/12/22",
    },
  ]);
  const [isShowButton, setIsShowButton] = useState(true);

  const renderItem = useCallback(({ item, index }) => {
    const userName = item.name.split(" ");
    const iconName =
      userName[0][0] + (userName.length >= 2 ? userName[1][0] : "");

    return (
      <View style={styles.cardWrapper}>
        <CardReceiveMessage
          name={item.name}
          role={item.role}
          iconName={iconName}
          date={item.date}
        />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cardWrapper}>
          <CardName
            name={user.name}
            tanggal={user.tanggal}
            status={user.status}
          />
        </View>
        <View style={styles.cardWrapper}>
          <CardSendMessage
            onPressIn={() => setIsShowButton(false)}
            onEndEditing={() => setIsShowButton(true)}
          />
        </View>
        <FlatList
          data={conversations}
          extraData={conversations}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.id + Date.now().toString()}
        />
      </View>
      {isShowButton && (
        <View>
          <Bottom navigation={props.navigation} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
});

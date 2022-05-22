import React, { memo, useCallback, useContext, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import CardName from "../components/card-name";
import CardReceiveMessage from "../components/card-receive-message";
import CardSendMessage from "../components/card-send-message";
import Bottom from "../components/bottom";
import { useFocusEffect } from "@react-navigation/core";
import { baseUrl } from "../constants/base-url";
import { AuthContext } from "../store/auth-contex";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { iconName } from "../constants/icon-name";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const MemorizeCardReceiveMessage = memo(
  (props) => {
    return (
      <View style={styles.cardWrapper}>
        <CardReceiveMessage
          name={props.item.user.name}
          role={props.item.user.role}
          iconName={props.iconName}
          date={props.item.created_at.slice(0, 10)}
          description={props.item.description}
        />
      </View>
    );
  },
  (prevProps, nextProps) => prevProps?.item?.id === nextProps?.item?.id
);

export default function DebtorDetail(props) {
  const [isShowButton, setIsShowButton] = useState(true);

  const [isFetching, setIsFetching] = useState(true);
  const [isSendMessage, setIsSendMessage] = useState(false);
  const [error, setError] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNomor, setCardNomor] = useState("");
  const [cardStatus, setCardStatus] = useState("");
  const [cardPenyerahan, setCardPenyerahan] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const [user, setUser] = useState();

  const [message, setMessage] = useState("");

  const [notes, setNotes] = useState([]);

  const authCtx = useContext(AuthContext);

  const fetchNotif = useCallback(() => {
    fetch(`${baseUrl}/api/login/me`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => setUser(resJson.me))
      .catch((e) => setError("Could not fetch notes!"));

    setIsFetching(true);
    fetch(`${baseUrl}/api/debitors/${props.route.params.debtorId}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setCardName(resJson.name);
        setCardNomor(resJson.nomor);
        setCardStatus(resJson.status);
        setCardPenyerahan(resJson.tanggal_penyerahan);
        setCardDescription(resJson?.notes[0]?.description ?? "");

        setNotes(resJson?.notes);
      })
      .catch((e) => setError("Could not fetch notes!"))
      .finally(() => setIsFetching(false));
  }, []);

  const sendMessage = useCallback(() => {
    setIsSendMessage(true);
    fetch(`${baseUrl}/api/notes/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "post",
      body: JSON.stringify({
        user_id: user.id,
        debitor_id: props.route.params.debtorId,
        description: message,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        resJson.user = user
        setNotes(currentNotes => [resJson, ...currentNotes]);
        setCardDescription(resJson.description);
        setMessage('');
      })
      .catch((e) => console.log("err", e))
      .finally(() => setTimeout(() => setIsSendMessage(false), 500));
  }, [message]);

  useFocusEffect(fetchNotif);

  const renderItem = useCallback(({ item }) => {
    return (
      <MemorizeCardReceiveMessage
        item={item}
        iconName={iconName(item.user.name)}
      />
    );
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cardWrapper}>
          <CardName
            name={cardName}
            tanggal={cardPenyerahan.slice(0, 10)}
            status={cardStatus}
            id={cardNomor}
            description={cardDescription}
          />
        </View>
        {isSendMessage && (
          <View style={{ width: "100%", marginBottom: 1 }}>
            <ActivityIndicator size={"small"} color={"blue"} />
          </View>
        )}
        <View style={styles.cardWrapper}>
          <CardSendMessage
            onPressIn={() => setIsShowButton(false)}
            onEndEditing={() => setIsShowButton(true)}
            message={message}
            setMessage={setMessage}
            onPress={sendMessage}
          />
        </View>
        <FlatList
          data={notes}
          extraData={notes}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.id}
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

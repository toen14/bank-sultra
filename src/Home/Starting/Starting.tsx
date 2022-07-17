import axios, { AxiosError } from "axios";
import React, { useCallback, useContext, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../Authentication/store/AuthContex";
import { baseUrl } from "../../constants/base-url";
import { RoleEnum } from "../../constants/role-enum";

const Starting = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function registerPushToken() {
      const pushToken: string = await registerForPushNotificationsAsync();

      axios(`${baseUrl}/push`, {
        data: {
          // eslint-disable-next-line camelcase
          push_token: pushToken,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
        },
        method: "POST",
      })
        .then((res) => console.log(res.data))
        .catch((e: AxiosError) => {
          alert(
            "Gagal registrasi notifikasi" + JSON.stringify(e.response?.data)
          );
          console.log("token error", e.response?.data);
        });
    }

    registerPushToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (
        authCtx.currentUser?.user.role === RoleEnum.Apraisal ||
        authCtx.currentUser?.user.role === RoleEnum.Notaris
      ) {
        return navigation.navigate("Debitor");
      }

      navigation.navigate("Dashboard");

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authCtx.currentUser?.user.role])
  );

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  return <></>;
};

export default Starting;

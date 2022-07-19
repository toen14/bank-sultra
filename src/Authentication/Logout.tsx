import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "./store/AuthContex";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authCtx.logout();

  navigation.navigate("Authentication");

  return <></>;
};

export default Logout;

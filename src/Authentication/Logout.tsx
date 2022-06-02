import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { AuthContext } from "./store/AuthContex";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  authCtx.logout();

  navigation.navigate("Authentication");

  return <></>;
};

export default Logout;

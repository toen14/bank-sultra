import React from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { iconName } from "../../constants/icon-name";
import { timeSince } from "../../constants/time-since";

interface NotificationProps {
  description: string;
  name: string;
  role: string;
  createdAt: string;
  debitorId: string;
}

const Notification = ({
  description,
  name,
  role,
  createdAt,
  debitorId,
}: NotificationProps) => {
  const nav = useNavigation();

  return (
    <TouchableOpacity>
      <ListItem
        bottomDivider
        onPress={() =>
          nav.navigate("DebitorDetail", {
            debitorId: debitorId,
          })
        }
      >
        <Avatar
          rounded={true}
          size={"small"}
          containerStyle={{ backgroundColor: "#9BA3EB" }}
          title={iconName(name)}
        />
        <ListItem.Content>
          <ListItem.Title>{role}</ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 12 }}>
            {description}
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={{ width: "20%" }}>
          <ListItem.Input
            value={timeSince(new Date(createdAt))}
            style={{ fontSize: 12 }}
            disabled
            disabledInputStyle={{ color: "black" }}
          />
        </View>
      </ListItem>
    </TouchableOpacity>
  );
};

export default Notification;

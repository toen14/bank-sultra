import React from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { iconName } from "../../constants/icon-name";
import { timeSince } from "../../constants/time-since";

interface NotificationProps {
  description: string;
  name: string;
  role: string;
  createdAt: string;
}

const Notification = ({
  description,
  name,
  role,
  createdAt,
}: NotificationProps) => {
  return (
    <TouchableOpacity>
      <ListItem bottomDivider onPress={() => Alert.alert("yey")}>
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
        <ListItem.Input
          value={timeSince(new Date(createdAt))}
          style={{ fontSize: 12 }}
          disabled
          disabledInputStyle={{ color: "black" }}
        />
      </ListItem>
    </TouchableOpacity>
  );
};

export default Notification;

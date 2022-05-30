import React from "react";
import { Text } from "react-native";
import { ListItem, Avatar, IconType } from "@rneui/base";

import { Box } from "../../components";
import { Theme } from "../../components/Theme";

interface ListProps {
  title: string;
  value: number;
  icon: string;
  iconColor: string;
  boxColor: keyof Theme["colors"];
  iconType?: IconType;
}

const List = ({
  boxColor,
  icon,
  iconColor,
  iconType,
  title,
  value,
}: ListProps) => {
  return (
    // <Box flex={1}>
    <ListItem bottomDivider topDivider>
      <Box height={70} width={10} backgroundColor={boxColor} />
      <Avatar
        icon={{
          name: icon,
          type: iconType ?? "font-awesome",
          color: iconColor,
        }}
        size={"large"}
        containerStyle={{ marginHorizontal: -25 }}
      />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <Box
        alignItems="center"
        justifyContent="center"
        height={70}
        width={100}
        backgroundColor={boxColor}
      >
        <Text style={{ color: "white" }}>{value}</Text>
      </Box>
    </ListItem>
    // </Box>
  );
};

export default List;

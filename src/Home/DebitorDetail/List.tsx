import React from "react";
import { Text } from "react-native";
import { ListItem } from "@rneui/base";

import { Box } from "../../components";
import { Theme } from "../../components/Theme";

export interface ListProps {
  name: string;
  branch: string;
  no: number;
  boxColor: keyof Theme["colors"];
  status: string;
}

const List = ({ boxColor, name, no, status, branch }: ListProps) => {
  return (
    <ListItem
      bottomDivider
      topDivider
      containerStyle={{ paddingVertical: 7.5 }}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        height={50}
        width={50}
        backgroundColor={boxColor}
        borderRadius="m"
      >
        <Text style={{ color: "white" }}>{no}</Text>
      </Box>
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{branch}</ListItem.Subtitle>
      </ListItem.Content>
      <Box
        alignItems="center"
        justifyContent="center"
        height={20}
        width={80}
        backgroundColor={boxColor}
        borderRadius={"s"}
      >
        <Text style={{ color: "white" }}>{status}</Text>
      </Box>
    </ListItem>
  );
};

export default List;

import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/base";

import { Box } from "../../components";

export interface ListProps {
  name: string;
  no: number;
}

const List = ({ name, no }: ListProps) => {
  return (
    <ListItem bottomDivider topDivider>
      <Box
        alignItems="center"
        justifyContent="center"
        height={70}
        width={70}
        backgroundColor={no % 2 ? "text" : "drawer4"}
        borderRadius={"m"}
      >
        <Text style={{ color: "white", alignSelf: "center" }}>{no}</Text>
      </Box>
      <ListItem.Content>
        <ScrollView horizontal>
          <ListItem.Title style={{ alignSelf: "center" }}>
            {"Cabang " + name}
          </ListItem.Title>
        </ScrollView>
      </ListItem.Content>
      <Box alignSelf={"flex-start"}>
        <TouchableOpacity>
          <Text style={{ color: "black" }}>o o o</Text>
        </TouchableOpacity>
      </Box>
    </ListItem>
  );
};

export default List;

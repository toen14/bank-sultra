import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/base";

import { Box } from "../../components";

export interface ListProps {
  no: number;
  name: string;
  role: string;
}

const List = ({ name, no, role }: ListProps) => {
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
          <Box alignSelf={"center"}>
            <ListItem.Title>{name}</ListItem.Title>
            <ListItem.Subtitle>{role}</ListItem.Subtitle>
          </Box>
        </ScrollView>
      </ListItem.Content>
      <Box alignSelf={"flex-start"}>
        <TouchableOpacity>
          {/* <Text style={{ color: "black" }}>o o o</Text> */}
        </TouchableOpacity>
      </Box>
    </ListItem>
  );
};

export default List;

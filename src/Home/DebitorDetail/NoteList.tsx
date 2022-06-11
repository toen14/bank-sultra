import React from "react";
import { HStack, VStack, Box, Text, ScrollView } from "native-base";

import { RoleEnum } from "../../constants/role-enum";
import { iconName } from "../../constants/icon-name";

export type TNoteListProps = {
  name: string;
  role: RoleEnum;
  date: Date;
  desc: string;
};

const NoteList = ({ date, desc, name, role }: TNoteListProps) => {
  return (
    <Box
      bg="white"
      h="32"
      w="3/4"
      alignSelf="center"
      shadow="4"
      borderRadius="md"
      marginY="2"
    >
      <HStack flex={1} style={{ justifyContent: "space-between" }}>
        <Box
          marginX="2"
          mt="2"
          background="yellow.400"
          borderRadius="full"
          alignItems="center"
          h="10"
          w="10"
          justifyContent="center"
        >
          <Text fontWeight="extrabold" color="white">
            {iconName(name)}
          </Text>
        </Box>
        <VStack flex={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text color="black">{name}</Text>
              <Text italic color="black">
                {role}
              </Text>
            </VStack>
            <Text mr="2" color="black">
              {date.toLocaleDateString()}
            </Text>
          </HStack>
          <Box bg="black" marginY="1" w="56" h="0.5" alignSelf="center" />
          <HStack>
            <Text color="black">Deskripsi : </Text>
            <ScrollView h="12" nestedScrollEnabled>
              <Text color="black">{desc}</Text>
            </ScrollView>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default NoteList;

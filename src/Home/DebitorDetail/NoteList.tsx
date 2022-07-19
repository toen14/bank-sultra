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
      w="full"
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
              <Text fontFamily="Rubik" fontWeight="bold" color="black">
                {name}
              </Text>
              <Text fontFamily="Rubik" fontWeight="bold" italic color="black">
                {role}
              </Text>
            </VStack>
            <Text fontFamily="Rubik" mr="2" color="black">
              {date.toLocaleDateString()}
            </Text>
          </HStack>
          <Box marginY="1" />
          <HStack>
            <Text fontFamily="Rubik" fontWeight="bold" color="black">
              Deskripsi :{" "}
            </Text>
            <ScrollView h="12" nestedScrollEnabled>
              <Text fontFamily="Rubik" color="black">
                {desc}
              </Text>
            </ScrollView>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default NoteList;

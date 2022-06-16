import React from "react";
import { Box, HStack, ScrollView, VStack, Text } from "native-base";

import { DebitorEnum } from "../../constants/debitor-enum";

export type TCardDebitorProps = {
  id: string | number;
  name: string;
  status: DebitorEnum;
  date: Date;
  desc: string;
};

const CardDebitor = ({ date, desc, id, name, status }: TCardDebitorProps) => {
  return (
    <Box alignItems="center" px="0.5">
      <Box
        bgColor={"yellow.500"}
        height={"3xs"}
        width={"full"}
        shadow="5"
        borderWidth="1"
        borderColor="gray.300"
        borderRadius="md"
      >
        <HStack justifyContent="space-between" alignItems="center" pl="2">
          <ScrollView w="2/3" horizontal nestedScrollEnabled>
            <Text color="white" fontSize="4xl">
              {name}
            </Text>
          </ScrollView>
          <ScrollView w="1/3" nestedScrollEnabled horizontal>
            <Text marginX="1" color="white" fontSize="sm">
              ID : {id}
            </Text>
          </ScrollView>
        </HStack>
        <VStack width="full" pl="3">
          <HStack>
            <Text color="white" fontSize="sm">
              Tanggal
            </Text>
            <Text color="white" ml="3.5" mr="2" fontSize="sm">
              :
            </Text>
            <Text color="white" fontSize="sm">
              {date.toLocaleDateString()}
            </Text>
          </HStack>
          <HStack>
            <Text color="white" fontSize="sm">
              Status
            </Text>
            <Text color="white" ml="6" mr="2" fontSize="sm">
              :
            </Text>
            <Text color="white" fontSize="sm">
              {status}
            </Text>
          </HStack>
          <HStack>
            <Text color="white" fontSize="sm">
              Deskripsi
            </Text>
            <Text color="white" ml="1.5" mr="2" fontSize="sm">
              :
            </Text>
            <ScrollView mr="2" h="32">
              <Text color="white">{desc}</Text>
            </ScrollView>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CardDebitor;

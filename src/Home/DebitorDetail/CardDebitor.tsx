import React from "react";
import { Box, HStack, ScrollView, VStack, Text } from "native-base";

import { DebitorEnum } from "../../constants/debitor-enum";
import { dateToFormatIndonesia } from "../../constants/date-format";

export type TCardDebitorProps = {
  id: string | number;
  name: string;
  status: DebitorEnum;
  date: Date;
  desc: string;
  datePenyerahan: Date;
  dateBerakhir: Date;
};

const CardDebitor = ({
  date,
  desc,
  id,
  name,
  status,
  datePenyerahan,
  dateBerakhir,
}: TCardDebitorProps) => {
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
            <Text fontFamily="Rubik" color="white" fontSize="4xl">
              {name}
            </Text>
          </ScrollView>
          <ScrollView w="1/3" nestedScrollEnabled horizontal>
            <VStack>
              <Text fontFamily="Rubik" marginX="1" color="white" fontSize="sm">
                <Text fontFamily="Rubik-Bold">ID</Text> {"        "} :{" "}
                <Text fontSize="xs">{id}</Text>
              </Text>
              <Text fontFamily="Rubik" marginX="1" color="white" fontSize="sm">
                <Text fontFamily="Rubik-Bold">Dibuat</Text> :{" "}
                <Text fontSize="xs">{dateToFormatIndonesia(date)}</Text>
              </Text>
            </VStack>
          </ScrollView>
        </HStack>
        <VStack width="full" pl="3">
          <HStack alignItems="center">
            <Text fontFamily="Rubik-Bold" color="white" fontSize="sm">
              Tanggal Order{"         "}
            </Text>
            <Text fontFamily="Rubik" color="white" mt="0" fontSize="xs">
              : {dateToFormatIndonesia(datePenyerahan)}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text fontFamily="Rubik-Bold" color="white" fontSize="sm">
              Akhir Cover Note{"  "}
            </Text>
            <Text fontFamily="Rubik" color="white" mt="0" fontSize="xs">
              : {dateToFormatIndonesia(dateBerakhir)}
            </Text>
          </HStack>
          <HStack>
            <Text fontFamily="Rubik-Bold" color="white" fontSize="sm">
              Status{"                           "}
            </Text>
            <Text fontFamily="Rubik" color="white" fontSize="xs">
              : {status}
            </Text>
          </HStack>
          <HStack>
            <Text fontFamily="Rubik-Bold" color="white" fontSize="sm">
              Deskripsi {"                   "}
            </Text>
            <ScrollView mr="2" h="32">
              <Text fontFamily="Rubik" color="white" fontSize="xs">
                {""}: {desc}
              </Text>
            </ScrollView>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CardDebitor;

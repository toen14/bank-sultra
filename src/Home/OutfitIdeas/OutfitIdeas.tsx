import React, { useState } from "react";
import { useTiming } from "react-native-redash";

import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

import Background from "./Background";
import Card from "./Card";
import Categories from "./Categories";

const cards = [
  {
    index: 3,
    source: require("../../Authentication/assets/4.png"),
  },
  {
    index: 2,
    source: require("../../Authentication/assets/3.png"),
  },
];
const step = 1 / (cards.length - 1);

const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const aIndex = useTiming(currentIndex);
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Dashboard"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "bell",
          onPress: () => navigation.navigate("Notification"),
        }}
      />
      <Categories />
      <Box flex={1}>
        <Background />
        {cards.map(
          ({ index, source }) =>
            currentIndex < index * step + step && (
              <Card
                key={index}
                index={index}
                aIndex={aIndex}
                step={step}
                onSwipe={() => setCurrentIndex((prev) => prev + step)}
                {...{ source }}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;

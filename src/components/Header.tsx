import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { Badge, VStack } from "native-base";

import { BadgeContext } from "../Authentication/store/BadgeContex";

import { Box, Text } from "./Theme";
import RoundedIconButton from "./RoundedIconButton";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({ title, left, right, dark }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = dark ? "background" : "secondary";

  const badgeCtx = useContext(BadgeContext);

  return (
    <Box
      flexDirection="row"
      style={{ marginTop: insets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
    >
      <RoundedIconButton
        size={44}
        iconRatio={0.4}
        name={left.icon}
        onPress={left.onPress}
        align={"center"}
        {...{ color }}
      />
      <Text variant="header" {...{ color }}>
        {title.toUpperCase()}
      </Text>
      {right ? (
        <VStack>
          {badgeCtx.badge > 0 && (
            <Badge
              colorScheme="info"
              rounded="full"
              mb={-6}
              mr={0}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 10,
              }}
            >
              {badgeCtx.badge}
            </Badge>
          )}

          <RoundedIconButton
            size={44}
            iconRatio={0.4}
            name={right.icon}
            onPress={right.onPress}
            align={"center"}
            {...{ color }}
          />
        </VStack>
      ) : (
        <View style={{ width: 44 }} />
      )}
    </Box>
  );
};

Header.defaultProps = {
  dark: false,
};

export default Header;

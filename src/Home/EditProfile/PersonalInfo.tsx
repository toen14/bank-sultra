import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";

import { AuthContext } from "../../Authentication/store/AuthContex";
import { Box, Text } from "../../components";
import TextInput from "../../components/Form/TextInput";

const PersonalInfo = () => {
  const authCtc = useContext(AuthContext);

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">
          Tentang Akun
        </Text>
        <Box marginBottom="m">
          <TextInput
            icon="user"
            placeholder={authCtc.currentUser?.user.name as string}
            editable={false}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="at-sign"
            placeholder={authCtc.currentUser?.user.email as string}
            editable={false}
            autoCapitalize="none"
            secureTextEntry
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="pen-tool"
            placeholder={authCtc.currentUser?.user.role as string}
            editable={false}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="map-pin"
            placeholder={authCtc.currentUser?.user.alamat as string}
            editable={false}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;

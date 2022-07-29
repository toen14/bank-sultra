import React, { useContext, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios, { AxiosError } from "axios";
import { TouchableOpacity } from "react-native";
import { Button as Btn } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

import { AuthContext } from "../../Authentication/store/AuthContex";
import { Box, Button, Text } from "../../components";
import TextInput from "../../components/Form/TextInput";
import { baseUrl } from "../../constants/base-url";

const PersonalInfo = () => {
  const authCtx = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [canChangePass, setCanChangePass] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");

  const [errPass, setErrPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      return () => setEdit(false);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { name, email, alamat } = authCtx.currentUser?.user;

      setName(name);
      setEmail(email);
      setAlamat(alamat);
    }, [authCtx.currentUser?.user])
  );

  const changePass = useMemo(
    () => (
      <ScrollView>
        <Box padding="m">
          <Box marginBottom="m" justifyContent="space-between">
            <Text variant="body">Ubah Password</Text>
            {!!errPass && (
              <Text fontSize={10} color="danger" style={{ marginBottom: -2 }}>
                {errPass}
              </Text>
            )}
          </Box>
          <Box marginBottom="m">
            <TextInput
              icon="lock"
              placeholder={"Password lama"}
              secureTextEntry
              value={oldPass}
              onChangeText={setOldPass}
            />
          </Box>
          <Box marginBottom="m">
            <TextInput
              icon="lock"
              placeholder={"Password baru"}
              secureTextEntry
              value={newPass}
              onChangeText={setNewPass}
            />
          </Box>
          <Box marginBottom="m">
            <TextInput
              icon="lock"
              placeholder={"Konfirmasi password baru"}
              secureTextEntry
              value={reNewPass}
              onChangeText={setReNewPass}
            />
          </Box>
          <Box flexDirection="row">
            <Btn
              variant="outline"
              colorScheme="blue"
              onPress={() => {
                if (newPass !== reNewPass) {
                  setErrPass("Pastikan password anda valid");
                  return;
                }

                const updateProfile = async () => {
                  axios
                    .patch(
                      `${baseUrl}/users/${authCtx.currentUser?.user.id}`,
                      {
                        oldPassword: oldPass,
                        password: newPass,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
                        },
                      }
                    )
                    .then(() => {
                      setErrPass("");
                      setOldPass("");
                      setNewPass("");
                      setReNewPass("");
                      setCanChangePass(false);
                    })
                    .catch(() => setErrPass("Password lama tidak valid"));
                };

                updateProfile();
              }}
            >
              Ubah password
            </Btn>
            <Btn
              variant="outline"
              ml="1"
              colorScheme="red"
              onPress={() => setCanChangePass(false)}
            >
              Batal
            </Btn>
          </Box>
        </Box>
      </ScrollView>
    ),
    [
      authCtx.currentUser?.token,
      authCtx.currentUser?.user.id,
      errPass,
      newPass,
      oldPass,
      reNewPass,
    ]
  );

  return !canChangePass ? (
    <ScrollView>
      <Box padding="m">
        <Box
          marginBottom="m"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text variant="body">Tentang Akun</Text>
          {!edit && (
            <Box flexDirection="row">
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Text variant="body">Edit</Text>
              </TouchableOpacity>
              <Text> | </Text>
              <TouchableOpacity onPress={() => setCanChangePass(true)}>
                <Text variant="body">Ubah password</Text>
              </TouchableOpacity>
            </Box>
          )}
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="user"
            placeholder={authCtx.currentUser?.user.name as string}
            value={name}
            onChangeText={setName}
            editable={edit}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="at-sign"
            placeholder={authCtx.currentUser?.user.email as string}
            editable={edit}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </Box>
        {/* <Box marginBottom="m">
      <TextInput
        icon="lock"
        placeholder={authCtx.currentUser?.user.alamat as string}
        value={"1"}
        // editable={edit}
        secureTextEntry
      />
    </Box> */}
        <Box marginBottom="m">
          <TextInput
            icon="pen-tool"
            value={authCtx.currentUser?.user.role as string}
            editable={false}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="map-pin"
            placeholder={authCtx.currentUser?.user.alamat as string}
            editable={edit}
            value={alamat}
            onChangeText={setAlamat}
          />
        </Box>
        <Box alignItems="center" marginTop="s">
          {edit && (
            <Button
              variant="primary"
              onPress={() => {
                const updateProfile = async () => {
                  const { data } = await axios
                    .patch(
                      `${baseUrl}/users/${authCtx.currentUser?.user.id}`,
                      {
                        name,
                        email,
                        alamat,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${authCtx?.currentUser?.token}`,
                        },
                      }
                    )
                    .catch((err: AxiosError) => err);

                  if (data instanceof AxiosError) {
                    return;
                  }

                  const cUser = {
                    user: data as Record<string, unknown>,
                    token: authCtx.currentUser?.token as string,
                  };

                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  authCtx?.authenticate(cUser);

                  setEdit(false);
                };

                updateProfile();
              }}
              label="Perbaharui profile"
            />
          )}
        </Box>
      </Box>
    </ScrollView>
  ) : (
    changePass
  );
};

export default PersonalInfo;

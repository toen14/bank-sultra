import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  Button,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useFocusEffect } from "@react-navigation/native";
import * as Yup from "yup";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header } from "../../components";
import { DebitorEnum } from "../../constants/debitor-enum";
import { baseUrl } from "../../constants/base-url";
import { AuthContext } from "../../Authentication/store/AuthContex";
import { RoleEnum } from "../../constants/role-enum";
import { formatCurrency } from "../../constants/format-currency";

type IEditDebiorSchema = {
  name?: string;
  address?: string;
  managementType?: string;
  dataAgunan?: string;
  deliveryDate?: string;
  endDate?: string;
  no?: string;
  bindingValue?: string;
  plafondCredit?: string;
  status?: DebitorEnum;
  branchId?: number;
  notarisId?: string;
  refNumber?: string;
};

const CreateDebiorSchema = Yup.object().shape<IEditDebiorSchema>({
  notarisId: Yup.string().required("Wajib diisi!"),
});

const DebitorDetailAndEdit = ({
  navigation,
  route,
}: HomeNavigationProps<"DebitorDetailAndEdit">) => {
  const [showDeliveryDate, setShowDeliveryDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [branches, setBranches] = useState([]);
  const [notaries, setNotaries] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  const {
    handleChange,
    handleSubmit,
    resetForm,
    values,
    setFieldValue,
    errors,
  } = useFormik<IEditDebiorSchema>({
    validationSchema: CreateDebiorSchema,
    initialValues: {
      name: "",
      address: "",
      managementType: "",
      dataAgunan: "",
      deliveryDate: "",
      endDate: "",
      no: "",
      bindingValue: "",
      plafondCredit: "",
      status: DebitorEnum.Progress,
      branchId: 0,
      notarisId: "",
      refNumber: "",
    },
    onSubmit: () => {
      axios
        .patch(
          `${baseUrl}/debitors/${route.params.debitorId}`,
          {
            /* eslint-disable camelcase */
            name: values.name,
            jenis_pengurusan: values.managementType,
            data_agunan: values.dataAgunan,
            cabang_id: values.branchId,
            nomor: values.no,
            alamat: values.address,
            notaris_id: [values.notarisId],
            tanggal_penyerahan: values.deliveryDate,
            tanggal_berakhir: values.endDate,
            nilai_pengikatan: values.bindingValue === "" ? 0 : formatCurrency(values.bindingValue).format(),
            plafond_kredit: values.plafondCredit === "" ? 0 : formatCurrency(values.plafondCredit).format(),
            no_surat: values.refNumber,
            status: values.status,
            /* eslint-enable camelcase */
          },
          {
            headers: {
              Authorization: `Bearer ${authCtx.currentUser?.token}`,
            },
          }
        )
        .then(() => {
          // resetForm();
          // setBranches([]);
          // setNotaries([]);
          // // setIsInitial(true);
          // setIsLoading(true);
          navigation.goBack();
        })
        .catch((e: AxiosError) => console.log("error", e.response));
    },
  });

  const fetchNotaries = useCallback(
    (branchId) => {
      return axios
        .get(`${baseUrl}/branches/${branchId}/notaris`, {
          headers: {
            Authorization: `Bearer ${authCtx.currentUser?.token}`,
          },
        })
        .then(({ data }) => {
          setNotaries(data.data);
        })
        .catch((e: AxiosError) => console.log(e.response));
    },
    [authCtx.currentUser?.token]
  );

  const fetchData = useCallback(() => {
    async function boostrap() {
      if (authCtx.currentUser?.user.role === RoleEnum.AdminPusat) {
        await axios
          .get(`${baseUrl}/branches`, {
            headers: {
              Authorization: `Bearer ${authCtx.currentUser?.token}`,
            },
          })
          .then(({ data }) => {
            setBranches(data.data);
          })
          .catch((e: AxiosError) => console.log(e.response));
      }

      axios
        .get(`${baseUrl}/debitors/${route.params.debitorId}`, {
          headers: {
            Authorization: `Bearer ${authCtx.currentUser?.token}`,
          },
        })
        .then(async ({ data }) => {
          await fetchNotaries(data.cabang_id);

          resetForm();

          if (authCtx.currentUser?.user?.role === RoleEnum.Apraisal) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setBranches([data.branch]);
          }

          setFieldValue("refNumber", data.no_surat);
          setFieldValue("branchId", data.cabang_id);
          setFieldValue("plafondCredit", data.plafond_kredit);
          setFieldValue("bindingValue", data.nilai_pengikatan);
          setFieldValue("name", data.name);
          setFieldValue("managementType", data.jenis_pengurusan);
          setFieldValue("dataAgunan", data.data_agunan);
          setFieldValue("no", data.nomor);
          setFieldValue("address", data.alamat);
          setFieldValue("deliveryDate", data.tanggal_penyerahan);
          setFieldValue("endDate", data.tanggal_berakhir);
          setFieldValue("status", data.status);

          setIsLoading(false);

          if (data.users[0].notaris) {
            setFieldValue("notarisId", data.users[0]?.id);
          } else {
            alert("Notaris sudah tidak aktif, silahkan pilih notari lain");
          }
        })
        .catch((e: AxiosError) => console.log(e.response));
    }

    boostrap();

    return () => {
      resetForm();
      setBranches([]);
      setNotaries([]);
      setIsLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authCtx.currentUser?.token,
    authCtx.currentUser?.user.role,
    fetchNotaries,
    // notaries,
    resetForm,
    route.params.debitorId,
    setFieldValue,
  ]);

  useFocusEffect(fetchData);

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Detail Berkas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "bell",
          onPress: () => navigation.navigate("Notification"),
        }}
      />
      {isLoading && (
        <HStack
          height="full"
          space={2}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            color="darkBlue.600"
            size="sm"
            accessibilityLabel="Loading posts"
          />
          <Heading color="darkBlue.600" fontSize="2xs">
            Sedang memuat . . .
          </Heading>
        </HStack>
      )}
      <VStack flex={1}>
        <ScrollView>
          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Nama Debitur</FormControl.Label>
                <Input
                  value={values.name}
                  onChangeText={handleChange("name")}
                  type="text"
                  placeholder="nama debitur"
                />
              </Stack>
            ),
            [handleChange, values.name]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Alamat Jaminan</FormControl.Label>
                <Input
                  value={values.address}
                  onChangeText={handleChange("address")}
                  type="text"
                  placeholder="alamat jaminan"
                />
              </Stack>
            ),
            [handleChange, values.address]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Jenis Pengikatan</FormControl.Label>
                <Input
                  value={values.managementType}
                  onChangeText={handleChange("managementType")}
                  type="text"
                  placeholder="jenis pengikatan"
                />
              </Stack>
            ),
            [handleChange, values.managementType]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Nilai Pengikatan</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  type="text"
                  placeholder="nilai pengikatan"
                  value={values.bindingValue === "" ? "" : formatCurrency(values.bindingValue).format({ thousandSeparated: true })}
                  onChangeText={handleChange("bindingValue")}
                />
              </Stack>
            ),
            [handleChange, values.bindingValue]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Plafond Kredit</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  type="text"
                  placeholder="plafond kredit"
                  value={values.plafondCredit === "" ? "" : formatCurrency(values.plafondCredit).format({ thousandSeparated: true })}
                  onChangeText={handleChange("plafondCredit")}
                />
              </Stack>
            ),
            [handleChange, values.plafondCredit]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Nomor</FormControl.Label>
                <Input
                  value={values.no}
                  type="text"
                  placeholder="nomor"
                  onChangeText={handleChange("no")}
                />
              </Stack>
            ),
            [handleChange, values.no]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>No Surat</FormControl.Label>
                <Input
                  value={values.refNumber}
                  type="text"
                  placeholder="no surat"
                  onChangeText={handleChange("refNumber")}
                />
              </Stack>
            ),
            [handleChange, values.refNumber]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <Pressable onPress={() => setShowDeliveryDate(true)}>
                  <FormControl.Label>Tanggal Order</FormControl.Label>
                  <HStack
                    mt="1"
                    bg="white"
                    borderWidth="1"
                    w="full"
                    h="12"
                    alignItems="center"
                    borderColor={"gray.300"}
                    rounded="sm"
                    pl="0.5"
                  >
                    <Text ml="2" style={{ color: "#707179" }}>
                      {!!values.deliveryDate
                        ? values.deliveryDate
                        : "tanggal order"}
                    </Text>
                  </HStack>
                </Pressable>
              </Stack>
            ),
            [values.deliveryDate]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <Pressable onPress={() => setShowEndDate(true)}>
                  <FormControl.Label>
                    Tanggal Berakhir Cover Note
                  </FormControl.Label>
                  <HStack
                    mt="1"
                    bg="white"
                    borderWidth="1"
                    w="full"
                    h="12"
                    alignItems="center"
                    borderColor={"gray.300"}
                    rounded="sm"
                    pl="0.5"
                  >
                    <Text ml="2" style={{ color: "#707179" }}>
                      {!!values.endDate
                        ? values.endDate
                        : "tanggal berakhir cover note"}
                    </Text>
                  </HStack>
                </Pressable>
              </Stack>
            ),
            [values.endDate]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Status</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="status"
                  placeholder="status"
                  selectedValue={values.status}
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  onValueChange={(v) => setFieldValue("status", v)}
                >
                  {Object.values(DebitorEnum).map((v) => (
                    <Select.Item key={v} label={v} value={v} />
                  ))}
                </Select>
              </Stack>
            ),
            [setFieldValue, values.status]
          )}

          {/* <Stack mx="4">
            <FormControl.Label>Deskripsi</FormControl.Label>
            <Input isDisabled multiline type="text" placeholder="deskripsi" />
          </Stack> */}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Data Agunan</FormControl.Label>
                <Input
                  type="text"
                  value={values.dataAgunan}
                  placeholder="data agunan"
                  onChangeText={handleChange("dataAgunan")}
                />
              </Stack>
            ),
            [handleChange, values.dataAgunan]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Cabang</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="cabang"
                  placeholder="cabang"
                  selectedValue={values.branchId as unknown as string}
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  onValueChange={(val) => {
                    fetchNotaries(val);
                    setFieldValue("branchId", val);
                  }}
                >
                  {branches?.map((v) => (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <Select.Item key={v} label={v.name} value={v.id} />
                  ))}
                </Select>
              </Stack>
            ),
            [branches, fetchNotaries, setFieldValue, values.branchId]
          )}

          {useMemo(
            () => (
              <Stack mx="4">
                <FormControl.Label>Notaris</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="cabang"
                  placeholder="cabang"
                  selectedValue={values.notarisId}
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  onValueChange={(val) => setFieldValue("notarisId", val)}
                >
                  {notaries.map((v) => (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <Select.Item key={v} label={v.name} value={v.id} />
                  ))}
                </Select>
                {errors.notarisId && (
                  <Text style={{ color: "red" }}>{errors.notarisId}</Text>
                )}
              </Stack>
            ),
            [errors.notarisId, notaries, setFieldValue, values.notarisId]
          )}
        </ScrollView>
        <HStack mt="1" w="full" justifyContent={"space-evenly"}>
          <Button
            onPress={() => handleSubmit()}
            rounded="none"
            w="1/2"
            colorScheme="emerald"
          >
            <Text color="white">Perbaharui Berkas</Text>
          </Button>
          <Button
            rounded="none"
            colorScheme="danger"
            w="1/2"
            variant={"subtle"}
            onPress={() => {
              // resetForm();
              // setBranches([]);
              // setNotaries([]);
              // // setIsInitial(true);
              // setIsLoading(true);
              navigation.goBack();
            }}
          >
            <Text color="danger.500">Batal</Text>
          </Button>
        </HStack>
      </VStack>

      {useMemo(
        () =>
          showDeliveryDate && (
            <DateTimePicker
              value={
                !!values.deliveryDate
                  ? new Date(values.deliveryDate)
                  : new Date()
              }
              mode={"date"}
              is24Hour={true}
              onChange={({ type }, deliveryDate) => {
                setShowDeliveryDate(false);
                if (type === "set") {
                  setFieldValue(
                    "deliveryDate",
                    `${deliveryDate?.getFullYear()}/${deliveryDate!.getMonth() + 1
                    }/${deliveryDate?.getDate()}`
                  );
                }
              }}
            />
          ),
        [setFieldValue, showDeliveryDate, values.deliveryDate]
      )}

      {useMemo(
        () =>
          showEndDate && (
            <DateTimePicker
              value={!!values.endDate ? new Date(values.endDate) : new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={({ type }, endDate) => {
                setShowEndDate(false);

                if (type === "set") {
                  setFieldValue(
                    "endDate",
                    `${endDate?.getFullYear()}/${endDate!.getMonth() + 1
                    }/${endDate?.getDate()}`
                  );
                }
              }}
            />
          ),
        [setFieldValue, showEndDate, values.endDate]
      )}
    </Box>
  );
};

export default DebitorDetailAndEdit;

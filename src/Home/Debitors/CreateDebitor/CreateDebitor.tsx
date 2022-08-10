import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  NativeBaseProvider,
  Select,
  Text,
  CheckIcon,
  ScrollView,
  FormControl,
  WarningOutlineIcon,
  Pressable,
  Spinner,
  Heading,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFocusEffect } from "@react-navigation/native";
import axios, { AxiosError } from "axios";

import { Header } from "../../../components";
import { HomeNavigationProps } from "../../../components/Navigation";
import { AuthContext } from "../../../Authentication/store/AuthContex";
import { baseUrl } from "../../../constants/base-url";
import { RoleEnum } from "../../../constants/role-enum";

type ICreateDebiorSchema = {
  name: string;
  address: string;
  managementType: string;
  branch: string;
  notaris: string;
  dataAgunan: string;
  deliveryDate: string;
  // endDate: string;
  no: string;
  refNumber: string;
  bindingValue: number;
  plafondCredit: number;
};

const CreateDebiorSchema = Yup.object().shape<ICreateDebiorSchema>({
  name: Yup.string().required("Wajib diisi!"),
  address: Yup.string().required("Wajib diisi!"),
  managementType: Yup.string().required("Wajib diisi!"),
  branch: Yup.string().required("Wajib diisi!"),
  notaris: Yup.string().required("Wajib diisi!"),
  dataAgunan: Yup.string().required("Wajib diisi!"),
  deliveryDate: Yup.string().required("Wajib diisi!"),
  // endDate: Yup.string().required("Wajib diisi!"),
  no: Yup.string().required("Wajib diisi!"),
  bindingValue: Yup.number().required("Wajib diisi!"),
  plafondCredit: Yup.number().required("Wajib diisi!"),
  refNumber: Yup.string().required("Wajib diisi!"),
});

const CreateDebitor = ({
  navigation,
}: HomeNavigationProps<"CreateDebitor">) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [branches, setBranches] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notaries, setNotaries] = useState<any[]>([]);
  const [isInitial, setIsInitial] = useState(true);

  const [showDeliveryDate, setShowDeliveryDate] = useState(false);
  // const [showEndDate, setShowEndDate] = useState(false);
  const deliveryDate = useMemo(() => "Tanggal Penyerahan", []);
  // const endDate = useMemo(() => "Tanggal Berakhir", []);

  const authCtx = useContext(AuthContext);

  const {
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    values,
    setFieldValue,
  } = useFormik<ICreateDebiorSchema>({
    validationSchema: CreateDebiorSchema,
    initialValues: {
      name: "",
      address: "",
      managementType: "",
      branch: "",
      notaris: "",
      dataAgunan: "",
      deliveryDate: "",
      // endDate: "",
      no: "",
      bindingValue: 0,
      plafondCredit: 0,
      refNumber: "",
    },
    onSubmit: () => {
      axios
        .post(
          `${baseUrl}/debitors`,
          {
            /* eslint-disable camelcase */
            name: values.name,
            jenis_pengurusan: values.managementType,
            data_agunan: values.dataAgunan,
            cabang_id: values.branch,
            nomor: values.no,
            alamat: values.address,
            notaris_id: [values.notaris],
            tanggal_penyerahan: values.deliveryDate,
            // tanggal_berakhir: values.endDate,
            nilai_pengikatan: values.bindingValue,
            plafond_kredit: values.plafondCredit,
            no_surat: values.refNumber,
            /* eslint-enable camelcase */
          },
          {
            headers: {
              Authorization: `Bearer ${authCtx.currentUser?.token}`,
            },
          }
        )
        .then(() => {
          resetForm();
          setBranches([]);
          setNotaries([]);
          setIsInitial(true);
          navigation.goBack();
        })
        .catch((e: AxiosError) => console.log(e.response));
    },
  });

  const getNotaries = useCallback(
    (branchId) => {
      // setIsFetching(true);

      axios(`${baseUrl}/branches/${branchId}/notaris`, {
        headers: {
          Authorization: `Bearer ${authCtx.currentUser?.token}`,
        },
      })
        .then(({ data }) => {
          setNotaries(data.data);
        })
        .catch((e: AxiosError) => console.log(e.response));
      // .finally(() => setIsFetching(false));
    },
    [authCtx.currentUser?.token]
  );

  const initialSetup = useCallback(() => {
    setIsInitial(true);
    axios(`${baseUrl}/branches`, {
      headers: {
        Authorization: `Bearer ${authCtx.currentUser?.token}`,
      },
    })
      .then(({ data }) => {
        setBranches(data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsInitial(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(initialSetup);

  return (
    <NativeBaseProvider>
      <Box background="white" flex={1}>
        <Header
          title="Daftar Berkas"
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{
            icon: "bell",
            onPress: () => navigation.navigate("Notification"),
          }}
        />
        <Box borderTopWidth="1" borderTopColor={"gray.200"} />

        {isInitial && (
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

        <ScrollView>
          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.name}>
                <Input
                  onChangeText={handleChange("name")}
                  borderColor="gray.300"
                  alignSelf="center"
                  mt="2"
                  value={values.name}
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      size={"xl"}
                      color="green.600"
                      as={<MaterialIcons name="account-circle" />}
                    />
                  }
                  placeholder="Nama Debitur"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [errors.name, values.name]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.address}>
                <Input
                  value={values.address}
                  onChangeText={handleChange("address")}
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      size={"xl"}
                      color="fuchsia.700"
                      as={<MaterialIcons name="home" />}
                    />
                  }
                  placeholder="Alamat Jaminan"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.address}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [errors.address, values.address]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.managementType}>
                <Input
                  value={values.managementType}
                  onChangeText={handleChange("managementType")}
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      color="blue.600"
                      size={"lg"}
                      as={<MaterialIcons name="business" />}
                    />
                  }
                  placeholder="Jenis Pengurusan"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.managementType}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            [errors.managementType, handleChange, values.managementType]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.bindingValue}>
                <Input
                  value={`${values.bindingValue}`}
                  onChangeText={handleChange("bindingValue")}
                  keyboardType="numeric"
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      size={"xl"}
                      color="fuchsia.700"
                      as={<MaterialIcons name="home" />}
                    />
                  }
                  placeholder="Nilai Pengikatan"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.bindingValue}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            [errors.bindingValue, handleChange, values.bindingValue]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.plafondCredit}>
                <Input
                  value={`${values.plafondCredit}`}
                  onChangeText={handleChange("plafondCredit")}
                  keyboardType="numeric"
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      size={"xl"}
                      color="fuchsia.700"
                      as={<MaterialIcons name="home" />}
                    />
                  }
                  placeholder="Plafond Kredit"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.plafondCredit}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            [errors.plafondCredit, handleChange, values.plafondCredit]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.refNumber}>
                <Input
                  value={`${values.refNumber}`}
                  onChangeText={handleChange("refNumber")}
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      size={"xl"}
                      color="fuchsia.700"
                      as={<MaterialIcons name="home" />}
                    />
                  }
                  placeholder="No Surat"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.refNumber}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            [errors.refNumber, handleChange, values.refNumber]
          )}

          {useMemo(
            () => {
              if (authCtx.currentUser?.user.role === RoleEnum.Apraisal) {
                /* eslint-disable camelcase */
                setFieldValue("branch", authCtx.currentUser?.user?.cabang_id);
                getNotaries(authCtx.currentUser?.user?.cabang_id);
                /* eslint-enable camelcase */
                return;
              }

              return (
                <FormControl isInvalid={!!errors.branch}>
                  <HStack
                    mt="1"
                    shadow="1"
                    bg="white"
                    borderWidth="1"
                    w="full"
                    h="12"
                    alignItems="center"
                    borderColor={!!errors.branch ? "danger.600" : "gray.300"}
                    rounded="sm"
                  >
                    <Icon
                      ml="1"
                      color={"yellow.500"}
                      size={"xl"}
                      as={<MaterialIcons name="flag" />}
                    />

                    <Select
                      selectedValue={values.branch}
                      minWidth="200"
                      bg="white"
                      borderWidth="0"
                      flex={1}
                      lineHeight="md"
                      placeholder="Cabang"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      _actionSheetBody={
                        branches.length >= 5 && {
                          h: "2xs",
                        }
                      }
                      onValueChange={(itemValue) => {
                        setFieldValue("branch", itemValue);
                        getNotaries(itemValue);
                      }}
                    >
                      {branches.map((v) => (
                        <Select.Item key={v.id} label={v.name} value={v.id} />
                      ))}
                    </Select>
                  </HStack>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="2xs" />}
                  >
                    {errors.branch}
                  </FormControl.ErrorMessage>
                </FormControl>
              );
            },

            // eslint-disable-next-line react-hooks/exhaustive-deps
            [errors.branch, branches, values.branch]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.notaris}>
                <HStack
                  mt="1"
                  shadow="1"
                  bg="white"
                  borderWidth="1"
                  w="full"
                  h="12"
                  alignItems="center"
                  borderColor={!!errors.notaris ? "danger.600" : "gray.300"}
                  rounded="sm"
                >
                  <Icon
                    ml="1"
                    color={"danger.300"}
                    size={"xl"}
                    as={<MaterialIcons name="badge" />}
                  />

                  {notaries.length ? (
                    <Select
                      selectedValue={values.notaris}
                      minWidth="200"
                      bg="white"
                      borderWidth="0"
                      flex={1}
                      lineHeight="md"
                      placeholder="Notaris"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      _actionSheetBody={
                        notaries.length >= 5 && {
                          h: "2xs",
                        }
                      }
                      onValueChange={(itemValue) =>
                        setFieldValue("notaris", itemValue)
                      }
                    >
                      {notaries.map((v) => (
                        <Select.Item key={v.id} label={v.name} value={v.id} />
                      ))}
                    </Select>
                  ) : (
                    <Input
                      isDisabled
                      borderWidth="0"
                      placeholder={
                        values.branch ? "Notaris tidak tersedia" : "Notaris"
                      }
                    />
                  )}
                </HStack>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.notaris}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [errors.notaris, notaries, values.branch, values.notaris]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.dataAgunan}>
                <Input
                  value={values.dataAgunan}
                  onChangeText={handleChange("dataAgunan")}
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      color="cyan.600"
                      size={"xl"}
                      as={<MaterialIcons name="import-contacts" />}
                    />
                  }
                  placeholder="Data Agunan"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.dataAgunan}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [errors.dataAgunan, values.dataAgunan]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.no}>
                <Input
                  value={values.no}
                  onChangeText={handleChange("no")}
                  alignSelf="center"
                  mt="2"
                  shadow="2"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "gray.300",
                  }}
                  InputLeftElement={
                    <Icon
                      ml="1"
                      color="coolGray.400"
                      size={"xl"}
                      as={<MaterialIcons name="format-list-numbered-rtl" />}
                    />
                  }
                  placeholder="Nomor"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="2xs" />}
                >
                  {errors.no}
                </FormControl.ErrorMessage>
              </FormControl>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [errors.no, values.no]
          )}

          {useMemo(
            () => (
              <FormControl isInvalid={!!errors.deliveryDate}>
                <Pressable onPress={() => setShowDeliveryDate(true)}>
                  <HStack
                    mt="1"
                    shadow="1"
                    bg="white"
                    borderWidth="1"
                    w="full"
                    h="12"
                    alignItems="center"
                    borderColor={
                      !!errors.deliveryDate ? "danger.600" : "gray.300"
                    }
                    rounded="sm"
                    pl="0.5"
                  >
                    <Icon
                      as={<MaterialIcons name="date-range" />}
                      color="gray.500"
                      size="xl"
                    />
                    <Text ml="2" style={{ color: "#707179" }}>
                      {!!values.deliveryDate
                        ? values.deliveryDate
                        : deliveryDate}
                    </Text>
                  </HStack>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="2xs" />}
                  >
                    {errors.deliveryDate}
                  </FormControl.ErrorMessage>
                </Pressable>
              </FormControl>
            ),
            [deliveryDate, errors.deliveryDate, values.deliveryDate]
          )}

          {/* {useMemo(
            () => (
              <FormControl isInvalid={!!errors.endDate}>
                <Pressable onPress={() => setShowEndDate(true)}>
                  <HStack
                    mt="1"
                    shadow="1"
                    bg="white"
                    borderWidth="1"
                    w="full"
                    h="12"
                    alignItems="center"
                    borderColor={!!errors.endDate ? "danger.600" : "gray.300"}
                    rounded="sm"
                    pl="0.5"
                  >
                    <Icon
                      as={<MaterialIcons name="date-range" />}
                      color="gray.500"
                      size="xl"
                    />
                    <Text ml="2" style={{ color: "#707179" }}>
                      {!!values.endDate ? values.endDate : endDate}
                    </Text>
                  </HStack>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="2xs" />}
                  >
                    {errors.endDate}
                  </FormControl.ErrorMessage>
                </Pressable>
              </FormControl>
            ),
            [endDate, errors.endDate, values.endDate]
          )} */}
        </ScrollView>
        <HStack w="full" justifyContent={"space-evenly"}>
          <Button
            onPress={() => handleSubmit()}
            rounded="none"
            w="1/2"
            colorScheme="emerald"
          >
            <Text color="white">Buat Berkas</Text>
          </Button>
          <Button
            rounded="none"
            colorScheme="danger"
            w="1/2"
            variant={"subtle"}
            onPress={() => {
              resetForm();
              setBranches([]);
              setNotaries([]);
              setIsInitial(true);
              navigation.goBack();
            }}
          >
            <Text color="danger.500">Batal</Text>
          </Button>
        </HStack>
      </Box>

      {useMemo(
        () =>
          showDeliveryDate && (
            <DateTimePicker
              // testID="dateTimePicker"
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
                    `${deliveryDate?.getFullYear()}/${
                      deliveryDate!.getMonth() + 1
                    }/${deliveryDate?.getDate()}`
                  );
                }
              }}
            />
          ),
        [setFieldValue, showDeliveryDate, values.deliveryDate]
      )}

      {/* {useMemo(
        () =>
          showEndDate && (
            <DateTimePicker
              // testID="dateTimePicker"
              value={!!values.endDate ? new Date(values.endDate) : new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={({ type }, endDate) => {
                setShowEndDate(false);

                if (type === "set") {
                  setFieldValue(
                    "endDate",
                    `${endDate?.getFullYear()}/${
                      endDate!.getMonth() + 1
                    }/${endDate?.getDate()}`
                  );
                }
              }}
            />
          ),
        [setFieldValue, showEndDate, values.endDate]
      )} */}
    </NativeBaseProvider>
  );
};

export default CreateDebitor;

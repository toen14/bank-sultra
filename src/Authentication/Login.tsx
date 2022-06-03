import React, { useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BorderlessButton } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";

import { Container, Button, Text, Box } from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";

import Footer from "./components/Footer";
import { AuthContext } from "./store/AuthContex";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const authCtx = React.useContext(AuthContext);

  if (authCtx.isAuthenticated) {
    navigation.navigate("Home");
  }

  const [errorRequest, setErrorRequest] = useState("");

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "", remember: true },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });
  const password = useRef<RNTextInput>(null);
  const footer = (
    <Footer
      title="Don’t have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  return (
    <Container pattern={0} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Welcome back
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Use your credentials below and login to your account
      </Text>
      <Box>
        <Text style={{ marginTop: -20, color: "red" }}>{errorRequest}</Text>
        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errorRequest ?? errors.email}
            touched={touched.email}
            autoCapitalize="none"
            autoComplete="email"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
            onTouchStart={() => setErrorRequest("")}
          />
          {errors.email && touched.email && !errorRequest && (
            <Text style={{ color: "red", fontSize: 10 }}>{errors.email}</Text>
          )}
        </Box>
        <TextInput
          ref={password}
          icon="lock"
          placeholder="Enter your Password"
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          error={errorRequest ?? errors.password}
          touched={touched.password}
          autoComplete="password"
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
          onTouchStart={() => setErrorRequest("")}
          secureTextEntry
        />
        {errors.password && touched.password && !errorRequest && (
          <Text style={{ color: "red", fontSize: 10 }}>{errors.password}</Text>
        )}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginVertical="s"
        >
          <Checkbox
            label="Remember me"
            checked={values.remember}
            onChange={() => setFieldValue("remember", !values.remember)}
          />
          <BorderlessButton
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="primary">
              Forgot password
            </Text>
          </BorderlessButton>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={() => {
              if (!errors.email && !errors.password) {
                axios
                  .post(
                    "https://4e50-180-252-206-12.ap.ngrok.io/api/login",
                    {
                      email: values.email,
                      password: values.password,
                    },
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    authCtx.authenticate(res.data);
                  })
                  .catch((e) => setErrorRequest(e.response.data.message));
              }
            }}
            label="Log into your account"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

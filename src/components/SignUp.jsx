import { View, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: theme.colors.repositoryMainBackground,
  },
  textInputError: {
    borderColor: theme.colors.textError,
  },
  textInput: {
    backgroundColor: theme.colors.repositoryItemBackground,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: theme.fontSizes.subheading,
    paddingLeft: 5,
    marginBottom: 20,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
  },
  submit: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  onError: {
    color: theme.colors.textError,
    paddingBottom: 10,
  },
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values;
    console.log("values: ", username, password);

    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "too short")
      .max(30, "too long")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "too short")
      .max(50, "too long")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Password confirmation is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username && formik.errors.username
            ? styles.textInputError
            : null,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.onError}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.password && formik.errors.password
            ? styles.textInputError
            : null,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.onError}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
            ? styles.textInputError
            : null,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        secureTextEntry
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.onError}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text color="textWhite" fontSize="subheading" fontWeight="bold">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

import Text from "./Text";
import { View, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

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

const validationSchema = yup.object().shape({
  username: yup.string().min(1, "too short").required("Username is required"),
  password: yup.string().min(1, "too short").required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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

      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text color="textWhite" fontSize="subheading" fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

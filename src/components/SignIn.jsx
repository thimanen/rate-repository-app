import Text from "./Text";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: theme.colors.repositoryMainBackground,
    gap: 5,
  },
  textInputFields: {
    backgroundColor: theme.colors.repositoryItemBackground,
    borderWidth: 1,
    height: 30,
    borderRadius: 5,
  },
  textInput: {
    fontSize: theme.fontSizes.subheading,
    marginLeft: 5
  },
  submit: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.textInputFields}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
      </View>
      <View style={styles.textInputFields}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
      </View>
      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text color="textWhite" fontSize="subheading" fontWeight="bold" >Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

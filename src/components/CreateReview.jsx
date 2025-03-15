import { useFormik } from "formik";
import { View, TextInput, StyleSheet, Platform, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import * as yup from "yup";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

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

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("repository owner name is required"),
  repositoryName: yup.string().required("repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  let navigate = useNavigate();

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    rating = Number(rating);
    try {
      const response = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      navigate(`/${response.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.ownerName && formik.errors.ownerName
            ? styles.textInputError
            : null,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.onError}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.textInputError
            : null,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.onError}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.rating && formik.errors.rating
            ? styles.textInputError
            : null,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.onError}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.textInput,
          formik.touched.text && formik.errors.text
            ? styles.textInputError
            : null,
        ]}
        multiline
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />

      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text color="textWhite" fontSize="subheading" fontWeight="bold">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;

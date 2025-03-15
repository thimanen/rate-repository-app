import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log("graphQLerror: ", error.graphQLErrors[0].message);
    },
    fetchPolicy: "no-cache",
  });

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const response = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating,
            text,
          },
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  return [createReview, result];
};

export default useCreateReview;

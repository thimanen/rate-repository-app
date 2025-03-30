import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log("In error:", error);
      console.log("graphQLerror: ", error.graphQLErrors[0].message);
    },
  });

  const deleteReview = async ({ deleteReviewId }) => {
    try {
      const response = await mutate({
        variables: {
          deleteReviewId,
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  return [deleteReview, result];
};

export default useDeleteReview;

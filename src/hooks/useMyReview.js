import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMyReview = () => {
  const { loading, error, data } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  return { loading, error, data };
};

export default useMyReview;

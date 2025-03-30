import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMyReview = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  return { loading, error, data, refetch };
};

export default useMyReview;

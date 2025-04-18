import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ order, searchKeyword }) => {
  const orderBy = order == "Latest" ? "CREATED_AT" : "RATING_AVERAGE";
  const orderDirection =
    order == "Latest" || order == "Highest rated" ? "DESC" : "ASC";

  const getRepositories = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  if (getRepositories.error) {
    console.log("ERROR: ", getRepositories.error);
    return null;
  }

  const repositories = getRepositories.loading
    ? undefined
    : getRepositories.data.repositories;
  const loading = getRepositories.loading;

  return { repositories, loading };
};

export default useRepositories;

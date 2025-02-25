import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const getRepositories = useQuery(GET_REPOSITORIES, {
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

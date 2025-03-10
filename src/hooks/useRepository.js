import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
    skip: !repositoryId,
  });

  /*
  if (getRepository.error) {
    console.log("ERROR: ", getRepository.error);
    return null;
  }
  */

  /*
  const repository = getRepository.loading
    ? undefined
    : getRepository.data.repository;
  const loading = getRepository.loading;
  */

  return { loading, error, data };
};

export default useRepository;

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const getRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const repositories = getRepositories.loading
    ? undefined
    : getRepositories.data.repositories;
  const loading = getRepositories.loading;

  return { repositories, loading };
};

export default useRepositories;

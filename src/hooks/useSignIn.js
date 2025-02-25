import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [authenticate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log("graphQLerror: ", error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const response = await authenticate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;

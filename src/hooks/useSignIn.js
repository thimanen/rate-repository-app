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
    fetchPolicy: "no-cache",
  });

  const signIn = async ({ username, password }) => {
    try {
      const response = await authenticate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      });
      await authStorage.setAccessToken(response.data.authenticate.accessToken);
      await apolloClient.resetStore();

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  return [signIn, result];
};

export default useSignIn;

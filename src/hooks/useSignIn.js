import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
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
    return response;
  };

  return [signIn, result];
};

export default useSignIn;

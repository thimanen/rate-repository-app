import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log("graphQLerror: ", error.graphQLErrors[0].message);
    },
    fetchPolicy: "no-cache",
  });

  const signUp = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      console.log(response.data);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  return [signUp, result];
};

export default useSignUp;

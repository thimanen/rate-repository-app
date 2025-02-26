import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  (async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (e) {
      console.log(e);
    }
  })();
  return null;
};

export default useSignOut;

import { useNavigate } from "react-router-native";
import useSignOut from "../hooks/useSignOut";
import { useEffect } from "react";

const SignOut = () => {
  const navigate = useNavigate();
  const signOutHook = useSignOut();

  (async () => {
    console.log("...signing out");
    try {
      await useSignOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  })();

  return null;
};

export default SignOut;

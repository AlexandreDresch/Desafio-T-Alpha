import useAsync from "../use-async";

import * as authApi from "../../services/auth-api";

export default function useSignIn() {
  const {
    loading: signInLoading,
    error: signInError,
    act: signIn,
  } = useAsync(authApi.signIn, false);

  return {
    signInLoading,
    signInError,
    signIn,
  };
}

import { useState } from "react";

import axios from "axios";

interface ISignInUser {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async ({ email, password }: ISignInUser) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      console.log("Error signing in", error);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};

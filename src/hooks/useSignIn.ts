import { useState } from "react";

import axios from "axios";

interface ISignInUser {
  email: string;
  password: string;
}

export const useSignIn = ({ email, password }: ISignInUser) => {
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );

      return response.data;
    } catch (error) {
      console.log("Error signing in", error);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};

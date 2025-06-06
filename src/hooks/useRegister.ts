import { useState } from "react";

import axios from "axios";

interface IUserRegister {
  username: string;
  password: string;
  email: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async ({ username, password, email }: IUserRegister) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          password,
          email,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

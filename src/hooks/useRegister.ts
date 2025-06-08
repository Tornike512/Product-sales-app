import { useState } from "react";

import axios from "axios";

interface IUserRegister {
  username: string;
  password: string;
  email: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

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
      setError(false);
      setSuccess(true);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      return user;
    } catch (error) {
      console.log(error, "Error registering");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register, error, success };
};

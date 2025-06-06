import { useState } from "react";

import axios from "axios";

interface IUserRegister {
  username: string;
  password: string;
  email: string;
}

export const useRegister = ({ username, password, email }: IUserRegister) => {
  const [loading, setLoading] = useState(false);

  const credentials = { username, password, email };

  const register = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/register", {
        credentials,
      });
      return response.data;
    } catch (error) {
      console.log(error, "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

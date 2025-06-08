"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";

import "./RegisterPage.css";
import { AUTHENTICATE } from "@/store/store";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [RePassword, setRePassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, loading, error, success } = useRegister();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== RePassword) {
      setPasswordError(true);
      return;
    }

    register({
      email: email.trim(),
      username: username.trim(),
      password,
    });
  };

  useEffect(() => {
    if (success) {
      const token = localStorage.getItem("token");
      dispatch({ type: AUTHENTICATE, payload: !!token });
      router.push("/");
    }
  }, [success]);

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  return (
    <form onSubmit={handleForm} className="register-container">
      <input
        value={username}
        onChange={handleUsername}
        placeholder="Enter username"
        className="username"
        type="text"
      />
      <input
        value={email}
        onChange={handleEmail}
        placeholder="Enter email"
        className={`email ${error && "email-error"}`}
        type="email"
      />
      {error && (
        <p className="email-exists">
          An account with this email already exists
        </p>
      )}
      <input
        value={password}
        onChange={handlePassword}
        placeholder="Enter password"
        className="password"
        type="password"
      />
      <input
        value={RePassword}
        onChange={handleRePassword}
        placeholder="Re-enter password"
        className={`re-password ${passwordError && "re-password-error"}`}
        type="password"
      />
      {passwordError && (
        <p className="password-mismatch">
          Passwords do not match. Please try again
        </p>
      )}
      <button disabled={loading} className="register-button">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

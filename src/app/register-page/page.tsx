"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRegister } from "@/hooks/useRegister";

import "./RegisterPage.css";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [RePassword, setRePassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const { register, loading, error } = useRegister();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== RePassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    register({ email, username, password });
  };

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

"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useSignIn } from "@/hooks/useSignIn";
import { useRouter } from "next/navigation";

import "./SignInPage.css";

export default function page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);

  const { loading, signIn } = useSignIn();
  const router = useRouter();

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn({ email, password });

    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    } else {
      setWrongCredentials(true);
    }
  };

  const handleRegisterNavigation = () => {
    router.push("/register-page");
  };

  return (
    <form onSubmit={handleForm} className="sign-in-container">
      <input
        value={email}
        onChange={handleEmailInput}
        placeholder="Enter email"
        className={`email-input ${wrongCredentials ? "wrong-email" : ""}`}
        type="email"
      />
      <input
        value={password}
        onChange={handlePasswordInput}
        placeholder="Enter password"
        className={`password-input ${wrongCredentials ? "wrong-password" : ""}`}
        type="password"
      />
      {wrongCredentials && (
        <p className="wrong-credentials">Email or password is incorrect </p>
      )}
      <button className="sign-in-button">
        {loading ? "Signing In..." : "Sign in"}
      </button>
      <span onClick={handleRegisterNavigation} className="register-text">
        Register
      </span>
    </form>
  );
}

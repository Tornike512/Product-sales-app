"use client";

import Link from "next/link";
import "./SignInPage.css";

export default function page() {
  return (
    <form className="sign-in-container">
      <input placeholder="Enter email" className="email-input" type="email" />
      <input
        placeholder="Enter password"
        className="password-input"
        type="password"
      />
      <button className="sign-in-button">Sign in</button>
      <span className="register-text">Register</span>
    </form>
  );
}

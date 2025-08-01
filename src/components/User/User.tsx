"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import userLogo from "../../../public/images/user-logo.png";

import "./User.css";

export default function User() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const isSignedIn = localStorage.getItem("token");

  const handleShowUserModal = () => {
    setShowModal(true);
  };

  const handleHideUserModal = () => {
    setShowModal(false);
  };

  const handleNavigateToSignIn = () => {
    router.push("/sign-in-page");
  };

  const handleNavigateToRegister = () => {
    router.push("/register-page");
  };

  const handleLogOutButton = () => {
    localStorage.removeItem("token");
    router.push("/sign-in-page");
  };

  return (
    <div>
      <Image
        className="user-logo"
        width={100}
        height={100}
        src={userLogo}
        alt="User logo"
        onMouseOver={handleShowUserModal}
        onMouseLeave={handleHideUserModal}
      />
      {showModal && (
        <>
          <div className="user-modal-background" />
          <div
            onMouseLeave={handleHideUserModal}
            onMouseOver={handleShowUserModal}
            className="register-signin"
          >
            {!isSignedIn ? (
              <>
                <div onClick={handleNavigateToRegister} className="register">
                  Register
                </div>
                <div onClick={handleNavigateToSignIn} className="sign-in">
                  Sign in
                </div>
              </>
            ) : (
              <div onClick={handleLogOutButton} className="log-out">
                Log out
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

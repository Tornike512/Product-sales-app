import { useState } from "react";

import Image from "next/image";
import userLogo from "../../../public/images/user-logo.png";

import "./User.css";

export default function User() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowUserModal = () => {
    setShowModal(true);
  };

  const handleHideUserModal = () => {
    setShowModal(false);
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
            <div className="register">Register</div>
            <div className="sign-in">Sign in</div>
          </div>
        </>
      )}
    </div>
  );
}

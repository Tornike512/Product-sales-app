import "./User.css";

import Image from "next/image";
import userLogo from "../../../public/images/user-logo.png";

export default function User() {
  return (
    <div>
      <Image
        className="user-logo"
        width={100}
        height={100}
        src={userLogo}
        alt="User logo"
      />
      <div className="register-signin">
        <div className="register">Register</div>
        <div className="sign-in">Sign in</div>
      </div>
    </div>
  );
}

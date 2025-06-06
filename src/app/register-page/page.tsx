import "./RegisterPage.css";

export default function Page() {
  return (
    <form className="register-container">
      <input placeholder="Enter username" className="username" type="text" />
      <input placeholder="Enter email" className="email" type="email" />
      <input
        placeholder="Enter password"
        className="password"
        type="password"
      />
      <input
        placeholder="Re-Enter password"
        className="re-password"
        type="password"
      />
      <button className="register-button">Register</button>
    </form>
  );
}

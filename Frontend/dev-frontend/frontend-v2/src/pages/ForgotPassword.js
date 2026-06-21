import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Password reset functionality can be connected later."
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          Send Reset Link
        </button>
      </form>

      <br />

      <Link to="/login">
        Back To Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Password reset functionality can be connected later."
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reset Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
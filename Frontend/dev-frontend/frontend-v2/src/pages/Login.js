import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(
        formData.email,
        formData.password
      );

      navigate("/");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT PANEL */}

      <div className="auth-left">

        <div className="auth-brand">
          <img
            src="/logo.png"
            alt="DevConnect"
          />

          <span>DevConnect</span>
        </div>

        <div className="auth-left-content">
          <h1>
            Welcome back to your
            builder community.
          </h1>

          <p>
            Pick up where you left off —
            review applications, accept
            invitations, and ship your
            next project.
          </p>
        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="auth-right">

        <div className="login-card">

          <h2>Sign in to DevConnect</h2>

          <p>
            Welcome back. Let's build
            something great.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="you@college.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="password-row">
              <label>Password</label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="signin-btn"
            >
              Sign In
            </button>

          </form>

          <div className="auth-divider">
            or continue with
          </div>

          <div className="social-buttons">
  <button
    type="button"
    className="social-btn"
  >
    <FcGoogle size={22} />
    Google
  </button>

  <button
    type="button"
    className="social-btn"
  >
    <FaGithub size={22} />
    GitHub
  </button>
</div>
          <div className="register-link">
            New to DevConnect?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
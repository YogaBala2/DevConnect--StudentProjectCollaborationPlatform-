import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import {
  FaGithub,
  FaUserCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  MdEmail,
  MdLock,
} from "react-icons/md";

import useAuth from "../hooks/useAuth";

import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

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
        <div>
          {/* LOGO */}

          <div className="auth-brand">
            <img
              src="/logo.png"
              alt="DevConnect"
            />

            <h2>DevConnect</h2>
          </div>

          {/* CONTENT */}

          <div className="auth-content">
            <h1>
              Collaborate.
              <br />

              <span>Build.</span>
              <br />

              Innovate.
            </h1>

            <p>
              Join students from
              different domains,
              collaborate on projects,
              manage tasks and build an
              amazing portfolio with
              DevConnect.
            </p>

            <div className="feature-list">
              <div className="feature">
                <div className="feature-icon">
                  👨‍💻
                </div>

                Find Skilled Teammates
              </div>

              <div className="feature">
                <div className="feature-icon">
                  🚀
                </div>

                Manage Projects Easily
              </div>

              <div className="feature">
                <div className="feature-icon">
                  📊
                </div>

                Track Team Progress
              </div>
            </div>
          </div>
        </div>

        {/* Illustration */}

        <div className="auth-illustration">
          <img
            src="/auth-illustration.jpeg"
            alt="Developers"
          />
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="auth-right">
        <div className="login-card">
          <div className="avatar-icon">
            <FaUserCircle />
          </div>

          <h2>Welcome Back</h2>

          <p>
            Sign in to continue your
            DevConnect journey.
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}

            <label>Email Address</label>

            <div className="input-box">
              <MdEmail className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="password-row">
              <label>Password</label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <div className="input-box">
              <MdLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {/* BUTTON */}

            <button
              className="signin-btn"
              type="submit"
            >
              Sign In
            </button>
          </form>

          

          {/* REGISTER */}

          <div className="register-link">
            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

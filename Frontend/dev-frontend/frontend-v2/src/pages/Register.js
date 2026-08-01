import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaUserCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  MdPerson,
  MdEmail,
  MdLock,
} from "react-icons/md";

import useAuth from "../hooks/useAuth";

import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(
        formData.name,
        formData.email,
        formData.password
      );

      navigate("/");
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT PANEL */}

      <div className="auth-left">

        <div>

          {/* Logo */}

          <div className="auth-brand">

            <img
              src="/logo.png"
              alt="DevConnect"
            />

            <h2>DevConnect</h2>

          </div>

          {/* Content */}

          <div className="auth-content">

            <h1>

              Start Your

              <br />

              <span>Journey.</span>

              <br />

              Today.

            </h1>

            <p>

              Create your DevConnect
              account to discover
              teammates, collaborate on
              innovative projects,
              manage tasks and build
              your portfolio.

            </p>

            <div className="feature-list">

              <div className="feature">

                <div className="feature-icon">
                  🤝
                </div>

                Connect with Students

              </div>

              <div className="feature">

                <div className="feature-icon">
                  💡
                </div>

                Build Innovative Projects

              </div>

              <div className="feature">

                <div className="feature-icon">
                  📈
                </div>

                Showcase Your Skills

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

          <h2>Create Account</h2>

          <p>

            Join DevConnect and start
            collaborating today.

          </p>

          <form onSubmit={handleSubmit}>

            {/* Name */}

            <label>Full Name</label>

            <div className="input-box">

              <MdPerson className="input-icon" />

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* Email */}

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

            {/* Password */}

            <label>Password</label>

            <div className="input-box">

              <MdLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
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

            {/* Register */}

            <button
              type="submit"
              className="signin-btn"
            >
              Create Account
            </button>

          </form>

          <div className="register-link">

            Already have an account?{" "}

            <Link to="/login">

              Sign In

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;

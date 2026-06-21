import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
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
    <div className="auth-page">
      <div className="auth-card">
        <img
          src="/logo.png"
          alt="DevConnect"
          className="auth-logo"
        />

        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join DevConnect Today
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>
        </form>

        <div className="auth-link">
          <Link to="/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
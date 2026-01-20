import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("movieapp_users") || "[]");
    if (users.find((u) => u.email === email)) {
      setError("User already exists. Please sign in.");
      return;
    }
    // Save user
    users.push({ email, password });
    localStorage.setItem("movieapp_users", JSON.stringify(users));
    // Redirect to sign in
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <div style={{ color: '#ff5252', marginTop: 8 }}>{error}</div>}
      </form>
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
};

export default RegisterPage;

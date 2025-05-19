import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        // Save token, redirect, etc.
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Redirect to dashboard or home page
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue swapping skills!</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} />
          <label>Password</label>
          <input name="password" type="password" placeholder="Enter your password" required value={form.password} onChange={handleChange} />
          <button type="submit" className="landing-btn primary auth-btn">Login</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
        <p className="auth-footer-text">
          Don't have an account? <Link to="/signup" className="landing-navbar-link signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
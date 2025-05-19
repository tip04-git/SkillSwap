import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        // Redirect to login or dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card signup-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join SkillSwap and start growing your skills today!</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="name" type="text" placeholder="Your name" required value={form.name} onChange={handleChange} />
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} />
          <label>Password</label>
          <input name="password" type="password" placeholder="Create a password" required value={form.password} onChange={handleChange} />
          <button type="submit" className="landing-btn primary auth-btn">Sign Up</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
        <p className="auth-footer-text">
          Already have an account? <Link to="/login" className="landing-navbar-link signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
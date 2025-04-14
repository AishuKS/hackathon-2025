// src/pages/Login/LoginPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"sharer" | "finder" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mock login with:", { role, email, password });

    if (role === "sharer") navigate("/sharer-dashboard");
    else if (role === "finder") navigate("/finder-dashboard");
  };

  if (!role) {
    return (
      <div className="login-container">
        <div className="role-box">
          <h2>Select Role</h2>
          <div className="role-buttons">
            <button onClick={() => setRole("sharer")}>Sharer</button>
            <button onClick={() => setRole("finder")}>Finder</button>
          </div>
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{role === "sharer" ? "Sharer Login" : "Finder Login"}</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
        <p>
          Not {role}?{" "}
          <span onClick={() => setRole(null)}>Go back to role selection</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

// src/pages/Home/HomePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content-box">
        <h1 className="title">Plate2Purpose</h1>
        <p className="tagline">Saving food. Serving purpose.</p>

        <p className="description">
        Join a movement to reduce food waste and support communities in need. 
        Whether you’re sharing a meal or finding one, Plate2Purpose makes it simple and impactful.
        </p>

        <div className="button-group">
          <button className="btn primary" onClick={() => navigate("/login")}>Login</button>
          <button className="btn secondary" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

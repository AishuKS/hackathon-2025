// src/pages/SharerDashboard/SharerDashboard.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewMyFoods from "./ViewMyFoods";
import "./SharerDashboard.css";

const SharerDashboard = () => {
  const [viewMode, setViewMode] = useState<"dashboard" | "myfoods">("dashboard");
  const navigate = useNavigate();

  return (
    <div className="sharer-dashboard">
      {viewMode === "dashboard" && (
        <div className="center-content">
          <h2>Welcome, Sharer!</h2>
          <div className="button-container">
            <button onClick={() => navigate("/add-food")}>Add Food</button>
            <button onClick={() => setViewMode("myfoods")}>View My Foods</button>
          </div>
        </div>
      )}

      {viewMode === "myfoods" && (
        <div>
          {/* <button
            className="add-food-btn"
            onClick={() => navigate("/add-food")}
          >
            Add Food
          </button> */}
          <ViewMyFoods />
        </div>
      )}
    </div>
  );
};

export default SharerDashboard;

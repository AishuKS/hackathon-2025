// src/pages/SharerDashboard/SharerDashboard.tsx

import React, { useState } from "react";
import AddFoodModal from "./AddFoodModal";
import ViewMyFoods from "./ViewMyFoods";
import "./SharerDashboard.css";

const SharerDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<"dashboard" | "myfoods">("dashboard");

  return (
    <div className="sharer-dashboard">
      <h2>Welcome, Sharer!</h2>

      {viewMode === "dashboard" && (
        <div className="button-container">
          <button onClick={() => setShowAddModal(true)}>Add Food</button>
          <button onClick={() => setViewMode("myfoods")}>View My Foods</button>
        </div>
      )}

      {viewMode === "myfoods" && (
        <div>
          <button className="back-btn" onClick={() => setViewMode("dashboard")}>⬅ Back</button>
          <ViewMyFoods openModal={() => setShowAddModal(true)} />
        </div>
      )}

      {showAddModal && <AddFoodModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default SharerDashboard;

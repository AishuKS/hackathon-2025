import React, { useState, useEffect } from "react";
import "./SharerDashboard.css";

interface FoodItem {
  id: number;
  food_item: string;
  description?: string;
  status: string;
  food_type: string;
  quantity?: string;
  serving_size?: string;
  pickup_location?: string;
  posted_at?: string;
}

const ViewMyFoods = ({ openModal }: { openModal: () => void }) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    // You can replace this with actual backend call
    setFoods([
      {
        id: 1,
        food_item: "Veg Biryani",
        food_type: "Veg",
        status: "Available",
        description: "Tasty leftover biryani from lunch",
        quantity: "2 boxes",
        serving_size: "1 box per person",
        pickup_location: "Commons Cafeteria",
        posted_at: new Date().toISOString(),
      },
    ]);
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    setFoods((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
    );
  };

  const handleEdit = (food: FoodItem) => {
    console.log("Edit food", food);
    openModal(); // You can pass the selected food for editing later
  };

  return (
    <div className="food-cards-container">
      {foods.map((food) => (
        <div key={food.id} className="food-card">
          <h4>{food.food_item}</h4>
          <p>{food.description}</p>
          <p><strong>Type:</strong> {food.food_type}</p>
          <p><strong>Status:</strong> 
            <select
              value={food.status}
              onChange={(e) => handleStatusChange(food.id, e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="On-Hold">On-Hold</option>
              <option value="Claimed">Claimed</option>
            </select>
          </p>
          <button onClick={() => handleEdit(food)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default ViewMyFoods;

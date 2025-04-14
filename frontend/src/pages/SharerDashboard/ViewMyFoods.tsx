// src/pages/SharerDashboard/ViewMyFoods.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SharerDashboard.css";

interface FoodItem {
  id: number;
  food_item: string;
  description: string;
  status: string;
  food_type: string;
  quantity: string;
  serving_size: string;
  pickup_location: string;
  posted_at: string;
}

const ViewMyFoods = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [updatedId, setUpdatedId] = useState<number | null>(null);

  useEffect(() => {
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
        posted_at: "2025-04-06T08:52:43.861Z",
      },
      {
        id: 2,
        food_item: "Fruit Juice",
        food_type: "Drinks",
        status: "Available",
        description: "Fresh orange juice",
        quantity: "10 bottles",
        serving_size: "1 bottle",
        pickup_location: "Green Farm Counter",
        posted_at: "2025-04-05T18:30:00Z",
      },
      {
        id: 3,
        food_item: "Chicken Curry",
        food_type: "Non-Veg",
        status: "On Hold",
        description: "Spicy and tasty curry",
        quantity: "4 packs",
        serving_size: "1 pack",
        pickup_location: "North Dining",
        posted_at: "2025-04-04T15:10:00Z",
      },
      {
        id: 4,
        food_item: "Pasta",
        food_type: "Veg",
        status: "On Hold",
        description: "Cheesy white sauce pasta",
        quantity: "3 plates",
        serving_size: "1 plate",
        pickup_location: "East Wing",
        posted_at: "2025-04-03T13:00:00Z",
      },
      {
        id: 5,
        food_item: "Samosas",
        food_type: "Veg",
        status: "Claimed",
        description: "Crispy evening snack",
        quantity: "8 pieces",
        serving_size: "2 per person",
        pickup_location: "Tea Point",
        posted_at: "2025-04-02T10:00:00Z",
      },
      {
        id: 6,
        food_item: "Paneer Wrap",
        food_type: "Veg",
        status: "On Hold",
        description: "Delicious grilled paneer wrap",
        quantity: "5 wraps",
        serving_size: "1 wrap",
        pickup_location: "Grill Station",
        posted_at: "2025-04-01T15:45:00Z",
      },
      {
        id: 7,
        food_item: "Burger",
        food_type: "Veg",
        status: "Available",
        description: "Aloo tikki burger",
        quantity: "6 burgers",
        serving_size: "1 per person",
        pickup_location: "Snack Bar",
        posted_at: "2025-03-31T17:00:00Z",
      },
      {
        id: 8,
        food_item: "Fish Fry",
        food_type: "Non-Veg",
        status: "On Hold",
        description: "Spicy fried fish",
        quantity: "5 pieces",
        serving_size: "1 piece",
        pickup_location: "South Kitchen",
        posted_at: "2025-03-30T12:15:00Z",
      },
      {
        id: 9,
        food_item: "Muffins",
        food_type: "Veg",
        status: "Available",
        description: "Chocolate chip muffins",
        quantity: "12 muffins",
        serving_size: "1 muffin",
        pickup_location: "Bakery Corner",
        posted_at: "2025-03-29T08:00:00Z",
      },
      {
        id: 10,
        food_item: "Lemonade",
        food_type: "Drinks",
        status: "Available",
        description: "Cool and fresh lemonade",
        quantity: "20 cups",
        serving_size: "1 cup",
        pickup_location: "Juice Bar",
        posted_at: "2025-03-28T16:00:00Z",
      },
    ]);
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    setFoods((prevFoods) =>
      prevFoods.map((food) =>
        food.id === id ? { ...food, status: newStatus } : food
      )
    );
  };

  const handleUpdate = (id: number) => {
    setUpdatedId(id);
    setTimeout(() => setUpdatedId(null), 3000);
  };

  return (
    <div className="sharer-dashboard no-margin">
      <div className="top-bar">
        <h2>🍽️ My Food Listings</h2>
        <button className="add-food-btn" onClick={() => navigate("/add-food")}>Add Food</button>
      </div>
      <p className="dashboard-subtext">
        Here are the foods you've shared. You can update their status anytime.
      </p>

      <div className="food-cards-container">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <div className="food-header">
              <h4>{food.food_item}</h4>
              {updatedId === food.id && (
                <span className="updated-label">Updated</span>
              )}
            </div>
            <p><strong>Type:</strong> {food.food_type}</p>
            <p><strong>Description:</strong> {food.description}</p>
            <p><strong>Status:</strong> {food.status}</p>
            <p><strong>Quantity:</strong> {food.quantity}</p>
            <p><strong>Serving Size:</strong> {food.serving_size}</p>
            <p><strong>Pickup Location:</strong> {food.pickup_location}</p>
            <p><strong>Posted At:</strong> {new Date(food.posted_at).toLocaleString()}</p>

            <label><strong>Change Status:</strong></label>
            <select
              value={food.status}
              onChange={(e) => handleStatusChange(food.id, e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="On Hold">On Hold</option>
              <option value="Claimed">Claimed</option>
            </select>

            <button onClick={() => handleUpdate(food.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMyFoods;

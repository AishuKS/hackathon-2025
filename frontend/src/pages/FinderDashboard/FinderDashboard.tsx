// src/pages/FinderDashboard/FinderDashboard.tsx

import React, { useEffect, useState } from "react";
import ChatModal from "../ChatModal/ChatModal";
import "./FinderDashboard.css";

interface FoodItem {
  id: number;
  food_item: string;
  description: string;
  food_type: string;
  quantity: string;
  serving_size: string;
  pickup_location: string;
  status: string;
  posted_at: string;
  good_until: string;
  allergens: string[];
  sharer_name?: string;
}

const mockFoodListings: FoodItem[] = [
  {
    id: 1,
    food_item: "Pasta",
    description: "Delicious vegetarian pasta with creamy sauce.",
    food_type: "Veg",
    quantity: "5 boxes",
    serving_size: "1 box",
    pickup_location: "123 Main St, Chicago, IL",
    status: "Available",
    posted_at: "2025-04-06T08:00",
    good_until: "2025-04-07T08:00",
    allergens: ["Wheat", "Milk"],
    sharer_name: "Tasty Cafe",
  },
  {
    id: 2,
    food_item: "Fruit Juice",
    description: "Freshly squeezed orange juice, no added sugar.",
    food_type: "Drinks",
    quantity: "10 bottles",
    serving_size: "1 bottle",
    pickup_location: "456 Oak Ave, Chicago, IL",
    status: "Available",
    posted_at: "2025-04-06T09:00",
    good_until: "2025-04-06T21:00",
    allergens: [],
    sharer_name: "Green Farm",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 3,
    food_item: `Meal Pack ${i + 1}`,
    food_type: i % 3 === 0 ? "Non-Veg" : i % 2 === 0 ? "Veg" : "Vegan",
    description: `Sample meal pack description ${i + 1} with healthy ingredients.`,
    quantity: `${3 + i} packs`,
    serving_size: "1 pack",
    pickup_location: `${100 + i} Demo St, Chicago`,
    status: "Available",
    posted_at: `2025-04-06T${(2 + i).toString().padStart(2, "0")}:00`,
    good_until: `2025-04-07T${(8 + i % 12).toString().padStart(2, "0")}:00`,
    allergens: i % 2 === 0 ? ["Milk"] : [],
    sharer_name: `Test Kitchen ${i + 1}`,
  })),
];

const FinderDashboard = () => {
  const [foodListings, setFoodListings] = useState<FoodItem[]>([]);
  const [chatFoodId, setChatFoodId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    setFoodListings(mockFoodListings);
  }, []);

  const handleChatClick = (foodId: number) => {
    setChatFoodId(foodId);
  };

  const handleCloseChat = () => {
    setChatFoodId(null);
  };

  const handleSendMessage = (msg: string) => {
    if (msg.trim() && chatFoodId !== null) {
      setChatMessages((prev) => ({
        ...prev,
        [chatFoodId]: [...(prev[chatFoodId] || []), msg],
      }));
    }
  };

  return (
    <div className="finder-dashboard">
      <h2>🍽️ Available Food Near You</h2>
      <p className="finder-subtext">
        Scroll through and tap "Chat" to connect with the sharer for pickup!
      </p>
      <div className="food-grid-container">
        <div className="food-grid">
          {foodListings.length === 0 ? (
            <p className="no-food-msg">
              No food listings available at the moment. Please check back later!
            </p>
          ) : (
            foodListings.map((food) => (
              <div key={food.id} className="food-card">
                <div className="food-header">
                  <h3>{food.food_item}</h3>
                  <span className={`status ${food.status.toLowerCase()}`}>{food.status}</span>
                </div>
                <p><strong>From:</strong> {food.sharer_name}</p>
                <p><strong>Type:</strong> {food.food_type}</p>
                <p><strong>Description:</strong> {food.description}</p>
                <p><strong>Quantity:</strong> {food.quantity}</p>
                <p><strong>Serving Size:</strong> {food.serving_size}</p>
                <p><strong>Pickup Location:</strong> {food.pickup_location}</p>
                <p><strong>Available Until:</strong> {new Date(food.good_until).toLocaleString()}</p>
                <p><strong>Allergens:</strong> {food.allergens.length > 0 ? food.allergens.join(", ") : "None"}</p>
                <button className="chat-btn" onClick={() => handleChatClick(food.id)}>
                  💬 Chat with Sharer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {chatFoodId !== null && (
        <ChatModal
          foodItem={foodListings.find((f) => f.id === chatFoodId)!}
          messages={chatMessages[chatFoodId] || []}
          onSend={handleSendMessage}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
};

export default FinderDashboard;

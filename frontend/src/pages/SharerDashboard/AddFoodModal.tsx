// src/pages/SharerDashboard/AddFoodModal.tsx

import React, { useState } from "react";
import "./SharerDashboard.css";

const allergenOptions = [
  "Peanuts", "Tree Nuts", "Milk", "Eggs", "Fish", "Shellfish", "Wheat", "Soy"
];

const foodTypes = ["Veg", "Non-Veg", "Vegan", "Drinks"];

const AddFoodModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    food_item: "",
    food_type: "",
    description: "",
    quantity: "",
    serving_size: "",
    pickup_location: "",
    good_until: "",
    status: "Available",
    posted_at: new Date().toISOString().slice(0, 16),
    allergens: [] as string[]
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllergens = (e: any) => {
    const selected = Array.from(e.target.selectedOptions, (option: any) => option.value);
    setFormData(prev => ({ ...prev, allergens: selected }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting food:", formData);
    onClose();
  };

  const clearForm = () => {
    setFormData({
      food_item: "",
      food_type: "",
      description: "",
      quantity: "",
      serving_size: "",
      pickup_location: "",
      good_until: "",
      status: "Available",
      posted_at: new Date().toISOString().slice(0, 16),
      allergens: []
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        <h3>Add Food Listing</h3>
        <form onSubmit={handleSubmit}>
          <input name="food_item" placeholder="Food Item" required onChange={handleChange} />

          <select name="food_type" required onChange={handleChange}>
            <option value="">Select Type</option>
            {foodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <textarea name="description" placeholder="Description" onChange={handleChange} />

          <input name="quantity" placeholder="Quantity" onChange={handleChange} />
          <input name="serving_size" placeholder="Serving Size" required onChange={handleChange} />

          <input
            name="pickup_location"
            placeholder="Pickup Location (auto-fill with Google Maps)"
            onChange={handleChange}
          />

          <input
            type="datetime-local"
            name="good_until"
            onChange={handleChange}
          />

          <input
            name="status"
            value="Available"
            disabled
          />

          <input
            name="posted_at"
            value={formData.posted_at}
            readOnly
          />

          <label>Allergens</label>
          <select multiple onChange={handleAllergens}>
            {allergenOptions.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={clearForm}>Clear</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;

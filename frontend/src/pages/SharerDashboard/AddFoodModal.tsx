import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaMicrophone } from "react-icons/fa";
import "./AddFoodModal.css";

const foodTypes = ["vegetarian", "non-vegetarian", "vegan", "drinks"];
const allergenOptions = [
  "Peanuts",
  "Tree Nuts",
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Wheat",
  "Soy",
];

const AddFoodModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sharer_id: "31187ac6-d859-4821-9daa-143888751477",
    food_item: "None",
    food_type: "None",
    quantity: "None",
    serving_size: "None",
    pickup_location: "None",
    good_until: new Date().toISOString().slice(0, 16), // current datetime
    status: "available",
    allergens: "None",
  });

  const allergenOptionsSelect = allergenOptions.map((a) => ({ label: a, value: a }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "None" }));
  };

  const handleAllergenChange = (selected: any) => {
    const values = selected.map((opt: any) => opt.value);
    const joined = values.length > 0 ? values.join(", ") : "None";
    setFormData((prev) => ({ ...prev, allergens: joined }));
  };

  const handleVoiceInput = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Transcript:", transcript);

      const fields: { [key: string]: string } = {
        food_item: "food item",
        food_type: "food type",
        quantity: "quantity",
        serving_size: "serving size",
        pickup_location: "pickup location",
        allergens: "allergens",
      };

      const updates: { [key: string]: string } = {};

      Object.entries(fields).forEach(([field, label], index, arr) => {
        const currentIndex = transcript.indexOf(label);
        if (currentIndex !== -1) {
          const nextLabel = arr[index + 1]?.[1];
          const endIndex = nextLabel ? transcript.indexOf(nextLabel) : transcript.length;
          const value = transcript
            .slice(currentIndex + label.length, endIndex)
            .trim();
          updates[field] = value;
        }
      });

      // Special: convert allergens to array form for multi-select
      if (updates.allergens) {
        const values = updates.allergens
          .split(" ")
          .map((word) => word.trim())
          .filter((w) => allergenOptions.map((a) => a.toLowerCase()).includes(w));
        const matched = allergenOptionsSelect.filter((o) =>
          values.includes(o.label.toLowerCase())
        );
        handleAllergenChange(matched);
      }

      // Fill the form fields with parsed data
      setFormData((prev) => ({
        ...prev,
        ...updates,
      }));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event);
    };

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Food data to submit:", formData);
    navigate("/myfoods");
  };

  return (
    <div className="add-food-modal">
      <div className="title-bar">
        <h2 className="form-title">Add Food</h2>
        <button className="mic-button" onClick={handleVoiceInput}>
          <FaMicrophone />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Food Item</label>
        <input name="food_item" value={formData.food_item} onChange={handleChange} />

        <label>Food Type</label>
        <select name="food_type" value={formData.food_type} onChange={handleChange}>
          <option value="">Select Type</option>
          {foodTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Quantity</label>
        <input name="quantity" value={formData.quantity} onChange={handleChange} />

        <label>Serving Size</label>
        <input name="serving_size" value={formData.serving_size} onChange={handleChange} />

        <label>Pickup Location</label>
        <input name="pickup_location" value={formData.pickup_location} onChange={handleChange} />

        <label>Good Until (Date & Time)</label>
        <input
          type="datetime-local"
          name="good_until"
          value={formData.good_until}
          onChange={handleChange}
        />

        <label>Select Allergens</label>
        <Select
          isMulti
          options={allergenOptionsSelect}
          onChange={handleAllergenChange}
          className="allergen-dropdown"
          menuPlacement="top"
        />

        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFoodModal;

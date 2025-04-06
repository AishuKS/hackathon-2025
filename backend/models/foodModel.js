const db = require('./db');

// Get all available food listings
const getAllFood = (callback) => {
    db.query('SELECT * FROM food_listings WHERE status = "available"', callback);
};

// Get food by ID
const getFoodById = (foodId, callback) => {
    db.query('SELECT * FROM food_listings WHERE id = ?', [foodId], callback);
};

// Create a new food listing
const createFoodListing = (foodData, callback) => {
    const { sharerId, foodName, foodDescription, foodQuantity, foodLocation } = foodData;
    db.query(
        'INSERT INTO food_listings (sharerId, foodName, foodDescription, foodQuantity, foodLocation, status) VALUES (?, ?, ?, ?, ?, "available")',
        [sharerId, foodName, foodDescription, foodQuantity, foodLocation],
        callback
    );
};

// Update food listing
const updateFoodListing = (foodId, foodData, callback) => {
    const { foodName, foodDescription, foodQuantity, foodLocation } = foodData;
    db.query(
        'UPDATE food_listings SET foodName = ?, foodDescription = ?, foodQuantity = ?, foodLocation = ? WHERE id = ?',
        [foodName, foodDescription, foodQuantity, foodLocation, foodId],
        callback
    );
};

// Change food status (available, on-hold, claimed)
const updateFoodStatus = (foodId, status, callback) => {
    db.query('UPDATE food_listings SET status = ? WHERE id = ?', [status, foodId], callback);
};

module.exports = { getAllFood, getFoodById, createFoodListing, updateFoodListing, updateFoodStatus };

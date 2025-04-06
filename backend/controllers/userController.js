const userModel = require('../models/userModel');

// Get user profile by ID
const getUserProfile = (req, res) => {
    const userId = req.params.id;

    userModel.getUserById(userId, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('User not found');
        res.json(result[0]);
    });
};

// Update user profile by ID
const updateUserProfile = (req, res) => {
    const userId = req.params.id;
    const { username, email, location } = req.body;

    const updatedData = { username, email, location };

    userModel.updateUserById(userId, updatedData, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

module.exports = { getUserProfile, updateUserProfile };

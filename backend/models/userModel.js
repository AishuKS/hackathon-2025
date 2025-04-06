const db = require('./db');

// Get user by ID
const getUserById = (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], callback);
};

// Update user by ID
const updateUserById = (userId, updatedData, callback) => {
    const { username, email, location } = updatedData;
    db.query(
        'UPDATE users SET username = ?, email = ?, location = ? WHERE id = ?',
        [username, email, location, userId],
        callback
    );
};

module.exports = { getUserById, updateUserById };

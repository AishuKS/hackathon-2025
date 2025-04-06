const db = require('./db');

// Get chats by food ID
const getChatsByFoodId = (foodId, callback) => {
    db.query('SELECT * FROM chats WHERE foodId = ?', [foodId], callback);
};

// Send a new chat message
const createChatMessage = (chatData, callback) => {
    const { sharerId, takerId, foodId, message } = chatData;
    db.query(
        'INSERT INTO chats (sharerId, takerId, foodId, message) VALUES (?, ?, ?, ?)',
        [sharerId, takerId, foodId, message],
        callback
    );
};

module.exports = { getChatsByFoodId, createChatMessage };

const chatModel = require('../models/chatModel');

// POST /api/chat/send
const { addMessage, getMessages } = require('../chatMemory');

const sendChatMessage = (req, res) => {
  const { sender_id, receiver_id, listing_id, message } = req.body;

  if (!sender_id || !receiver_id || !listing_id || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const chat = {
    from: sender_id,
    to: receiver_id,
    message,
    listing_id,
    timestamp: new Date().toISOString()
  };

  addMessage(listing_id, chat);

  res.status(200).json({ message: 'Message sent', chat });
};

// GET /api/chat/history/:listingId
const getChatHistory = (req, res) => {
    const { listingId } = req.params;
    const history = getMessages(listingId);
  
    res.status(200).json({ listingId, history });
  };
  
module.exports = { sendChatMessage, getChatHistory };

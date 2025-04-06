const express = require('express');        // ✅ correct
const router = express.Router();           // ✅ using express router

const { sendChatMessage, getChatHistory } = require('../controllers/chatController');

router.post('/send', sendChatMessage);
router.get('/history/:listingId', getChatHistory);

module.exports = router;

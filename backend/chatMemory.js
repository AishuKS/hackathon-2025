const chatMessages = {}; // key = listing_id

function addMessage(listingId, message) {
  if (!chatMessages[listingId]) chatMessages[listingId] = [];
  chatMessages[listingId].push(message);
}

function getMessages(listingId) {
  return chatMessages[listingId] || [];
}

module.exports = { addMessage, getMessages };

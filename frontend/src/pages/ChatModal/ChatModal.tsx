// src/pages/FinderDashboard/ChatModal.tsx

import React, { useState } from "react";
import "./ChatModal.css";

interface ChatModalProps {
  foodItem: {
    id: number;
    food_item: string;
    sharer_name?: string;
  };
  messages: string[];
  onSend: (msg: string) => void;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ foodItem, messages, onSend, onClose }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-box">
        <div className="chat-modal-header">
          <h3>Chat about {foodItem.food_item}</h3>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className="chat-message">{msg}</div>
          ))}
        </div>
        <div className="chat-input-area">
          <textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;

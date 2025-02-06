"use client";

import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Update UI with user message
    const newChat = [...chat, { user: message, bot: "Typing..." }];
    setChat(newChat);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      newChat[newChat.length - 1].bot = data.response;
      setChat([...newChat]);
    } catch (error) {
      console.error("Error sending message:", error);
      newChat[newChat.length - 1].bot = "Error connecting to server.";
      setChat([...newChat]);
    }

    setMessage("");
  };

  return (
    <div className="p-4 border rounded-lg w-96">
      <h2 className="text-lg font-bold">Annieyy Chatbot</h2>
      <div className="h-64 overflow-y-auto p-2 border my-2 bg-gray-100 rounded">
        {chat.map((c, index) => (
          <div key={index}>
            <p><strong>You:</strong> {c.user}</p>
            <p><strong>Bot:</strong> {c.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

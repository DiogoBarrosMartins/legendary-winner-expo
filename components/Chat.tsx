import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './css/Chat.css';
const SystemMessage = {
  id: 1,
  body: "Welcome to the Nest Chat app",
  author: "Bot",
};

const socket = io("http://localhost:3000", { autoConnect: false });

type ChatProps = {
  currentUser: string; // Current user's name
  onLogout: () => void; // Logout function
};

export function Chat({ currentUser, onLogout }: ChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([SystemMessage]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("chat", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
    };
  }, []);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || inputValue.trim() === "") return;

    socket.emit("chat", { author: currentUser, body: inputValue.trim() });
    setInputValue("");
  };

  const handleLogout = () => {
    socket.disconnect();
    onLogout();
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <span>Nest Chat App</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, idx) => (
          <div key={idx} className={`message ${currentUser === message.author ? "outgoing" : "incoming"}`}>
            <span className="author">{message.author}</span>
            <div className="message-body">{message.body}</div>
          </div>
        ))}
      </div>
      <div className="chat-composer">
        <input
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSendMessage}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}

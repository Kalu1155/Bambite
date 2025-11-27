import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { RiSendPlane2Line, RiAttachment2 } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

const Support = () => {
  const categories = [
    "General",
    "Orders",
    "Payments",
    "Reservations",
    "Wallet",
  ];

  const [activeCat, setActiveCat] = useState("General");

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "support",
      text: "Hello Kalu 👋\nHow may we help you today?",
      time: "10:12 AM",
    },
  ]);

  const [messageInput, setMessageInput] = useState("");

  const [ticketId] = useState(`#${Math.floor(10000 + Math.random() * 90000)}`);

  const sendMessage = () => {
    if (messageInput.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      from: "user",
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setMessageInput("");

    // Simulate automatic support reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "support",
          text: "Thanks for reaching out, we’ll get back shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1500);
  };

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="home-push customer-home container support-page">
        {/* PAGE TITLE */}
        <h2 className="page-title">
          Support
          <BiSupport />
        </h2>
        <p className="ticket-id">Ticket ID: {ticketId}</p>

        {/* CATEGORIES */}
        <div className="support-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCat === cat ? "active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CHAT BOX */}
        <div className="chat-box">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.from === "user" ? "me" : "them"}`}
            >
              <p className="msg-text">{msg.text}</p>
              <span className="msg-time">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* MESSAGE INPUT */}
        <div className="chat-input ">
          <label className="attach-btn">
            <RiAttachment2 size={22} />
            <input type="file" hidden />
          </label>

          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />

          <button className="send-btn" onClick={sendMessage}>
            <RiSendPlane2Line size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Support;

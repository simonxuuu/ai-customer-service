import React from "react";

export default function Message({ text, isBot }) {
    return (
        <div className={`chat-box-message ${isBot ? "ai" : ""}`}>
            <p className="message-text">{text}</p>
        </div>
    );
}
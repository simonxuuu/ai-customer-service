import React from "react";

export default function ChatBox({children}) {
  return (
    <main>
      <div className="chat-box">
        <div className="chat-box-header">
          <h1>AI Customer Support</h1>
        </div>
        <div className="chat-box-body">
            {children}
        </div>
        <div className="chat-box-footer">
          <input type="text" placeholder="Type your message" />
          <button type="submit">Send</button>
        </div>
      </div>
    </main>
  );
}
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className="chat-box">
        <div className="chat-box-header">
          <h1>AI Customer Support</h1>
        </div>
        <div className="chat-box-body">
          <div className="chat-box-message">
            <p>Hi! How can I help you today?</p>
          </div>
        </div>
        <div className="chat-box-footer">
          <input type="text" placeholder="Type your message" />
          <button type="submit">Send</button>
        </div>
      </div>
    </main>
  );
}

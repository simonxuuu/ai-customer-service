'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Message from "./Message";
import { useEffect, useState, useRef } from "react";
import { useAmp} from "next/amp";
import { sendToLlama } from "./api/route";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatBoxBodyRef = useRef(null);

  const addMessage = (id, text, isBot) => {
    setMessages([...messages, { id, text, isBot }]);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      
      addMessage(messages.length + 1, inputValue, false);
     
      //sendToLlama(messages.length,inputValue.trim(),addMessage);
      
      //addMessage(messages.length+1, sendToLlama(inputValue.trim()), true)
     // addMessage(3, "Hello! How can I help you today?", true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };
  
  useEffect(() => {
    //.addMessage(1, "Hey!", false);
    console.log(messages);
    if(messages.length == 0 ){  addMessage(1, "Hello! How can I help you today?", true);}
    if(messages.length > 0 && messages[messages.length-1].isBot == false) {
      sendToLlama(messages.length,inputValue.trim(),addMessage);
      setInputValue("");
    }
   
    
  }, [messages]);

  useEffect(() => {
    if (chatBoxBodyRef.current) {
      chatBoxBodyRef.current.scrollTop = chatBoxBodyRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <main>
      <div className="chat-box">
        <div className="chat-box-header">
          <h1>AI Customer Support</h1>
        </div>
        <div className="chat-box-body" ref={chatBoxBodyRef}>
          
          {messages.map((message) => (
              <Message
                key={message.id}
                text={message.text}
                isBot={message.isBot}
              />
            ))}
        </div>
        <div className="chat-box-footer">
          <input
            type="text"
            placeholder="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
         <button type="submit" onClick={handleSendClick}>Send</button>
        </div>
      </div>
    </main>
  );
}

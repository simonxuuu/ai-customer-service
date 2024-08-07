'use client';

import { useEffect, useState, useRef } from "react";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatBoxBodyRef = useRef(null);
  const initialMessageAdded = useRef(false);

  const addMessage = (text, isBot) => {
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text, isBot }]);
  };

  const removeLoadingMessage = () => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.text !== "..."));
  };

  const getContext = async (messages) => {
    let context = "";
    
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.isBot) {
        context += `Assistant: ${message.text}\n`;
      } else {
        context += `User: ${message.text}\n`;
      }
    }
  
    return context;
  };

  const sendMessageToApi = async (clientMessage, messages) => {
    try {
      const context = await getContext(messages);
      const fullMessage = context + "User: " + clientMessage;
      setIsWaiting(true);
      addMessage("...", true);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientMessage: fullMessage })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      removeLoadingMessage();
      addMessage(data.content, true);
    } catch (error) {
      console.error('Error sending message to API:', error);
      removeLoadingMessage();
    } finally {
      setIsWaiting(false);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && !isWaiting) {
      addMessage(inputValue, false);
      sendMessageToApi(inputValue.trim(), messages);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!initialMessageAdded.current) {
      addMessage("Hello! How can I help you today?", true);
      initialMessageAdded.current = true;
    }
  }, []);

  useEffect(() => {
    if (chatBoxBodyRef.current) {
      chatBoxBodyRef.current.scrollTop = chatBoxBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`chat-box ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-box-header" onClick={() => setIsMinimized(!isMinimized)}>
        <span>Customer Support</span>
        <button className="minimize-button">
          {isMinimized ? '+' : '-'}
        </button>
      </div>

      {!isMinimized && (
        <>
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
              disabled={isWaiting}
            />
            <button type="submit" onClick={handleSendMessage} disabled={isWaiting}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
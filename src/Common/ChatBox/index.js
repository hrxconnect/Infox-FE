

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { formatBotMessage } from "../../Helper/Bot.js";

export default function ChatBox({
  handleEventStream,
  messages,
  setMessages,
  tooltips,
  setTooltips,
}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef(null); // Create a ref for the messages container

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (message) => {
      setMessages(prev => [...prev, { type: "user", message }]);
      setMessages(prev => [...prev, { type: "bot", message: "..." }]);
      
      setIsLoading(true);
      try {
          await handleEventStream(message);
      } catch (error) {
          console.error('Submit error:', error);
      } finally {
        
          setIsLoading(false);
      }
      setInputText('');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return;
        sendMessage(inputText)
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) { 
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const handleTooltipClick = (tooltip) => {

      sendMessage(tooltip)
      setTooltips([]); // Clear all tooltips after sending the message
  };




    return (
      <div className="chat-bot-content">
        <div className="text-area">
            {messages.map((ele, index) => (
                <div key={index} className="message-container">
                  {ele.type === "bot" ? (
                    <div className="botMessage">
                      <img src={Fox} alt="" height={36} width={36} />
                      <span className="message-text" dangerouslySetInnerHTML={{ __html: formatBotMessage(ele.message) }} />
                    </div>
                  ) : (
                    <div className="userMessage">
                      <span className="message-text">{ele.message}</span>
                      <div>
                        <FaRegUser className="user-icon" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            <div ref={messagesEndRef} /> {/* This div will be scrolled into view */}
        </div>
        {tooltips && (
              <div className="tooltips">
                {tooltips.map((tooltip, index) => (
                    <button 
                        key={index} 
                        className="tooltip-card" 
                        onClick={() => handleTooltipClick(tooltip)}
                    >
                        {tooltip}
                    </button>
                ))}
              </div>
            )}
        <div>
          <form onSubmit={handleSubmit}  className="pt-site-footer__submit">
            <input
              type="text"
              placeholder="Message Infox"
              className="searchKeyText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
           
            <button 
              type="submit" 
              className="send-btn" 
              disabled={isLoading}
            >
              <FaArrowRight />
            </button>
          </form>
        </div>
   
      </div>
    );
}

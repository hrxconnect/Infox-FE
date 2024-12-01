import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import axios from 'axios';

export default function Assists() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { type: "bot", message: "Welcome to Grants Assist! What can I help you with today?" }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef(null); // Create a ref for the messages container

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleEventStream = async (userQuery) => {
        const url = 'http://app.infox.bot/api/relay_chat/';
        let fullMessage = '';
        
        try {
            console.log('Sending query:', userQuery);
            const response = await axios.post(url, {
                query: userQuery
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            console.log('API Response:', response.data);

            // Convert the JSON response to a string
            if (Array.isArray(response.data)) {
                // Combine the messages into a single string
                fullMessage = response.data.map(item => item.data).join(' ');
            } else {
                fullMessage = response.data.data || "No data received from the server.";
            }

            // Replace specific patterns to maintain formatting
            fullMessage = fullMessage
                .replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
                .replace(/(Question \d+:)/g, '<span class="question">$1</span>') // Style questions
                .replace(/(Options:)/g, '<span class="options">$1</span>'); // Style options

            // Format the message for markdown
            fullMessage = formatBotMessage(fullMessage); // Call the formatting function

            setMessages(prev => [
                ...prev.slice(0, -1),
                { type: "bot", message: fullMessage }
            ]);
        } catch (error) {
            console.error('Stream error:', error);
            setMessages(prev => [
                ...prev,
                { type: "bot", message: "Sorry, I encountered an error. Please try again." }
            ]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return;

        setMessages(prev => [...prev, { type: "user", message: inputText }]);
        
        setMessages(prev => [...prev, { type: "bot", message: "..." }]);
        
        setIsLoading(true);
        try {
            await handleEventStream(inputText);
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsLoading(false);
        }
        setInputText('');
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) { 
            e.preventDefault();
            handleSubmit(e);
        }
    }

    // Function to format the bot message
    const formatBotMessage = (message) => {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic text
    };

    return (
        <div>
            <CommonHeader />
            <div className="context">
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
                                    <div className="user-icon-container">
                                        <FaRegUser className="user-icon" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* This div will be scrolled into view */}
                </div>
                <form onSubmit={handleSubmit} className="pt-site-footer__submit">
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
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
        const url = `http://99.79.97.86/chat_stream/grants/${encodeURIComponent(userQuery)}`;
        let fullMessage = '';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const text = await response.text(); // Get the raw response text
            console.log('Raw response:', text); // Log the raw response

            // Extract values from the concatenated JSON objects
            const regex = /{"data": "(.*?)"}/g; // Regex to match the data values
            let match;

            while ((match = regex.exec(text)) !== null) {
                fullMessage += match[1] + ' '; // Concatenate the matched values
            }

            // Clean up the message
            fullMessage = fullMessage.trim(); // Trim whitespace

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
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
            .replace(/(Question \d+:)/g, '<span class="question">$1</span>') // Style questions
            .replace(/(Options:)/g, '<span class="options">$1</span>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
            .replace(/(http[s]?:\/\/[^\s]+)/g, (url) => {
                return `<button class="link-button" onclick="window.open('${url}', '_blank')">${url}</button>`;
            }) // Convert URLs to links
            .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Convert ### to <h3>
            .replace(/## (.*?)\n/g, '<h2>$1</h2>') // Convert ## to <h2>
            .replace(/# (.*?)\n/g, '<h1>$1</h1>') // Convert # to <h1>
            .replace(/\n/g, '<br/>')
            .replace(/\\n/g, '<br/>');  // Style options
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
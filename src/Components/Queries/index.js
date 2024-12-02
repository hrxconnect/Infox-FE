import { useNavigate } from "react-router-dom";
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import { useState, useRef, useEffect } from "react";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import axios from 'axios';
import ChatBox from "../../Common/ChatBox/index.js";
import { formatBotMessage } from "../../Helper/Bot.js";

export default function Queries() {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [botMessages, setBotMessages] = useState([
        { type: "bot", message: "Welcome to HR Queries! What can I help you with today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [tooltips, setTooltips] = useState([
        "Vacation", "Payroll", "Insurance", "Terminations & Layoffs", "Maternity & Paternity Leaves"
    ]);
    
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [botMessages]);

    const handleEventStream = async (userQuery) => {
        const url = 'https://app.infox.bot/api/relay_chat/';
        let fullMessage = '';

        try {
            const response = await axios.post(url, {
                query: userQuery,
                use_case: "hr" // Ensure use_case is passed correctly
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            console.log('API Response:', response.data);

            // Extract values from the concatenated JSON objects
            const responseText = response.data;
            const regex = /{"data": "(.*?)"}/g; // Regex to match the data values
            let match;

            while ((match = regex.exec(responseText)) !== null) {
                fullMessage += match[1] + ' '; // Concatenate the matched values
            }

            // Clean up the message
            fullMessage = fullMessage.trim(); // Trim whitespace

            // Format the message for markdown
            fullMessage = formatBotMessage(fullMessage); // Call the formatting function

            setBotMessages(prev => [
                ...prev.slice(0, -1),
                { type: "bot", message: fullMessage }
            ]);
        } catch (error) {
            console.error('Stream error:', error);
            setBotMessages(prev => [
              ...prev.slice(0, -1),
                { type: "bot", message: "Sorry, I encountered an error. Please try again." }
            ]);
        }
    };


    return (
        <div>
            <CommonHeader />
            <ChatBox 
              messages={botMessages} 
              setMessages={setBotMessages} 
              handleEventStream={handleEventStream} 
              setTooltips={setTooltips} 
              tooltips={tooltips}
            />
        </div>
    );
}

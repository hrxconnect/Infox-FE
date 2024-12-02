import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import axios from 'axios';
import ChatBox from "../../Common/ChatBox/index.js";
import { formatBotMessage } from "../../Helper/Bot.js";

export default function Assists() {
    const [messages, setMessages] = useState([
        { type: "bot", message: "Welcome to Grants Assist! What can I help you with today?" }
    ]);

    


    const handleEventStream = async (userQuery) => {
        const url = `http://app.infox.bot/api/relay_chat/`;
        let fullMessage = '';

        try {
		
	    const response = await axios.post(url, {
                query: userQuery,
                use_case: "grants"
            }, {
		    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
			    }
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
              ...prev.slice(0, -1),
                { type: "bot", message: "Sorry, I encountered an error. Please try again." }
            ]);
        }
    };



    return (
      <div>
          <CommonHeader />
          <ChatBox setMessages={setMessages} messages={messages} handleEventStream={handleEventStream}/>
          
      </div>
    );
}

import { useNavigate } from "react-router-dom";
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import { useState, useRef, useEffect } from "react";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import axios from 'axios';

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

    const handleEventStream = async (userQuery, use_case) => {
        const url = 'http://app.infox.bot/api/relay_chat/';
        let fullMessage = '';

        try {
            const response = await axios.post(url, {
                query: userQuery,
                use_case
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            if (response.data && response.data.data) {
                fullMessage += response.data.data;
                setBotMessages(prev => [
                    ...prev.slice(0, -1),
                    { type: "bot", message: fullMessage }
                ]);
            } else {
                setBotMessages(prev => [
                    ...prev,
                    { type: "bot", message: "No data received from the server." }
                ]);
            }
        } catch (error) {
            console.error('Stream error:', error);
            setBotMessages(prev => [
                ...prev,
                { type: "bot", message: "Sorry, I encountered an error. Please try again." }
            ]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return;

        setBotMessages(prev => [...prev, { type: "user", message: inputText }]);
        setBotMessages(prev => [...prev, { type: "bot", message: "..." }]);
        setIsLoading(true);
        
        try {
            await handleEventStream(inputText, "queries");
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsLoading(false);
        }
        setInputText('');
    };

    const handleTooltipClick = (tooltip) => {
        setBotMessages(prev => [...prev, { type: "user", message: tooltip }]);
        setTooltips([]); // Clear all tooltips after sending the message
    };
    const handleKeyPress = (e) => {
        if(e.keyCode === 13) { 
            e.preventDefault();
            handleSubmit(e);
        }
    }
    return (
        <div>
            <CommonHeader />
            <div className="context">
                <div className="text-area">
                    {botMessages.map((ele, index) => (
                        <div key={index} className="message-container">
                            {ele.type === "bot" ? (
                                <div className="botMessage">
                                    <img src={Fox} alt="" height={36} width={36} />
                                    <span className="message-text" dangerouslySetInnerHTML={{ __html: ele.message }} />
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
                    <div ref={messagesEndRef} />
                </div>
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
                <div className="pt-site-footer__submit">
                    <input
                        type="text"
                        placeholder="Message Infox"
                        className="searchKeyText"
                        value={inputText}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button 
                        className="send-btn" 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useNavigate } from "react-router-dom";
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import { useState, useRef, useEffect } from "react";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight, FaRegUser } from "react-icons/fa";

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
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({ query: userQuery, use_case })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                try {
                    const data = JSON.parse(chunk);
                    if (data.data) {
                        fullMessage += data.data;
                        setBotMessages(prev => [
                            ...prev.slice(0, -1),
                            { type: "bot", message: fullMessage }
                        ]);
                    }
                } catch (e) {
                    const lines = chunk.split('\n').filter(line => line.trim());
                    for (const line of lines) {
                        try {
                            const data = JSON.parse(line);
                            if (data.data) {
                                fullMessage += data.data;
                                setBotMessages(prev => [
                                    ...prev.slice(0, -1),
                                    { type: "bot", message: fullMessage }
                                ]);
                            }
                        } catch (innerError) {
                            console.error('Parsing line failed:', innerError);
                        }
                    }
                }
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default behavior (new line)
            handleSubmit(e); // Call handleSubmit
        }
    };

    const handleTooltipClick = (tooltip) => {
        setBotMessages(prev => [...prev, { type: "user", message: tooltip }]);
        setTooltips([]); // Clear all tooltips after sending the message
    };

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
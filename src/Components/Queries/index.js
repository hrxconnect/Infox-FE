import { useNavigate } from "react-router-dom";
import './style.css';
import CommonHeader from "../../Common/CommonHeader/index.js";
import { useState, useEffect } from "react";
import Fox from '../../Assets/Fox.png';
import { FaArrowRight } from "react-icons/fa";

export default function Queries() {
  const navigate = useNavigate();
  const [botMessages, setBotMessages] = useState([
    { type: "bot", message: "Welcome to HR Queries! What can I help you with today?" }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const [context, setContext] = useState('');
  // const [reformulated, setReformulated] = useState('');

  const handleEventStream = (userQuery) => {
    return new Promise((resolve, reject) => {
      const url = 'http://app.infox.bot/api/relay_chat/';
      let fullMessage = '';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        function readStream() {
          return reader.read().then(({done, value}) => {
            if (done) {
              resolve(fullMessage);
              return;
            }
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());
            
            lines.forEach(line => {
              try {
                const data = JSON.parse(line);
                if (data.data) {
                  fullMessage += data.data;
                  setBotMessages(prev => [
                    ...prev.slice(0, -1),
                    { type: "bot", message: fullMessage }
                  ]);
                }
              } catch (e) {
                console.error('Parsing chunk failed:', e, line);
              }
            });
            
            return readStream();
          });
        }

        return readStream();
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setBotMessages((prev) => [
          ...prev,
          { type: "bot", message: `An error occurred: ${error.message}` }
        ]);
        reject(error);
      });
    });
  };

  const handleSubmit = async () => {
    if (!userMessage) return;
    
    setLoading(true);
    setBotMessages((prev) => [...prev, { type: "user", message: userMessage }]);
    
    try {
      await handleEventStream(userMessage);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setUserMessage('');
      setLoading(false);
    }
  };

  return (
    <div>
      <CommonHeader />
      <div className="context">
        <div className="text-area">
          {botMessages.map((ele, index) => (
            <div key={index}>
              {ele.type === "bot" ? (
                <div className="botMessage">
                  <img src={Fox} alt="" height={36} width={36} />
                  {ele.message}
                </div>
              ) : (
                <div className="userMessage">
                  {ele.message}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pt-site-footer__submit">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Message Infox"
            className="searchKeyText"
          />
          <button className="send-btn" onClick={handleSubmit}>
            {loading ? 'Sending...' : <FaArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useNavigate, BrowserRouter, Route, Switch } from "react-router-dom";
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import { useState } from "react";
import Fox from '../../Assets/Fox.png'
import { FaArrowRight } from "react-icons/fa";

export default function Queries() {
    const navigate = useNavigate();
    const [pathState, setPathState] = useState('')
    const [botMessages, setbotMessages] = useState([
        { type: "bot", message: "Welcome to HR Queries! What can I help you with today?" }
    ])
    return (
        <div>
            <CommonHeader></CommonHeader>
            <div className="context">
                <div className="text-area">
                    {botMessages.map((ele) => {
                        return (
                            <div>
                                {ele.type === "bot" ?
                                    <div className="botMessage">
                                        <img src={Fox} alt="" height={36} width={36} />
                                        {ele.message}
                                    </div>
                                    :
                                    <div className="userMessage">
                                        {ele.message}
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="tooltips">
                    <div className="tooltip-card">
                        <span>Vacation</span>
                    </div>
                    <div className="tooltip-card">
                        <span>Payroll</span>
                    </div>
                    <div className="tooltip-card">
                        <span>Insurance</span>
                    </div>
                    <div className="tooltip-card">
                        <span>Terminations & Layoffs</span>
                    </div>
                    <div className="tooltip-card">
                        <span>Maternity & Paternity Leaves</span>
                    </div>
                </div>
                <div className="pt-site-footer__submit">
                    <input type="email" placeholder="Message Infox" className="searchKeyText" />
                    <button className="send-btn"><FaArrowRight /></button>
                </div>
            </div>

        </div>
    )
}
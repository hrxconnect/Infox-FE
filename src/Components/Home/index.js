/* eslint-disable no-unused-vars */
import { useNavigate, BrowserRouter, Route, Switch } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo.png';
import { FaBalanceScale } from "react-icons/fa";
import { LiaHandshakeSolid } from "react-icons/lia";
import Banner from '../../Assets/banner.png'
import CommonHeader from "../../Common/CommonHeader/index.js";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <CommonHeader></CommonHeader>
            <div className="content">
                <div className="banner-img">
                    <img src={Banner} width={'100%'} alt="" />
                </div>
                <div className="sectionCards">
                    <div className="imgLogoSection">
                        <img src={logo} height={30} width={100} alt="" />
                    </div>
                    <div className="topicCards">
                        <div className="topicCard card" onClick={() => navigate('/assists')}>
                            <div className="card-body">
                                <FaBalanceScale color="#027BFF" size={24} />
                                <h5 className="card-title">Grants Assist</h5>
                                <p className="card-text">Access a curated list of grants you may qualify for.</p>
                            </div>
                        </div>
                        <div className="topicCard card" onClick={() => navigate('/queries')}>
                            <div className="card-body">
                                <LiaHandshakeSolid color="#24CA71" size={24} />
                                <h5 className="card-title">HR Queries</h5>
                                <p className="card-text">Get answers to HR legislation and compliance questions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../Common/CommonHeader/index.js";
import './style.css';
import { useEffect, useState } from "react";
import axios from 'axios'; // Import axios
import LandingHeader from "../../Common/LandingHeader/index.js";
import hrxExperts from '../../Assets/HRXExperts.png'

export default function Landing() {
    const navigate = useNavigate();
   

    return (
        <div>
            <LandingHeader/>
           <div className="experts-container">
            <div className="text4">
                    Our HR Experts
              </div>
              <div className="sub-text">
                  Contact out verified HR experts for professional guidence
              </div>
              <div className="hrxExpertsLogo" >
                <a  href="https://hrxconnect.com/" target="_blank">
                    <img src={hrxExperts} className="card-img-top2" alt="..." />
                </a>
              </div>



           </div>
        </div>
    );
}
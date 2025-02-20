import React, { useState } from 'react';
import './style.css';
import apiClient from '../../api/api';
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useNavigate, useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  var { email_id, userId } = location.state || {};  // Access the passed email

const handlePlanSelect = async (plan) => {
  if(!userId) {
    userId = sessionStorage.getItem('user_id');
  }
  if (plan === 'free') {
    navigate("/home"); // Redirect free users to login
    return;
  }

  try {
    const response = await apiClient.post("/create_checkout_session/", {
      user_id: userId,
      plan: plan,
      email: email_id,  
      payment_mode: "Subscription",
      success_url: "http://localhost:3000/login",
      cancel_url: "http://localhost:3000/cancel" 
    }, {
      headers: { "Content-Type": "application/json" }
    });

    if (response.data.error) {
      console.error("Error:", response.data.error);
    } else {
      window.location.href =response.data.url;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="pricing-page-container">
      <header className="pricing-page-header">
        <h1>Pricing</h1>
      </header>
      
      <main className="pricing-main">
        <div className="pricing-plans">
          <div 
            className={`plan-card ${selectedPlan === 'free' ? 'selected' : ''}`} 
            onClick={() => handlePlanSelect('free')}
          >
            <h2>Free</h2>
            <span>$0 /month</span>
            <p>Explore how AI can help with everyday tasks</p>
            <button className="select-btn">Get Free</button>
            <ul>
              <li> ✓ Access to Chatbot mini </li>
              <li> ✓ Basic support</li>
              <li> ✓ Limited features</li>
            </ul>
          </div>

          <div 
            className={`plan-card ${selectedPlan === 'plus' ? 'selected' : ''}`} 
            onClick={() => handlePlanSelect('plus')}
          >
            <h2>Plus</h2>
            <span>$20 /month</span>
            <p>Level up productivity and creativity with expanded access</p>
            <button className="select-btn" >Get Plus</button>
            <ul>
              <li> ✓ Everything in Free</li>
              <li> ✓ Priority support</li>
              <li> ✓ Access to advanced features</li>
            </ul>
          </div>

          <div 
            className={`plan-card ${selectedPlan === 'pro' ? 'selected' : ''}`} 
            onClick={() => handlePlanSelect('pro')}
          >
            <h2>Pro</h2>
            <span>$25 /month</span>
            <p>Get the best with the highest level of access</p>
            <button className="select-btn">Get Pro</button>
            <ul>
              <li> ✓ Everything in Plus</li>
              <li> ✓ 24/7 support</li>
              <li> ✓ Access to premium features</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="pricing-footer">
        <p>Need help deciding? <a href="/contact">Contact us</a></p>
      </footer>
    </div>
  );
}

export default PricingPage;

import React, { useState } from 'react';
import './style.css';
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useNavigate } from "react-router-dom";

const stripePromise = loadStripe('your-public-key'); 

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const navigate = useNavigate();

  //This is static Payment Link , we are supposed to Handle dynamic Payment Link inorder to have more control over the payment process
  // Updated handlePlanSelect to handle different plans
const handlePlanSelect = (plan) => {
  let paymentLink = '';

  // Set the payment link based on the selected plan
  if (plan === 'free') {
    paymentLink = ''; // Free plan link
    navigate("/login"); 
  } else if (plan === 'plus') {
    paymentLink = 'https://buy.stripe.com/test_eVaeVOaVb1wu7oA5km'; // Plus plan link
    window.location.href = paymentLink;
  } else if (plan === 'pro') {
    paymentLink = 'https://buy.stripe.com/test_dR63d63sJ7US7oA6or'; // Pro plan link
    window.location.href = paymentLink;
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

import React, { useState } from 'react';
import './style.css';
import apiClient from '../../api/api';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate, useLocation } from "react-router-dom";

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  console.error("Stripe publishable key is not set");
}
const stripePromise = loadStripe(stripePublishableKey);

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email_id, userId: locationUserId } = location.state || {};

  const handlePlanSelect = async (plan) => {
    const userId = locationUserId || sessionStorage.getItem('user_id');

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    if (plan === 'free') {
      navigate("/home");
      return;
    }

    try {
      const response = await apiClient.post("/create_checkout_session/", {
        user_id: userId,
        plan: plan,
        payment_mode: "Subscription",
        success_url: process.env.REACT_APP_SUCCESS_URL || "http://localhost:3000/home",
        cancel_url: process.env.REACT_APP_CANCEL_URL || "http://localhost:3000/pricing"
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("UserID:", userId, "Email:", email_id, "Plan:", plan, "Response:", response.data);
      if (response.data.error) {
        console.error("Error:", response.data.error);
      } else {
        window.location.href = response.data.url;
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
          {[{ plan: 'free', price: '$0', description: 'Explore how AI can help with everyday tasks', features: ['Access to Chatbot mini', 'Basic support', 'Limited features'] },
            { plan: 'plus', price: '$20', description: 'Level up productivity and creativity with expanded access', features: ['Everything in Free', 'Priority support', 'Access to advanced features'] },
            { plan: 'pro', price: '$25', description: 'Get the best with the highest level of access', features: ['Everything in Plus', '24/7 support', 'Access to premium features'] }
          ].map(({ plan, price, description, features }) => (
            <div 
              key={plan}
              className={`plan-card ${selectedPlan === plan ? 'selected' : ''}`}
              onClick={() => { setSelectedPlan(plan); handlePlanSelect(plan); }}
            >
              <h2>{plan.charAt(0).toUpperCase() + plan.slice(1)}</h2>
              <span>{price} /month</span>
              <p>{description}</p>
              <button className="select-btn">Get {plan.charAt(0).toUpperCase() + plan.slice(1)}</button>
              <ul>
                {features.map(feature => <li key={feature}>✓ {feature}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="pricing-footer">
        <p>Need help deciding? <a href="/contact">Contact us</a></p>
      </footer>
    </div>
  );
}

export default PricingPage;

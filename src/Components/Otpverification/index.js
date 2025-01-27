import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import logo from '../../Assets/logo.png';
const Otpverification = () => {
  const { userId } = useParams(); // Fetch userId from the URL parameter
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) { // Allow only numeric input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input field
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error
    setSuccessMessage(""); // Clear previous success

    const otpValue = otp.join(""); // Combine the OTP array into a single string
    if (otpValue.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/verify_otp/${userId}/`,
        { otp: otpValue }
      );

      if (response.status === 200) {
        setSuccessMessage("OTP verified successfully!");
        setOtp(["", "", "", "", "", ""]); // Clear input fields
        navigate("/login"); // Redirect after successful verification
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Invalid OTP. Please try again.");
      } else {
        setErrorMessage("Verification failed. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage(""); // Clear previous error
    setSuccessMessage(""); // Clear previous success
    setOtp(["", "", "", "", "", ""]); // Clear input fields

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/resend_otp/${userId}/`
      );

      if (response.status === 200) {
        setSuccessMessage("OTP has been resent to your email.");
        // Focus the first input field
        document.getElementById("otp-input-0").focus();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Failed to resend OTP. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log("User ID from URL:", userId);
  }, [userId]);

  return (
    <div className="otp-verification-page">
      <div className="otp-container">
        <div className="logo-section">
                  <img src={logo} alt="Logo" className="login-logo" />
                </div>
        <h2>OTP Verification</h2>
        <p>Enter the 6-digit OTP sent to your email.</p>

        {(successMessage || errorMessage) && (
          <p className={successMessage ? "success-message" : "error-message"}>
            {successMessage || errorMessage}
          </p>
        )}

        <form onSubmit={handleOtpSubmit} className="otp-form">
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                id={`otp-input-${index}`}
                className="otp-input"
                autoFocus={index === 0} // Focus on the first input by default
              />
            ))}
          </div>
          <button type="submit" className="submit-button">
            Verify OTP
          </button>
        </form>

        <button className="resend-otp-button" onClick={handleResendOtp}>
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default Otpverification;

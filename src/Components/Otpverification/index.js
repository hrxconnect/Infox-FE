import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Cookies from 'js-cookie';
//Assets
import backBtnImage from '../../Assets/back-icon.png';

const Otpverification = () => {
  const [user_id, getUserid] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  
=======
  useEffect(() => {
    // Make a GET request to the Django view to fetch session data
    axios.get('http://localhost:8000/get_user_session/')
      .then(response => {
        getUserid(response.data.user_id);  // Set session value from Django
      })
      .catch(error => {
        console.error("There was an error fetching the session data!", error);
      });
  }, []);
  
      
  

>>>>>>> 6b7c03e (Added session in signup..)
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
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(`http://127.0.0.1:8000/api/verify_otp`,
        { otp: otpValue },
        {
          withCredentials: true, // Ensure session cookies are included with the request
          headers: { 'Content-Type': 'application/json' 
          } // Set the content type header
        }
      );
      if (response.status === 200) {
        setSuccessMessage("OTP verified successfully!");
        setOtp(["", "", "", "", "", ""]); // Clear input fields
<<<<<<< HEAD
        // navigate("/login"); // Redirect after successful verification
        navigate("/pricing")
=======
        navigate("/pricing"); // Redirect after successful verification
>>>>>>> 6b7c03e (Added session in signup..)
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
        `http://127.0.0.1:8000/api/resend_otp/${user_id}/`
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

<<<<<<< HEAD
  const handleBackToSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  useEffect(() => {
    console.log("User ID from URL:", userId);
  }, [userId]);

=======
>>>>>>> 6b7c03e (Added session in signup..)
  
    return (
      <div className="otp-container" >
        <div className="otp-header">
          <img 
          src={backBtnImage} 
          alt="" 
          className="back-icon" 
<<<<<<< HEAD
          onClick={handleBackToSignup}
=======
          onClick={()=> navigate("/signup")}
>>>>>>> 6b7c03e (Added session in signup..)
        />
          <h1>Verify Your Email</h1>
        </div>
        <p>We’ve sent a 6-digit verification code to your email address. Enter the code below to continue.</p>
        {(successMessage || errorMessage) && (
          <p className={successMessage ? "success-message" : "error-message"}>
            {successMessage || errorMessage}
          </p>
        )}
        <form onSubmit={handleOtpSubmit}>
          <div className="otp-inputs">
          {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                id={`otp-input-${index}`}
                autoFocus={index === 0} // Focus on the first input by default
              />
            ))}
          </div>
          <button type="submit" className="otp-submit button">Verify</button>
        </form>
        
        <div className="resend" onClick={handleResendOtp}>
  Didn’t receive the code? <span className="resend-code">Resend OTP</span></div>
      </div>
    );
  };
  
  export default Otpverification;

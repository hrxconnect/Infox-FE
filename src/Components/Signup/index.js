import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react"; 
import axios from "axios";
import "./style.css";
import { GoogleLogin } from "@react-oauth/google";

//Assets
import banner from '../../Assets/signup-banner.png';
import logo from '../../Assets/logo.png';
import google from '../../Assets/google.png';
import microsoft from '../../Assets/microsoft.png';
import eyeOpen from '../../Assets/eye-icon.png';
import eyeClosed from '../../Assets/eye-closed.png';
import chevronDown from '../../Assets/chevron-down.png';


export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for toggling confirm password visibility
  const [user_id, getUserid] = useState("");
  const [googleToken, setGoogleToken] = useState(null);
  const [error, setError] = useState(null);
  const { instance } = useMsal();
  const [email, setEmail] = useState("");

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstname":
      case "lastname":
        if (!value.trim()) {
          error = `${name === "firstname" ? "First" : "Last"} name is required.`;
        } else if (!/^[A-Za-z]+$/.test(value)) {
          error = "Only alphabetic characters are allowed.";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email address is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;

      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters long.";
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;

      case "country":
        if (!value.trim()) {
          error = "Please select your country.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
        formData,{
          withCredentials: true
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Account created successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          country: "",
        });
        setIsCheckboxChecked(false);
        if (response.data.message === "Email sent successfully") {
          sessionStorage.setItem("user_id", response.data.user_id);
          // Navigate to OTP page and pass email_id through state

          console.log('User ID from Session Storage:', sessionStorage.getItem("user_id"));
          console.log("Email ID from Signup:", formData.email);
          navigate("/verify_otp", {
            state: {
              email_id: formData.email,
              signupUser_id: response.data.user_id,
            },
          });
        } else {
          console.log("Signup failed:", response.data.error);
          setErrors({
            form:
              response.data.error ||
              "Error creating account. Please try again.",
          });
        }
      }
    } catch (error) {
      setErrors({ form: "Error creating account. Please try again." });
    }
  };
  //**************************************************************************************** */
  // Handle Google Signup Success
  const handleGoogleSignupSuccess = async (response) => {
    const googleToken = response.credential;
    try {
      const res = await axios.post("http://localhost:8000/api/google-signup", {
        token: googleToken,
      });

      if (res.data.success) {
        console.log("Google Signup successful:", res.data.message);
        navigate("/home"); // Redirect to home after successful signup
      } else {
        setErrors({
          form: res.data.error || "Error creating account. Please try again.",
        });
      }
    } catch (error) {
      // Check for token timing issue and retry after a delay
      if (
        error.response &&
        error.response.data.message.includes("Token used too early")
      ) {
        console.warn("Token issue detected. Retrying in 2 seconds...");
        setTimeout(() => handleGoogleSignupSuccess(response), 2000); // Retry after 2 seconds
      } else {
        setErrors({
          form:
            "Google signup error: " +
            (error.response?.data.message || error.message),
        });
      }
    }
  };
  // Handle Google Signup Failure
  const handleGoogleSignupFailure = () => {
    setError("Google login failed. Please try again.");
  };
  /******************************************************************************************** */

  const handleSignupwithmicrosoft = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["User.Read"], // Request necessary scopes (permissions)
      });

      console.log("User successfully signed in with Microsoft!");

      const idToken = loginResponse.idToken;
      console.log("ID Token:", idToken);

      // Optionally redirect the user to a dashboard or another page
      navigate("/login"); // Redirect to a different page after successful login

      // Optionally, send ID token to your backend for validation
      fetch("http://127.0.0.1:8000/auth/microsoft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Backend Response:", data));
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="signup-container">
        <div className="section-left">
          <div className="logo-section">
            <img src={logo} alt="Logo" className="login-logo" />
          </div>
          <div className="create-account-label">
            <h5 className="create-account-label">Create Your Account</h5>
          </div>
          <div className="social-login-container">
            <GoogleLogin
              clientId={CLIENT_ID} //  Google Client ID
              onSuccess={handleGoogleSignupSuccess}
              onFailure={handleGoogleSignupFailure}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google-login-button"
                >
                  <img
                    src={google}
                    alt="Google Signup"
                    className="google-login-image"
                    style={{ width: "150px", height: "auto" }}
                  />
                </button>
              )}
            />

            <button
              className="ms-signin-btn"
              onClick={handleSignupwithmicrosoft}
            >
              <img
                src={microsoft}
                alt="Microsoft Login"
                className="social-icon"
              />
              Sign in with Microsoft
            </button>
          </div>
          <div class="divider">
            <span>or continue with</span>
          </div>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errors.form && <div className="error-message">{errors.form}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div class="name-fields">
              <div class="input-container">
                <div class="input-container label">
                  <label for="first-name" id="header-labels">
                    First Name
                  </label>
                </div>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter your First name"
                  aria-describedby="firstnameError"
                  class="input-field"
                />
                {errors.firstname && (
                  <span className="error-message">{errors.firstname}</span>
                )}
              </div>

              <div class="input-container">
                <label for="last-name" id="header-labels">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  aria-describedby="lastnameError"
                  placeholder="Enter Your Last Name"
                  class="input-field"
                />
                {errors.lastname && (
                  <span className="error-message">{errors.lastname}</span>
                )}
              </div>
            </div>
            <div class="input-container email-container">
              <label for="email" id="header-labels">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="emailError"
                placeholder="Enter Your Email Address"
                class="input-field"
              />

              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div class="password-fields">
              <div class="input-container">
                <label for="password" id="header-labels">
                  Password
                </label>
                <div class="input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    aria-describedby="passwordError"
                    className="input-field" // Correct className syntax in JSX
                  />
                  <span
                    className="eye-icon"
                    id="eye-icon-password"
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                  >
                    <img
                      src={passwordVisible ? eyeOpen : eyeClosed}
                      alt="eye icon"
                      className="eye-icon-img" // Correct className syntax in JSX
                    />
                  </span>
                </div>
                {errors.password && (
                  <span id="passwordError" className="error-message">
                    {errors.password}
                  </span>
                )}
                {/* <label for="atleast8char" id="password-label">Must be at least 8 characters</label> */}
              </div>

              <div className="input-container">
                <label htmlFor="confirm-password" id="header-labels">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"} // Dynamically toggle input type
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    aria-describedby="confirmPasswordError"
                    className="input-field"
                  />
                  <span
                    className="eye-icon"
                    id="eye-icon-confirm-password"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    <img
                      src={confirmPasswordVisible ? eyeOpen : eyeClosed}
                      alt="eye icon"
                      className="eye-icon-img"
                    />
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span id="confirmPasswordError" className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
            {/* Country Dropdown */}
            <div className="country-container">
              <label htmlFor="country">Country</label>
              <div className="select-container">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  aria-describedby="countryError"
                >
                  <option value="">-- Select your country --</option>
                  <option value="1">Canada</option>
                  <option value="2">USA</option>
                </select>
                {errors.country && (
                  <span id="countryError" className="error-message">
                    {errors.country}
                  </span>
                )}
                <img
                  src={chevronDown}
                  alt="Chevron Down Icon"
                  className="chevron-icon"
                />
              </div>
            </div>

            {/* Checkbox with highlighted text */}
            <div className="terms-container">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />{" "}
              <label htmlFor="terms">
                I agree to the
                <span> </span>
                <span className="highlight" onClick={() => navigate('/termsandconditions')}> 
                  Terms and Conditions </span> and 
                  <span> </span>   
                <span className="highlight" onClick={() => navigate('/termsandconditions')}> 
                    Privacy Policy </span>
              </label>
              {errors.isChecked && (
                <span className="error-message">{errors.isChecked}</span>
              )}
            </div>

            {/* Create Account button */}
            <button
              className="create-account-btn"
              type="submit"
              disabled={!isCheckboxChecked}
              style={{
                backgroundColor: isCheckboxChecked ? "#FFA500" : "#cccccc",
                color: isCheckboxChecked ? "#fff" : "#666666",
                cursor: isCheckboxChecked ? "pointer" : "not-allowed",
              }}
            >
              Create Account
            </button>
          </form>

          {/* Sign In text */}
          <p className="sign-in-text">
            Already have an account?{" "}
            <span className="highlight" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </p>

          {/* Banner */}
        </div>
        <div className="section-right">
          <img
            src={banner}
            alt="Section Illustration"
            className="section-image"
          />
        </div>
      </div>
    </div>
  );
}

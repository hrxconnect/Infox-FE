import React from 'react'
import { Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing from "./Components/Landing/index.js"
import Login from "./Components/Login/index.js"
import SignUp from './Components/Signup/index.js'
import OtpVerification from "./Components/Otpverification/index.js"
import PricingPage from "./Components/PricingPage/index.js"
import HRXExperts from "./Components/HRXExperts/index.js"
import ResetPassword from './Components/ResetPassword/index.js'
import SetPassword from './Components/SetPassword/index.js'
import PricingPage from "./Components/PricingPage/index.js"
import Home from './Components/Home/index.js'
import Profile from './Components/Details/index.js'
import Assists from './Components/Assists/index.js'
import Queries from './Components/Queries/index.js'
import ChatHistory from './Components/ChatHistory/index.js'
import ChatHistoryDetails from './Components/ChatHistoryDetails/index.js'
import TermsAndPolicies from './Components/Terms_Condition/index.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./msalConfig";
import PrivateRoute from './Helper/RouterGuard.js';


export default function App() {
    return (
    <MsalProvider instance={msalInstance}>
        <GoogleOAuthProvider clientId="1038646241800-3tp1oav5f8h4b1tpnv1jnt412hgfr6bq.apps.googleusercontent.com">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
                <Route path="/verify_otp/:userId" element={<OtpVerification />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/pricing" element={<PricingPage />} />
=======
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/verify_otp" element={<OtpVerification />} />
>>>>>>> 6b7c03e (Added session in signup..)
                <Route path="/hr-experts" element={<HRXExperts/>} />
                <Route path="resetpassword" element={<ResetPassword />} />
                <Route path="setpassword" element={<SetPassword />} />
                <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="assists" element={<PrivateRoute><Assists /></PrivateRoute>} />
                <Route path="queries" element={<PrivateRoute><Queries /></PrivateRoute>} />
                <Route path="chathistory" element={<PrivateRoute><ChatHistory /></PrivateRoute>} />
                <Route path="chathistorydetails" element={<PrivateRoute><ChatHistoryDetails /></PrivateRoute>} />
                <Route path="termsandconditions" element={<PrivateRoute><TermsAndPolicies /></PrivateRoute>} />
            </Routes>
            <ToastContainer />
        </GoogleOAuthProvider>
        </MsalProvider>
    )
}

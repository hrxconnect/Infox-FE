import React from 'react'
import { Routes, Route } from "react-router-dom"
import Landing from "./Components/Landing/index.js"
import Login from "./Components/Login/index.js"
import HRXExperts from "./Components/HRXExperts/index.js"
import ResetPassword from './Components/ResetPassword/index.js'
import SetPassword from './Components/SetPassword/index.js'
import Home from './Components/Home/index.js'
import Profile from './Components/Details/index.js'
import Assists from './Components/Assists/index.js'
import Queries from './Components/Queries/index.js'
import ChatHistory from './Components/ChatHistory/index.js'
import ChatHistoryDetails from './Components/ChatHistoryDetails/index.js'
import TermsAndPolicies from './Components/Terms_Condition/index.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Helper/RouterGuard.js';


export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
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
        </>
    )
}

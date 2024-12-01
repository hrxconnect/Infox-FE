import React from 'react'
import { Routes, Route } from "react-router-dom"
import Landing from "./Components/Landing/index.js"
import Login from "./Components/Login/index.js"
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


export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="resetpassword" element={<ResetPassword />} />
                <Route path="setpassword" element={<SetPassword />} />
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="assists" element={<Assists />} />
                <Route path="queries" element={<Queries />} />
                <Route path="chathistory" element={<ChatHistory />} />
                <Route path="chathistorydetails" element={<ChatHistoryDetails />} />
                <Route path="termsandconditions" element={<TermsAndPolicies />} />
            </Routes>
            <ToastContainer />
        </>
    )
}

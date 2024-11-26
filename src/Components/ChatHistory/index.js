import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../Common/CommonHeader/index.js";
import './style.css'
import { FaAngleRight } from "react-icons/fa";

export default function ChatHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("HR Queries");

  return (
    <div>
      <CommonHeader></CommonHeader>
      <div className="content">
        <div className="containerSection">
          <div className="header-content mt-5">
            <h1 className="title">History</h1>
          </div>
          <div className="tabs">
            <div
              className={`tab ${activeTab === "Grants Assist" ? "active" : ""}`}
              onClick={() => setActiveTab("Grants Assist")}
            >
              Grants Assist
            </div>
            <div
              className={`tab ${activeTab === "HR Queries" ? "active" : ""}`}
              onClick={() => setActiveTab("HR Queries")}
            >
              HR Queries
            </div>
          </div>
          <div className="session-list">
            <div className="session-item" onClick={() => navigate("/chathistorydetails")}>
              <div>
                <div className="session-title">How to build company culture</div>
                <div className="session-time">Session: November 12, 2024 1:00PM</div>
              </div>
              <div className="arrow"><FaAngleRight/></div>
            </div>
            <div className="session-item" onClick={() => navigate("/chathistorydetails")}>
              <div>
                <div className="session-title">Minimum Vacation Leaves in Ontario</div>
                <div className="session-time">Session: July 12, 2024 1:00PM</div>
              </div>
              <div className="arrow"><FaAngleRight/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


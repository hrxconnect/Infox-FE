import React from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../Common/CommonHeader/index.js";
import './style.css'
import { FaArrowLeft } from "react-icons/fa";
import Fox from '../../Assets/Fox.png'
import { GoCopy } from "react-icons/go";

export default function ChatHistoryDetails() {
  const navigate = useNavigate();
  return (
    <div>
      <CommonHeader></CommonHeader>
      <div className="content">
        <header className="header header-spacing">
          <button className="back-button" onClick={() => navigate("/chathistory")}>
            <FaArrowLeft size={29} className="btn-arrow" />Back to Chat History
          </button>
        </header>
        <div className="container spacing">
          <main>
            <div className="chat-message">
              <img src={Fox} alt="" style={{ marginRight: '1rem' }} height={36} width={36} />
              <p>
                Building a strong company culture in a small, remote creative agency can be both fun and impactful. With a team of 12 people, you can foster close-knit relationships and a positive environment with tailored games and events. Here are some ideas to consider:
              </p>
            </div>
            <section className="section">
              <h2 className="section-heading">Virtual Team-Building Games</h2>
              <ol className="list">
                <li className="list-item">
                  Online Escape Room: Participate in a virtual escape room challenge. It’s a great way to encourage problem-solving and collaboration while having fun.
                </li>
              </ol>
              <GoCopy size={22}/>
            </section>
            <div className="chat-message">
              <img src={Fox} alt="" style={{ marginRight: '1rem' }} height={36} width={36} />
              <h2 className="section-heading">Social and Interactive Events</h2>
            </div>
            <section className="section">
              <ol className="list">
                <li className="list-item">
                  Virtual Happy Hours: Schedule regular casual catch-ups where team members can relax and chat. You can include themed dress codes, fun topics, or virtual games.
                </li>
                <li className="list-item">
                  Show and Tell: Have team members share something interesting or personal during a video call. It could be a hobby, a favorite book, or a recent project.
                </li>
                <li className="list-item">
                  Book Club or Movie Night: Choose a book or film that everyone reads or watches, then discuss it during a team meeting. It’s a great way to bond over shared experiences.
                </li>
                <li className="list-item">
                Online Cooking Class: Hire a chef or use a recipe to cook together virtually. This can be a fun way to learn new skills and share a meal together.
                </li>
                <li className="list-item">
                Virtual Talent Show: Host a talent show where team members can showcase their unique skills or hobbies, whether it's singing, magic tricks, or playing an instrument.
                </li>
              </ol>
              <GoCopy size={22}/>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
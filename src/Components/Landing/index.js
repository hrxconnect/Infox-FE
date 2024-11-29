import { Link } from "react-router-dom";
import LandingHeader from '../../Common/LandingHeader'
import LandingFooter from '../../Common/LandingFooter'
import './style.css'
import startedLogo from '../../Assets/img1.jpg'
import { FaRegClock } from "react-icons/fa6";
import { FaHammer } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";
import img2 from '../../Assets/img2.png'
import { FaArrowCircleRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import pic1 from '../../Assets/pic1.jpg'
import pic2 from '../../Assets/pic2.jpg'
import pic3 from '../../Assets/pic3.jpg'
import logo1 from '../../Assets/logo1.png'
import logo2 from '../../Assets/logo2.jpg'
import logo3 from '../../Assets/logo3.png'
import logo4 from '../../Assets/logo4.png'

export default function Landing() {
    return (
        <div className="body">
            <LandingHeader></LandingHeader>
            <div className="getStarted">
                <div className="container getStartedSection">
                    <div className="Section">
                        <div className="leftSection">
                            <span className="text1">Your HR wing's new MVP: </span>
                            <span className="text2">A chatbot that gets it done.</span>
                            <p className="text3">Our AI chatbot is designed to quickly answer legal HR-related questions, saving you time. By using this tool, you can instantly access the information and answers you need without the hassle of extensive research or processes.</p>
                            <button className="btn btn-toogle shadow pl-3 pr-3" type="submit">Get Started</button>
                        </div>
                        <div className="rightSection">
                            <div className="imgSection">
                                <img src={startedLogo} className="imgSection" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="solutions">
                    <span className="text4 text-center">Elevate HR Efficiency and Maximize Productivity with Our Solutions.</span>
                    <span className="text5 text-center">Unlock Instant Solutions, Legal Certainty, and Nonstop Support</span>
                </div>
                <div className="cards">
                    <div className="item-card">
                        <div className="icon-sec">
                            <FaRegClock size={35} color="white" />
                        </div>
                        <div className="card-discription">
                            <span className="text2">Time Efficiency</span>
                            <p className="text3">Access the answers you need instantly, eliminating the need for time-consuming research.</p>
                        </div>
                    </div>
                    <div className="item-card">
                        <div className="icon-sec">
                            <FaHammer size={35} color="white" />
                        </div>
                        <div className="card-discription">
                            <span className="text2">Legal Compliance</span>
                            <p className="text3">Receive up-to-date, compliant advice on HR matters, ensuring your organization stays within legal boundaries.</p>
                        </div>
                    </div>
                    <div className="item-card">
                        <div className="icon-sec">
                            <MdLaptopChromebook size={35} color="white" />
                        </div>
                        <div className="card-discription">
                            <span className="text2">24/7 Accessibility</span>
                            <p className="text3">Get HR support anytime, anywhere, with our AI chatbot available round the clock to assist you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner">
                <div className="banner-aside">
                    <div className="dummy"></div>
                    <img src={img2} className="imgSection2" alt="" />
                </div>
                <div className="banner-content">
                    <div>
                        <div className="mess-card float-start">
                            <p>What workplace safety regulations do we need to adhere to for our office in Ohio?</p>
                            <FaArrowCircleRight size={60} color="#027BFF" />
                        </div>
                    </div>
                    <div>
                        <div className="mess-card float-end">
                            <p>What are the essential employment laws and regulations for hiring in Quebec?</p>
                            <FaArrowCircleRight size={60} color="#027BFF" />
                        </div>
                    </div>
                    <div className="banner-text">
                        <IoMdCheckmark color="#027BFF" /> Ensure compliance through AI-powered insights into regulations.
                    </div>
                    <div className="mt-4">
                        <span className="text3">Stay informed on all local regulations and global hiring trends at your fingertips.</span>
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <button className="btn btn-toogle" type="submit">Learn More</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="solutions">
                    <span className="text4 text-center">Keep up-to-date with our latest guides and resources.</span>
                </div>
                <div className="cards">
                    <div className="cardpic shadow-none rounded">
                        <img src={pic1} className="card-img-top" alt="..." />
                        <div className="card-body mt-3">
                            <h5 className="card-title">The Expense of Employing a Worker in Canada</h5>
                            <p className="card-text">Initiating the employment of new staff primarily incurs costs through their initial...</p>
                            <span className="click_able">Read more</span>
                        </div>
                    </div>
                    <div className="cardpic shadow-none rounded">
                        <img src={pic2} className="card-img-top" alt="..." />
                        <div className="card-body mt-3">
                            <h5 className="card-title">Your Guide to Engaging Independent Contractors</h5>
                            <p className="card-text">The distinction between independent contractors and employees marks...</p>
                            <span className="click_able">Read more</span>
                        </div>
                    </div>
                    <div className="cardpic shadow-none rounded">
                        <img src={pic3} className="card-img-top" alt="..." />
                        <div className="card-body mt-3">
                            <h5 className="card-title">Transitioning International Contractors to Employees</h5>
                            <p className="card-text">What steps are involved in changing the status of an independent contractor to...</p>
                            <span className="click_able">Read more</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="solutions">
                    <span className="text4 text-center">Our Trusted Partners</span>
                </div>
                <div className="cards2">
                <img src={logo1} className="card-img-top2" alt="..." />
                <img src={logo2} className="card-img-top2" alt="..." />
                <img src={logo3} className="card-img-top2" alt="..." />
                <img src={logo4} className="card-img-top2" alt="..." />
                </div>
            </div>
            <LandingFooter></LandingFooter>
        </div>
    )
}
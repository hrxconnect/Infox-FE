import { useNavigate } from "react-router-dom";
import './style.css';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function LandingFooter() {
    return (
        <div className="sectionFooter">
            <div className="footerLeft">
                <p><b>Stay in Touch!</b> Subscribe to our newsletter to receive the latest updates, promotional deals, and related information.</p>
                <div className="btn-section">
                    <button className="btn btn-sub" type="submit">Your Work Email</button>
                    <button className="btn btn-work" type="submit">Subscribe</button>
                </div>
            </div>
            <div className="footerRight">
                <div className="products">
                    <div className="product-list">
                        <div className="list">
                            <ul className="no-bullets">
                                <li className="product-li"><b>Product</b></li>
                                <li className="product-li-active">Features</li>
                                <li className="product-li-active">How It Works</li>
                                <li className="product-li-active">Pricing</li>
                                <li className="product-li-active">Demo</li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-list">
                        <ul className="no-bullets">
                            <li className="product-li"><b>Company</b></li>
                            <li className="product-li-active">About Us</li>
                            <li className="product-li-active">Careers</li>
                            <li className="product-li-active">Team</li>
                            <li className="product-li-active">Newsroom</li>
                        </ul>
                    </div>
                    <div className="product-list">
                        <ul className="no-bullets">
                            <li className="product-li"><b>Legal</b></li>
                            <li className="product-li-active">Compliance</li>
                            <li className="product-li-active">Agreements</li>
                            <li className="product-li-active">Licensing</li>
                        </ul>
                    </div>
                </div>
                <div className="terms">
                    <div className="terms-list">
                        <p className="clickable">Terms and Conditions</p>
                    </div>
                    <div className="terms-list">
                        <p className="clickable">Privacy Policy</p>
                    </div>
                    <div className="terms-list">
                        <p className="clickable">Cookie Policy</p>
                    </div>
                    <div className="terms-list">
                        <FaFacebook className="clickable" />
                        <FaLinkedin className="clickable" />
                        <FaYoutube className="clickable" />
                        <FaInstagram className="clickable" />
                    </div>
                </div>
            </div>
        </div>
    )
}
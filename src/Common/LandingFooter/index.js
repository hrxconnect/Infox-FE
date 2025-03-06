import { useNavigate } from "react-router-dom"
import "./style.css"
import { FaFacebook } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import logo from "../../Assets/logo_new.png"
import PhoneIcon from "../../Assets/Phone.png"
import MailIcon from "../../Assets/Mail.png"

export default function LandingFooter() {
  return (
    <div className="sectionFooter">
      <div className="footerLeft">
        <div className="footer-logo-section">
          <img src={logo} alt="Logo" className="footer-login-logo" />
        </div>
        <div className="terms">
          {/* <div className="terms-list">
                        <FaLinkedin className="clickable" />
                        <FaInstagram className="clickable" />
                    </div> */}
        </div>
      </div>
      <div className="footerRight">
        <div className="products">
          <div className="product-list">
            <ul className="no-bullets">
              <li className="product-li">
                <b>Contact Us</b>
              </li>
              <li className="product-li-active">
                <img src={PhoneIcon} alt="Phone" className="phoneicon" />{" "}
                (123)-567-8910
              </li>
              <li className="product-li-active">
                <img src={MailIcon} alt="Phone" className="mailicon" />{" "}
                support@infox.com
              </li>
            </ul>
          </div>

          {/* <div className="product-list">
            <div className="list">
              <ul className="no-bullets">
                <li className="product-li">
                  <b>Product</b>
                </li>
                <li className="product-li-active">Our Solutions</li>
                <li className="product-li-active">Grants Assit</li>
                <li className="product-li-active">HR Queries</li>
              </ul>
            </div>
          </div> */}
          {/* <div className="product-list">
                        <ul className="no-bullets">
                            <li className="product-li"><b>Legal</b></li>
                            <li className="product-li-active">Disclaimer</li>
                            <li className="product-li-active">Terms of Service</li>
                            <li className="product-li-active">Private Policy</li>
                            <li className="product-li-active">Data Processing Agreement</li>
                            <li className="product-li-active">Cookie Policy</li>
                        </ul>
                    </div> */}
        </div>
      </div>
    </div>
  )
}

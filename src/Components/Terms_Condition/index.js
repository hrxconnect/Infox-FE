import { useNavigate, BrowserRouter, Route, Switch } from "react-router-dom";
import './style.css'
import CommonHeader from "../../Common/CommonHeader/index.js";
import { BiSolidShieldPlus } from "react-icons/bi";
import { LuCircleSlash } from "react-icons/lu";
import { AiFillQuestionCircle } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";

export default function Terms_Condition() {
  const navigate = useNavigate();
  return (
    <div>
      <CommonHeader></CommonHeader>
      <div className="content">
        <div className="container-section">
          <div className="header-content mt-5">
            <h1 className="title">Terms & Policies</h1>
          </div>

          <div className="section">
            <p>Here are a few things you need to know:</p>
            <div className="card">
              <div className="d-flex">
                <div className="icon-container"><LuCircleSlash/></div>
                <div className="card-content">
                  <p>
                    Infox's <a href="" className="link">Usage Policy</a> forbids
                    using X to cause harm, such as creating violent, abusive, or
                    misleading content.
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="icon-container"><BiSolidShieldPlus/></div>
                <div className="card-content">
                  <p>
                  Infox routinely examines conversations identified by our automated abuse detection system and may utilize them to enhance our safety protocols
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <p>
              And finally, while I strive to do my best in each conversation, I'm
              not perfect. You should keep a few things in mind:
            </p>
            <div className="card">
              <div className="d-flex">
                <div className="icon-container"><AiFillQuestionCircle/></div>
                <div className="card-content">
                  <p>
                  Infox is not designed to provide advice, including legal, financial, or medical guidance. Please do not rely solely on our conversation and ensure you conduct your own independent research.
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="icon-container"><CiWarning/></div>
                <div className="card-content">
                  <p>
                  Infox may occasionally create incorrect or misleading information and may also generate content that is offensive or biased.
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <div className="icon-container"><LuArrowDownUp/></div>
                <div className="card-content">
                  <p>
                  Infox may adjust usage limits, features, or policies as we gather more insights. You can upgrade your plan to gain additional access to Infox's features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
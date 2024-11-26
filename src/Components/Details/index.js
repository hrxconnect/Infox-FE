/* eslint-disable no-unused-vars */
import { useNavigate} from "react-router-dom";
import CommonHeader from "../../Common/CommonHeader/index.js";
import './style.css'
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <CommonHeader></CommonHeader>
      <div className="content">
        <p className="profile-title">My Profile</p>
        <nav className="nav nav-pills nav-justified nav-tab">
          <a className="nav-link nav-link-active" aria-current="page" href="">My Profile</a>
        </nav>
        <div className="container">
          <div className="total">
            <div className="signup-box">
              <div className="form-group form-login row justify-content-center">
                <div className="col-12 col-md-3 text-center mobProfileLogo">
                  <div className="profile-avatar" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="profile-letter-info">J</span>
                    <div className="verified-avatar-icon"></div>
                  </div>
                </div>

                <div className="col-12 col-md-9 d-block align-self-center mobProfileLogo">
                  <h3><b>Jennifer N</b></h3>
                  <p>jennifer@********.com</p>
                </div>
              </div>

              <div className="form-group row justify-content-center">
                <div className="col-12 col-md-6">
                  <label>
                    First Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label>
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                  />
                </div>
              </div>


              <h3 className="mt-5 mb-5"><b>My Company</b></h3>

              <div className="form-group">
                <label>
                  Company Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="company" />
              </div>
              <div className="form-group">
                <label>
                  Company Location
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="cLocation"
                />
              </div>

              <div className="form-group">
                <label>
                  Number of Employees
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="eCount"
                />
              </div>

              <div className="form-group">
                <label>
                  Business Type
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="bType"
                />
              </div>

              <div className="form-group">
                <label>
                  Years in Operation
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="yOperation"
                />
              </div>

              <div className="form-group">
                <label>
                  Indigenous Business Certification
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="indigenousCert"
                />
              </div>

              <div className="form-group">
                <input
                  type="button"
                  className="btn btn-primary save-btn"
                  value="Save" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
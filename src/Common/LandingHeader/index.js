import { useNavigate } from "react-router-dom";
import logo from '../../Assets/logo_new.png';
import './style.css';
import { CiGlobe } from "react-icons/ci";

export default function LandingHeader() {
    const navigate = useNavigate();
    return (
        <div className="main">
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    background: 'rgb(255,145,0)',
                    background: 'linear-gradient(240deg, rgba(255,145,0,0.8) 0%, rgba(255,255,255,0.2) 57%, rgba(255,255,255,1) 73%, rgba(2,123,255,0.1) 100%)'
                }}
            >
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href=""> <img src={logo} alt="" className="header-login-logo" /></a>
                        {/* <ul className="navbar-nav navbar-menus me-auto mb-2 mb-lg-0">
                        </ul> */}
                        <form  role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link" href="">Our Solutions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">Grant Assist</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="">HR Queries</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="" type="submit" onClick={()=> navigate("login")}>Login</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link " href="" type="submit" onClick={()=> navigate("signup")}>Sign Up</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-demo" type="submit"  >Book A Demo</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
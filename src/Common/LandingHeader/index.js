import { useNavigate } from "react-router-dom";
import logo from '../../Assets/logo.png';
import './style.css';
import { CiGlobe } from "react-icons/ci";

export default function LandingHeader() {
    const navigate = useNavigate();
    return (
        <div className="main">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href=""> <img src={logo} alt="" height={30} width={100} /></a>
                        {/* <ul className="navbar-nav navbar-menus me-auto mb-2 mb-lg-0">
                        </ul> */}
                        <form  role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link" href="">Our Story</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">Chat</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href=""><CiGlobe size={20}/>EN</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-signup" type="submit" onClick={() => navigate("login")}>Sign Up</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-login" type="submit" onClick={()=> navigate("login")} >Log In</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
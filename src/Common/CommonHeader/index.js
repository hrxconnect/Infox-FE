import { useNavigate } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo.png';
import { IoMdTime } from "react-icons/io";
import { TbHome } from "react-icons/tb";
import { useEffect, useState } from "react";

export default function CommonHeader() {
    const navigate = useNavigate();
    const [pathState, setPathState] = useState('')
    useEffect(() => {
        const pathname = window.location.pathname
        setPathState(pathname)
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm bottomStyle">
                <div className="container header-common">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <a className="navbar-brand" href=""> <img src={logo} alt="" height={30} width={100} /></a>
                    </div>
                    <div className="sibebar-profile">
                        <div className="avatar" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="profile-letter">J</span>
                        </div>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle dropdownbtn" data-bs-toggle="dropdown" aria-expanded="false"><span>Jennifer N</span></button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href=""  onClick={() => navigate('/profile')}>My Profile</a></li>
                                <li><a className="dropdown-item" href="" onClick={() => navigate('/termsandconditions')}>Terms & Policies</a></li>
                                <li><a className="dropdown-item" href="">Help & Support</a></li>
                                <li><a className="dropdown-item" href="" onClick={() => navigate('/')}>Log out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="sidebar barstatus">
                <div className="sidebar-content">
                    <div className="sidebar-menus">
                        <ul className="navbar-nav me-auto mb-2 mt-1 mb-lg-0">
                            <li className={pathState.includes("/home") ? "nav-item-active" : "nav-item"} onClick={() => navigate('/home')}>
                                <a className="nav-link" href="" ><TbHome size={24} /><span className="menu-link">Home</span></a>
                            </li>
                            <li className={pathState.includes("/chathistory") ? "nav-item-active" : "nav-item"} onClick={() => navigate('/chathistory')}>
                                <a className="nav-link" href=""><IoMdTime size={24} /><span className="menu-link">History</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><span className="menu-link">Bots</span></a>
                            </li>
                            <li className={pathState.includes("/assists") ? "nav-item2-active" : "nav-item2"} onClick={() => navigate('/assists')}>
                                <a className="nav-link" href=""><span className="menu-link2">Grants Assist</span></a>
                            </li>
                            <li className={pathState.includes("/queries") ? "nav-item2-active" : "nav-item2"} onClick={() => navigate('/queries')}>
                                <a className="nav-link" href=""><span className="menu-link2">HR Queries</span></a>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-footer">
                        <ul className="navbar-nav me-auto mb-2 mt-1 mb-lg-0">
                            <li className="nav-item1">
                                <button  onClick={() => navigate('/')} className="btn btn-help" type="submit">Get help from a HR Expert</button>
                            </li>
                            <li className="nav-item1">
                                <img src={logo} alt="" height={30} width={100} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="sidebar">
                    <div className="sidebar-content">
                        <div className="sidebar-menus">
                        <ul className="navbar-nav me-auto mb-2 mt-1 mb-lg-0">
                            <li className={pathState.includes("/home") ? "nav-item-active" : "nav-item"}>
                                <a className="nav-link" href="" onClick={() => navigate('/home')}><TbHome size={24} /><span className="menu-link">Home</span></a>
                            </li>
                            <li className={pathState.includes("/chathistory") ? "nav-item-active" : "nav-item"} onClick={() => navigate('/chathistory')}>
                                <a className="nav-link" href=""><IoMdTime size={24} /><span className="menu-link">History</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><span className="menu-link">Bots</span></a>
                            </li>
                            <li className={pathState.includes("/assists") ? "nav-item2-active" : "nav-item2"} onClick={() => navigate('/assists')}>
                                <a className="nav-link" href=""><span className="menu-link2">Grants Assist</span></a>
                            </li>
                            <li className={pathState.includes("/queries") ? "nav-item2-active" : "nav-item2"} onClick={() => navigate('/queries')}>
                                <a className="nav-link" href=""><span className="menu-link2">HR Queries</span></a>
                            </li>
                        </ul>
                        </div>
                        <div className="sidebar-footer">
                            <ul className="navbar-nav me-auto mb-2 mt-1 mb-lg-0">
                                <li className="nav-item1">
                                    <button  onClick={() => navigate('/')} className="btn btn-help" type="submit">Get help from a HR Expert</button>
                                </li>
                                <li className="nav-item1">
                                    <img src={logo} alt="" height={30} width={100} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
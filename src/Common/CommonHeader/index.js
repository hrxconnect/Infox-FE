import { useNavigate } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo.png';
import { IoMdTime } from "react-icons/io";
import { TbHome } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function CommonHeader() {
    const navigate = useNavigate();
    const [pathState, setPathState] = useState('')
    const [profileName, setProfileName] = useState('');
    const [profileInitial, setProfileInitial] = useState('');

    useEffect(() => {
        const pathname = window.location.pathname
        setPathState(pathname)

        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("https://app.infox.bot/api/profile/", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 200) {
                        const data = response.data;
                        setProfileName(`${data.firstname} ${data.lastname}`);
                        setProfileInitial(data.firstname.charAt(0));
                    }
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [])

    const handleLogout = async () => {
        // Optionally, you can call an API to handle logout on the server side
        // await axios.post("https://app.infox.bot/api/logout/", {}, {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //     },
        // });

        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("userProfile");

        // Navigate to the login page after clearing local storage
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm bottomStyle">
         
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <button className="navbar-brand" onClick={() => navigate('/home')} style={{ background: 'none', border: 'none' }}>
                            <img src={logo} alt="" height={30} width={100} />
                        </button>
                    </div>
                    <div className="sidebar-profile">
                        <div className="avatar" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="profile-letter">{profileInitial}</span>
                        </div>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle dropdownbtn" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>{profileName}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="" onClick={() => navigate('/profile')}>My Profile</a></li>
                                <li><a className="dropdown-item" href="" onClick={() => navigate('/termsandconditions')}>Terms & Policies</a></li>
                                <li><a className="dropdown-item" href="">Help & Support</a></li>
                                <li><a className="dropdown-item" href="" onClick={handleLogout}>Log out</a></li>
                            </ul>
                        </div>
                    </div>
               
            </nav>
            <div className="sidebar barstatus">
                <div className="sidebar-content">
                    <div className="sidebar-menus">
                        <ul className="navbar-nav me-auto mb-2 mt-1 mb-lg-0">
                            <li className={pathState.includes("/home") ? "nav-item-active" : "nav-item"} onClick={() => navigate('/home')}>
                                <a className="nav-link" href=""><TbHome size={24} /><span className="menu-link">Home</span></a>
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
                                <button className="btn btn-help" type="button" onClick={() => navigate('/hr-experts')}>Get help from a HR Expert</button>
                            
                            </li>
                            <li className="nav-item1" onClick={() => navigate('/home')}>
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
                                    <button className="btn btn-help" type="button" onClick={() => navigate('/hr-experts')}>Get help from a HR Expert</button>
                                </li>
                                <li className="nav-item1" onClick={() => navigate('/home')}>
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
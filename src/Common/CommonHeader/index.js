import { useNavigate } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo_new.png';
import Home from "../../Assets/Home.png";
import Time from "../../Assets/Time.png";
import { useEffect, useState } from "react";
import apiClient from "../../api/api";
import chevronDownIcon from '../../Assets/chevron-down.png';
import chevronUpIcon from '../../Assets/chevron-up.png';
import canadaFlag from '../../Assets/CA.png';
import usaFlag from '../../Assets/US.png';
import { IoChevronDownOutline } from 'react-icons/io5';





export default function CommonHeader() {
    const navigate = useNavigate();
    const [pathState, setPathState] = useState('')
    const [profileName, setProfileName] = useState('');
    const [profileInitial, setProfileInitial] = useState('');
    const [userID, setUserID] = useState('');
    

    /*Countries*/
    const countries = [
        { code: "CA", name: "Canada", flag: canadaFlag, value: "1" },
        { code: "US", name: "United States", flag: usaFlag, value: "2" },
      ];
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    useEffect(() => {
        const pathname = window.location.pathname
        setPathState(pathname)

        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    
                    const response = await apiClient.get("/profile/", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 200) {
                        const data = response.data;
                        setProfileName(`${data.firstname} ${data.lastname}`);
                        setProfileInitial(data.firstname.charAt(0));
                        
                        // Set the country from the API, fallback to Canada if not available
                        const countryValue = data.country || "1"; // Default to Canada if API does not provide a value
                        handleCountryUpdate(countryValue, false);

                        setUserID(data.userid);
                    }
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [])


    useEffect(() => {
    }, [selectedCountry]);
    
    const UpdateSelectedCountry = async (countryValue) => {
        var userId = sessionStorage.getItem('user_id');
        sessionStorage.setItem('country', countryValue)
        if(!userId) {
            userId = userID;
        }

        try {
            const response = await apiClient.post("/country_selection/",
                { selected_country: countryValue }
            );
    
            console.log('Selected Country API Response:', response.data);
    
            if (response.status === 200) {
                handleCountryUpdate(response.data.new_country, false);
            }
        } catch (error) {
            console.error("Failed to fetch Selected Country:", error);
        }
    };    

    const handleCountryUpdate = (countryValue, shouldCallAPI) => {        
        // Ensure selected country state is updated before proceeding
        setSelectedCountry(prevCountry => {
            const updatedCountry = countryValue === "1" ? countries[0] : countries[1];
            return updatedCountry;
        });
    
        if (shouldCallAPI) {
            // Delay API call to make sure state has been updated
            setTimeout(() => UpdateSelectedCountry(countryValue), 100); // Slightly more delay to ensure state update
        }
    };
    
    
    
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
        sessionStorage.clear()

        // Navigate to the login page after clearing local storage
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm bottomStyle">
         
                    <button className="navbar-toggler" 
                    type="button" data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasExample" 
                    aria-controls="offcanvasExample" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <button className="navbar-brand" 
                        onClick={() => navigate('/home')} 
                        style={{ background: 'none', border: 'none' }}>
                            <img src={logo} alt=""  width={100} />
                        </button>
                    </div>
                    <div className="sidebar-profile">
                        <div className="dropdown-container">
                            <button
                                className="dropdown-button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {selectedCountry ? (
                                <span className="selected-item">
                                    <img src={selectedCountry.flag} alt={selectedCountry.name} className="flag" />
                                    {selectedCountry.name}
                                </span>
                                ) : (
                                "Country"
                                )}
                                <img src={dropdownOpen ? chevronUpIcon : chevronDownIcon} alt="Toggle" className="chevron-icon" />
                            </button>
                            {dropdownOpen && (
                                <ul className="country-dropdown-menu">
                                {countries.map((country) => (
                                    <li
                                    key={country.code}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        handleCountryUpdate(country.value, true);
                                        setDropdownOpen(false);                                    }}
                                    >
                                    <img src={country.flag} alt={country.name} className="flag" />
                                    {country.name}
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>
                        <div className="avatar" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                            <span className="profile-letter">{profileInitial}</span>
                        </div>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle dropdownbtn custom-toggle" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false">
                                <span style={{ fontWeight: 'bold' }}>{profileName}</span>
                                <IoChevronDownOutline size={18} style={{ marginLeft: 6 }} />
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
                                <a className="nav-link" href=""><img src={Home} width={24} /><span className="menu-link">Home</span></a>
                            </li>
                            <li className={pathState.includes("/chathistory") ? "nav-item-active" : "nav-item"} onClick={() => navigate('/chathistory')}>
                                <a className="nav-link" href=""><img src={Time} width={24} /><span className="menu-link">History</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><span className="menu-link">AI Agents</span></a>
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
                                <button className="btn btn-help" type="button" onClick={() => navigate('/hr-experts')}>Get in touch with a Human Expert</button>
                            
                            </li>
                            <li className="nav-item1" onClick={() => navigate('/home')}>
                                <img src={logo} alt=""  width={100} />
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
                                    <a className="nav-link" href="" onClick={() => navigate('/home')}><img src={Home} width={24} /><span className="menu-link">Home</span></a>
                                </li>
                                <li className={pathState.includes("/chathistory") ? "nav-item-active" : "nav-item"} onClick={() => navigate('/chathistory')}>
                                    <a className="nav-link" href=""><img src={Time} width={24} /><span className="menu-link">History</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"><span className="menu-link">AI Agents</span></a>
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
                                    <button className="btn btn-help" type="button" onClick={() => navigate('/hr-experts')}>Get in touch with a Human Expert</button>
                                </li>
                                <li className="nav-item1" onClick={() => navigate('/home')}>
                                    <img src={logo} alt=""  width={100} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
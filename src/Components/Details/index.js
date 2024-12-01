/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../Common/CommonHeader/index.js";
import './style.css';
import { useEffect, useState } from "react";

export default function Landing() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstName: 'Jennifer',
        lastName: 'N',
        company: '',
        cLocation: '',
        eCount: '',
        bType: '',
        yOperation: '',
        indigenousCert: ''
    });
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
            const data = JSON.parse(storedProfile);
            setProfile({
                firstName: data.firstname,
                lastName: data.lastname,
                company: data.businessname,
                cLocation: data.location,
                eCount: data.eCount,
                bType: data.bType,
                yOperation: data.yOperation,
                indigenousCert: data.indigenousCert
            });
            setUserName(`${data.firstname} ${data.lastname}`);
        } else {
            setError("User profile not found. Please log in again.");
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Implement save functionality here
        console.log("Profile saved:", profile);
    };

    // Function to get the first letter of the first name for the avatar
    const getAvatarLetter = () => {
        return profile.firstName.charAt(0).toUpperCase(); // Get the first letter and convert to uppercase
    };

    return (
        <div>
            <CommonHeader userName={userName} userIcon={getAvatarLetter()} />
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
                                        <span className="profile-letter-info">{getAvatarLetter()}</span> {/* Display the first letter */}
                                        <div className="verified-avatar-icon"></div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-9 d-block align-self-center mobProfileLogo">
                                    <h3><b>{profile.firstName} {profile.lastName}</b></h3>
                                    <p>{profile.company}</p>
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-12 col-md-6">
                                    <label>First Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <h3 className="mt-5 mb-5"><b>My Company</b></h3>

                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="company"
                                    value={profile.company}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company Location</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cLocation"
                                    value={profile.cLocation}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Number of Employees</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="eCount"
                                    value={profile.eCount}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Business Type</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="bType"
                                    value={profile.bType}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Years in Operation</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="yOperation"
                                    value={profile.yOperation}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Indigenous Business Certification</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="indigenousCert"
                                    value={profile.indigenousCert}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="button"
                                    className="btn btn-primary save-btn"
                                    value="Save"
                                    onClick={handleSave}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css';
import logo from '../../Assets/logo.png';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setErrorMessage("");

        try {
            const response = await axios.post("http://app.infox.bot/api/login/", {
                email,
                password
            });

            const data = response.data;

            if (response.status === 200 && data.token) {
                const token = data.token;
                localStorage.setItem("token", token);

                const userDetailsResponse = await axios.get("http://app.infox.bot/api/profile/", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (userDetailsResponse.status === 200) {
                    const userDetails = userDetailsResponse.data;
                    localStorage.setItem("userProfile", JSON.stringify(userDetails));
                    navigate("/home");
                } else {
                    setErrorMessage("Failed to fetch user details.");
                }
            } else {
                setErrorMessage("Invalid user credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Invalid user credentials");
        }
    };

    return (
        <div className="login">
            <div className="login-container card">
                <div className="login-logo">
                    <img src={logo} alt="" height={30} width={100} />
                </div>
                <form onSubmit={handleLogin}> {/* Ensure onSubmit is correctly set */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="forgot-pass">
                        <a href="" onClick={() => navigate("/resetpassword")}><span>Forget password?</span></a>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3 p-2">Log in</button>
                </form>
            </div>
        </div>
    );
}
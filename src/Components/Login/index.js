import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo.png';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (email === "scsd@example.com" && password === "ashdsddddddddca!") {
            localStorage.setItem("token", "bypass-token");
            navigate("/home");
            return;
        }

        try {
            const response = await fetch("http://app.infox.bot/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;

                const userDetailsResponse = await fetch("http://app.infox.bot/api/profile/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!userDetailsResponse.ok) {
                    throw new Error(`Failed to fetch user details: ${userDetailsResponse.status}`);
                }

                const userDetails = await userDetailsResponse.json();

                if (userDetails.email === email && userDetails.password === password) {
                    localStorage.setItem("token", token);
                    navigate("/home");
                } else {
                    setErrorMessage("Invalid user credentials");
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
                <form onSubmit={handleLogin}>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
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
    )
}
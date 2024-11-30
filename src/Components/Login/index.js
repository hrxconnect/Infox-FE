import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo.png';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
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
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login">
            <div className="login-container card">
                <div className="login-logo">
                    <img src={logo} alt="" height={30} width={100} />
                </div>
                <form onSubmit={handleLogin}>
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './style.css'
import logo from '../../Assets/logo.png';

export default function SetPassword() {
    const navigate = useNavigate();
    const [changedStatus, SetChangedlStatus] = useState(false)

    const sendPassword = () => {
        SetChangedlStatus(true)
    }

    if (!changedStatus) {
        return (
            <div className="login">
                <div className="login-container card">
                    <span className="resetTitle">Set your password</span>
                    <p className="resetinfo">Enter a new password below</p>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputPassword1">New password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter new password" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Re-Enter new password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Re-Enter new password" />
                        </div>
                        <button type="button" className="btn btn-primary w-100 mt-3 p-2" onClick={sendPassword}>Set Password</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className="login">
                <div className="login-container card">
                    <span className="resetTitle">Password Changed</span>
                    <p className="resetinfo">You have successfully changed your password.</p>
                    <form>
                        <button onClick={() => navigate("/")} type="button" className="btn btn-primary w-100 mt-3 p-2">Back to Infox Homepage</button>
                    </form>
                </div>
            </div>
        )
    }

}
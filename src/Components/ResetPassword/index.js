import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './style.css'
import logo from '../../Assets/logo.png';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [EmailStatus, SetEmailStatus] = useState(false)

    const sendEmail = () => {
        SetEmailStatus(true)
    }

    if (!EmailStatus) {
        return (
            <div className="login">
                <div className="login-container card">
                    <span className="resetTitle">Reset your password</span>
                    <p className="resetinfo">Enter your email address and we will send you instructions to reset your password.</p>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" />
                        </div>
                        <button type="button" className="btn btn-primary w-100 mt-4 p-2" onClick={sendEmail}>Send email</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className="login">
                <div className="login-container card">
                    <span className="resetTitle">Check your email</span>
                    <p className="resetinfo">Please check the email address for instructions to reset your password.</p>
                    <form>
                        <button type="button" className="btn btn-primary w-100 mt-4 p-2" onClick={()=>navigate("/setpassword")}>Resend email</button>
                    </form>
                </div>
            </div>
        )
    }
}
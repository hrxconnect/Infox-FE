import { useNavigate } from "react-router-dom";
import './style.css'
import logo from '../../Assets/logo.png';

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="login">
            <div className="login-container card">
                <div className="login-logo">
                    <img src={logo} alt="" height={30} width={100} />
                </div>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="forgot-pass">
                        <a href="" onClick={()=>navigate("/resetpassword")}><span>Forget password?</span></a>
                    </div>
                    <button onClick={() => navigate("/home")} type="button" className="btn btn-primary w-100 mt-3 p-2">Log in</button>
                </form>
            </div>
        </div>
    )
}
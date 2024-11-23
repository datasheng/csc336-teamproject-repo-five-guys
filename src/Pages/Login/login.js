import "./login.css";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

//run for icons: npm install react-icons --save

const Login = () => {
    return (
        <div className="login-page">
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>
                    
            
                    <div className="input-box">
                        <input type="text" name="Email" placeholder="Email" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    

                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

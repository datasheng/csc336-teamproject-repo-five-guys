import "./register.css";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

//run for icons: npm install react-icons --save

const Register = () => {
    return (
        <div className="register-page">
            <div className="wrapper">
                <form action="">
                    <h1>Create Account</h1>
                    <div className="input-box">
                        <input type="text" name="FirstName" placeholder="First Name" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" name="LastName" placeholder="Last Name" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="date" name="birthdate" required />
                    </div>
                    <div className="input-box">
                        <input type="text" name="Email" placeholder="Email" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>

                    <div className="role-selection">
                        <label>
                            <input type="radio" name="role" value="student" defaultChecked />
                            Student
                        </label>
                        <label>
                            <input type="radio" name="role" value="teacher" />
                            Teacher
                        </label>
                    </div>

                    <button type="submit">Register</button>
                    <div className="login-link">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

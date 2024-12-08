import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthdate: "",
        email: "",
        password: "",
        role: "student",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // redirect after successful registration

    // update formData as the user types
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/login");
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Unable to connect to the server. Please try again later.");
        }
    };

    return (
        <div className="register-page">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>

                    {error && <p className="error">{error}</p>}

                    <div className="input-box">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>

                    <div className="role-selection">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={formData.role === "student"}
                                onChange={handleChange}
                            />
                            Student
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="teacher"
                                checked={formData.role === "teacher"}
                                onChange={handleChange}
                            />
                            Teacher
                        </label>
                    </div>

                    <button type="submit">Register</button>
                    <div className="login-link">
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
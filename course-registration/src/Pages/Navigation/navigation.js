import { Link } from "react-router-dom";
import { useState } from "react";
import "./navigation.css";

const LandingPage = () => {
    return (
        <>
            <div className="header">
                <h1>Welcome to CourseNet</h1>
            </div>

            <div className="cta-banner">
                <strong>Complete your Course Registration!</strong> Don’t miss out on your desired courses.
            </div>

            <div className="grid-container">
                <div className="grid-item">
                    <img src="https://via.placeholder.com/50" alt="Profile"></img>
                    <h3>Profile</h3>
                    <p>Manage your profile details.</p>
                </div>
                <div className="grid-item">
                    <img src="https://via.placeholder.com/50" alt="Enrollment"></img>
                    <h3>Course Enrollment</h3>
                    <p>Register for your courses.</p>
                    <Link to="/courses" className="nav-button">Go to Enrollment</Link>
                </div>
                <div className="grid-item">
                    <img src="https://via.placeholder.com/50" alt="Blackboard"></img>
                    <h3>Learning Resources</h3>
                    <p>Access course materials.</p>
                </div>
                <div className="grid-item">
                    <img src="https://via.placeholder.com/50" alt="Support"></img>
                    <h3>Student Support</h3>
                    <p>Contact support services.</p>
                </div>
            </div>
        </>
    );
}

export default LandingPage;

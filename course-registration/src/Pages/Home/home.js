import React from 'react';
import './home.css';


function Home() {
    return (
        <div className="home-container">
            
            <div className="hero-section">
                <h1>Welcome to CourseNet!</h1>
                <p>Register and explore a wide range of courses that fit your needs and interests.</p>
                <button className="btn-primary"><a href="/login" className="button-link">Login</a></button>
                <button className="btn-secondary"><a href="/register" className="button-link">Register</a></button>
            </div>
        </div>
    );
}

export default Home;

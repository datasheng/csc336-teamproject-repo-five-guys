import React from 'react';
import './header.css'; // Make sure this CSS file exists and is linked correctly

function Header() {
    return (
        <header className="header">
            <nav className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/listing">Listing</a></li>
                    <li><a href="/dashboard/instructor">Instructor-Dashboard</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;



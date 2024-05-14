import React from 'react';
import { Link } from 'react-router-dom';
import RAVE from './rave.jpg';


function Banner({ UserProfile }) {
    return (
        <div className="banner" style={{ backgroundColor: '#28354f', color: '#a8adba' }}>
        <div className="logo-container">
        <img src="/components/rave.jpg" alt="Rave Reviews Logo" className="logo" />
        </div>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
        <>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/search">Search</Link></li>
            
                <li><Link to="/whatsnew">What's New</Link></li>
                <li><Link to="/admin">Dashboard</Link></li>
                <li><Link to="/login">Log In/Sign-Up</Link></li>
            </>
            </ul>
        </nav>

        </div>
    );
}

export default Banner;
   /*<li><Link to="/details">Details</Link></li>*/
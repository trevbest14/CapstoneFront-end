// Banner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RAVE from './rave.jpg';


function Banner({ isUserProfile }) {
    return (
        <div className="banner" style={{ backgroundColor: '#28354f', color: '#a8adba' }}>
        <div className="logo-container">
            {/* Adjust the path as necessary */}
            <img src="/path-to-your-logo/logo.png" alt="Logo" className="logo" />
        </div>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            {!isUserProfile && <>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/details">Details</Link></li>
                <li><Link to="/whatsnew">What's New</Link></li>
                <li><Link to="/admin">Dashboard</Link></li>
            </>}
            </ul>        </nav>
            <img src={RAVE} width="450" height="400" style={{position: "absolute", left: "500px", top: "-100px"}}/>

        </div>
    );
}

export default Banner;

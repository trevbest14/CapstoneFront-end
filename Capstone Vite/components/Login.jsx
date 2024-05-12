import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Banner from './Banner';  // Assuming Banner is properly imported

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            localStorage.setItem('token', data.token);  // Store the token in localStorage
            navigate('/profile');  // Redirect to profile page or dashboard
        } catch (error) {
            setError('Failed to login: ' + error.message);
        }
    };



    return (
        <div>
            <Banner />
            <div style={{ padding: '20px' }}>
                <h2>Log in to Rave Reviews</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Log In</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>No account? <Link to="/signup">Create one here</Link></p>
            </div>
        </div>
    );
}

export default Login;

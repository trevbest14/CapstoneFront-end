import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Banner from './Banner';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');

        if (!username || !password) {
            setError('Both username and password are required.');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            localStorage.setItem('authToken', data.token);
            alert('Welcome!');
            navigate('/profile');
        } catch (error) {
            console.error('Login Error:', error);
            setError(error.message);
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

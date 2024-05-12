import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        favoriteGenres: []
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setError('');

        if (!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('SignUp Error:', error.message);
            setError(error.message || 'Failed to register');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "favoriteGenres") {
            setFormData(prevState => ({
                ...prevState,
                favoriteGenres: prevState.favoriteGenres.includes(value) ? 
                    prevState.favoriteGenres.filter(g => g !== value) : 
                    [...prevState.favoriteGenres, value]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <div>
            <Banner />
            <div style={{ padding: '20px' }}>
                <h2>Sign Up for Rave Reviews</h2>
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                <h3>Favorite Genres</h3>
                {['Action', 'Comedy', 'Drama', 'Horror', 'Thriller'].map(genre => (
                    <div key={genre}>
                        <input 
                            type="checkbox" 
                            name="favoriteGenres"
                            value={genre} 
                            checked={formData.favoriteGenres.includes(genre)} 
                            onChange={handleChange} 
                        />
                        <label>{genre}</label>
                    </div>
                ))}

                <button onClick={handleSignUp}>Sign Up</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default SignUp;

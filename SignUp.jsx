import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', username: '', password: '', favoriteGenres: []
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleGenre = (genre) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            favoriteGenres: prevFormData.favoriteGenres.includes(genre)
                ? prevFormData.favoriteGenres.filter(g => g !== genre)
                : [...prevFormData.favoriteGenres, genre]
        }));
    };

    const handleSignUp = async () => {
        setError('');

        if (!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('SignUp Error:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <Banner />
            <div style={{ padding: '20px' }}>
                <h2>Sign Up for Rave Reviews</h2>
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input name="username" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

                <h3>Favorite Genres</h3>
                {['Action', 'Comedy', 'Documentary', 'Drama', 'Horror', 'Psychological', 'Romantic Comedy', 'Romance', 'Suspense', 'Thriller'].map((genre) => (
                    <div key={genre}>
                        <input type="checkbox" checked={formData.favoriteGenres.includes(genre)} onChange={() => toggleGenre(genre)} />
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

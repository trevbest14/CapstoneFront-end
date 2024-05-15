import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';

function UserProfile() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of a token and redirect if none is found
        if (!localStorage.getItem('authToken')) {
            navigate('/login'); // Redirect to login if no token is present
            return;
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the token from local storage
        navigate('/login'); // Redirect to the login page
    };

    // Replace with actual data from server
    const user = { id: 1, name: "John Doe", reviews: ["Review 1", "Review 2"], email: "johndoe@example.com", favoriteGenres: ["Drama", "Comedy"] };

    return (
        <div>
            <Banner isUserProfile={true} />
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <h2>Favorite Genres</h2>
            <ul>
                {user.favoriteGenres.map(genre => (
                    <li key={genre}>{genre}</li>
                ))}
            </ul>
            <h2>My Reviews</h2>
            <ul>
                {user.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                ))}
            </ul>
            <button onClick={handleLogout} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                Log Out
            </button>
        </div>
    );
}

export default UserProfile;

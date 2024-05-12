import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';

function UserProfile() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of a token and redirect if none is found
        if (!localStorage.getItem('authToken')) {
            navigate('/login'); // Redirect to login if no token is present. Goal is to keep Profile only accessible to members
            return;
        }
    }, [navigate]);

    // replace w/ actual data from server
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
        </div>
    );
}

export default UserProfile;


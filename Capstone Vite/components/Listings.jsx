import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';

function Listings() {
  // Placeholder for the latest movies and reviews
    const latestMovies = [
        { id: 1, title: "Movie Title 1", review: "Great movie..." },
        { id: 2, title: "Movie Title 2", review: "An amazing experience..." },
    ];

    const navigate = useNavigate();

    return (
        <div>
            <Banner />
            <h1>Latest Movies</h1>
            {latestMovies.map((movie) => (
                <div key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)} style={{cursor: "pointer"}}>
                <h2>{movie.title}</h2>
                <p>{movie.review}</p>
            </div>
        ))}
        </div>
    );
}

export default Listings;

import React from 'react';
import Banner from './Banner';

function HomePage() {
  // Placeholder for movie list
    const movies = [{ id: 1, title: "Movie Title", description: "Movie description..." }];

    return (
        <div>
        <Banner />
        <h1>Movie List</h1>
        {movies.map((movie) => (
            <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            </div>
        ))}
        </div>
    );
}

export default HomePage;

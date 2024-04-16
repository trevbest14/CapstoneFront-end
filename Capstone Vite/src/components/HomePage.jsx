import React from 'react';
import Banner from './Banner.jsx';
function HomePage() {
  // Placeholder for movie list
    const movies = [{ id: 1, title: "Movie Title", description: "Movie description..." }];

    return (
        <div>
        <h1>Movie List</h1>
        {movies.map((movie) => (
            <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <Banner/>
            </div>
        ))}
        </div>
    );
}

export default HomePage;

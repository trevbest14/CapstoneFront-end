import React from 'react';

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
            </div>
        ))}
        </div>
    );
}

export default HomePage;

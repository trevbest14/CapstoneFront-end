import React from 'react';

function ItemDetails() {
  // Placeholder for movie details
    const movie = { id: 1, title: "Movie Title", description: "Detailed description...", rating: "5 stars" };

    return (
        <div>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p>Rating: {movie.rating}</p>
        </div>
    );
}

export default ItemDetails;

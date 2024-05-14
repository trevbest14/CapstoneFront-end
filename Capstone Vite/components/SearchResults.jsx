import React, { useState } from 'react';
import Banner from './Banner';

const SearchResults = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('Find what you\'re looking for');
    const [toggleDescription, setToggleDescription] = useState({});

    const handleSearch = async () => {
        console.log("Search initiated for:", searchTerm);

        if (!searchTerm.trim()) {
            setError('Please enter a movie name to search.');
            console.error("No search term provided");
            return;
        }
        setError('');
        setStatusMessage('Searching...');
        const apiKey = import.meta.env.VITE_MOVIE_DB_API_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

        console.log(`Fetching from URL: ${url}`);
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.status_message);
            if (data.results.length > 0) {
                setMovies(data.results);
                setStatusMessage('Here are your results');
                console.log("Search successful, movies found:", data.results.length);
            } else {
                setStatusMessage('We couldn\'t find what you\'re looking for');
                console.log("No movies found for the search term:", searchTerm);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError('Failed to fetch movies. Please try again later.');
        }
    };

    const handleToggleDescription = (id) => {
        setToggleDescription(prev => ({ ...prev, [id]: !prev[id] }));
        console.log(`Toggled description for movie ID: ${id}`);
    };

    return (
        <div>
            <Banner />
            <div style={{ padding: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Movie Name Here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px' }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <h2 style={{ color: 'white', textAlign: 'center' }}>{statusMessage}</h2>
            <div className="movies-container">
                {movies.map((movie, index) => (
                    <div key={movie.id + '-' + index} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} className="movie-image"/>
                        <h2>{movie.title}</h2>
                        <p>Rating: {movie.vote_average}</p>
                        <button onClick={() => handleToggleDescription(movie.id)}>Read More</button>
                        {toggleDescription[movie.id] && <p>{movie.overview}</p>}
                    </div>
                ))}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SearchResults;
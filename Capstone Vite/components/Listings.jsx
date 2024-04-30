// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Banner from './Banner';

// function Listings() {
//   // Placeholder for the latest movies and reviews
//     const latestMovies = [
//         { id: 1, title: "Movie Title 1", review: "Great movie..." },
//         { id: 2, title: "Movie Title 2", review: "An amazing experience..." },
//     ];

//     const navigate = useNavigate();

//     return (
//         <div>
//             <Banner />
//             <h1>Latest Movies</h1>
//             {latestMovies.map((movie) => (
//                 <div key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)} style={{cursor: "pointer"}}>
//                 <h2>{movie.title}</h2>
//                 <p>{movie.review}</p>
//             </div>
//         ))}
//         </div>
//     );
// }

// export default Listings;

// BEGIN ATTEMPT 2:

// import React, { useState, useEffect } from 'react';
// import Banner from './Banner';

// const Listings = () => {
//     const [movies, setMovies] = useState([]);
//     const [page, setPage] = useState(1); // For pagination
//     const [error, setError] = useState(''); // To store error messages
//     const [toggleDescription, setToggleDescription] = useState({}); // To handle toggle state of each movie's description

//     useEffect(() => {
//     const fetchMovies = async () => {
//         try {
//             // Construct the URL with the page number and the API key from environment variable
//             const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
//             const response = await fetch(url);
//             const data = await response.json();

//             // Append new movies to the existing list for pagination
//             setMovies(prevMovies => [...prevMovies, ...data.results]);
//             setError(''); // Reset error message upon successful fetch
//         } catch (error) {
//             console.error("Fetching movies failed", error);
//             setError('Failed to fetch movies. Please try again later.');
//         }
//     };

//     fetchMovies();
//   }, [page]); // Fetch movies again when page changes

//   // Toggle description view for a specific movie
//     const handleToggleDescription = (id) => {
//         setToggleDescription(prev => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div>
//         <Banner />
//         <h1>Latest Movies</h1>
//         <div className="movies-container">
//             {movies.map((movie) => (
//             <div key={movie.id} className="movie-card">
//                 <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-image"/>
//                 <h2>{movie.title}</h2>
//                 <p>Rating: {movie.vote_average}</p>
//                 <button onClick={() => handleToggleDescription(movie.id)}>Toggle Description</button>
//                 {toggleDescription[movie.id] && <p>{movie.overview}</p>}
//             </div>
//             ))}
//             {error && <p className="error">{error}</p>}
//         </div>
//         <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
//         </div>
//     );
// };

// export default Listings;

// END ATTEMPT 2

// ***BEGIN ATTEMPT 3***
import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const Listings = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [toggleDescription, setToggleDescription] = useState({});

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if(response.ok) {
                    setMovies(prevMovies => [...prevMovies, ...data.results]);
                    setTotalPages(data.total_pages);
                    setError('');
                } else {
                    throw new Error(data.status_message);
                }
            } catch (error) {
                console.error("Fetching movies failed", error);
                setError('Failed to fetch movies. Please try again later.');
            }
        };

        fetchMovies();
    }, [page]);

    const handleToggleDescription = (id) => {
        setToggleDescription(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <Banner />
            <h1>Latest Movies</h1>
            <div className="movies-container">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} className="movie-image"/>
                        <h2>{movie.title}</h2>
                        <p>Rating: {movie.vote_average}</p>
                        <button onClick={() => handleToggleDescription(movie.id)}>Toggle Description</button>
                        {toggleDescription[movie.id] && <p>{movie.overview}</p>}
                    </div>
                ))}
                {error && <p className="error">{error}</p>}
                {page < totalPages && <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>}
            </div>
        </div>
    );
};

export default Listings;

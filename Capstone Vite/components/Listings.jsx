import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const Listings = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [toggleDescription, setToggleDescription] = useState({});
    const [reviewText, setReviewText] = useState('');
    const [showReviewBox, setShowReviewBox] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            const apiKey = import.meta.env.VITE_MOVIE_DB_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
            console.log(`Attempting to fetch movies from page ${page}`);

            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (response.ok) {
                    console.log("Movies fetched successfully:", data.results);
                    setMovies(prevMovies => [...prevMovies, ...data.results]);
                    setTotalPages(data.total_pages);
                } else {
                    console.error("Failed to fetch movies:", data.status_message);
                    throw new Error(data.status_message);
                }
            } catch (error) {
                console.error("Error fetching movies:", error.message);
                setError('Failed to fetch movies. Please try again later.');
            }
        };

        fetchMovies();
    }, [page]);

    const handleToggleDescription = (id) => {
        setToggleDescription(prev => ({ ...prev, [id]: !prev[id] }));
        console.log(`Toggled description for movie ID: ${id}`);
    };

    const handleReviewInputChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleReviewSubmit = (movieId) => {
        // Send a request to submit the review
        // Assuming you have a function for submitting reviews
        // You can use fetch or an API library like axios
        console.log(`Submitting review for movie ID: ${movieId}, Text: ${reviewText}`);
        // After submission, you may want to reset the review text and hide the review box
        setReviewText('');
        setShowReviewBox(false);
    };

    const handleLoginRedirect = () => {
        // Redirect users to the login/signup page
        console.log("Redirecting to login/signup page...");
        // Use your routing mechanism to navigate to the login/signup page
    };

    return (
        <div>
            <Banner />
            <h1>Latest Movies</h1>
            <div className="movies-container">
                {movies.map((movie, index) => (
                    <div key={movie.id + '-' + index} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} className="movie-image"/>
                        <h2>{movie.title}</h2>
                        <p>Rating: {movie.vote_average}</p>
                        <button onClick={() => handleToggleDescription(movie.id)}>Read More</button>
                        {toggleDescription[movie.id] && <p>{movie.overview}</p>}

                        <div>
                            {showReviewBox ? (
                                <div>
                                    <textarea value={reviewText} onChange={handleReviewInputChange}></textarea>
                                    <button onClick={() => handleReviewSubmit(movie.id)}>Submit Review</button>
                                </div>
                            ) : (
                                <button onClick={() => {
                                    if (isLoggedIn) {
                                        setShowReviewBox(true);
                                    } else {
                                        handleLoginRedirect();
                                    }
                                }}>Leave a Review</button>
                            )}
                        </div>
                        
                    </div>
                ))}
                {error && <p className="error">{error}</p>}
                {page < totalPages && (
                    <button onClick={() => {
                        console.log("Loading more movies...");
                        setPage(prevPage => prevPage + 1);
                    }}>Load More</button>
                )}
            </div>
        </div>
    );
};

export default Listings;
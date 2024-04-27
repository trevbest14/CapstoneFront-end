const express = require('express');
const { fetchMovieDetails } = require('../utils/movieDB');
const Movie = require('../models/Movie');

const router = express.Router();

// Get all movies
router.get('/', authenticate, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new movie
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newMovie = new Movie({ title, description });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to fetch and add a movie from The Movie DB to local database
router.post('/', authenticate, async (req, res) => {
    const { movieId } = req.body;
    try {
        const movieData = await fetchMovieDetails(movieId);
        const newMovie = new Movie({
            title: movieData.title,
            description: movieData.overview
        });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

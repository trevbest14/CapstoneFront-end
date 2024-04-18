// routes/movies.js
const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new movie
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newMovie = new Movie({ title, description });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

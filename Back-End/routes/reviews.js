// routes/reviews.js
const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// Submit a review
router.post('/', async (req, res) => {
    try {
        const { text, movieId, userId } = req.body; // Assume user ID comes from authentication middleware in a real app
        const review = new Review({ text, movie: movieId, user: userId });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);

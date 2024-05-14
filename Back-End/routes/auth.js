const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); 

// router.post('/register', async (req, res) => {
//     const { username, password, email } = req.body;

//     // First, check if the username already exists
//     try {
//         const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//         if (existingUser.rows.length > 0) {
//             return res.status(409).json({ message: 'Username already exists' });
//         }

//         // If no existing user, proceed with registration
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//             'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
//             [username, hashedPassword, email]
//         );
//         const userId = result.rows[0].id;
//         const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(201).json({ userId, token, message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Registration Error:', error);
//         res.status(500).json({ message: 'Registration failed', error: error.message });
//     }
// });


// // POST endpoint for user login
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({ message: 'Please provide username and password' });
//     }

//     try {
//         const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//         if (result.rows.length === 0) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         const user = result.rows[0];
//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, userId: user.id, username: user.username });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: 'Error logging in user', error: error.message });
//     }
// });

// module.exports = router;

router.post('/register', async (req, res) => {
    const { username, password, email, firstName, lastName, favoriteGenres } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, email, first_name, last_name, favorite_genres) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, first_name, last_name, email, favorite_genres',
            [username, hashedPassword, email, firstName, lastName, favoriteGenres]
        );
        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: {
            userId: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            favoriteGenres: user.favorite_genres
        }, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    try {
        const result = await pool.query('SELECT id, username, password, first_name, last_name, email, favorite_genres FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: {
            userId: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            favoriteGenres: user.favorite_genres
        } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
});

module.exports = router;

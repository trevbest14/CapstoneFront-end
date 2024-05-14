const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');  // Assuming this correctly connects to your PostgreSQL database

// // POST endpoint for user registration
// router.post('/register', async (req, res) => {
//     const { username, password, email } = req.body;
//     if (!username || !password || !email) {
//         return res.status(400).json({ message: 'Please provide username, password, and email' });
//     }

//     try {
//         // Hash the password with bcrypt
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // Insert the new user into the database
//         const result = await pool.query(
//             'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id', 
//             [username, hashedPassword, email]
//         );
//         const userId = result.rows[0].id;
//         const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ token, userId, username, message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering new user:', error);
//         res.status(500).json({ message: 'Error registering new user', error: error.message });
//     }
// });

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // First, check if the username already exists
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // If no existing user, proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        const userId = result.rows[0].id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ userId, token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});


// POST endpoint for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.id, username: user.username });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
});

module.exports = router;

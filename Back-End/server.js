// Import required modules
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const pool = require('./db'); // Ensure your db.js configures PostgreSQL correctly

pool.connect();
/*
// Import required modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Ensure your db.js configures PostgreSQL correctly

require('dotenv').config(); // Load environment variables from .env file

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(require('cors')()); // Enable CORS

// Basic route to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Register user endpoint
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Login user endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValid = await bcrypt.compare(password, userResult.rows[0].password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: userResult.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: userResult.rows[0].id, username: userResult.rows[0].username });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Error handler for unmatched routes
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// General error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message || "Internal Server Error"
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/
// Load environment variables first
// require('dotenv').config({ path: '/.env' });
require('dotenv').config();
console.log(process.env.DB_USER);

// Initialize express app
const app = express();

// Apply middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
// Mount authentication routes under '/users' prefix
app.use('/users', authRouter);
// Basic endpoint to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Test endpoint for database connectivity
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users LIMIT 1');
        res.json({ message: "Database connected successfully", data: result.rows });
    } catch (error) {
        console.error('Database Connection Error:', error);
        res.status(500).json({ message: "Failed to connect to database", error: error.message });
    }
});

// Error handler for unmatched routes
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path);
    next();
});

// basic error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message || "Internal Server Error"
        }
    });
});

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


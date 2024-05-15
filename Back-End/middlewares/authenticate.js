// const authenticate = require('../middlewares/authenticate');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const authenticate = async (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
}

const token = authHeader.split(' ')[1];
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [decoded.userId]);
    if (result.rows.length === 0) {
    return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = result.rows[0];
    next();
} catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
}
};

module.exports = authenticate;

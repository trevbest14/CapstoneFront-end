const { Pool } = require('pg');

const pool = new Pool({
user: 'capstone',
host: 'localhost',
database: 'moviereviews',
password: 'Password',
port: 5432,
});

module.exports = pool;

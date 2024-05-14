const pool = require('./db'); // Assuming this file path is correct

pool.query('SELECT NOW()', (err, res) => {
if (err) {
    console.error('Error connecting to the database', err.stack);
} else {
    console.log('Connection successful, current server time is:', res.rows[0].now);
}
});

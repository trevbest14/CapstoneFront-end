const pool = require('./db'); // Assuming you have a db.js setup for connecting to your database

async function seedDB() {
    const sqlInsert = `
    INSERT INTO users (username, email, password) VALUES 
    ('testuser', 'test@example.com', 'password'),
    ('janedoe', 'jane@example.com', 'password123');
    `;

    try {
        await pool.query(sqlInsert);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }

    pool.end();
}

seedDB();

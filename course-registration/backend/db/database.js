const mysql = require('mysql2');

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',          // Replace with your MySQL server host
    user: 'root',      // Replace with your MySQL username
    password: 'root',  // Replace with your MySQL password
    database: 'course_registration_db', // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
});

module.exports = db;

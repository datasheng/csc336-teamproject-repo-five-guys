const db = require('../db/database');

const register = (req, res) => {
    const { firstName, lastName, birthdate, email, password, role } = req.body;

    if (!firstName || !lastName || !birthdate || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Debug log
    console.log('Received data:', req.body);

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, rows) => {
        if (err) {
            console.error('Database error when checking email: ', err);
            return res.status(500).json({ message: "Server error while checking email" });
        }

        if (rows.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Insert new user
        const insertQuery = `
            INSERT INTO user (first_name, last_name, birthdate, email, password, major, is_subscribed, type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [firstName, lastName, birthdate, email, password, null, false, role];

        db.query(insertQuery, params, (err, results) => {
            if (err) {
                console.error('Error inserting new user: ', err);
                return res.status(500).json({ message: "Server error while inserting new user" });
            }

            console.log('User inserted with ID:', results.insertId);
            return res.status(201).json({ 
                message: "User registered successfully", 
                userId: results.insertId 
            });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (err, rows) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: "Server error" });
        }

        if (rows.length === 0 || rows[0].password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        req.session.user = { 
            userId: user.u_id,
            first_name: user.first_name,
            last_name: user.last_name,
            type: user.type
        };

        // Debug log
        console.log('LOGGED IN:', req.session);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.u_id,
                name: `${user.first_name} ${user.last_name}`,
                type: user.type
            }
        });
    });
};

module.exports = {
    register,
    login
};

const db = require('../db/database');

const register = (req, res) => {
    const { firstName, lastName, birthdate, email, password, role } = req.body;

    if (!firstName || !lastName || !birthdate || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    // debug log
    console.log('Received data:', req.body);

    db.get('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error('Database error when checking email: ', err);
            return res.status(500).json({ message: "Server error while checking email" });
        }

        if (row) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const query = `
            INSERT INTO user (first_name, last_name, birthdate, email, password, major, is_subscribed, type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [firstName, lastName, birthdate, email, password, null, false, role];

        console.log('Executing query:', query);
        console.log('With params:', params);

        db.run(query, params, function (err) {
            if (err) {
                console.error('Error inserting new user: ', err);
                return res.status(500).json({ message: "Server error while inserting new user" });
            }

            console.log('User inserted with ID:', this.lastID);
            return res.status(201).json({ message: "User registered successfully", userId: this.lastID });
        });
    });
};


const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.get('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: "Server error" });
        }

        if (!row || row.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        req.session.id = row.u_id;
        req.session.first_name = row.first_name;
        req.session.last_name = row.last_name;
        req.session.type = row.type;

        // debug log
        console.log('Session:', req.session);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: row.u_id,
                name: `${row.first_name} ${row.last_name}`,
                type: row.type
            }
        });
    });
};

module.exports = {
    register,
    login
};

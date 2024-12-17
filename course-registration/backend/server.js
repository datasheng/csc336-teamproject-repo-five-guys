const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require("express-session");
const db = require('./db/database'); // Import MySQL connection

const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/user'); 
const courseRoutes = require('./routes/course'); 


// init
const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:3000", // React frontend origin
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json()); // No need for body-parser
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
  },
}));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);


// Student: Enroll in a section
app.post('/api/enrollments', (req, res) => {
  const { student_id, section_id } = req.body;

  const checkSeatsQuery = `SELECT max_seats, current_seats FROM section WHERE s_id = ?`;

  db.query(checkSeatsQuery, [section_id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "Section not found or database error", message: err?.message });
    }

    const { max_seats, current_seats } = results[0];

    if (current_seats >= max_seats) {
      return res.status(400).json({ error: "No available seats in this section." });
    }

    const enrollQuery = `
      INSERT INTO enrollment (student_id, section_id, status) VALUES (?, ?, 'enrolled');
      UPDATE section SET current_seats = current_seats + 1 WHERE s_id = ?;
    `;

    db.query(enrollQuery, [student_id, section_id, section_id], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to enroll in section' });
      }
      res.json({ message: "Enrolled successfully" });
    });
  });
});

// Endpoint to fetch courses (existing)
app.get('/courses', (req, res) => {
  const query = 'SELECT * FROM course';
  db.query(query, (err, rows) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(rows);
  });
});

// Server Listener
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

app.use(express.json());
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

// Endpoint to fetch courses
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

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

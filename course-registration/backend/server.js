const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require("express-session");

const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/user'); 
const courseRoutes = require('./routes/course'); 


// init
const app = express();

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

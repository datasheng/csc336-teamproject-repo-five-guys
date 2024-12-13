const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require("express-session");

const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/user'); 

// init
const app = express();

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
  })
);

// routes
app.use('/api/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

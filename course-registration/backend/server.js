// imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");

const authRoutes = require('./routes/auth'); 

// init
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

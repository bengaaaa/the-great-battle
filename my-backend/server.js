const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'benga',
  password: 'foodfightasia',
  database: 'food_fight_asia',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Example route
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS currentTime', (err, result) => {
    if (err) {
      res.status(500).send('Database query failed');
      return;
    }
    res.json(result[0]);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

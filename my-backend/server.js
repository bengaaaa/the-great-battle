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

// Route to get all foods
app.get('/food', (req, res) => {
  const query = 'SELECT * FROM food';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Database query failed');
      return;
    }

    res.json(results);
  });
});

// Route to get food by id
app.get('/food/:id', (req, res) => {
  const foodId = req.params.id;
  const query = 'SELECT * FROM food WHERE id = ?';

  db.query(query, [foodId], (err, result) => {
    if (err) {
      res.status(500).send('Database query failed');
      return;
    }

    if (result.length === 0) {
      res.status(404).send('Food not found');
      return;
    }

    res.json(result[0]);
  });
});

// Route to get two random foods
app.get('/random-foods', (req, res) => {
  const query = 'SELECT * FROM food ORDER BY RAND() LIMIT 2';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Database query failed');
      return;
    }

    res.json(results);
  });
});

// Route to update ELO ratings
app.post('/update-elo', (req, res) => {
  const { winnerId, loserId, winnerNewElo, loserNewElo } = req.body;

  const updateWinnerQuery = 'UPDATE food SET elo = ? WHERE id = ?';
  const updateLoserQuery = 'UPDATE food SET elo = ? WHERE id = ?';

  db.query(updateWinnerQuery, [winnerNewElo, winnerId], (err) => {
    if (err) {
      res.status(500).send('Failed to update winner ELO');
      return;
    }

    db.query(updateLoserQuery, [loserNewElo, loserId], (err) => {
      if (err) {
        res.status(500).send('Failed to update loser ELO');
        return;
      }

      res.sendStatus(200);
    });
  });
});

// Route to get the leaderboard
app.get('/leaderboard', (req, res) => {
  const query = 'SELECT * FROM food ORDER BY elo DESC';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Database query failed');
      return;
    }

    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

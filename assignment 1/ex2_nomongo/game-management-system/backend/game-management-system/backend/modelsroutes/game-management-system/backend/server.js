const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Dummy data
let games = [
  { id: 1, title: 'Game 1', genre: 'Action', platform: 'PC', releaseYear: 2020, developer: 'Developer A', rating: 4.5, description: 'Description of Game 1' },
  { id: 2, title: 'Game 2', genre: 'Adventure', platform: 'PlayStation', releaseYear: 2019, developer: 'Developer B', rating: 4.0, description: 'Description of Game 2' }
];

// Routes
app.get('/api/games', (req, res) => {
  res.json(games);
});

app.post('/api/games', (req, res) => {
  const newGame = req.body;
  newGame.id = games.length + 1;
  games.push(newGame);
  res.status(201).json(newGame);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

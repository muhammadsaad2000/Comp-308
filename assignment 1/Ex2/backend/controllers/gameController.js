// backend/controllers/gameController.js
const Game = require('../models/gameModel');
const User = require('../models/userModel');

exports.addGame = async (req, res) => {
  const { title, genre, platform, releaseYear, developer, rating, description } = req.body;

  try {
    const newGame = new Game({ title, genre, platform, releaseYear, developer, rating, description });
    await newGame.save();
    res.json(newGame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addUserGame = async (req, res) => {
  const { gameId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (user.games.includes(gameId)) return res.status(400).json({ msg: 'Game already in collection' });

    user.games.push(gameId);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeUserGame = async (req, res) => {
  const { gameId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    user.games = user.games.filter(game => game.toString() !== gameId);

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// backend/routes/gameRoutes.js
const express = require('express');
const { addGame, getAllGames, addUserGame, removeUserGame } = require('../controllers/gameController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', addGame);
router.get('/all', getAllGames);
router.post('/addUserGame', auth, addUserGame);
router.post('/removeUserGame', auth, removeUserGame);

module.exports = router;

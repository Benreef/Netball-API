const express = require('express');
const router = express.Router();
const { createGameData } = require('../models/game_data');

router.post('/', (req, res) => {
  const gameData = req.body;
  console.log(gameData);

  createGameData(gameData)
    .then(gameId => {
      res.json({ gameId });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to save game data' });
    });
});
module.exports = router;

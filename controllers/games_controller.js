const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/', (req, res) => {
  Game
    .find()
    .then(games => res.json(games))
});

router.post('/', (req, res) => {
  const { teamId, oppositionId } = req.body;

  Game
    .create(teamId, oppositionId)
    .then((gameId) => {
      res.json({ gameId });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create game' });
    });
});

module.exports = router;
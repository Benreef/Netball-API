const db = require('../db/db');
// games_controller.js

const Game = require('../models/game');

// GET /api/games
function getAllGames(req, res) {
  Game.find()
    .then(games => {
      res.json(games);
    })
    .catch(error => {
      console.error('Error fetching games:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

// POST /api/games
function createGame(req, res) {
  const { teamId, oppositionId } = req.body;

  // Create a new game instance
  const game = new Game({
    teamId,
    oppositionId,
  });

  // Save the game to the database
  game.save()
    .then(savedGame => {
      res.json({ gameId: savedGame._id });
    })
    .catch(error => {
      console.error('Error creating game:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

module.exports = {
  getAllGames,
  createGame,
};

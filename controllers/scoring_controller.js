// const express = require('express');
// const router = express.Router()
// const db = require('../db/db')

// const storeInterceptData = async (gameId, playerId, quarter, position) => {
//   try {
//     const query = 'INSERT INTO intercepts (game_id, player_id, quarter, position) VALUES ($1, $2, $3, $4)';
//     const values = [gameId, playerId, quarter, position];

//     await pool.query(query, values);

//     console.log('Intercept data stored successfully');
//   } catch (error) {
//     console.error('Error storing intercept data:', error);
//   }
// };

// // Function to store the center pass data in the database
// const storeCenterPassData = async (gameId, playerId, quarter, position) => {
//   try {
//     const query = 'INSERT INTO center_pass (game_id, player_id, quarter, position) VALUES ($1, $2, $3, $4)';
//     const values = [gameId, playerId, quarter, position];

//     await pool.query(query, values);

//     console.log('Center pass data stored successfully');
//   } catch (error) {
//     console.error('Error storing center pass data:', error);
//   }
// };

// // Function to store the scoring data in the database
// const storeScoreData = async (gameId, playerId, quarter, team, scored) => {
//   try {
//     const query = 'INSERT INTO shooting_stats (game_id, player_id, quarter, goals, missed) VALUES ($1, $2, $3, $4, $5)';
//     const values = [gameId, playerId, quarter, scored ? 1 : 0, scored ? 0 : 1];

//     await pool.query(query, values);

//     console.log('Score data stored successfully');
//   } catch (error) {
//     console.error('Error storing score data:', error);
//   }
// };
// const storeGameData = async (gameId, teamId, result, score) => {
//   try {
//     const query = 'UPDATE games SET team_id = $1, result = $2, score = $3 WHERE game_id = $4';
//     const values = [teamId, result, score, gameId];

//     await pool.query(query, values);

//     console.log('Game data stored successfully');
//   } catch (error) {
//     console.error('Error storing game data:', error);
//   }
// };

// module.exports = {
//   storeInterceptData,
//   storeCenterPassData,
//   storeScoreData,
//   storeGameData
// };


const express = require('express');
const router = express.Router();
const db = require('../db/db')

// Import models
const Game = require('../models/game');
const Player = require('../models/player');
const Score = require('../models/score');
const Intercept = require('../models/intercept');
const CenterPass = require('../models/center_pass');
const Teams = require('../models/team');
   
// Store intercept data in the database
router.post('/api/intercepts', (req, res) => {
  const { game_id, player_id, quarter, position } = req.body;

  Game.findById(game_id)
    .then(game => game.home_team_id)
    .then(teamId =>
      Player.findById(player_id)
        .then(player =>
          Intercept.create(game_id, player_id, quarter, position)
            .then(() => res.json({ message: 'Intercept data stored successfully' }))
        )
    )
});


// Store center pass data in the database
router.post('/api/center_passes', (req, res) => {
  const { game_id, player_id, quarter, position } = req.body;

  Game.findById(game_id)
    .then(game => game.home_team_id)
    .then(teamId =>
      Player.findById(player_id)
        .then(player =>
          CenterPass.create(game_id, player_id, quarter, position)
            .then(() => res.json({ message: 'Center pass data stored successfully' }))
        )
    )
});

// Store score data in the database
router.post('/', (req, res) => {
  const { gameId, playerId, quarter, teamId, scored } = req.body;
  Game
    .findById(gameId)
    .then(game => {
      // const teamId = game.teamId;
      return Player.findById(playerId)
        .then(player => {
          const playerType = player.preferred_position === 'GA' ? 'GA' : 'GS';
          return Score.create(gameId, playerId, quarter, teamId, scored ? 1 : 0, scored ? 0 : 1, playerType)})
        })
})
// Store game data in the database
router.post('/api/games', (req, res) => {
  const { gameId, teamId, result, score } = req.body;

  Game.findById(gameId)
    .then(game =>
      Game.update(gameId, teamId, result, score)
        .then(() => res.json({ message: 'Game data stored successfully' }))
    )
});

router.post('/api/games', (req, res) => {
  const { game_id, player_id, quarter } = req.body;

  Game
    .findById(game_id)
    .then(game =>
      Game.update(game_id, game.home_team_id, game.opposition_team_id, game.home_result, game.opposition_result)
        .then(() => res.json({ message: 'Game data stored successfully' }))
    )
});



module.exports = router;

const db = require('../db/db');

const Game = {
  findById: gameId => {
    const sql = 'SELECT * FROM games WHERE game_id = $1';
    return db
      .query(sql, [gameId])
      .then(dbRes => {
        return dbRes.rows[0];
      });
  },
  
  update: (gameId, homeTeamId, oppositionTeamId, homeResult, oppositionResult) => {
    const sql = 'UPDATE games SET home_team_id = $1, opposition_team_id = $2, home_result = $3, opposition_result = $4 WHERE game_id = $5';

    return db
      .query(sql, [homeTeamId, oppositionTeamId, homeResult, oppositionResult, gameId])
      .then(dbRes => {
        return dbRes.rows[0];
      });
  }
};

module.exports = Game;
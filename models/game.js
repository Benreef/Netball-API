const db = require('../db/db');

const Game = {
  findById: (gameId) => {
    const sql = 'SELECT * FROM games WHERE game_id = $1';
    return db.query(sql, [gameId]).then((dbRes) => {
      return dbRes.rows[0];
    });
  },

  create: (homeTeamId, oppositionTeamId) => {
    const sql =
      'INSERT INTO games (home_team_id, opposition_team_id) VALUES ($1, $2) RETURNING game_id';

    return db.query(sql, [homeTeamId, oppositionTeamId]).then((dbRes) => {
      return dbRes.rows[0].game_id;
    });
  },

  update: (gameId, homeTeamId, oppositionTeamId, homeResult, oppositionResult) => {
    const sql =
      'UPDATE games SET home_team_id = $1, opposition_team_id = $2, home_result = $3, opposition_result = $4 WHERE game_id = $5';

    return db.query(sql, [homeTeamId, oppositionTeamId, homeResult, oppositionResult, gameId]);
  },
};

module.exports = Game;

const db = require('../db/db');

const Score = {
  create: (game_id, player_id, quarter, team_id, goals, missed) => {
    const sql = `INSERT INTO shooting_stats (game_id, player_id, quarter, team_id, goals, missed) VALUES ($1, $2, $3, $4, $5, $6)`;

    return db.query(sql, [game_id, player_id, quarter, team_id, goals, missed])
      .then(dbRes => dbRes.rows[0]);
  }
};

module.exports = Score;
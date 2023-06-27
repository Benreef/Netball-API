const db = require('../db/db');

const Intercept = {
  create: (gameId, playerId, quarter, position) => {
    const sql = `INSERT INTO intercepts (game_id, player_id, quarter, position) VALUES ($1, $2, $3, $4)`;

    return db.query(sql, [gameId, playerId, quarter, position])
      .then(dbRes => dbRes.rows[0]);
  }
};

module.exports = Intercept;

const db = require('../db/db');

const CenterPass = {
  create: (gameId, playerId, quarter, position) => {
    const sql = `INSERT INTO center_pass (game_id, player_id, quarter, position) VALUES ($1, $2, $3, $4)`;

    return db.query(sql, [gameId, playerId, quarter, position])
      .then(dbRes => dbRes.rows[0]);
  }
};

module.exports = CenterPass;
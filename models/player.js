const db = require('../db/db');

const Player = {
  findById:(playerId) => {
    const sql = `SELECT * FROM players WHERE player_id = $1`;

    return db
      .query(sql, [playerId])
      .then(dbRes => {
        const playerData = dbRes.rows[0];
        return playerData
      });
  }
}

module.exports = Player;
const db = require('../db/db');

const createGameData = (gameData) => {
  console.log(gameData)
  const sql = `
    INSERT INTO game_data
      (game_id, player_id, quarter, home_score, home_missed, opposition_score, opposition_missed, intercepts, center_passes)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id;
  `;

  const values = [
    gameData.game_id,
    gameData.player_id,
    gameData.quarter,
    gameData.home_score,
    gameData.home_missed,
    gameData.opposition_score,
    gameData.opposition_missed,
    gameData.intercepts,
    gameData.center_passes
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, values)
      .then((result) => resolve(result.rows[0].id))
      .catch((error) => reject(error));
  });
};

module.exports = { createGameData };
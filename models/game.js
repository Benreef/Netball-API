const db = require('../db/db')

const Game = {
  findById: gameId => {
    const sql = `SELECT * FROM games WHERE game_id = $1`
    return db
      .query(sql, [gameId])
      .then(dbRes => {
        dbRes.rows[0]
      })
  },
  
  update: (gameId, teamId, result, score) => {
    const sql = `UPDATE games SET team_id = $1, result = $2, score = $3 WHERE game_id = $4`

    return db
      .query(sql, [teamId, result, score, gameId])
      .then(dbRes => dbRes.rows[0])
  }
}

module.exports = Game
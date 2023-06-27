const db = require('../db/db');

const Team = {
  create: (teamName, coachName, playerNames, preferredPositions) => {
    const sql = `INSERT INTO teams (team_name, coach_name, player_name, preferred_position) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [teamName, coachName, playerNames, preferredPositions];

    return db.query(sql, values)
      .then(dbRes => dbRes.rows[0]);
  },


  findById: teamId => {
    const sql = `
    SELECT * FROM teams WHERE id = $1
    `
    return db
      .query(sql, [teamId])
      .then(dbRes => dbRes.rows[0])
  },

  findAll: () => {
    const sql = `SELECT * FROM teams`
    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  }

};

module.exports = Team;


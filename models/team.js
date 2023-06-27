const db = require('../db/db');

const createTeam = (teamName, coachName) => {
  const insertTeamQuery = `INSERT INTO teams (team_name, coach_name) VALUES ($1, $2) RETURNING team_id`;
  const teamValues = [teamName, coachName];

  return db.query(insertTeamQuery, teamValues)
    .then(teamResult => teamResult.rows[0].team_id)
    .catch(error => {
      throw new Error('Failed to create team');
    });
};

const createPlayers = (teamId, players) => {
  const playerValues = players.map(player => [teamId, player.name, player.position]);
  const insertPlayersQuery = `INSERT INTO players (team_id, player_name, preferred_position) VALUES ($1, $2, $3)`;

  return Promise.all(playerValues.map(values => db.query(insertPlayersQuery, values)))
    .catch(error => {
      throw new Error('Failed to create players');
    });
};

const createTeamAndPlayers = (teamName, coachName, players) => {
  return createTeam(teamName, coachName)
    .then(teamId => createPlayers(teamId, players))
    .then(() => {
      return { success: true };
    })
    .catch(error => {
      console.error(error);
      return { error: 'Failed to save team to the database' };
    });
};

const findById = teamId => {
  const sql = `SELECT * FROM teams WHERE team_id = $1`;
  return db.query(sql, [teamId])
    .then(dbRes => dbRes.rows[0])
    .catch(error => {
      console.error(error);
      throw new Error('Failed to fetch team from the database');
    });
};

const findAll = () => {
  const sql = `SELECT * FROM teams`;
  return db.query(sql)
    .then(dbRes => dbRes.rows)
    .catch(error => {
      console.error(error);
      throw new Error('Failed to fetch teams from the database');
    });
};

module.exports = {
  createTeamAndPlayers,
  findById,
  findAll
};

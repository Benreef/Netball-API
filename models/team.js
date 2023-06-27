const db = require('../db/db');

const createTeam = (teamName, coachName) => {
  const insertTeamQuery = `INSERT INTO teams (team_name, coach_name) VALUES ($1, $2) RETURNING team_id`;
  const teamValues = [teamName, coachName];

  return db.query(insertTeamQuery, teamValues)
    .then(teamResult => teamResult.rows[0].team_id)
};

const createPlayers = (teamId, players) => {
  const playerValues = players.map(player => [teamId, player.name, player.position]);
  const insertPlayersQuery = `INSERT INTO players (team_id, player_name, preferred_position) VALUES ($1, $2, $3)`;

  return Promise.all(playerValues.map(values => db.query(insertPlayersQuery, values)))
};

const createTeamAndPlayers = (teamName, coachName, players) => {
  return createTeam(teamName, coachName)
    .then(teamId => createPlayers(teamId, players))
    .then(() => {
      return { success: true };
    })
};

const findById = teamId => {
  const sql = `SELECT * FROM teams WHERE team_id = $1`;
  return db.query(sql, [teamId])
    .then(dbRes => dbRes.rows[0])
};

const findAll = () => {
  const sql = `
    SELECT t.*, p.player_name, p.preferred_position
    FROM teams AS t
    LEFT JOIN players AS p ON t.team_id = p.team_id
  `;
  return db.query(sql)
    .then(dbRes => {
      // Group the rows by team to better display player names
      const teams = {};
      dbRes.rows.forEach(row => {
        const { team_id, team_name, coach_name, player_name, preferred_position } = row;
        if (!teams[team_id]) {
          teams[team_id] = {
            team_id,
            team_name,
            coach_name,
            players: []
          };
        }
        if (player_name) {
          teams[team_id].players.push({ player_name, preferred_position });
        }
      });
      // Convert the object to an array of teams
      return Object.values(teams);
    })
};

module.exports = {
  createTeamAndPlayers,
  findById,
  findAll
};

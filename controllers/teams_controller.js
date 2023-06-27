const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router.post('/', (req, res) => {
  const { teamName, coachName, players } = req.body;

  Team
    .createTeamAndPlayers(teamName, coachName, players)
    .then(createdTeam => res.json(createdTeam))
});

router.get('/', (req, res) => {
  Team
    .findAll()
    .then(teams => res.json(teams))
});

module.exports = router;
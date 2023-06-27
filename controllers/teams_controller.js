const express = require('express');
const router = express.Router();

const Team = require('../models/team');

router.post('/', (req, res) => {
    const { teamName, coachName, playerNames, preferredPositions } = req.body;

    Team
      .create(teamName, coachName, playerNames, preferredPositions)
      .then(createdTeam => 
          res.json(createdTeam))
        
      // .catch(error => {
      //   res.status(500).json({ error: 'An error occurred while creating the team.' });
      // });
  }),

  router.get('/', (req, res) => {
    Team
      .findAll()
      .then(team => {
        console.log('findall');
        res.json(team);
      })
  });

module.exports = router;



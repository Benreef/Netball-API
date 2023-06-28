const express = require('express')

//middlewares
const logger = require('./middlewares/logger')
const session = require('./middlewares/sessions')

//controllers
const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')
const scoringController = require('./controllers/scoring_controller')
const teamsController = require('./controllers/teams_controller');
const gamesController = require('./controllers/games_controller');
const dataController = require('./controllers/data_controller')

const app = express();

const PORT = process.env.PORT || 3001;

// starting the web server
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

app.use(logger)
app.use(express.static('client'))
app.use(express.json())
app.use(session)

app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)
app.use('/api/scoring', scoringController)
app.use('/api/teams', teamsController)
app.use('/api/games', gamesController)
app.use('submit_data', dataController)


// if (process.env.NODE_ENV === 'production') {
//   const path = require('path')
//   app.use(express.static(path.join(__dirname, 'build')));

//   app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }

// let netBallAPI = []

// app.get('/', (req, res) => {
//   res.json({ netBallAPI })
// })
// app.use('/Login', (req, res) => {
//   res.send({
//     token: 'token'
//   });
// });

// app.post('/api/teams', (req, res) => {
//   const { teamName, coachName, playerNames, preferredPositions } = req.body;

//   Team.create(teamName, coachName, playerNames, preferredPositions)
//     .then(team => res.status(201).json(team))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// app.post('/intercepts', (req, res) => {
//   const { game_id, player_id, quarter, position } = req.body;

//   scoringController.storeInterceptData(game_id, player_id, quarter, position);

//   res.sendStatus(200);
// });

// app.post('/center_pass', (req, res) => {
//   const { game_id, player_id, quarter, position } = req.body;

//   scoringController.storeCenterPassData(game_id, player_id, quarter, position);

//   res.sendStatus(200);
// });

// app.post('/scoring', (req, res) => {
//   const { game_id, player_id, quarter, team, scored } = req.body;

//   scoringController.storeScoreData(game_id, player_id, quarter, team, scored);

//   res.sendStatus(200);
// })

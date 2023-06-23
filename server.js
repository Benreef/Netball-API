const express = require('express')

//middlewares
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

//controllers
const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

const app = express();

const port = process.env.PORT || 3001;

// starting the web server
app.listen(port, () => console.log(`listening on http://localhost:${port}`));

app.use(logger)
app.use(express.static('client'))
app.use(express.json())
app.use(sessions)

app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)


let netBallAPI = []
// Routes
app.get('/netballAPI', (req, res) => {
  res.json({ netBallAPI })
})
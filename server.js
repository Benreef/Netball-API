const express = require('express')
const app = express()

//middlewares
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`))

let netBallAPI = ['kai']
// Routes
app.get('/netballAPI', (req, res) => {
  res.json({ netBallAPI })
})

//controllers
const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

app.use(logger)
// app.use(express.static('client'))
app.use(express.json())
app.use(sessions)

app.use('/api/users', usersController)

app.use('/api/sessions', sessionsController)

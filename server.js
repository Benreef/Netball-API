const express = require('express')
const app = express()
const PORT = 3001

app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`))

app.use(express.json())

// You can replace this with a database:
let netBallAPI = []

// Routes
// app.get('/burgerLayers', (req, res) => {
//   res.json({ burgerLayers })
// })

// app.post('/burgerLayers', (req, res) => {
//   burgerLayers = req.body.burgerLayers
//   res.json({ burgerLayers })
// })
const express = require('express')
const { getAllMovies, getMovie, saveNewMovie } = require('./controllers/movies')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


app.get('/movies', getAllMovies)

app.get('/movies/:searchCriteria', getMovie)

app.post('/movies', bodyParser.json(), saveNewMovie)


app.all('*', (request, response) => {
  return response.status(404).send('Movie not found')
})

app.listen(4004)


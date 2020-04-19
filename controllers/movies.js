const movies = require('../movies')

const getMovie = (request, response) => {
  const { searchCriteria } = request.params

  const moviesByTitle = getMovieTitle(searchCriteria)
  const moviesByDirector = getMovieDirector(searchCriteria)

  const requestedMovies = moviesByTitle.concat(moviesByDirector)

  return response.send(requestedMovies)
}

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getMovieTitle = (title) => {
  const moviesByTitle = movies.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()))

  return moviesByTitle
}

const getMovieDirector = (director) => {
  const moviesByDirector = movies
    .filter((movie) => movie.directors
      .some((dir) => dir.toLowerCase().includes(director.toLowerCase())))

  return moviesByDirector
}

const saveNewMovie = (request, response) => {
  const { title, directors, releaseDate, rating, runTime, genres } = request.body // eslint-disable-line object-curly-newline

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response.status(400).send('Missing information')
  }

  const newMovie = { title, directors, releaseDate, rating, runTime, genres } // eslint-disable-line object-curly-newline

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getMovie, saveNewMovie }

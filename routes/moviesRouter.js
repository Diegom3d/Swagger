const express = require("express");
const router = express.Router();

let movies = [
  { id: 1, title: 'Inception', year: 2010, category: 'Sci-fi' },
  { id: 2, title: 'The Dark Knight', year: 2008, category: 'Action' },
  { id: 3, title: 'Interstellar', year: 2014, category: 'Sci-fi' },
  { id: 4, title: 'The Hunger Games on Fire', year: 2014, category: 'Action' }
];

router.get("/", (req, res) => {
  res.json(movies);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find(m => m.id == id); // Cambio aquí, `movies` en lugar de `movie`
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

router.post("/", (req, res) => {
  const { title, year, category } = req.body;
  const newMovie = { id: movies.length + 1, title, year, category };
  movies.push(newMovie);
  res.status(201).json({
    message: "Movie Created",
    data: newMovie
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, year, category } = req.body;
  const movie = movies.find(m => m.id == id); // Aquí también corregido
  if (movie) {
    if (title) movie.title = title;
    if (year) movie.year = year;
    if (category) movie.category = category;
    res.json({
      message: "Movie updated",
      data: movie
    });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(m => m.id == id);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    res.json({ message: "Movie Deleted", id });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

module.exports = router;

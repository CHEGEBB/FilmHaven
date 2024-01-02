const express = require('express');
const app = express();
const port = 3001; // Change the port to 3001

// Replace this with your actual movie data
const moviesData = {
  'Sixty-Five': {
    'description': 'Embark on a journey into the enigmatic world...',
    'image': 'sixty_five_xlg.jpg',
    'file_path': 'https://www.goojara.to/mjPG5a'
  },
  'Mission: Impossible - Dead Reckoning Part One': {
    'description': 'Immerse yourself in the adrenaline-pumping adventure...',
    'image': 'mission_impossible__dead_reckoning_part_one_ver2_xlg.jpg',
    'file_path': 'https://www.goojara.to/mjPG5a'
  },
  // Add more movies as needed
};

app.get('/', (req, res) => {
  res.json({ moviesData });
});

app.get('/download/:title', (req, res) => {
  const title = req.params.title;
  const movieData = moviesData[title];

  if (movieData) {
    const file_path = movieData['file_path'];
    res.redirect(file_path);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.post('/search', (req, res) => {
  const query = req.query.search_query;

  // Implement your search logic here (replace this with your actual logic)
  const searchResults = Object.keys(moviesData).filter(movie => movie.toLowerCase().includes(query.toLowerCase()));

  res.json({ query, searchResults });
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});


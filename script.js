async function fetchMovies() {
  try {
    const response = await fetch('/.netlify/functions/getMovies');
    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    document.getElementById('movies').innerHTML = '<p>Failed to load movies. Try again later.</p>';
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'placeholder.jpg'; // Use a placeholder image if poster is unavailable

    movieCard.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
        <a href="https://your-download-link.com/${movie.id}" class="download-btn" target="_blank">Download</a>
      </div>
    `;

    moviesContainer.appendChild(movieCard);
  });
}

fetchMovies();

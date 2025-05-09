const apiKey = '9b3b4fa1f1d85f3d1be4c5bb88a1b2c0'; // Replace with your TMDb API key
const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

let currentPage = 1;
let isFetching = false;

// Fetch and display genres
async function fetchGenres() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const data = await res.json();
    const genreContainer = document.getElementById('genre-container');
    data.genres.forEach(genre => {
      const button = document.createElement('button');
      button.textContent = genre.name;
      button.addEventListener('click', () => {
        fetchMoviesByGenre(genre.id);
      });
      genreContainer.appendChild(button);
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

// Fetch and display trending movies
async function fetchTrendingMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`);
    const data = await res.json();
    displayMovies(data.results, 'trending-movies');
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
}

// Search for movies
async function searchMovie() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    displayMovies(data.results, 'results');
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

// Fetch and display movies by genre
async function fetchMoviesByGenre(genreId) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
    const data = await res.json();
    const genreMoviesContainer = document.getElementById('genre-movies');
    genreMoviesContainer.innerHTML = '';
    displayMovies(data.results, 'genre-movies');
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
  }
}

// Display movies in the specified container
function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const posterPath = movie.poster_path ? `${imageBaseURL}${movie.poster_path}` : 'placeholder.jpg';

    movieCard.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}" />
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <a href="https://yourdownloadlink.com/${movie.id}" class="download-btn" target="_blank">Download</a>
      </div>
    `;
    container.appendChild(movieCard);
  });
}

// Infinite scroll for trending movies
window.addEventListener('scroll', () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !isFetching) {
    currentPage++;
    fetchMoreTrendingMovies(currentPage);
  }
});

async function fetchMoreTrendingMovies(page) {
  isFetching = true;
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`);
    const data = await res.json();
    displayMovies(data.results, 'trending-movies');
  } catch (error) {
    console.error('Error fetching more trending movies:', error);
  } finally {
    isFetching = false;
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  fetchGenres();
  fetchTrendingMovies();
});

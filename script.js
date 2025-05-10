const apiKey = "9b3b4fa1f1d85f3d1be4c5bb88a1b2c0"; // Demo API key (replace with your own for production)
const trendingSection = document.getElementById("trending");

// Fetch trending movies from TMDb
async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
    );
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    trendingSection.innerHTML = "<p>Failed to load movies.</p>";
  }
}

// Display movie cards on the homepage
function displayMovies(movies) {
  trendingSection.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="info">
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
      </div>
    `;
    trendingSection.appendChild(card);
  });
}

// Init
fetchTrendingMovies();

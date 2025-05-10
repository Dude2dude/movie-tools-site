const apiKey = "9b3b4fa1f1d85f3d1be4c5bb88a1b2c0"; // Demo key
const trendingSection = document.getElementById("trending");

async function fetchTrendingMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
    if (!res.ok) throw new Error("API limit or connection issue.");
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error:", error.message);
    trendingSection.innerHTML = `<p style="color: red;">Failed to load movies. Try again later.</p>`;
  }
}

function displayMovies(movies) {
  trendingSection.innerHTML = "";
  movies.forEach((movie) => {
    if (!movie.poster_path) return;
    const card = document.createElement("div");
    card.className = "movie-card";
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

fetchTrendingMovies();

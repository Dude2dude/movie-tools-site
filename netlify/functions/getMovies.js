const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch movies.' }),
    };
  }
};

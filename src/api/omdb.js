import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
      },
    });
    if (res.data.Response === 'True') {
      return { data: res.data.Search, error: null };
    } else {
      return { data: [], error: res.data.Error || 'No movies found.' };
    }

  } catch (err) {
    return { data: [], error: 'Failed to fetch movies.' };
  }
}


export async function getMovieDetails(imdbID) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });
    if (res.data.Response === 'True') {
      return { data: res.data, error: null };
    } else {
      return { data: null, error: res.data.Error || 'No details found.' };
    }
  } catch (err) {
    return { data: null, error: 'Failed to fetch details.' };
  }
}

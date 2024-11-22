import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          params: { api_key: 'cfe38d0d9527093ec6931fd3dd651d72' }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
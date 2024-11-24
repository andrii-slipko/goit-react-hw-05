import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom'; 
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css'; 

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState(null);  
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); 

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    setQuery(queryParam);
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearched(true);
      setSearchParams({ query });
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: { 
            api_key: 'cfe38d0d9527093ec6931fd3dd651d72', 
            query, 
            include_adult: false 
          }
        });
        setMovies(response.data.results);
        setError(null);  
      } catch (error) {
        console.error('Помилка при пошуку фільмів:', error);
        setMovies([]);  
        setError('Не вдалося знайти фільми. Спробуйте ще раз пізніше.');
      }
    } else {
      setMovies([]);  
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Find movie"
          className={styles.input}
        />
        <button className={styles.btn} type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}  

      <div>
        {movies.length > 0 ? (
          <MovieList movies={movies} location={location} /> 
        ) : (
          isSearched && !error && <p>Фільми не знайдені</p> 
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
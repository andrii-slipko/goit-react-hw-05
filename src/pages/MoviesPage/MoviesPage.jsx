import { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; 
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css' 

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isSearched, setIsSearched] = useState(false); 
  const location = useLocation(); 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      setIsSearched(true); 
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: { 
            api_key: 'cfe38d0d9527093ec6931fd3dd651d72', 
            query, 
            include_adult: false 
          }
        });
        setMovies(response.data.results); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for movies"
          className={styles.input}
        />
        <button className={styles.btn} type="submit">Search</button>
      </form>

      
      <div>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.title}  
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          isSearched && <p>No movies found</p>  
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation(); 

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
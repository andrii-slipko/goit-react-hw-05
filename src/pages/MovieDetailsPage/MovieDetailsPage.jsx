import { useEffect, useState, Suspense, useRef } from 'react';
import { useParams, useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCastVisible, setIsCastVisible] = useState(false);  
  const [isReviewsVisible, setIsReviewsVisible] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  
  const locationStateRef = useRef(location.state?.from || '/movies');
  
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmUzOGQwZDk1MjcwOTNlYzY5MzFmZDNkZDY1MWQ3MiIsIm5iZiI6MTczMjI5NTE2OC42NzY3MTksInN1YiI6IjY3NDBhY2UxMWNkOGMyNDNlNmJlNzMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LqgY5nz6Zsz1gmjTmi85498TpXQWkP-Io3M4IXAyb7Y';  

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          }
        });
        setMovie(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;

  const loadCast = () => {
    setIsCastVisible(!isCastVisible);
    setIsReviewsVisible(false);
  };

  const loadReviews = () => {
    setIsReviewsVisible(!isReviewsVisible);
    setIsCastVisible(false);
  };

  const handleGoBack = () => {
    navigate(locationStateRef.current);
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
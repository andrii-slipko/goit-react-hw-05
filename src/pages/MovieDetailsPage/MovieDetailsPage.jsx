import { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCastVisible, setIsCastVisible] = useState(false);  
    const [isReviewsVisible, setIsReviewsVisible] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();
  
    
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmUzOGQwZDk1MjcwOTNlYzY5MzFmZDNkZDY1MWQ3MiIsIm5iZiI6MTczMjI5NTE2OC42NzY3MTksInN1YiI6IjY3NDBhY2UxMWNkOGMyNDNlNmJlNzMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LqgY5nz6Zsz1gmjTmi85498TpXQWkP-Io3M4IXAyb7Y';  // Замість цього використайте ваш токен
  
    useEffect(() => {
      const getMovieDetails = async () => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`  
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
    
    if (isCastVisible) {
      setIsCastVisible(false);
    } else {
      setIsReviewsVisible(false);
      setIsCastVisible(true);
      navigate(`/movies/${movieId}/cast`); 
    }
  };

  const loadReviews = () => {
    if (isReviewsVisible) {
      setIsReviewsVisible(false);
    } else {
      setIsCastVisible(false);
      setIsReviewsVisible(true);
      navigate(`/movies/${movieId}/reviews`); 
    }
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  return (
    <div>
        <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      
  
      <button onClick={loadCast}>Load Cast</button>
      <button onClick={loadReviews}>Load Reviews</button>
  
      {isCastVisible && (
        <Suspense fallback={<p>Loading cast...</p>}>
          <MovieCast movieId={movieId} />
        </Suspense>
      )}

      {isReviewsVisible && (
        <Suspense fallback={<p>Loading reviews...</p>}>
          <MovieReviews movieId={movieId} />
        </Suspense>
      )}
    </div>
  );
};

export default MovieDetailsPage;
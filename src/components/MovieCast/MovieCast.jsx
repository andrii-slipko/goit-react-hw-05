import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: { api_key: 'cfe38d0d9527093ec6931fd3dd651d72' }
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
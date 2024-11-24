import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios'

const MovieReviews = () => {
  const { movieId } = useParams();  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          params: { api_key: 'cfe38d0d9527093ec6931fd3dd651d72' }
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };
    getReviews();
  }, [movieId]);  

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p>- {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
import { useEffect, useState } from "react";
import { fetchReviews } from "../Api/Api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch {
        setError("Failed to fetch reviews");
      }
    };
    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Reviews</h2>
      <ul className={s.review}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available for this movie</p>
        )}
      </ul>
    </>
  );
}

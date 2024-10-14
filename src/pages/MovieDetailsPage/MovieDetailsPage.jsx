import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchTrendMoviesById } from "../../components/Api/Api";
import s from "./MovieDetailsPage.module.css";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  const location = useLocation();
  const stateRef = useRef(location.state);
  const goBackLink = stateRef.current ?? "/";

  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError("Failed to fetch movie details");
      }
    };
    getData();
  }, [movieId]);

  if (!movie) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to={goBackLink} className={s.back}>
        Go back
      </Link>
      <div className={s.container}>
        <div className={s.details}>
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
          />
          <ul className={s.text}>
            <li>
              <h1>{movie.title}</h1>
            </li>
            <li>User score: {Math.round((movie.vote_average / 10) * 100)} %</li>
            <li>Overview: {movie.overview}</li>
            <li>
              <h2>Genres:</h2>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </li>
          </ul>
        </div>
        <div className={s.info}>
          <hr />
          <h3>Additional information</h3>
          <ul className={s.ulinfo}>
            <li className={s.link}>
              <Link to="cast">Cast</Link>
            </li>

            <li className={s.link}>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

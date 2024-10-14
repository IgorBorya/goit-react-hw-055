import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.link}
            >
              <p className={s.movie}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

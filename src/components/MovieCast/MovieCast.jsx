import { useEffect, useState } from "react";
import { fetchInfoActors } from "../Api/Api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchInfoActors(movieId);
        setCast(data.cast);
      } catch {
        setError("Error fetching cast");
      }
    };
    getData();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Cast</h2>
      <ul className={s.castlist}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w100${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

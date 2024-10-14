import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovie } from "../../components/Api/Api";
import s from "./MoviePage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const newQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(newQuery);

  const initialValues = {
    query: newQuery,
  };

  const handleSubmit = (values) => {
    setQuery(values.query);
    searchParams.set("query", values.query);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        const data = await searchMovie(query);
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch the movies", error);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field className={s.input} name="query" />
          <button className={s.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <MovieList movies={movies} />
    </>
  );
}

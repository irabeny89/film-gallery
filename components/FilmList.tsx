import styles from "styles/Home.module.css";
import { useReactiveVar } from "@apollo/client";
import { filmSearchResultVar } from "graphql/reactiveVars";
import MovieCard from "./MovieCard";

export default function FilmList() {
  const { Search: films } = useReactiveVar(filmSearchResultVar);
  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <MovieCard key={film.imdbID} {...film} />
      ))}
    </div>
  );
}

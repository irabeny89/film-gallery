import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import styles from "styles/Home.module.css";
import { useQuery } from "@apollo/client";
import FilmCard from "./FilmCard";
import { SEARCH_TITLE } from "graphql/documentNodes";
import { FilmSearchResultType } from "types";
import config from "config";

export default function FilmList() {
    const { data, loading, error } = useQuery<
      Record<"film", FilmSearchResultType>,
      Record<"title", string>
    >(SEARCH_TITLE, {
      variables: {
        title: "avengers",
      },
    });

  return loading ? (
    <Spinner animation="border" />
  ) : error ? (
    <Alert variant="danger">
      {config.generalErrorMessage}
    </Alert>
  ) : (
    <div className={styles.grid} data-testid="film-list">
      {data?.film?.Search.slice(-9).map((film) => (
        <FilmCard key={film.imdbID} {...film} />
      ))}
    </div>
  );
}

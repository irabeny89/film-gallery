import { useReactiveVar } from "@apollo/client";
import { filmSearchResultVar } from "graphql/reactiveVars";
import Modal from "react-bootstrap/Modal";
import { CgSearchFound } from "react-icons/cg";
import styles from "styles/Home.module.css";
import { SearchResultModalPropsType } from "types";
import MovieCard from "./MovieCard";

export default function SearchResultModal({
  show,
  setShow,
}: SearchResultModalPropsType) {
  const { Search: searchResults } = useReactiveVar(filmSearchResultVar);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <CgSearchFound /> Search results ({searchResults.length})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.grid}>
        {searchResults.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </Modal.Body>
    </Modal>
  );
}

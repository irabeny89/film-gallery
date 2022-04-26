import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { CgSearch } from "react-icons/cg";
import { FilmSearchResultType, SearchBoxPropsType } from "types";
import { FormEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_TITLE } from "graphql/documentNodes";
import config from "config";
import { filmSearchResultVar } from "graphql/reactiveVars";

export default function SearchBox({ setShowResult }: SearchBoxPropsType) {
  const [getSearchResult, { data, loading, error }] = useLazyQuery<
      Record<"film", FilmSearchResultType>,
      Record<"title", string>
    >(SEARCH_TITLE),
    [showToast, setShowToast] = useState(!!error),
    handleSearch = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { search } = Object.fromEntries(new FormData(e.currentTarget)) as {
        search: string;
      };

      search
        ? (getSearchResult({ variables: { title: search } }),
          e.currentTarget.reset())
        : (e.preventDefault(), e.stopPropagation());
    };

  useEffect(() => {
    !!data && (filmSearchResultVar(data.film), setShowResult(true));
  }, [data, setShowResult]);

  return (
    <Container fluid className="mb-5">
      <ToastContainer position="top-center">
        <Toast
          bg="danger"
          autohide
          show={showToast}
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>{config.generalErrorMessage}</Toast.Header>
        </Toast>
      </ToastContainer>
      <Row className="justify-content-center">
        <Col sm="10">
          <Form onSubmit={handleSearch}>
            <InputGroup className="justify-content-center">
              <Form.FloatingLabel label="Enter movie title">
                <Form.Control
                  placeholder="Enter movie title"
                  arial-label="search GitHub repositories"
                  name="search"
                />
              </Form.FloatingLabel>
              <Button type="submit">
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  <CgSearch size={25} />
                )}
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { CgSearch } from "react-icons/cg";
import { SearchBoxPropsType } from "types";
import { FormEvent } from "react";
// import { FormEvent, useState } from "react";

export default function SearchBox({ setShow }: SearchBoxPropsType) {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: correct implemetation soon...
    setShow(true);
  };

  return (
    <Container fluid className="mb-5">
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
                {false ? <Spinner animation="border" /> : <CgSearch />}
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

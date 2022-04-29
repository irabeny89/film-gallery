import Spinner from "react-bootstrap/Spinner";
import SearchBox from "components/SearchBox";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { HiHeart, HiFilm } from "react-icons/hi";
import FilmList from "components/FilmList";
import dynamic from "next/dynamic";

const SearchResultModal = dynamic(
  () => import("components/SearchResultModal"),
  {
    loading: () => <Spinner animation="border" />,
  }
);

const Home: NextPage = () => {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie Gallery App</title>
        <meta name="description" content="A movie gallery web app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HiFilm color="red" size={100} />
        <h1 className={styles.title}>Welcome to the film gallery</h1>
        <p className={styles.description}>
          Search for your <i>favorite</i>{" "}
          <code className={styles.code}>
            <HiFilm size={20} />
            film
          </code>
        </p>
        <SearchResultModal show={showResult} setShow={setShowResult} />
        <SearchBox setShowResult={setShowResult} />
        <FilmList />
      </main>

      <footer className={styles.footer}>
        Ernest <HiHeart color="red" /> Irabor
      </footer>
    </div>
  );
};

export default Home;

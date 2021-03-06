import styles from "styles/Home.module.css";
import { FilmType } from "types";
import Image from "next/image";
import { HiArchive, HiCalendar, HiFilm, HiHashtag } from "react-icons/hi";
import config from "config";

export default function FilmCard({
  Title,
  Poster,
  Type,
  Year,
  imdbID,
}: FilmType) {
  const imageSrc =
    config.network === "offline"
      ? "/vercel.svg"
      : Poster === "N/A"
      ? "/vercel.svg"
      : Poster;

  return (
    <div className={styles.card} data-testid="film-card">
      <div>
        <HiHashtag /> {imdbID} | <HiArchive /> {Type} | <HiCalendar /> {Year}
      </div>
      <h4 className="text-center my-2">
        <HiFilm /> {Title}
      </h4>
      <div>
        <Image src={imageSrc} alt="movie poster" width={200} height={250} />
      </div>
    </div>
  );
}

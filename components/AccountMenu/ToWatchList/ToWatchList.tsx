import React from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import ToWatchCard from "./ToWatchCard";

const ToWatchList: React.FC<{
  movieData: any;
  genresList: { id: number; name: string }[];
}> = (props) => {
  return (
    <main className={styles["towatch-section"]}>
      <header className={styles["header"]}>
        <p className={styles["header__text"]}>Want to watch:</p>
      </header>
      <div className={styles["section__content"]}>
        <div className={styles["media__list"]}>
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
          <ToWatchCard movieData={props.movieData} genresList={props.genresList} />
        </div>
      </div>
    </main>
  );
};

export default ToWatchList;

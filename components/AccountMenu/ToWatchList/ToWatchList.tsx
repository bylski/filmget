import React from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import ToWatchCard from "./ToWatchCard";
import { movieInterface, seriesInterface } from "../../../utils/types";

const ToWatchList: React.FC<{
  movieData: movieInterface[] | seriesInterface[];
  genresList: { id: number; name: string }[];
}> = (props) => {

  const allCards = props.movieData.map((mediaData, i) => {
    return <ToWatchCard movieData={mediaData} genresList={props.genresList}/>
  })


  return (
    <main className={styles["towatch-section"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__text"]}>Want to watch</h1>
      </header>
      <div className={styles["section__content"]}>
        <div className={styles["media__list"]}>
          {props.movieData.length !== 0 && allCards}
        </div>
      </div>
      {props.movieData.length === 0 ? <p className={styles["no-results-text"]}>Nothing to see here now...</p> : null}
    </main>
  );
};

export default ToWatchList;

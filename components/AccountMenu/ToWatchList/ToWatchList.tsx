import React, { Fragment, useEffect } from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import ToWatchCard from "./ToWatchCard";
import { movieInterface, seriesInterface } from "../../../utils/types";

const ToWatchList: React.FC<{
  mediaToWatch: movieInterface[] | seriesInterface[];
  genresList: { id: number; name: string }[];
}> = (props) => {
  const allCards = props.mediaToWatch.map(
    (mediaData: movieInterface | seriesInterface, i) => {
      return (
        <ToWatchCard
          key={`movieCard${i}`}
          movieData={mediaData}
          genresList={props.genresList}
        />
      );
    }
  );

  useEffect(() => {
    console.log(allCards)
  }, [allCards])

  return (
    <main className={styles["towatch-section"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__text"]}>Want to watch</h1>
      </header>
      <div className={styles["section__content"]}>
        <div className={styles["media__list"]}>
          {props.mediaToWatch.length !== 0 && allCards}
        </div>
      </div>
      {props.mediaToWatch.length === 0 ? (
        <Fragment>
          <p className={styles["no-results-text"]}>
            Looks like it's empty here...
          </p>
        </Fragment>
      ) : null}
    </main>
  );
};

export default ToWatchList;

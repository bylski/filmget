import React from "react";
import styles from "./styles/SeasonsDisplay.module.scss";
import Image from "next/image";
import { seriesInterface } from "../../../../utils/types";

const SeasonsDisplay: React.FC<{ seriesDetails: seriesInterface }> = (
  props
) => {
  const { seasons } = props.seriesDetails;
  let seasonsToDisplay;
  if (seasons) {
    seasonsToDisplay = seasons.map((season: typeof seasons[0], i: number) => {
      return (
        <div className={styles["season-card"]} key={`season${i}`}>
          <div className={styles["season-card__img-container"]}>
            <Image
              layout="fill"
              src={
                season.poster_path !== null
                  ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${season.poster_path}`
                  : "/noImg.png"
              }
            ></Image>
          </div>
          <span>{season.name}</span>
        </div>
      );
    });
  }

  const seasonsFallback = (
    <span className={styles["seasons-fallback"]}>No seasons to display.</span>
  )

  return (
    <div className={styles["seasons-display"]}>
      <header className={styles["display__header"]}>
        <h2>Seasons</h2>
      </header>
      <main className={styles["display__content"]}>{seasons && seasons.length !== 0 ? seasonsToDisplay :  seasonsFallback}</main>
    </div>
  );
};

export default SeasonsDisplay;

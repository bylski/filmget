import React from "react";
import styles from "./styles/MovieCard.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import Image from "next/image";

interface movieInterface {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  averageScore: number;
}

const MovieCard: React.FC<movieInterface> = (props) => {
  return (
    <div className={styles["movie-container"]}>
      <div className={styles["movie-img__container"]}>
        <Image
          width="600"
          height="900"
          className={styles["movie-img"]}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.posterPath}`}
        ></Image>
      </div>
      <div className={styles["movie-info__container"]}>
        <div className={styles["movie-rating__container"]}>
          <RatingIcon className={styles["rating-icon"]} />
          <p className={styles["rating-average"]}>{props.averageScore.toFixed(1)}</p>
        </div>
        <p className={styles["movie-title"]}>
          {props.title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

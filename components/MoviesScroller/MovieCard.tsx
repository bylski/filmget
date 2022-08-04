import React from "react";
import styles from "./styles/MovieCard.module.scss";
import RatingIcon from "./RatingIcon";

const MovieCard: React.FC<{ imgSrc: string }> = (props) => {
  return (
    <div className={styles["movie-img__container"]}>
      <img className={styles["movie-img"]} src={props.imgSrc}></img>
      <div className={styles["movie-rating__container"]}>
        <RatingIcon className={styles["rating-icon"]} />
        <p className={styles["rating-average"]}>7.2</p>
      </div>
      <div className={styles["movie-info__container"]}>
        <p className={styles["movie-title"]}>Doktor Strange w multiwersum obłędu</p>
      </div>
    </div>
  );
};

export default MovieCard;

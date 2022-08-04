import React from "react";
import styles from "./styles/MovieCard.module.scss";
import RatingIcon from "./RatingIcon";
import Image from "next/image";

const MovieCard: React.FC<{ imgSrc: string }> = (props) => {
  return (
    <div className={styles["movie-img__container"]}>
      <Image width="600" height="900" className={styles["movie-img"]} src={props.imgSrc}></Image>
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

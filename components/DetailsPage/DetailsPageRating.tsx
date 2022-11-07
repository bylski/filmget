import React from "react";
import { movieInterface, seriesInterface, actorInterface } from "../../utils/types";
import RatingIcon from "../Icons/RatingIcon";
import styles from "./styles/DetailsPageRating.module.scss"

const DetailsPageRating: React.FC<{mediaDetails: movieInterface | seriesInterface | actorInterface}> = (props) => {
  return (
    <div className={styles["info-section__rating-section"]}>
      <RatingIcon className={styles["rating-section__icon"]} />
      <span className={styles["rating-section__average-score"]}>
        {"vote_average" in props.mediaDetails ? props.mediaDetails.vote_average.toFixed(1) : ""}
      </span>
      <p className={styles["rating-section__text"]}>- User Score</p>
    </div>
  );
};


export default DetailsPageRating
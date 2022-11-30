import React from "react";
import { movieInterface, seriesInterface, actorInterface } from "../../utils/types";
import RatingIcon from "../Icons/RatingIcon";
import RateButton from "../UI/RateButton/RateButton";
import styles from "./styles/DetailsPageRating.module.scss"

const DetailsPageRating: React.FC<{mediaDetails: movieInterface | seriesInterface}> = (props) => {
  return (
    <div className={styles["info-section__rating-section"]}>
      <div className={styles["rating-section__container"]}>
      <RatingIcon className={styles["rating-section__icon"]} />
      <span className={styles["rating-section__average-score"]}>
        {"vote_average" in props.mediaDetails ? props.mediaDetails.vote_average.toFixed(1) : ""}
      </span>
      <p className={styles["rating-section__text"]}>- User Score</p>
      </div>
      <RateButton customStyles={styles} mediaData={props.mediaDetails}/>
    </div>
  );
};


export default DetailsPageRating
import React from "react";
import {
  movieInterface,
  seriesInterface,
  actorInterface,
} from "../../utils/types";
import styles from "./styles/DetailsPageSummary.module.scss";

const DetailsPageSummary: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
  mediaType: string;
}> = (props) => {
  if (
    (props.mediaType === "series" || props.mediaType === "movie") &&
    "overview" in props.mediaDetails
  ) {
    return (
      <div className={styles["info-section__summary-section"]}>
        <h2 className={styles["summary__header-text"]}>Overview:</h2>
        <div className={styles["summary__container-media"]}>
          <p className={styles["summary__text"]}>
            {props.mediaDetails.overview}
          </p>
        </div>
      </div>
    );
  } else if (
    props.mediaType === "people" &&
    "biography" in props.mediaDetails
  ) {
    const biography = props.mediaDetails.biography;

    return (
      <div className={styles["info-section__summary-section"]}>
        <h2 className={styles["summary__header-text"]}>Biography:</h2>
        <div className={styles["summary__container-people"]}>
          <p className={styles["summary__text"]}>
            {biography !== null && biography !== undefined && biography !== "" ? biography : "No biography found"}
          </p>
        </div>
      </div>
    );
  } else return null;
};

export default DetailsPageSummary;

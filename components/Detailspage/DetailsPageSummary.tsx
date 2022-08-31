import React from "react";
import { movieInterface, seriesInterface, actorInterface } from "../../utils/types";
import styles from "./styles/DetailsPageSummary.module.scss";


const DetailsPageSummary: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
}> = (props) => {
  return (
    <div className={styles["info-section__summary-section"]}>
      <h2 className={styles["summary__header-text"]}>Overview:</h2>
      <div className={styles["summary__container"]}>
        <p className={styles["summary__text"]}>
          {"overview" in props.mediaDetails ? props.mediaDetails.overview : ""}
        </p>
      </div>
    </div>
  );
};

export default DetailsPageSummary;

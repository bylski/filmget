import React, { Fragment } from "react";
import styles from "../styles/ResultCard.module.scss";
import RatingIcon from "../../Icons/RatingIcon";
import { limitStr } from "../../../utils/scripts";
import { resultsInterface } from "../../../utils/types";

const ResultCardMain: React.FC<{
  resultType: string;
  resultData: resultsInterface;
}> = (props) => {
  let summaryText = props.resultData.overview;
  const ResultMovie = (
    <Fragment>
      <p className={styles["result-card__summary"]}>
        {limitStr(summaryText, 150)}
      </p>
      <div className={styles["result-card__rating"]}>
        <RatingIcon className={styles["result-card__rating-icon"]} />
        <p className={styles["result-card__rating-average"]}>
          {typeof props.resultData.vote_average === "number" ? props.resultData.vote_average.toFixed(1) : ""} - User Score
        </p>
      </div>
    </Fragment>
  );

  let knownForString = "";
  if (props.resultType === "person") {
    const knownFor = props.resultData.known_for.map((media) => {
      if (media.title !== undefined) {
        return `"${media.title}"`
      } else {
        return `"${media.name}"`
      }
      
    });
    knownForString = knownFor.join(", ");
  }
  const ResultPerson = (
    <Fragment>
      <div className={styles["result-card__person-info"]}>
        <p className={styles["result-card__person-department"]}>
          {props.resultData.known_for_department} | {knownForString}
        </p>
      </div>
    </Fragment>
  );

  let mainToRender = null;
  if (props.resultType === "movie" || props.resultType === "tv") {
    mainToRender = ResultMovie;
  } else {
    mainToRender = ResultPerson;
  }

  return <main className={styles["result-card__main"]}>{mainToRender}</main>;
};

export default ResultCardMain;

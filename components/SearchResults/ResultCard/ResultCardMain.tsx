import React, { Fragment, useEffect } from "react";
import styles from "../styles/ResultCard.module.scss";
import RatingIcon from "../../Icons/RatingIcon";
import { limitStr } from "../../../utils/scripts";
import { resultsInterface } from "../../../utils/types";
import useBreakpoints from "../../../utils/hooks/useBreakpoints";

const ResultCardMain: React.FC<{
  resultType: string;
  resultData: resultsInterface;
}> = (props) => {
  let summaryText = props.resultData.overview;
  let summaryTextLimit: number = 150;
  const breakpoints: { [key: string]: boolean }[] | undefined = useBreakpoints(
    { breakpointName: "mediumBreakpoint", breakpointVal: 600 },
    { breakpointName: "smallBreakpoint", breakpointVal: 500 },
    { breakpointName: "extraSmallBreakpoint", breakpointVal: 300 }
  );
  if (breakpoints !== undefined) {
    breakpoints.forEach((breakpoint) => {
      if (breakpoint.mediumBreakpoint) {
        summaryTextLimit = 100;
      }
      if (breakpoint.smallBreakpoint) {
        summaryTextLimit = 80;
      }
      if (breakpoint.extraSmallBreakpoint) {
        summaryTextLimit = 60;
      }
    });
  }
  const ResultMovie = (
    <Fragment>
      <p className={styles["result-card__summary"]}>
        {limitStr(summaryText, summaryTextLimit)}
      </p>
      <div className={styles["result-card__rating"]}>
        <RatingIcon className={styles["result-card__rating-icon"]} />
        <p className={styles["result-card__rating-average"]}>
          {typeof props.resultData.vote_average === "number"
            ? props.resultData.vote_average.toFixed(1)
            : ""}{" "}
          - User Score
        </p>
      </div>
    </Fragment>
  );

  let knownForString = "";
  if (props.resultType === "person") {
    const knownFor = props.resultData.known_for.map((media) => {
      if (media.title !== undefined) {
        return `"${media.title}"`;
      } else {
        return `"${media.name}"`;
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
    // Choose which type of result card to render based on result type
    mainToRender = ResultMovie;
  } else {
    mainToRender = ResultPerson;
  }

  return <main className={styles["result-card__main"]}>{mainToRender}</main>;
};

export default ResultCardMain;

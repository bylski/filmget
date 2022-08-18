import React from "react";
import { resultsInterface } from "../../../utils/types";
import styles from "../styles/ResultCard.module.scss";

const ResultCardImg: React.FC<{resultType: string, resultData: resultsInterface}> = (props) => {
  let imgPath:string = "";
  if (props.resultType === "movie" || props.resultType === "tv") {
    imgPath = props.resultData.poster_path;
  } else {
    imgPath = props.resultData.profile_path;
  }

  return (
    <div className={styles["result-card__img-container"]}>
      <img
        className={styles["result-card__img"]}
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${imgPath}`}
      ></img>
    </div>
  );
};

export default ResultCardImg;

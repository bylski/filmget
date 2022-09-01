import Link from "next/link";
import React from "react";
import { resultsInterface } from "../../../utils/types";
import styles from "../styles/ResultCard.module.scss";

const ResultCardImg: React.FC<{
  resultType: string;
  resultData: resultsInterface;
}> = (props) => {
  let imgPath: string = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";
  if (props.resultType === "movie" || props.resultType === "tv") {
    imgPath += props.resultData.poster_path;
  } else {
    imgPath += props.resultData.profile_path;
  }
  // If no img - show alternative
  if (
    props.resultData.poster_path === null ||
    props.resultData.profile_path === null
  ) {
    imgPath = "/noImg.png";
  }

  let resultType: string = "";
  switch (props.resultType) {
    case "movie":
      resultType = "movie";
      break;
    case "tv": {
      resultType = "series";
    }
  }

  return (
    <div className={styles["result-card__img-container"]}>
      <Link href={`/details/${resultType}/${props.resultData.id}`}>
        <a style={{ width: "100%", minHeight: "100%", position: "absolute"}}></a>
      </Link>
      <img
        className={styles["result-card__img"]}
        alt="Image of the media"
        src={imgPath}
      ></img>
    </div>
  );
};

export default ResultCardImg;

import React from "react";
import { resultsInterface } from "../../../utils/types";
import styles from "../styles/ResultCard.module.scss";
import Link from "next/link";

const ResultCardHeader: React.FC<{
  resultType: string;
  resultData: resultsInterface;
}> = (props) => {
  let headerText: string = "";
  if (props.resultType === "movie") {
    headerText = props.resultData.title;
  } else {
    headerText = props.resultData.name;
  }

  let resultType: string = "";
  switch(props.resultType) {
    case "movie":
      resultType = "movie";
      break;
    case "tv": {
      resultType = "series"
      break;
    }
    case "person": {
      resultType = "people"
      break;
    }
    default: 
    resultType = "null"
  }

  return (
    <header className={styles["result-card__header"]}>
    <Link href={`details/${resultType}/${props.resultData.id}`}><a className={styles["result-card__header-text"]}>{headerText}</a></Link>
    </header>
  );
};

export default ResultCardHeader;

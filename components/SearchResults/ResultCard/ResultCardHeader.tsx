import React from "react";
import { resultsInterface } from "../../../utils/types";
import styles from "../styles/ResultCard.module.scss";

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
  return (
    <header className={styles["result-card__header"]}>
      <h1 className={styles["result-card__header-text"]}>{headerText}</h1>
    </header>
  );
};

export default ResultCardHeader;

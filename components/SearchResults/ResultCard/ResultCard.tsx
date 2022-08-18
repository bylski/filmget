import React from "react";
import styles from "../styles/ResultCard.module.scss";
import RatingIcon from "../../Icons/RatingIcon";
import ResultCardImg from "./ResultCardImg";
import ResultCardHeader from "./ResultCardHeader";
import ResultCardMain from "./ResultCardMain";
import { motion } from "framer-motion";
import { resultsInterface } from "../../../utils/types";

// const resultCardVariants = {
//   initial: {
//     opacity: 0,
//   },
//   enter: (i: number) => ({
//     opacity: 1,
//     transition: {
//       delay: i * 0.1,
//     },
//   }),
// };


const ResultCard: React.FC<{
  resultType: string;
  resultData: resultsInterface;
  index: number;
}> = (props) => {
  return (
    <motion.div
      // variants={resultCardVariants}
      // initial="initial"
      // animate="enter"
      // custom={props.index}
      className={styles["result-card"]}
    >
      <ResultCardImg
        resultData={props.resultData}
        resultType={props.resultType}
      />
      <div className={styles["result-card__info-container"]}>
        <ResultCardHeader
          resultData={props.resultData}
          resultType={props.resultType}
        />
        <ResultCardMain
          resultData={props.resultData}
          resultType={props.resultType}
        />
      </div>
    </motion.div>
  );
};

export default ResultCard;

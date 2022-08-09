import React from "react";
import RatingIcon from "../Icons/RatingIcon";
import styles from "./styles/DetailsMain.module.scss"
import { movieInterface } from "../../utils/types";

const DetailsMain: React.FC<{modalData: movieInterface}> = (props) => {
    return (
        <main className={styles["main-content"]}>
                  <div className={styles["user-score__container"]}>
                    <RatingIcon className={styles["rating-icon"]} />
                    <p>{props.modalData.vote_average.toFixed(1)}</p>
                    <p style={{ marginLeft: "0.5rem" }}>- User Score</p>
                  </div>
                  <div className={styles["overview__container"]}>
                    <p style={{ fontSize: "1.3rem", margin: 0 }}>Overview: </p>
                    <div className={styles["overview-text__wrapper"]}>
                      <p className={styles["overview-text"]}>
                        {props.modalData.overview}
                      </p>
                    </div>
                  </div>
                </main>
    )
}

export default DetailsMain;
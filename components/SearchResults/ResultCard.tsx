import React from "react";
import styles from "./styles/ResultCard.module.scss"
import RatingIcon from "../Icons/RatingIcon";

const ResultCard:React.FC = () => {
    return (
<div className={styles["result-card"]}>
            <div className={styles["result-card__img-container"]}>
              <img
                className={styles["result-card__img"]}
                src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
              ></img>
            </div>
            <div className={styles["result-card__info-container"]}>
              <header className={styles["result-card__header"]}>
                <h1 className={styles["result-card__header-text"]}>
                  Thor And Something Something
                </h1>
              </header>
              <main className={styles["result-card__main"]}>
                <p className={styles["result-card__summary"]}>
                  This movie is about Thor. It definitely is a movie and Thor is
                  a hero without a doubt. Best moment is when Thor says "It's
                  thorin time". Tears squeezer.
                </p>
                <div className={styles["result-card__rating"]}>
                <RatingIcon className={styles["result-card__rating-icon"]}/>
                <p className={styles["result-card__rating-average"]}>7.5 - User Score</p>
                </div>
              </main>
            </div>
          </div>
    )
}


export default ResultCard;

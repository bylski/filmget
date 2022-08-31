import React from "react";
import RatingIcon from "../Icons/RatingIcon";
import styles from "./styles/DetailsMain.module.scss";
import { actorInterface, movieInterface, seriesInterface } from "../../utils/types";

const DetailsMain: React.FC<{
  modalData: movieInterface | actorInterface | seriesInterface;
  dataType: string;
}> = (props) => {
  if (props.dataType === "movie" && "title" in props.modalData) {
    return (
      <main className={styles["main-content"]}>
        <div className={styles["user-score__container"]}>
          <RatingIcon className={styles["rating-icon"]} />
          <p className={styles["rating"]}>
            {props.modalData.vote_average.toFixed(1)}
          </p>
          <p className={styles["rating-text"]}>- User Score</p>
        </div>
        <div className={styles["overview__container"]}>
          <p className={styles["overview__heading-text"]}>Overview: </p>
          <div className={styles["overview-text__wrapper"]}>
            <p className={styles["overview-text"]}>
              {props.modalData.overview}
            </p>
          </div>
        </div>
      </main>
    );
  } else if (props.dataType === "series" && "name" in props.modalData && "genre_ids" in props.modalData) {
    return (
      <main className={styles["main-content"]}>
        <div className={styles["user-score__container"]}>
          <RatingIcon className={styles["rating-icon"]} />
          <p className={styles["rating"]}>
            {props.modalData.vote_average.toFixed(1)}
          </p>
          <p className={styles["rating-text"]}>- User Score</p>
        </div>
        <div className={styles["overview__container"]}>
          <p className={styles["overview__heading-text"]}>Overview: </p>
          <div className={styles["overview-text__wrapper"]}>
            <p className={styles["overview-text"]}>
              {props.modalData.overview}
            </p>
          </div>
        </div>
      </main>
    );
  } else if (props.dataType === "actor" && "known_for" in props.modalData) {
    return (
      <main className={styles["main-content"]}>
        <div className={styles["known-for__container"]}>
          <p style={{ fontSize: "1.1rem", fontWeight: 400, margin: 0 }}>
            Known from:{" "}
          </p>
          <div className={styles["known-for__content"]}>
            <div className={styles["known-for__card"]}>
              <img
                title={props.modalData.known_for[0].title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.known_for[0].poster_path}`}
                className={styles["known-for__img"]}
              ></img>
            </div>
            <div className={styles["known-for__card"]}>
              <img
                title={props.modalData.known_for[1].title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.known_for[1].poster_path}`}
                className={styles["known-for__img"]}
              ></img>
            </div>
            <div className={styles["known-for__card"]}>
              <img
                title={props.modalData.known_for[2].title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.known_for[2].poster_path}`}
                className={styles["known-for__img"]}
              ></img>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return <h1 style={{ color: "white" }}>SOMETHING WENT WRONG</h1>;
  }
};

export default DetailsMain;

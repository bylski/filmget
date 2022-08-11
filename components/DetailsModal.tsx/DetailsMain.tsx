import React from "react";
import RatingIcon from "../Icons/RatingIcon";
import styles from "./styles/DetailsMain.module.scss";
import { actorInterface, movieInterface } from "../../utils/types";

const DetailsMain: React.FC<{
  modalData: movieInterface | actorInterface;
  dataType: string;
}> = (props) => {
  if (props.dataType === "movie" && "genresList" in props.modalData) {
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
    );
  } else if (props.dataType === "actor" && "name" in props.modalData) {
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

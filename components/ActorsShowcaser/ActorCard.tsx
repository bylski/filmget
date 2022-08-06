import React from "react";
import styles from "./styles/ActorCard.module.scss";
import Image from "next/image";

interface actorInterface {
  name: string;
  id: number;
  profilePath: string;
  knownFor: {
    backdrop_path: string;
    title: string,
  }[],
  onHover: (path: string) => void
}


const ActorCard: React.FC<actorInterface> = (props) => {

  const imgHoveredHandler = (e: React.MouseEvent) => {
    const path = props.knownFor[0].backdrop_path
    props.onHover(path);
  }

  return (
      <div className={styles["actor__container"]}>
        <div onMouseEnter={imgHoveredHandler} className={styles["actor__img-container"]}>
          <Image
            width="300"
            height="450"
            className={styles["actor__img"]}
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.profilePath}`}
          />
        </div>
        <div className={styles["actor__info"]}>
          <p className={styles["actor__fullname"]}>{props.name}</p>
          <p className={styles["actor__known-from"]}>
            {props.knownFor[0].title}
          </p>
        </div>
      </div>
  );
};

export default ActorCard;

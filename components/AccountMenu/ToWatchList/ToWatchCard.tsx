import React, { useState } from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import TrashCanIcon from "../../Icons/TrashCanIcon";
import DetailsIcon from "../../Icons/DetailsIcon";



const ToWatchCard: React.FC<{ movieData: any }> = (props) => {
  const [optionsText, setOptionsText] = useState(" ");

  const hoverHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const button = e.target as HTMLButtonElement | HTMLDivElement;
    const buttonId = button.id;
  
    switch (buttonId) {
      case "delete-btn":
      setOptionsText("Remove")
        break;
      case "details-btn":
        setOptionsText("Details")
        break;
      default:
        setOptionsText("Overview");
        break;
    }
  }

  const hoverEndHandler = () => {
    setOptionsText("Overview")
  }

  return (
    <div onMouseEnter={hoverHandler} className={styles["media__card"]}>
      <div className={styles["card__img"]}>
        <div className={styles["card__options"]}>
          <div onMouseLeave={hoverEndHandler} className={styles["options"]}>
            <button onMouseEnter={hoverHandler} id={"details-btn"} className={styles["options__details"]}>
              <DetailsIcon className={styles["options__details-icon"]} />
            </button>
            <button onMouseEnter={hoverHandler} id={"delete-btn"} className={styles["options__delete"]}>
              <TrashCanIcon className={styles["options__trash-icon"]} />
            </button>
          </div>
          <p className={styles["options__text"]}>{optionsText}</p>
        </div>
        <Image
          width={600}
          height={900}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.movieData[0].poster_path}`}
        ></Image>
      </div>
      <div className={styles["card__info"]}>
        <div className={styles["info__rating"]}>
          <RatingIcon className={styles["rating__icon"]} />
          <p className={styles["rating__value"]}>
            {props.movieData[0].vote_average.toFixed(1)}
          </p>
        </div>
        <p className={styles["info__title"]}>{props.movieData[0].title}</p>
      </div>
    </div>
  );
};

export default ToWatchCard;

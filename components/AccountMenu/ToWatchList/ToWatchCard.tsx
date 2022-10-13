import React, { useState, useRef } from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import TrashCanIcon from "../../Icons/TrashCanIcon";
import DetailsIcon from "../../Icons/DetailsIcon";
import { useRouter } from "next/router";
import { modalActions } from "../../../redux/store";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import useModal from "../../../utils/hooks/useModal";

const ToWatchCard: React.FC<{
  movieData: any;
  genresList: {id: number, name: string}[];
}> = (props) => {
  const [optionsText, setOptionsText] = useState(" ");
  const router = useRouter();

  const hoverHandler = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const element = e.target as HTMLButtonElement | HTMLDivElement;
    const elementId = element.id;

    switch (elementId) {
      case "delete-btn":
        setOptionsText("Remove");
        break;
      case "details-btn":
        setOptionsText("Details");
        break;
      case "card":
        setOptionsText("Overview");
        break;
    }
  };

  const hoverEndHandler = () => {
    setOptionsText("Overview");
  };
  const divRef = useRef<HTMLDivElement | null>(null);
  const { showModal, closeModal } = useModal();
  const mouseClickHandler = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.stopPropagation();
    const element = e.currentTarget as HTMLButtonElement | HTMLDivElement;
    const elementId = element.id;
    console.log(elementId);
    switch (elementId) {
      case "delete-btn":
        setOptionsText("Remove");
        break;
      case "details-btn":
        router.push("/details/movie/718930");
        break;
      case "card":
        showModal({
          elementRef: divRef,
          mediaData: props.movieData[0],
          mediaType: "movies",
          genresList: props.genresList,
        });
        break;
    }
  };

  return (
    <div
      ref={divRef}
      id="card"
      onClick={mouseClickHandler}
      onMouseEnter={hoverHandler}
      className={styles["media__card"]}
    >
      <div className={styles["card__img"]}>
        <div className={styles["card__options"]}>
          <div onMouseLeave={hoverEndHandler} className={styles["options"]}>
            <button
              onClick={mouseClickHandler}
              onMouseEnter={hoverHandler}
              id={"details-btn"}
              className={styles["options__details"]}
            >
              <DetailsIcon className={styles["options__details-icon"]} />
            </button>
            <button
              onClick={mouseClickHandler}
              onMouseEnter={hoverHandler}
              id={"delete-btn"}
              className={styles["options__delete"]}
            >
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

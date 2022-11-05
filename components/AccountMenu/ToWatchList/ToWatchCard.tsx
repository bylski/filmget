import React, { useState, useRef } from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import TrashCanIcon from "../../Icons/TrashCanIcon";
import DetailsIcon from "../../Icons/DetailsIcon";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import useModal from "../../../utils/hooks/useModal";
import { movieInterface, seriesInterface } from "../../../utils/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { accountActions } from "../../../redux/store";
import { AnimatePresence, motion } from "framer-motion";

const ToWatchCard: React.FC<{
  mediaData: movieInterface | seriesInterface;
  genresList: { id: number; name: string }[];
}> = (props) => {
  const [optionsText, setOptionsText] = useState(" ");
  // const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSession();
  const moviesGenres = // get the genres of the movie
    props.mediaData.genre_ids.map((genreId, i) => {
      for (let genreElement of props.genresList) {
        if (genreElement.id === genreId) {
          return { id: genreElement.id, name: genreElement.name };
        }
      }
      return null;
    });


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
    switch (elementId) {
      case "delete-btn":
        dispatch(accountActions.deleteToWatch(props.mediaData));
        // setIsDeleted(true);
        axios.post("/api/remove-to-watch", {
          username: session.data?.user?.name,
          media: props.mediaData,
        });
        break;
      case "details-btn":
        router.push(`/details/movie/${props.mediaData.id}`);
        break;
      case "card":
        showModal({
          elementRef: divRef,
          mediaData: props.mediaData,
          mediaType: "movies",
          genresList: moviesGenres,
        });
        break;
    }
  };



  return (
    <AnimatePresence>
      <motion.div
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
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaData.poster_path}`}
          ></Image>
        </div>
        <div className={styles["card__info"]}>
          <div className={styles["info__rating"]}>
            <RatingIcon className={styles["rating__icon"]} />
            <p className={styles["rating__value"]}>
              {props.mediaData.vote_average.toFixed(1)}
            </p>
          </div>
          {"title" in props.mediaData ? (
            <p className={styles["info__title"]}>{props.mediaData.title}</p>
          ) : null}
          {"name" in props.mediaData ? (
            <p className={styles["info__title"]}>{props.mediaData.name}</p>
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToWatchCard;

import { motion } from "framer-motion";
import React, { Fragment, MouseEventHandler, useEffect } from "react";
import styles from "./styles/DetailsModal.module.scss";
import { modalVariants } from "../../utils/AnimationVariants.ts";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";

interface movieInterface {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  release_date: string;
  genresList: {name: string, id: number}[];
}

const DetailsModal: React.FC<{
  modalData: movieInterface
  originElement: any;
}> = (props) => {
  // Gets the origin element's (the card that was clicked)
  // position to animate the modal enterencce from that position.
  const originElement = props.originElement.current.getBoundingClientRect();
  const position = {
    x: originElement.x + originElement.width / 2,
    y: originElement.y + originElement.height / 2,
  };

  const dispatch = useAppDispatch();
  const closeModalHandler: MouseEventHandler = () => {
    dispatch(modalActions.hideModal());
  };

  const genres = props.modalData.genresList.map((genre) => {
    return genre.name;
  }) 
  const genresString = genres.join(", ")

  return (
    <Fragment>
      <motion.div
        key="backdrop"
        variants={modalVariants}
        initial="backdropFade"
        animate="backdropEnter"
        exit="backdropFade"
        className={styles["modal__backdrop"]}
      ></motion.div>
      <motion.div
        key="modal"
        className={styles["modal__container"]}
        onClick={closeModalHandler}
        custom={position}
        variants={modalVariants}
        initial="modalHidden"
        animate="modalEnter"
        exit="modalHidden"
      >
        <div className={styles["modal__card"]}>
          <img
            src={`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${props.modalData.backdrop_path}`}
            className={styles["modal__backdrop-img"]}
          />
          <div className={styles["modal__wrapper"]}>
            <main className={styles["modal__content"]}>
              <div className={styles["img__container"]}>
                <img
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.poster_path}`}
                  className={styles["img"]}
                ></img>
              </div>
              <div className={styles["info__container"]}>
                <div className={styles["info__header"]}>
                  <h1 className={styles["header__title"]}>
                    {props.modalData.title}{" "}
                    <span>{`(${props.modalData.release_date.slice(
                      0,
                      4
                    )})`}</span>
                  </h1>
                  <p className={styles["header__genres"]}>{genresString}</p>
                </div>
                <div className={styles["main-content"]}>
                      <p style={{ fontSize: "1.3rem", margin: 0, }}>Overview: </p>
                      <p className={styles["main-content__overview"]}>{props.modalData.overview}</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default DetailsModal;

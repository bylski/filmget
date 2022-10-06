import React, { useEffect } from "react";
import { movieInterface } from "../../utils/types";
import styles from "./styles/MediaCard.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

const MovieMediaCard: React.FC<{
  mediaData: movieInterface;
  onCardClick: (cardRef: React.MutableRefObject<HTMLDivElement | null>) => void;
  index: number;
}> = (props) => {
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const cardClickHandler = () => {
    props.onCardClick(mediaCardRef);
  };


  // Manual control of the fade-in animation
  const controls = useAnimationControls();
  useEffect(() => {
    const sequence = async () => {
      await controls.start({opacity: 0, top: 15, transition: {duration: 0}})
      await controls.start(i => ({opacity: 1, transition: {duration: 0.5, delay: 0.02*i}}))
    }

    sequence()
  }, [props.mediaData])

  const imgPath = props.mediaData.poster_path;

  return (
    <motion.div
      animate={controls}
      custom={props.index}
      ref={mediaCardRef}
      onClick={cardClickHandler}
      className={styles["media__card"]}
    >
      <div className={styles["media__img-container"]}>
        <Image
          width="600px"
          height="900px"
          className={styles["media__img"]}
          src={imgPath !== undefined && imgPath !== null ?`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${imgPath}` : "/noImg.png"}
        />
      </div>
      <div className={styles["media__info"]}>
        <div className={styles["media__rating-container"]}>
          <RatingIcon className={styles["media__rating-icon"]}></RatingIcon>
          <p className={styles["media__rating-average"]}>
            {props.mediaData.vote_average.toFixed(1)}
          </p>
        </div>
        <p className={styles["media__title"]}>{props.mediaData.title}</p>
      </div>
    </motion.div>
  );
};

export default MovieMediaCard;

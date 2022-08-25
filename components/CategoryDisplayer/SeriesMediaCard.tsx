import React from "react";
import { seriesInterface } from "../../utils/types";
import styles from "./styles/MediaCard.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import { useRef } from "react";
import Image from "next/image";

const SeriesMediaCard: React.FC<{
  mediaData: seriesInterface;
  onCardClick: (cardRef: React.MutableRefObject<HTMLDivElement | null>) => void;
}> = (props) => {
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const cardClickHandler = () => {
    props.onCardClick(mediaCardRef);
  };
  return (
    <div
      ref={mediaCardRef}
      onClick={cardClickHandler}
      className={styles["media__card"]}
    >
      <div className={styles["media__img-container"]}>
      <Image
          width="600px"
          height="900px"
          className={styles["media__img"]}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaData.poster_path}`}
        />
      </div>
      <div className={styles["media__info"]}>
        <div className={styles["media__rating-container"]}>
          <RatingIcon className={styles["media__rating-icon"]}></RatingIcon>
          <p className={styles["media__rating-average"]}>
            {props.mediaData.vote_average.toFixed(1)}
          </p>
        </div>
        <p className={styles["media__title"]}>{props.mediaData.name}</p>
      </div>
    </div>
  );
};
export default SeriesMediaCard;

import React, { useRef } from "react";
import styles from "./styles/MediaDisplayer.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";

const MediaCard: React.FC<{
  mediaData: movieInterface | seriesInterface | actorInterface;
  genresList: { id: number; name: string }[] | null;
  mediaType: string;
}> = (props) => {
  let mediaGenres: any = {};
  if ("genre_ids" in props.mediaData) {
    mediaGenres = // get the genres of the movie
      props.mediaData.genre_ids.map((genreId, i) => {
        for (let genreElement of props.genresList!) {
          if (genreElement.id === genreId) {
            return { id: genreElement.id, name: genreElement.name };
          }
        }
        return null;
      });
  }

  const dispatch = useAppDispatch();
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  let originPosition;
  let position: { x: number; y: number };
  const cardClickHandler = () => {
    if (mediaCardRef.current !== null) {
      originPosition = mediaCardRef.current.getBoundingClientRect();
      position = {
        x: originPosition.x + originPosition.width / 2,
        y: originPosition.y + originPosition.height / 2,
      };
    }
    dispatch(
      modalActions.showModal({
        data: { ...props.mediaData, genresList: mediaGenres },
        originPosition: position,
      })
    );
  };

  if (props.mediaType === "movies" || props.mediaType === "series") {
    return (
      <div
        ref={mediaCardRef}
        onClick={cardClickHandler}
        className={styles["media__card"]}
      >
        <div className={styles["media__img-container"]}>
          {"poster_path" in props.mediaData ? (
            <img
              className={styles["media__img"]}
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaData.poster_path}`}
            />
          ) : null}
        </div>
        <div className={styles["media__info"]}>
          <div className={styles["media__rating-container"]}>
            <RatingIcon className={styles["media__rating-icon"]}></RatingIcon>
            <p className={styles["media__rating-average"]}>
              {"vote_average" in props.mediaData
                ? props.mediaData.vote_average.toFixed(1)
                : null}
            </p>
          </div>
          <p className={styles["media__title"]}>
            {"title" in props.mediaData ? props.mediaData.title : null}
            {"name" in props.mediaData ? props.mediaData.name : null}
          </p>
        </div>
      </div>
    );
  } else if (props.mediaType === "people") {
    console.log(props.mediaData);
    return (
      <div
        ref={mediaCardRef}
        onClick={cardClickHandler}
        className={styles["media__card"]}
      >
        <div className={styles["media__img-container"]}>
          {"profile_path" in props.mediaData ? <img
            className={styles["media__img"]}
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaData.profile_path}`}
          /> : null}
        </div>
        <div className={styles["media__info"]}>
          <p className={styles["media__name"]}>
            {"name" in props.mediaData ? props.mediaData.name : null}
          </p>
          <p className={styles["media__department"]}>
            {"known_for_department" in props.mediaData
              ? props.mediaData.known_for_department
              : null}
          </p>
        </div>
      </div>
    );
  } else return null;
};

export default MediaCard;

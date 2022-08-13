import React from "react";
import styles from "./styles/MovieCard.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import Image from "next/image";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import { useRef } from "react";
import { movieInterface } from "../../utils/types";


const MovieCard: React.FC<{
  movieData: movieInterface;
  genresList:  { id: number; name: string }[];
}> = (props) => {

  const moviesGenres = // get the genres of the movie
    props.movieData.genre_ids.map((genreId, i) => {
      for (let genreElement of props.genresList) {
        if (genreElement.id === genreId) {
          return { id: genreElement.id, name: genreElement.name };
        }
      }
      return null;
    });

  const movieCardRef = useRef<HTMLImageElement | null>(null);
  const dispatch = useAppDispatch();
  let originPosition;
  let position: {x: number, y: number};
  const showModalHandler = () => {
    if (movieCardRef.current !== null) {
      originPosition = movieCardRef.current.getBoundingClientRect();
      position = {
        x: originPosition.x + originPosition.width / 2,
        y: originPosition.y + originPosition.height / 2,
      };
    }

    dispatch(
      modalActions.showModal({
        data: { ...props.movieData, genresList: moviesGenres },
        originPosition: position,
      })
    );
  };

  return (
    <div className={styles["movie-container"]}>
      <div className={styles["movie-img__container"]}>
        <img
          ref={movieCardRef}
          className={styles["movie-img"]}
          onClick={showModalHandler}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.movieData.poster_path}`}
        ></img>
      </div>
      <div className={styles["movie-info__container"]}>
        <div className={styles["movie-rating__container"]}>
          <RatingIcon className={styles["rating-icon"]} />
          <p className={styles["rating-average"]}>
            {props.movieData.vote_average.toFixed(1)}
          </p>
        </div>
        <p onClick={showModalHandler} className={styles["movie-title"]}>
          {props.movieData.title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

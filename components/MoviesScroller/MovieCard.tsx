import React from "react";
import styles from "./styles/MovieCard.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import Image from "next/image";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import { useRef } from "react";

interface movieInterface {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  release_date: string;
}


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

  const movieCardRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const showModalHandler = () => {
    dispatch(
      modalActions.showModal({
        data: { ...props.movieData, genresList: moviesGenres },
        originElement: movieCardRef,
      })
    );
  };

  return (
    <div className={styles["movie-container"]}>
      <div ref={movieCardRef} className={styles["movie-img__container"]}>
        <Image
          onClick={showModalHandler}
          width="600"
          height="900"
          className={styles["movie-img"]}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.movieData.poster_path}`}
        ></Image>
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

import React from "react";
import {
  movieInterface,
  seriesInterface,
  actorInterface,
} from "../../utils/types";
import styles from "./styles/DetailsPageHeader.module.scss";

const DetailsPageHeader: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
}> = (props) => {
  let genres: any;
  let genresString: string = "";
  if ("genres" in props.mediaDetails) {
    genres = props.mediaDetails.genres.map((genre) => {
      return genre.name;
    });
    genresString = genres.join(", ");
  }

  if ("vote_average" in props.mediaDetails) {
    return (
      <div className={styles["info-section__header-section"]}>
        <div className={styles["header"]}>
          <div className={styles["header__head"]}>
            <h1 className={styles["header__title"]}>
              {"title" in props.mediaDetails ? props.mediaDetails.title : ""}
              {"name" in props.mediaDetails ? props.mediaDetails.name : ""}
            </h1>
            <span className={styles["header__span"]}>
              {"release_date" in props.mediaDetails
                ? `(${props.mediaDetails.release_date.slice(0, 4)})`
                : ""}
              {"first_air_date" in props.mediaDetails
                ? `(${props.mediaDetails.first_air_date.slice(0, 4)})`
                : ""}
            </span>
          </div>
          <p className={styles["header__info"]}>{genresString}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DetailsPageHeader;

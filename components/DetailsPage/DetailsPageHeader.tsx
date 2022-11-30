import React, { Fragment } from "react";
import {
  movieInterface,
  seriesInterface,
  actorInterface,
} from "../../utils/types";
import styles from "./styles/DetailsPageHeader.module.scss";
import DetailsPageRating from "./DetailsPageRating";
import ToWatchButton from "../UI/ToWatchButton/ToWatchButton";
import useBreakpoints from "../../utils/hooks/useBreakpoints";

const DetailsPageHeader: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
  mediaType: string;
  breakpoints: { [key: string]: boolean }[] | undefined;
}> = (props) => {
  let genres: any;
  let genre_ids: number[] = [];
  let genresString: string = "";
  if ("genres" in props.mediaDetails) {
    genres = props.mediaDetails.genres.map((genre) => {
      return genre.name;
    });
    genresString = genres.join(", ");

    genre_ids = props.mediaDetails.genres.map((genre) => {
      return genre.id;
    });
  }

  // Add genre_ids to mediaData. It will help with the accessebility of genre ids in other components.
  let mediaData = props.mediaDetails;
  // if ("genres" in props.mediaDetails) {
  //   mediaData = { ...props.mediaDetails, genre_ids: genre_ids };
  // }

  let changeToWatchPosition = false;
  if (props.breakpoints) {
    changeToWatchPosition = props.breakpoints[0].changeToWatchPosition;
  }

  if ("poster_path" in mediaData) {
    return (
      <div className={styles["info-section__header-section"]}>
        <div className={styles["header"]}>
          <div className={styles["header__head"]}>
            <h1 className={styles["header__title"]}>
              {"title" in mediaData ? mediaData.title : ""}
              {"name" in mediaData ? mediaData.name : ""}
              <span className={styles["header__span"]}>
                {"release_date" in mediaData
                  ? `(${mediaData.release_date.slice(0, 4)})`
                  : ""}
                {"first_air_date" in mediaData
                  ? `(${mediaData.first_air_date.slice(0, 4)})`
                  : ""}
              </span>
            </h1>
          </div>
          <p className={styles["header__info"]}>
            {`${genresString}`}
            {"runtime" in mediaData ? (
              <Fragment>
                <span>&nbsp;|</span>
                <span style={{ marginLeft: "0.6rem" }}>
                  {`${mediaData.runtime} min.`}
                </span>
              </Fragment>
            ) : null}
          </p>
        </div>
        {!changeToWatchPosition ? (
          <div className={styles["header__inputs"]}>
            <ToWatchButton mediaData={mediaData} />
          </div>
        ) : null}
      </div>
    );
  } else if ("gender" in mediaData) {
    let actorsGender: string;
    switch (mediaData.gender) {
      case 1:
        actorsGender = "Female";
        break;
      case 2:
        actorsGender = "Male";
        break;
      default:
        actorsGender = "Other";
        break;
    }

    return (
      <div className={styles["info-section__header-section"]}>
        <div className={styles["header"]}>
          <div className={styles["header__head"]}>
            <h1 className={styles["header__title"]}>{mediaData.name}</h1>
            <span className={styles["header__span"]}></span>
          </div>
          <p
            className={styles["header__info"]}
          >{`Gender - ${actorsGender} | Department - ${mediaData.known_for_department}`}</p>
        </div>
      </div>
    );
  } else return null;
};

export default DetailsPageHeader;

import React, {Fragment} from "react";
import {
  movieInterface,
  seriesInterface,
  actorInterface,
} from "../../utils/types";
import styles from "./styles/DetailsPageHeader.module.scss";
import DetailsPageRating from "./DetailsPageRating";

const DetailsPageHeader: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
  mediaType: string;
}> = (props) => {
  let genres: any;
  let genresString: string = "";
  if ("genres" in props.mediaDetails) {
    genres = props.mediaDetails.genres.map((genre) => {
      return genre.name;
    });
    genresString = genres.join(", ");
  }

  if ("poster_path" in props.mediaDetails) {
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
          <p className={styles["header__info"]}>
            {`${genresString}`}
            {"runtime" in props.mediaDetails ? (
              <Fragment>
                <span>&nbsp;|</span>
                <span style={{ marginLeft: "0.6rem" }}>
                  {`${props.mediaDetails.runtime} min.`}
                </span>
              </Fragment>
            ) : null}
          </p>
        </div>
      </div>
    );
  } else if ("gender" in props.mediaDetails) {
    let actorsGender: string;
    switch (props.mediaDetails.gender) {
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
            <h1 className={styles["header__title"]}>
              {props.mediaDetails.name}
            </h1>
            <span className={styles["header__span"]}></span>
          </div>
          <p
            className={styles["header__info"]}
          >{`Gender - ${actorsGender} | Department - ${props.mediaDetails.known_for_department}`}</p>
        </div>
      </div>
    );
  } else return null;
};

export default DetailsPageHeader;

import React, { useState, useEffect, Fragment } from "react";
import RatingIcon from "../Icons/RatingIcon";
import styles from "./styles/DetailsMain.module.scss";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { ratingSelectorActions } from "../../redux/store";

const DetailsMain: React.FC<{
  modalData: movieInterface | actorInterface | seriesInterface;
  dataType: string;
}> = (props) => {
  const dispatch = useAppDispatch();
  const [mediaRating, setMediaRating] = useState<{
    id: number;
    rating: number;
  } | null>(null);

  // Check if there is any ratingData, use is to control "Rate button's visuals"
  const ratingData = useAppSelector((state) => state.account.mediaRatings);
  useEffect(() => {
    ratingData.forEach((ratedMedia, i) => {
      if (ratedMedia.id === props.modalData.id) {
        setMediaRating(ratedMedia);
      }
    });
  }, [ratingData]);

  const openSelectorHandler = () => {
    dispatch(ratingSelectorActions.showSelector());
  };

  const RateButton: JSX.Element = mediaRating ? (
    <button
      onClick={openSelectorHandler}
      className={`${styles["rating__btn"]} ${styles["rated"]}`}
    >
      <Fragment>
        Rated |<span>{mediaRating.rating}</span>
        <RatingIcon
          differentFill={{ fill1: "white", fill2: "white" }}
          className={styles["btn__rating-icon"]}
        />
      </Fragment>
    </button>
  ) : (
    <button onClick={openSelectorHandler} className={styles["rating__btn"]}>
      Rate
    </button>
  );

  if (props.dataType === "movie" && "title" in props.modalData) {
    return (
      <main className={styles["main-content"]}>
        <div className={styles["user-score__container"]}>
          <RatingIcon className={styles["rating-icon"]} />
          <p className={styles["rating"]}>
            {props.modalData.vote_average.toFixed(1)}
          </p>
          <p className={styles["rating-text"]}>- User Score</p>
          {RateButton}
        </div>
        <div className={styles["overview__container"]}>
          <p className={styles["overview__heading-text"]}>Overview: </p>
          <div className={styles["overview-text__wrapper"]}>
            <p className={styles["overview-text"]}>
              {props.modalData.overview}
            </p>
          </div>
        </div>
      </main>
    );
  } else if (
    props.dataType === "series" &&
    "name" in props.modalData &&
    "genre_ids" in props.modalData
  ) {
    return (
      <main className={styles["main-content"]}>
        <div className={styles["user-score__container"]}>
          <RatingIcon className={styles["rating-icon"]} />
          <p className={styles["rating"]}>
            {props.modalData.vote_average.toFixed(1)}
          </p>
          <p className={styles["rating-text"]}>- User Score</p>
          {RateButton}
        </div>
        <div className={styles["overview__container"]}>
          <p className={styles["overview__heading-text"]}>Overview: </p>
          <div className={styles["overview-text__wrapper"]}>
            <p className={styles["overview-text"]}>
              {props.modalData.overview}
            </p>
          </div>
        </div>
      </main>
    );
  } else if (props.dataType === "actor" && "known_for" in props.modalData) {
    // Get 3 first "known_for"'s to display in the modal
    const knownForArr: typeof props.modalData.known_for = [];
    const { known_for: knownFor } = props.modalData;
    for (let i: number = 0; i < 3; i++) {
      knownForArr.push(knownFor[i]);
    }

    // Extract info from knownForArr to pass it to the component in a clean way
    const knownForInfo = knownForArr.map((knownFor) => {
      const baseObj = {
        id: knownFor.id,
        title: knownFor.title,
        posterPath: knownFor.poster_path,
      };
      if (knownFor.media_type === "tv") {
        return { ...baseObj, mediaType: "series" }; // Now mediaType is "series" instead of "tv" which will be helpful in linking route
      } else {
        return { ...baseObj, mediaType: knownFor.media_type };
      }
    });

    return (
      <main className={styles["main-content"]}>
        <div className={styles["known-for__container"]}>
          <p style={{ fontSize: "1.1rem", fontWeight: 400, margin: 0 }}>
            Known from:{" "}
          </p>
          <div className={styles["known-for__content"]}>
            <div className={styles["known-for__card"]}>
              <Link
                href={`details/${knownForInfo[0].mediaType}/${knownForInfo[0].id}`}
              >
                <a
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                ></a>
              </Link>
              <img
                title={knownForInfo[0].title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${knownForInfo[0].posterPath}`}
                className={styles["known-for__img"]}
              ></img>
            </div>
            <div className={styles["known-for__card"]}>
              <Link
                href={`details/${knownForInfo[1].mediaType}/${knownForInfo[1].id}`}
              >
                <a
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                ></a>
              </Link>
              <img
                title={knownForInfo[1].title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${knownForInfo[1].posterPath}`}
                className={styles["known-for__img"]}
              ></img>
            </div>
            <div className={styles["known-for__card"]}>
              <Link
                href={`details/${knownForInfo[2].mediaType}/${knownForInfo[2].id}`}
              >
                <a
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                ></a>
              </Link>
              <img
                title={knownForInfo[2].title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${knownForInfo[2].posterPath}`}
                className={styles["known-for__img"]}
              ></img>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return <h1 style={{ color: "white" }}>SOMETHING WENT WRONG</h1>;
  }
};

export default DetailsMain;

import React, { Fragment, useEffect } from "react";
import styles from "./styles/DetailsPage.module.scss";
import Image from "next/image";
import {
  actorInterface,
  castInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import DetailsPageHeader from "./DetailsPageHeader";
import DetailsPageImage from "./DetailsPageImage";
import DetailsPageRating from "./DetailsPageRating";
import DetailsPageSummary from "./DetailsPageSummary";
import RatingSelector from "../UI/RatingSelector/RatingSelector";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import MovieDetails from "../DetailsModal.tsx/MovieDetails";
import AdditionalInfoMovie from "./AdditionalInfo/Movie/AdditionalInfoMovie";

const DetailsPage: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
  additionalDetails?: actorInterface;
  mediaType: string;
  genresList?: { id: number; name: string }[];
  castDetails: castInterface;
}> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(modalActions.hideModal());
  }, []);

  const showSelector = useAppSelector((state) => state.ratingSelector.isShown);

  const imgPath =
    "backdrop_path" in props.mediaDetails
      ? props.mediaDetails.backdrop_path
      : props.additionalDetails?.known_for[0].backdrop_path;

  const fullImgPath = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${imgPath}`;

  let genre_ids: number[] = [];
  if ("genres" in props.mediaDetails) {
    genre_ids = props.mediaDetails.genres.map((genre) => {
      return genre.id;
    });
  }

  // Add genre_ids to mediaData. It will help with the accessebility of genre ids in other components.
  let mediaData = props.mediaDetails;
  if ("genres" in props.mediaDetails) {
    mediaData = { ...props.mediaDetails, genre_ids: genre_ids };
  }

  return (
    <Fragment>
      <section className={styles["details-page__primary-content"]}>
        <AnimatePresence>
          {"vote_average" in mediaData && showSelector ? (
            <RatingSelector mediaData={mediaData} />
          ) : null}
        </AnimatePresence>
        <div className={styles["details-page__backdrop"]}>
          {imgPath !== undefined && imgPath !== null ? (
            <img
              src={fullImgPath}
              className={styles["details-page__backdrop-img"]}
            ></img>
          ) : null}
        </div>
        <main className={styles["details-main"]}>
          <DetailsPageImage mediaDetails={mediaData} />
          <div className={styles["details-main__content"]}>
            <DetailsPageHeader
              mediaType={props.mediaType}
              mediaDetails={{
                ...mediaData,
                genresList: props.genresList!,
              }}
            />
            {props.mediaType !== "people" && "vote_average" in mediaData ? (
              <DetailsPageRating mediaDetails={mediaData} />
            ) : null}
            <DetailsPageSummary
              mediaType={props.mediaType}
              mediaDetails={mediaData}
            />
          </div>
        </main>
      </section>
      {"title" in props.mediaDetails ? (
        <AdditionalInfoMovie movieDetails={props.mediaDetails} castDetails={props.castDetails}/>
      ) : null}
    </Fragment>
  );
};

export default DetailsPage;

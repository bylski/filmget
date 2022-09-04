import React, { Fragment, useEffect } from "react";
import styles from "./styles/DetailsPage.module.scss";
import Image from "next/image";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import DetailsPageHeader from "./DetailsPageHeader";
import DetailsPageImage from "./DetailsPageImage";
import DetailsPageRating from "./DetailsPageRating";
import DetailsPageSummary from "./DetailsPageSummary";

const DetailsPage: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
  additionalDetails?: actorInterface;
  mediaType: string;
  genresList?: { id: number; name: string }[];
}> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(modalActions.hideModal());
  }, []);

  console.log(props.additionalDetails)

  return (
    <Fragment>
      <section className={styles["details-page"]}>
        <div className={styles["details-page__backdrop"]}>
          <img
            src={
              "backdrop_path" in props.mediaDetails
                ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.mediaDetails.backdrop_path}` // if a movie or series take it's backdrop path
                : `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.additionalDetails?.known_for[0].backdrop_path}` // if person takie backdrop photo of the movie he is best known for
            }
            className={styles["details-page__backdrop-img"]}
          ></img>
        </div>
        <main className={styles["details-main"]}>
          <DetailsPageImage mediaDetails={props.mediaDetails} />
          <div className={styles["details-main__content"]}>
            <DetailsPageHeader mediaType={props.mediaType} mediaDetails={props.mediaDetails} />
            {props.mediaType !== "people" ? (
              <DetailsPageRating mediaDetails={props.mediaDetails} />
            ) : null}
            <DetailsPageSummary
              mediaType={props.mediaType}
              mediaDetails={props.mediaDetails}
            />
          </div>
        </main>
      </section>
    </Fragment>
  );
};

export default DetailsPage;

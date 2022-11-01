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

  const imgPath =
    "backdrop_path" in props.mediaDetails
      ? props.mediaDetails.backdrop_path
      : props.additionalDetails?.known_for[0].backdrop_path;

  const fullImgPath = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${imgPath}`;

  return (
    <Fragment>
      <section className={styles["details-page"]}>
        <div className={styles["details-page__backdrop"]}>
          {imgPath !== undefined && imgPath !== null ? (
            <img
              src={fullImgPath}
              className={styles["details-page__backdrop-img"]}
            ></img>
          ) : null}
        </div>
        <main className={styles["details-main"]}>
          <DetailsPageImage mediaDetails={props.mediaDetails} />
          <div className={styles["details-main__content"]}>
            <DetailsPageHeader
              mediaType={props.mediaType}
              mediaDetails={props.mediaDetails}
            />
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

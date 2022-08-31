import React, { Fragment, useEffect } from "react";
import styles from "./styles/DetailsPage.module.scss";
import Image from "next/image";
import { actorInterface, movieInterface, seriesInterface } from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import DetailsPageHeader from "./DetailsPageHeader";
import DetailsPageImage from "./DetailsPageImage";
import DetailsPageRating from "./DetailsPageRating";
import DetailsPageSummary from "./DetailsPageSummary";

const DetailsPage: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
  genresList: { id: number; name: string }[];
}> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(modalActions.hideModal());
  }, []);


  return (
    <Fragment>
      <section className={styles["details-page"]}>
        <div className={styles["details-page__backdrop"]}>
          <img
            src={"backdrop_path" in props.mediaDetails ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.mediaDetails.backdrop_path}` : ""}
            className={styles["details-page__backdrop-img"]}
          ></img>
        </div>
        <main className={styles["details-main"]}>
          <DetailsPageImage mediaDetails={props.mediaDetails}/>
          <div className={styles["details-main__content"]}>
            <DetailsPageHeader mediaDetails={props.mediaDetails}/>
            <DetailsPageRating mediaDetails={props.mediaDetails}/>
            <DetailsPageSummary mediaDetails={props.mediaDetails}/>
          </div>
        </main>
      </section>
    </Fragment>
  );
};

export default DetailsPage;

import React, { Fragment } from "react";
import DetailsHeader from "./DetailsHeader";
import DetailsMain from "./DetailsMain";
import DetailsFooter from "./DetailsFooter";
import styles from "./styles/MovieDetails.module.scss";
import { seriesInterface } from "../../utils/types";

const SeriesDetails: React.FC<{
  modalData: seriesInterface;
  genresString: string;
}> = (props) => {


  return (
    <Fragment>
      <div className={styles["backdrop-img__container"]}>
        {props.modalData.backdrop_path !== null ? <img
          src={`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${props.modalData.backdrop_path}`}
          className={styles["modal__backdrop-img"]}
        />: null}
      </div>
      <div className={styles["modal__wrapper"]}>
        <div className={styles["modal__content"]}>
          <div className={styles["img__container"]}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.poster_path}`}
              className={styles["img"]}
            ></img>
          </div>
          <article className={styles["info__container"]}>
            <DetailsHeader
              modalData={props.modalData}
              dataType="series"
              genresString={props.genresString}
            />
            <div className={styles["layout-helper"]}>
              <DetailsMain dataType="series" modalData={props.modalData} />
              <DetailsFooter mediaData={{id: props.modalData.id, mediaType: "series" }}/>
            </div>
          </article>
        </div>
      </div>
    </Fragment>
  );
};

export default SeriesDetails;

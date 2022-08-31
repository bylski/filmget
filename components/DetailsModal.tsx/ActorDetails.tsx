import React from "react";
import { Fragment } from "react";
import styles from "./styles/ActorDetails.module.scss";
import DetailsFooter from "./DetailsFooter";
import DetailsHeader from "./DetailsHeader";
import DetailsMain from "./DetailsMain";
import { actorInterface } from "../../utils/types";

const ActorDetails: React.FC<{ modalData: actorInterface }> = (props) => {
  return (
    <Fragment>
      <div className={styles["backdrop-img__container"]}>
        <img
          src={`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${props.modalData.known_for[0].backdrop_path}`}
          className={styles["modal__backdrop-img"]}
        />
      </div>
      <div className={styles["modal__wrapper"]}>
        <div className={styles["modal__content"]}>
          <div className={styles["img__container"]}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.profile_path}`}
              className={styles["img"]}
            ></img>
          </div>
          <article className={styles["info__container"]}>
            <DetailsHeader modalData={props.modalData} dataType="actor" />
            <div className={styles["layout-helper"]}>
              <DetailsMain dataType="actor" modalData={props.modalData} />
              <DetailsFooter mediaData={{id: props.modalData.known_for[0].id, mediaType: "movie"}}/>
            </div>
          </article>
        </div>
      </div>
    </Fragment>
  );
};

export default ActorDetails;

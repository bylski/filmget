import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import styles from "./styles/ActorDetails.module.scss";
import DetailsFooter from "./DetailsFooter";
import DetailsHeader from "./DetailsHeader";
import DetailsMain from "./DetailsMain";
import { actorInterface } from "../../utils/types";
import useBreakpoints from "../../utils/hooks/useBreakpoints";

const ActorDetails: React.FC<{ modalData: actorInterface }> = (props) => {

  const profilePath = props.modalData.profile_path;
  const [backdropPath, setBackdropPath] = useState(`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${props.modalData.known_for[0].backdrop_path}`)

  const breakpoints = useBreakpoints({breakpointName: "mobileView", breakpointVal: 500});
  let isMobileView = false;
  if (breakpoints) {
    isMobileView = breakpoints[0].mobileView;
  }

  useEffect(() => {
    if (isMobileView) {
      setBackdropPath(`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.profile_path}`)
    } else {
      setBackdropPath(`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${props.modalData.known_for[0].backdrop_path}`)
    }
  }, [isMobileView])


  return (
    <Fragment>
      <div className={styles["backdrop-img__container"]}>
        {backdropPath !== undefined && backdropPath !== null ? <img
          src={backdropPath}
          className={styles["modal__backdrop-img"]}
        /> : <div style={{backgroundColor: "hsl(0, 0%, 12%)"}}className={styles["modal__backdrop-img"]}></div>}
      </div>
      <div className={styles["modal__wrapper"]}>
        <div className={styles["modal__content"]}>
          {!isMobileView ? <div className={styles["img__container"]}>
            <img
              src={profilePath !== undefined && profilePath !== null ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.modalData.profile_path}` : "/noImg.png"}
              className={styles["img"]}
            ></img>
          </div> : null }
          <article className={styles["info__container"]}>
            <DetailsHeader modalData={props.modalData} dataType="actor" />
              <DetailsMain dataType="actor" modalData={props.modalData} />
              <DetailsFooter mediaData={{id: props.modalData.id, mediaType: "people"}}/>
          </article>
        </div>
      </div>
    </Fragment>
  );
};

export default ActorDetails;

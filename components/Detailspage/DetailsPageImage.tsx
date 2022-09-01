import React from "react";
import {
  movieInterface,
  seriesInterface,
  actorInterface,
} from "../../utils/types";
import Image from "next/image";
import styles from "./styles/DetailsPageImage.module.scss";

const DetailsPageImage: React.FC<{
  mediaDetails: movieInterface | seriesInterface | actorInterface;
}> = (props) => {
  return (
    <div className={styles["details-main__img-section"]}>
      <div className={styles["details-main__img-container"]}>
        <Image
          layout="responsive"
          width="600px"
          height="900px"
          className={styles["details-main__img"]}
          src={
            "poster_path" in props.mediaDetails
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaDetails.poster_path}`
              : `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaDetails.profile_path}`
          }
        />
      </div>
    </div>
  );
};

export default DetailsPageImage;

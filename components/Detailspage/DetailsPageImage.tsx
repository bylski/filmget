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

  const imgPath = "poster_path" in props.mediaDetails
  ? props.mediaDetails.poster_path
  : props.mediaDetails.profile_path
  const fullImgPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${imgPath}`

  return (
    <div className={styles["details-main__img-section"]}>
      <div className={styles["details-main__img-container"]}>
        <Image
          layout="responsive"
          width="600px"
          height="900px"
          className={styles["details-main__img"]}
          src={imgPath !== undefined && imgPath !== null ? fullImgPath : "/noImg.png"}
        />
      </div>
    </div>
  );
};

export default DetailsPageImage;

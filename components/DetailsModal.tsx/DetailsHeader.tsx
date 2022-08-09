import React from "react";
import styles from "./styles/DetailsHeader.module.scss"
import { movieInterface } from "../../utils/types";

const DetailsHeader: React.FC<{modalData: movieInterface, genresString: string}> = (props) => {
  return (
    <header className={styles["info__header"]}>
      <h1 className={styles["header__title"]}>
        {props.modalData.title}{" "}
        <span>{`(${props.modalData.release_date.slice(0, 4)})`}</span>
      </h1>
      <p className={styles["header__genres"]}>{props.genresString}</p>
    </header>
  );
};

export default DetailsHeader;

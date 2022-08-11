import React from "react";
import styles from "./styles/DetailsHeader.module.scss";
import { actorInterface, movieInterface } from "../../utils/types";

const DetailsHeader: React.FC<{
  modalData: movieInterface | actorInterface;
  genresString?: string;
  dataType: string;
}> = (props) => {
  if (props.dataType === "movie" && "genresList" in props.modalData) {
    return (
      <header className={styles["info__header"]}>
        <h1 className={styles["header__title"]}>
          {props.modalData.title}{" "}
          <span>{`(${props.modalData.release_date.slice(0, 4)})`}</span>
        </h1>
        <p className={styles["header__genres"]}>{props.genresString}</p>
      </header>
    );
  } else if (props.dataType === "actor" && "name" in props.modalData) {
    
    let actorsGender: string;
    switch (props.modalData.gender) {
      case 1:
        actorsGender = "Female";
        break;
      case 2:
        actorsGender = "Male";
        break;
      default:
        actorsGender = "Other";
        break;
    }

    return (
      <header className={styles["info__header"]}>
        <h1 className={styles["header__name"]}>{props.modalData.name}</h1>
        <p className={styles["header__gender"]}>{`Gender - ${actorsGender}`}</p>
      </header>
    );
  } else {
    return <h1 style={{ color: "white" }}>SOMETHING WENT WRONG</h1>;
  }
};

export default DetailsHeader;

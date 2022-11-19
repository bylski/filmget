import React, { useState, useEffect } from "react";
import styles from "./styles/DetailsHeader.module.scss";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import EyeIcon from "../Icons/EyeIcon";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { accountActions } from "../../redux/store";
import ToWatchButton from "../UI/ToWatchButton/ToWatchButton";

const DetailsHeader: React.FC<{
  modalData: movieInterface | actorInterface | seriesInterface;
  genresString?: string;
  dataType: string;
}> = (props) => {
  const session = useSession();

  if (
    props.dataType === "movie" ||
    (props.dataType === "series" && "genresList" in props.modalData)
  ) {
    return (
      <header className={styles["info__header"]}>
        <div className={styles["header__info-section"]}>
          <h1 className={styles["header__title"]}>
            {"title" in props.modalData ? props.modalData.title : null}{" "}
            {"name" in props.modalData ? props.modalData.name : null}{" "}
            <span>
              {"release_date" in props.modalData
                ? `(${props.modalData.release_date.slice(0, 4)})`
                : null}
              {"first_air_date" in props.modalData
                ? `(${props.modalData.first_air_date.slice(0, 4)})`
                : null}
            </span>
          </h1>
          <p className={styles["header__genres"]}>{props.genresString}</p>
        </div>
        {session.status === "authenticated" ? (
          <div className={styles["header__input-section"]}>

            <ToWatchButton mediaData={props.modalData as seriesInterface | movieInterface} customStyles={styles}/>
          </div>
        ) : null}
      </header>
    );
  } else if (props.dataType === "actor" && "gender" in props.modalData) {
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
      <header className={styles["people-info__header"]}>
        <h1 className={styles["header__name"]}>{props.modalData.name}</h1>
        <p className={styles["header__gender"]}>{`Gender - ${actorsGender}`}</p>
      </header>
    );
  } else {
    return <h1 style={{ color: "white" }}>SOMETHING WENT WRONG</h1>;
  }
};

export default DetailsHeader;

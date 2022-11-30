import React from "react";
import styles from "./styles/PersonalInfo.module.scss";
import Image from "next/image";
import { actorInterface } from "../../../../utils/types";

const PersonalInfo: React.FC<{ personDetails: actorInterface }> = (props) => {


  return (
    <div className={styles["personal-info"]}>
      <header className={styles["info__header"]}>
        <h2>Personal Details</h2>
      </header>
      <div className={styles["info__content"]}>
        <div className={styles["content__info"]}>
          <span>Birthday: </span>
          <span className={styles["status"]}>
            {props.personDetails.birthday || "Unknown"}
          </span>
        </div>
        {props.personDetails.deathday ? (<div className={styles["content__info"]}>
          <span>Date of Death: </span>
          <span className={styles["status"]}>
            {props.personDetails.deathday}
          </span>
        </div>): null}
        <div className={styles["content__info"]}>
          <span>Place of Birth: </span>
          <span className={styles["status"]}>
            {props.personDetails.place_of_birth || "Unknown"}
          </span>
        </div>
        </div>
      </div>
  );
};

export default PersonalInfo;

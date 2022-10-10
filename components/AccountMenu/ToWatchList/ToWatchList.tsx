import React from "react";
import styles from "../styles/ToWatchList.module.scss";
import Image from "next/image";
import RatingIcon from "../../Icons/RatingIcon";
import ToWatchCard from "./ToWatchCard";



const ToWatchList: React.FC<{ movieData: any }> = (props) => {
  return (
    <main className={styles["towatch-section"]}>
      <header className={styles["header"]}>
        <p className={styles["header__text"]}>Movies you want to see:</p>
      </header>
      <div className={styles["section__content"]}>
        <div className={styles["media__list"]}>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
          <ToWatchCard movieData={props.movieData}/>
        </div>
      </div>
    </main>
  );
};

export default ToWatchList;

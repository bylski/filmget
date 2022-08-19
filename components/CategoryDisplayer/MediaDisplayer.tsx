import axios from "axios";
import React from "react";
import styles from "./styles/MediaDisplayer.module.scss";

const mediaCard = (
  <div className={styles["media__card"]}>
    <div className={styles["media__img-container"]}>
      <img
        className={styles["media__img"]}
        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cvJ13HfBb6PXEzhpuMcAdUjuQq1.jpg"
      />
    </div>
    <div className={styles["media__info"]}>
      <p className={styles["media__info-title"]}>Stranger Things 3</p>
    </div>
  </div>
);

const MediaDisplayer: React.FC<{mediaType: string}> = (props) => {


  return (
    <section className={styles["media-displayer"]}>
      <main className={styles["media-displayer__card"]}>
        <header className={styles["media-displayer__header"]}>
          <p className={styles["media-displayer__header-text"]}>
            {`Trending ${props.mediaType}`} 
          </p>
        </header>
        <main className={styles["media-displayer__content"]}>
        <div className={styles["media__card"]}>
    <div className={styles["media__img-container"]}>
      <img
        className={styles["media__img"]}
        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cvJ13HfBb6PXEzhpuMcAdUjuQq1.jpg"
      />
    </div>
    <div className={styles["media__info"]}>
      <p className={styles["media__info-title"]}>Stranger Things 3</p>
    </div>
  </div>
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
          {mediaCard}
        </main>
      </main>
    </section>
  );
};

export default MediaDisplayer;

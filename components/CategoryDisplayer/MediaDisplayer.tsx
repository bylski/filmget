import React from "react";
import styles from "./styles/MediaDisplayer.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import Switcher from "../UI/Switcher";

const mediaCard = (
  <div className={styles["media__card"]}>
    <div className={styles["media__img-container"]}>
      <img
        className={styles["media__img"]}
        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cvJ13HfBb6PXEzhpuMcAdUjuQq1.jpg"
      />
    </div>
    <div className={styles["media__info"]}>
      <div className={styles["media__rating-container"]}>
        <RatingIcon className={styles["media__rating-icon"]}></RatingIcon>
        <p className={styles["media__rating-average"]}>6.5</p>
      </div>
      <p className={styles["media__title"]}>Stranger Things 3</p>
    </div>
  </div>
);

const MediaDisplayer: React.FC<{ mediaType: string }> = (props) => {
  return (
    <section className={styles["media-displayer"]}>
      <main className={styles["media-displayer__card"]}>
        <header className={styles["media-displayer__header"]}>
          <p className={styles["media-displayer__header-text"]}></p>
          <Switcher switches={[{switchName: "Trending"}, {switchName: "Upcoming"}, {switchName: "Top Rated"}]}/>
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

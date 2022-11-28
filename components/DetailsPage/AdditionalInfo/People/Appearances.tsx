import React from "react";
import styles from "./styles/Appearances.module.scss";
import Image from "next/image";
import Link from "next/link";


type Appearances = {
    backdrop_path: string;
    poster_path: string;
    title: string;
    name: string;
    id: number;
    media_type: string;
  }[];


const Appearances: React.FC<{appearances: Appearances}> = (
  props
) => {
  const { appearances } = props;
  let appearancesToDisplay;
  if (appearances) {
  appearancesToDisplay = appearances.map(
    (appearance: typeof appearances[0], i: number) => {
      return (
        <div className={styles["appearance-card"]} key={`appearance${i}`}>
          <Link href={"title" in appearance ? `/details/movie/${appearance.id}` : `/details/series/${appearance.id}`}>
          <div className={styles["appearance-card__img-container"]}>
            <Image
              layout="fill"
              src={
                appearance.poster_path !== null
                  ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${appearance.poster_path}`
                  : "/noImg.png"
              }
            ></Image>
          </div>
          </Link>
          <a href={"title" in appearance ? `/details/movie/${appearance.id}` : `/details/series/${appearance.id}`}>{appearance.name || appearance.title}</a>
        </div>
      );
    }
  );
  }

  const appearancesFallback = (
    <span className={styles["fallback-text"]}>No appearances to display.</span>
  )


  return (
    <div className={styles["appearances"]}>
      <header className={styles["appearance__header"]}>
        <h2>Appearances</h2>
      </header>
      <main className={styles["appearance__content"]}>
        {appearances ? appearancesToDisplay : appearancesFallback}
      </main>
    </div>
  );
};

export default Appearances;

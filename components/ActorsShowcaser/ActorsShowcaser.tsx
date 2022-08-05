import React from "react";
import Image from "next/image";
import styles from "./styles/ActorsShowcaser.module.scss";

const DUMMY_ACTORS = [
  {
    img: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg",
    name: "Tom Holland"
  },
  {
    img: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ilPBHd3r3ahlipNQtjr4E3G04jJ.jpg",
    name: "Johnny Depp"
  },
  {
    img: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2//egh1eOHuYgeoqdlLQgaXMl6cPOm.jpg",
    name: "Tom Holland"
  },
  {
    img: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/8dCFK8FDFQbYFZvzAE9IIeaDMKo.jpg",
    name: "Tom Holland"
  },
  {
    img: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg",
    name: "Tom Holland"
  },
  {
    img: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ilPBHd3r3ahlipNQtjr4E3G04jJ.jpg",
    name: "Johnny Depp"
  },
];

const actors = DUMMY_ACTORS.map((actor, i) => (
  <div className={styles["actors__img-container"]} key={"a" + i}>
    <Image
      width="300"
      height="450"
      className={styles["actors__img"]}
      src={actor.img}
    />
    <div className={styles["actor__info"]}>
        <p className={styles["actor__fullname"]}>{actor.name}</p>
    </div>
  </div>
));

const ActorsShowcaser: React.FC<{ headerText?: string }> = (props) => {
  return (
    <section className={styles["showcaser__container"]}>
      <header className={styles["showcaser__header"]}>
        <p className={styles["header-text"]}>{props.headerText}</p>
      </header>
      <div className={styles["actors__container"]}>{actors}</div>
    </section>
  );
};

export default ActorsShowcaser;

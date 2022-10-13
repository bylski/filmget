import React from "react";
import { useState } from "react";
import styles from "./styles/ActorsShowcaser.module.scss";
import ActorCard from "./ActorCard";
import { motion } from "framer-motion";
import { showcaserVariants } from "../../utils/AnimationVariants.ts";

const ActorsShowcaser: React.FC<{ headerText?: string; actorsData: any[] }> = (
  props
) => {
  const backdropChangeImg = (path: string) => {
    setBackdropPath(path);
  };

  const backdropPaths: string[] = [];
  let addCard = 0;
  const actors = props.actorsData
    .map((actorData: any, i: number) => {
      // Filter out adult movies actors
      if (actorData.name !== "Seung Ha" && actorData.name !== "Min Do-yoon") {
      backdropPaths.push(actorData.known_for[0].backdrop_path);
      return (
        <ActorCard
          key={actorData.id}
          actorData={actorData}
          onHover={backdropChangeImg}
        />
      );} else {
        addCard += 1;
        return null}
        ;
    })
    // Make up for deleted adult actors with "addCard"
    .slice(0, 6 + addCard);

  const actorsBackdropPaths: string[] = backdropPaths.slice(0, 6);
  const [backdropPath, setBackdropPath] = useState(actorsBackdropPaths[0]);
  const backdropImages = actorsBackdropPaths.map((path, i) => {
    if (path === null || path === undefined) {
      return null;
    }
    return (
      <motion.img
        key={"i" + i}
        variants={showcaserVariants}
        initial="hidden"
        animate={backdropPath === path ? "active" : "hidden"}
        className={styles["showcaser__backdrop"]}
        src={`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${path}`}
      />
    );
  });

  return (
    <section className={styles["showcaser__wrapper"]}>
      {backdropImages}
      <div className={styles["showcaser__container"]}>
        <header className={styles["showcaser__header"]}>
          <p className={styles["header-text"]}>{props.headerText}</p>
        </header>
        <div className={styles["actors__container"]}>{actors}</div>
      </div>
    </section>
  );
};

export default ActorsShowcaser;

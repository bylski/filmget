import React from "react";
import { useState } from "react";
import styles from "./styles/ActorsShowcaser.module.scss";
import ActorCard from "./ActorCard";
import { motion } from "framer-motion";
import { showcaserVariants } from "../../utils/AnimationVariants.ts";
import { actorInterface } from "../../utils/types";

const ActorsShowcaser: React.FC<{ headerText?: string; actorsData: any[] }> = (
  props
) => {
  const backdropChangeImg = (path: string) => {
    setBackdropPath(path);
  };

  const backdropPaths: string[] = [];
  let addCard = 0;
  const actors = props.actorsData.map(
    (actorData: actorInterface, i: number) => {
      // Filter out adult movies actors
      const { name: actorName, known_for } = actorData;
      const censorConditions =
        actorName === "Angeli Khang" ||
        actorName === "Jo Tae-ho" ||
        actorName === "Seung Ha" ||
        actorName === "Min Do-yoon";
      if (backdropPaths.length < 6 && !censorConditions) {
        backdropPaths.push(known_for[0].backdrop_path);
        return (
          <ActorCard
            key={actorData.id}
            actorData={actorData}
            onHover={backdropChangeImg}
          />
        );
      } else {
        return null;
      }
    }
  );
  // Make up for deleted adult actors with "addCard"

  const actorsBackdropPaths: string[] = backdropPaths;
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

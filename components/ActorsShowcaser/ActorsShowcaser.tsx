import React from "react";
import { useState } from "react";
import styles from "./styles/ActorsShowcaser.module.scss";
import ActorCard from "./ActorCard";
import { motion } from "framer-motion";


const showcaserVariants = {
  hidden: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  }
}


const ActorsShowcaser: React.FC<{ headerText?: string; actorsData: any[] }> = (
  props
) => {

  const backdropChangeImg = (path:string) => {
    setBackdropPath(path);
  }

  const backdropPaths: string[] = [];
  const actors = props.actorsData
    .map((actor: any, i: number) => {
      backdropPaths.push(actor.known_for[0].backdrop_path);
      return (
        <ActorCard
          name={actor.name}
          id={actor.id}
          key={actor.id}
          profilePath={actor.profile_path}
          knownFor={actor.known_for}
          onHover={backdropChangeImg}
        />
      );
    })
    .slice(0, 6);

  const actorsBackdropPaths: string[] = backdropPaths.slice(0, 6);

  const [backdropPath, setBackdropPath] = useState(actorsBackdropPaths[0])

  const backdropImages = actorsBackdropPaths.map((path, i) => (
    <motion.img 
      key={"i" + i}
      variants={showcaserVariants}
      initial="hidden"
      animate={backdropPath === path ? "active" : "hidden"}
      className={styles["showcaser__backdrop"]}
      src={`https://image.tmdb.org/t/p/w1920_and_h1080_bestv2/${path}`}
    />
  ));


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

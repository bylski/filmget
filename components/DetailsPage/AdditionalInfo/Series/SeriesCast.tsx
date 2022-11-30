import React from "react";
import { castInterface } from "../../../../utils/types";
import styles from "./styles/SeriesCast.module.scss";
import Image from "next/image";
import Link from "next/link";

const SeriesCast: React.FC<{ castDetails: castInterface }> = (props) => {
    
  const cast = props.castDetails.cast;
  let castToRender;
  if (cast) {
  castToRender = cast.slice(0, 6).map((actor: typeof cast[0], i: number) => {
    return (
      <div className={styles["cast-card"]} key={`castPerson${i}`}>
        <Link href={`/details/people/${actor.id}`}>
        <div className={styles["card__img"]}>
          <a style={{width: "100%", height: "100%"}}></a>
          <Image
            layout="fill"
            src={
              actor.profile_path !== null
                ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`
                : "/noImg.png"
            }
          ></Image>
        </div>
        </Link>
        <Link href={`/details/people/${actor.id}`}>
          <a className={styles["name"]}>{actor.name}</a>
        </Link>
        <span className={styles["character"]}>{`${actor.character}`}</span>
      </div>
    );
  });
  }

  const castFallback = (
    <span className={styles["cast-fallback"]}>No cast do display.</span>
  )

  return (
    <div className={styles["series-cast"]}>
      <header className={styles["header"]}>
        <h2>Series&apos; Cast</h2>
      </header>
      <main className={styles["cast"]}>{cast && cast.length !== 0 ? castToRender : castFallback}</main>
    </div>
  );
};

export default SeriesCast;

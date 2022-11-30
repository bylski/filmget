import React from "react";
import { castInterface } from "../../../../utils/types";
import styles from "./styles/MovieCast.module.scss";
import Image from "next/image";
import Link from "next/link";

const MovieCast: React.FC<{ castDetails?: castInterface | null }> = (props) => {
  let castToRender;
  if (props.castDetails) {
    const cast = props.castDetails.cast;
    castToRender = cast.slice(0, 6).map((actor: typeof cast[0], i: number) => {
      return (
        <div className={styles["cast-card"]} key={`castPerson${i}`}>
          <Link href={`/details/people/${actor.id}`}>
            <div className={styles["card__img"]}>
              <a style={{ width: "100%", height: "100%" }}></a>
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
    <span className={styles["fallback-text"]}>No cast to display.</span>
  );


  return (
    <div className={styles["movie-cast"]}>
      <header className={styles["header"]}>
        <h2>Movie&apos;s Cast</h2>
      </header>
      <main className={styles["cast"]}>
        {props.castDetails?.cast && props.castDetails?.cast.length !== 0
          ? castToRender
          : castFallback}
      </main>
    </div>
  );
};

export default MovieCast;

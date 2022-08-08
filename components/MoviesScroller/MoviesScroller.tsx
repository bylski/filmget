import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/MoviesScroller.module.scss";
import MovieCard from "./MovieCard";
import { useScroll, motion } from "framer-motion";

const MoviesScroller: React.FC<{ headerText: string; moviesData: any[], genresList: {id: number, name: string}[] }> = (
  props
) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const movies = props.moviesData.map((movie) => (
    <MovieCard
      key={movie.id}
      movieData={movie}
      genresList={props.genresList}
    />
  ));

  const scrollerRef = useRef(null);
  const { scrollX } = useScroll({
    container: scrollerRef,
  });
  useEffect(() => {
    return scrollX.onChange((latest) => {
      if (latest > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  return (
    <section className={styles["scroller__container"]}>
      <header className={styles["scroller__header"]}>
        <p className={styles["scroller__header-text"]}>{props.headerText}</p>
      </header>
      <motion.div ref={scrollerRef} className={styles["movies__container"]}>
        {movies}
        <motion.div
          animate={isScrolled ? {display: "none", transition: {delay: 1}} : {}}   // if scrolled - change element's display to hddien 
          className={                                                             // after 1 sec
            !isScrolled // if scrolled hide shadow element by decreasing opacity
              ? styles["movies__margin-shadow"]
              : `${styles["movies__margin-shadow"]} ${styles["movies__margin-shadow--hide"]}`
          }
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default MoviesScroller;

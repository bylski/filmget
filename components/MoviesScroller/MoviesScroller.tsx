import React from "react";
import styles from "./styles/MoviesScroller.module.scss";
import MovieCard from "./MovieCard";

const DUMMY_MOVIES = [
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9pCoqX24a6rE981fY1O3PmhiwrB.jpg",
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4zsihgkxMZ7MrflNCjkD3ySFJtc.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4KJ3eUijnIv3wQ7cO4sOwwAhI31.jpg"
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1xeiUxShzNn8TNdMqy3Hvo9o2R.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg"
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9pCoqX24a6rE981fY1O3PmhiwrB.jpg",
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4zsihgkxMZ7MrflNCjkD3ySFJtc.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4KJ3eUijnIv3wQ7cO4sOwwAhI31.jpg"
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1xeiUxShzNn8TNdMqy3Hvo9o2R.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg"
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9pCoqX24a6rE981fY1O3PmhiwrB.jpg",
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4zsihgkxMZ7MrflNCjkD3ySFJtc.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4KJ3eUijnIv3wQ7cO4sOwwAhI31.jpg"
    },
    {
      img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1xeiUxShzNn8TNdMqy3Hvo9o2R.jpg",
      img2: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg"
    },
  
  ];
  
  const movies1 = DUMMY_MOVIES.map((movie, i) => (
    <MovieCard key={"e" + i} imgSrc={movie.img}/>
  ));
  
  const movies2 = DUMMY_MOVIES.map((movie, i) => (
    <MovieCard key={"k" + i} imgSrc={movie.img2}/>
  ));
  

const MoviesScroller: React.FC<{ headerText: string, movies: boolean }> = (props) => {
  return (
    <section className={styles["scroller__container"]}>
      <header className={styles["scroller__header"]}>
        <p className={styles["scroller__header-text"]}>{props.headerText}</p>
      </header>
      <div className={styles["movies__container"]}>{props.movies ? movies1 : movies2}</div>
    </section>
  );
};

export default MoviesScroller;

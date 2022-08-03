import React from "react";
import styles from "../styles/pages/home.module.scss";

const Home: React.FC = () => {
  return (
    <header className={styles["header"]}>
      <section className={styles["header__img"]}></section>
      <section className={styles["header__content"]}>
        <div className={styles["header__text-container"]}>
          <p className={styles["header__text"]}>
            <span>Welcome.</span><br/>Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
        <div className={styles["main-search__container"]}>
          <input className={styles["main-search__input"]} type="text"></input>
          <button className={styles["main-search__button"]}>Search</button>
        </div>
      </section>
    </header>
  );
};

export default Home;

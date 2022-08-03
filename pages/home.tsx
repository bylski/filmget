import React from "react";
import styles from "../styles/pages/home.module.scss";
import SearchInput from "../components/UI/SearchInput";

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
        <SearchInput placeholder="Search for movies and tv series..."/>
      </section>
    </header>
  );
};

export default Home;

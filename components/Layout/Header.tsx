import React from "react";
import SearchInput from "../UI/SearchInput";
import styles from "./styles/Header.module.scss"

const Header:React.FC = () => {
  return (
    <header className={styles["header"]}>
      <section className={styles["header__img"]}>
        <div className={styles["header__content-wrapper"]}>
          <div className={styles["header__content"]}>
            <div className={styles["header__content-container"]}>
              <div className={styles["header__text-container"]}>
                <p className={styles["header__text"]}>
                  <span>Welcome.</span>
                  <br />
                  Millions of movies, TV shows and people to discover. Explore
                  now.
                </p>
              </div>
              <SearchInput placeholder="Search for movies and tv shows..." />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;

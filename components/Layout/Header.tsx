import React from "react";
import SearchInput from "../UI/SearchInput";
import styles from "./styles/Header.module.scss";
import { useMemo } from "react";

const Header: React.FC<{ backdropPaths: string[] }> = (props) => {

  const createRandomPath = (): string => {
    const randomArrIndex = Math.floor(Math.random() * props.backdropPaths.length);
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${props.backdropPaths[randomArrIndex]}`;
  }

  const randomPath = useMemo(() => createRandomPath(), [createRandomPath])

  return (
    <header className={styles["header"]}>
      <section className={styles["header__img-container"]}>
        <img src={randomPath} className={styles["header-img"]}></img>
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
              <SearchInput placeholder="Search for movies, tv shows and people..." />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;

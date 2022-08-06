import React from "react";
import SearchInput from "../UI/SearchInput";
import styles from "./styles/Header.module.scss";

const Header: React.FC = () => {
  const DUMMY_IMAGES = [
    {
      img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg",
    },
    {
      img: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg",
    },
    {
      img: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yQTQL9pliY6vpRt8HkjUJrKymBb.jpg",
    },
  ];

  const randomArrIndex = Math.floor(Math.random() * DUMMY_IMAGES.length);
  const srcImg = DUMMY_IMAGES[randomArrIndex].img;

  return (
    <header className={styles["header"]}>
      <section className={styles["header__img-container"]}>
        <img src={srcImg} className={styles["header-img"]}></img>
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

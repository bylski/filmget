import React, { useEffect, useState } from "react";
import SearchInput from "../UI/SearchInput";
import styles from "./styles/Header.module.scss";
import Image from "next/image";

const Header: React.FC<{
  backdropPaths: string[];
  mobileBackdropPaths: string[];
  isMobileView: boolean;
}> = (props) => {
  const createRandomPath = (): string => {
    let randomArrIndex = 0;
    do {
      randomArrIndex = Math.floor(Math.random() * props.backdropPaths.length);
    } while (props.mobileBackdropPaths[randomArrIndex] === null);
    if (props.isMobileView) {
      return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mobileBackdropPaths[randomArrIndex]}`;
    }
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${props.backdropPaths[randomArrIndex]}`;
  };

  const [headerImgPath, setHeaderImgPath] = useState("");
  // let randomPath = useMemo(() => createRandomPath(), [props.isMobileView]);
  useEffect(() => {
    setHeaderImgPath(createRandomPath);
  }, [props.isMobileView]);

  return (
    <header className={styles["header"]}>
      <section className={styles["header__img-container"]}>
        <Image
          placeholder={"blur"}
          blurDataURL={
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqgcAALkAm/1TptUAAAAASUVORK5CYII="
          }
          layout="fill"
          src={headerImgPath}
          className={styles["header-img"]}
        ></Image>
        <div className={styles["header__content-wrapper"]}>
          <div className={styles["header__content"]}>
            <div className={styles["header__content-container"]}>
              <div className={styles["header__text-container"]}>
                <div className={styles["header__text"]}>
                  <span>Welcome.</span>
                  <br />
                  <p>
                    {" "}
                    Millions of movies, TV shows and people to discover. Explore
                    now.
                  </p>
                </div>
              </div>
              <SearchInput
                placeholder="Search for movies, tv shows and people..."
                searchIcon={props.isMobileView}
                searchIconClass={styles["main-search__icon"]}
                customClasses={{
                  formClass: styles["main-search__form"],
                  inputClass: styles["main-search__input"],
                  buttonClass: styles["main-search__button"],
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;

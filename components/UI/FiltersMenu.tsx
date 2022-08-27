import React, { Fragment, useState, useRef, useEffect } from "react";
import FiltersIcon from "../Icons/FiltersIcon";
import styles from "./styles/FiltersMenu.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { filtersMenuVariants } from "../../utils/AnimationVariants.ts";

const FiltersMenu: React.FC = (props) => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const menuClickHandler = () => {
    setIsMenuShown((prev) => {
      if (prev === false) {
        return true;
      } else {
        return false;
      }
    });
  };


  function OutsideClickDetector(divRef: React.RefObject<HTMLDivElement>, btnRef: React.RefObject<HTMLButtonElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (divRef.current && !divRef.current.contains(event.target) && btnRef.current && event.target !== btnRef.current) {
          console.log(event.target, btnRef.current)
          setIsMenuShown(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [divRef]);
  }

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  OutsideClickDetector(wrapperRef, buttonRef);

  return (
    <div className={styles["filters-menu"]}>
      <motion.div
        variants={filtersMenuVariants}
        initial="hide"
        animate={isMenuShown ? "show" : "hide"}
        className={styles["filters-menu__inside-wrapper"]}
      >
        <button
          onClick={menuClickHandler}
          className={styles["filters-menu__btn"]}
          ref={buttonRef}
        >
          <FiltersIcon
            className={styles["filters-menu__icon"]}
            className2={styles["test"]}
          />
        </button>
        <AnimatePresence>
          {isMenuShown ? (
            <motion.div
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles["filters"]}
              ref={wrapperRef}
            >
              <header className={styles["filters__header"]}>
                <h1 className={styles["filters__header-text"]}>Filter Media</h1>
              </header>
              <main className={styles["filters__filters"]}>
                <section className={styles["filter-byrating"]}>
                  <div className={styles["filter-byrating__header"]}>
                    <h2 className={styles["filter-byrating__header-text"]}>
                      Rating
                    </h2>
                  </div>
                  <div className={styles["filter-byrating__inputs"]}>
                    <label className={styles["filter-byrating__label"]}>
                      From:
                    </label>
                    <input
                      className={styles["filter-byrating__input"]}
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="0.0"
                    ></input>
                    <label className={styles["filter-byrating__label"]}>
                      To:
                    </label>
                    <input
                      className={styles["filter-byrating__input"]}
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="10.0"
                    ></input>
                  </div>
                </section>
                <section className={styles["filter-bygenre"]}>
                  <div className={styles["filter-bygenre__header"]}>
                    <h2 className={styles["filter-bygenre__header-text"]}>
                      Genres
                    </h2>
                  </div>
                  <ul className={styles["filter-bygenre__genres"]}>
                    <li className={styles["filter-bygenre__genre"]}>Comedy</li>
                    <li className={styles["filter-bygenre__genre"]}>Action</li>
                    <li className={styles["filter-bygenre__genre"]}>Drama</li>
                    <li className={styles["filter-bygenre__genre"]}>
                      Animation
                    </li>
                    <li className={styles["filter-bygenre__genre"]}>
                      Thriller
                    </li>
                    <li className={styles["filter-bygenre__genre"]}>Horror</li>
                    <li className={styles["filter-bygenre__genre"]}>Western</li>
                    <li className={styles["filter-bygenre__genre"]}>
                      Adventure
                    </li>
                    <li className={styles["filter-bygenre__genre"]}>
                      Science Fiction
                    </li>
                  </ul>
                </section>
              </main>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FiltersMenu;

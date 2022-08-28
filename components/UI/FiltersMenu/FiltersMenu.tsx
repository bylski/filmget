import React, { Fragment, useState, useRef, useEffect } from "react";
import FiltersIcon from "../../Icons/FiltersIcon";
import styles from "../styles/FiltersMenu/FiltersMenu.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { filtersMenuVariants } from "../../../utils/AnimationVariants.ts";
import { outsideClickDetector } from "../../../utils/scripts";
import GenreFilters from "./GenreFilters";
import RatingFilter from "./RatingFilter";

const FiltersMenu: React.FC<{
  genresList: { name: string; id: number }[] | null;
}> = (props) => {
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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  outsideClickDetector(wrapperRef, buttonRef, () => {
    setIsMenuShown(false);
  });

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
            trackClasses={{
              track1Class: styles["filters-menu__icon-track1"],
              track2Class: styles["filters-menu__icon-track2"],
              track3Class: styles["filters-menu__icon-track3"],
            }}
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
                <RatingFilter />
                <GenreFilters genresList={props.genresList} />
              </main>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FiltersMenu;

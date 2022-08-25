import React from "react";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import styles from "../styles/SortBy.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { sortbyItemsVariants, sortbyVariants } from "../../../utils/AnimationVariants.ts";


const SortBy: React.FC = () => {
  const [sorterIsOpen, setSorterIsOpen] = useState(false);
  const sorterClickedHandler = () => {
    setSorterIsOpen((prev) => !prev);
  };

  return (
    <AnimatePresence>
      <div className={styles["sortby"]}>
        <p className={styles["sortby__header-text"]}>Sort by:</p>
        <div className={styles["sortby__sorter-wrapper"]}>
          <motion.div
            variants={sortbyVariants}
            initial="closed"
            className={
              sorterIsOpen
                ? `${styles["sortby__sorter"]} ${styles["sortby__sorter--active"]}`
                : styles["sortby__sorter"]
            }
            animate={sorterIsOpen ? "open" : "closed"}
          >
            <button
              onClick={sorterClickedHandler}
              className={styles["sortby__selected"]}
              onBlur={() => {setSorterIsOpen(false)}}
            >
              <span className={styles["sortby__sortedby-text"]}>
                Score - Highest
              </span>
              <ArrowDownIcon className={styles["sortby__arrow-icon"]} />
            </button>
            <motion.ul
              variants={sortbyItemsVariants}
              className={styles["sortby__items"]}
            >
              <motion.li
                className={`${styles["sortby__item"]} ${styles["active"]}`}
              >
                Score - Highest
              </motion.li>
              <motion.li className={styles["sortby__item"]}>
                Name: A-Z
              </motion.li>
              <motion.li className={styles["sortby__item"]}>
                Name: Z-A
              </motion.li>
              <motion.li className={styles["sortby__item"]}>
                Popularity:
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SortBy;

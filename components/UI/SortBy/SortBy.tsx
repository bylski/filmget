import React, { useEffect } from "react";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import styles from "../styles/SortBy.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  sortbyItemsVariants,
  sortbyVariants,
} from "../../../utils/AnimationVariants.ts";
import SortByItem from "./SortByItem";
import { sortInterface } from "../../../utils/types";

const SortBy: React.FC<{
  sortItems: sortInterface[];
  onFetchSort: (selectedSort: sortInterface) => void;
}> = (props) => {
  const [sorterIsOpen, setSorterIsOpen] = useState(false);
  const sorterClickedHandler = () => {
    setSorterIsOpen((prev) => !prev);
  };

  const [selectedSort, setSelectedSort] = useState(props.sortItems[0]);

  const selectSortHandler = (sortData: sortInterface): void => {
    setSelectedSort(sortData);
  };

  // Pass current sort option up the component tree
  useEffect(() => {
    props.onFetchSort(selectedSort);
  }, [props.onFetchSort, selectedSort]);

  let allSortOptions = null;
  if (props.sortItems.length !== 0) {
    allSortOptions = props.sortItems.map((sort, i) => {
      return (
        <SortByItem
          key={`sort${i}`}
          onSelectSort={selectSortHandler}
          selectedSort={selectedSort}
          sortData={sort}
        />
      );
    });
  }

  return (
    <AnimatePresence>
      <div className={styles["sortby"]}>
        <p className={styles["sortby__header-text"]}>Sort by:</p>
        <div className={styles["sortby__sorter-wrapper"]}>
          <motion.div
            variants={sortbyVariants}
            onBlur={() => {
              setSorterIsOpen(false);
            }}
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
            >
              <span className={styles["sortby__sortedby-text"]}>
                {selectedSort.sortName}
              </span>
              <ArrowDownIcon className={styles["sortby__arrow-icon"]} />
            </button>
            <motion.ul
              variants={sortbyItemsVariants}
              className={styles["sortby__items"]}
            >
              {allSortOptions}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SortBy;

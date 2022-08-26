import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/SortBy.module.scss";
import { sortInterface } from "../../../utils/types";

const SortByItem: React.FC<{ sortData: sortInterface; selectedSort: sortInterface, onSelectSort: (sortData: sortInterface) => void }> = (
  props
) => {
  let classes = styles["sortby__item"];
  if (props.sortData.sortName === props.selectedSort.sortName) {
    classes = `${styles["sortby__item"]} ${styles["active"]}`;
  }

  const sortClickedHandler = () => {
    props.onSelectSort(props.sortData);
  }

  return <motion.li onMouseDown={sortClickedHandler} className={classes}>{props.sortData.sortName}</motion.li>;
};

export default SortByItem;

import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import styles from "../styles/SearchFilters.module.scss";

const FilterOption: React.FC<{
  optionName: string;
  resultsFound: number;
  changeFilterFunction: (option: string) => void;
  currentFilter: string;
}> = (props) => {


  const filterClickHandler = () => {
    props.changeFilterFunction(props.optionName)
  }

  let filterClass = styles["filters__option"];
  let spanClass = styles["filters__option-results-num"] 
  if (props.currentFilter.toUpperCase() === props.optionName.toUpperCase()) {
    filterClass = `${styles["filters__option"]} ${styles["active"]}`
    spanClass = `${styles["filters__option-results-num"] } ${styles["active"]}`
  }

  return (
    <li className={filterClass} onClick={filterClickHandler}>
      <p className={styles["filters__option-text"]}>{props.optionName}</p>
      <span className={spanClass}>{props.resultsFound}</span>
    </li>
  );
};

export default FilterOption;

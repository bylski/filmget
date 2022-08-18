import React from "react";
import styles from "../styles/SearchFilters.module.scss";
import FilterOption from "./FilterOption";
import { useState } from "react";

const SearchFilters: React.FC<{
  resultsFound: { movies: number; tv: number; people: number };
  changeFilterFunction: (option: string) => void;
  currentFilter: string;
}> = (props) => {
  return (
    <section className={styles["filters__container"]}>
      <header className={styles["filters__header"]}>
        <p className={styles["filters__header-text"]}>Search Results</p>
      </header>
      <main className={styles["filters__main"]}>
        <ul className={styles["filters__options-container"]}>
          <FilterOption
            optionName="Movies"
            currentFilter={props.currentFilter}
            resultsFound={props.resultsFound.movies}
            changeFilterFunction={props.changeFilterFunction}
          />
          <FilterOption
            optionName="TV Shows"
            currentFilter={props.currentFilter}
            resultsFound={props.resultsFound.tv}
            changeFilterFunction={props.changeFilterFunction}
          />
          <FilterOption
            optionName="People"
            currentFilter={props.currentFilter}
            resultsFound={props.resultsFound.people}
            changeFilterFunction={props.changeFilterFunction}
          />
        </ul>
      </main>
    </section>
  );
};

export default SearchFilters;

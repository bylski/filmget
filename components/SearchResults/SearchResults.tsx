import React from "react";
import styles from "./styles/SearchResults.module.scss";
import { useRouter } from "next/router";
import SearchFilters from "./SearchFilters";
import RatingIcon from "../Icons/RatingIcon";
import ResultCard from "./ResultCard";

const SearchResults: React.FC = (props) => {
  const router = useRouter();
  return (
    <section className={styles["search-results"]}>
      <header></header>
      <main className={styles["search-results__card"]}>
        <SearchFilters />
        <section className={styles["results__container"]}>
        <ResultCard/>
        <ResultCard/>
        <ResultCard/>
        <ResultCard/>
        <ResultCard/>
        </section>
      </main>
    </section>
  );
};

export default SearchResults;

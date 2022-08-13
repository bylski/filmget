import React from "react";
import styles from "./styles/SearchResults.module.scss";
import { useRouter } from "next/router";

const SearchResults: React.FC = (props) => {
  const router = useRouter();
  return (
    <section className={styles["search-results__container"]}>
      <header></header>
      <main className={styles["results__card"]}>
        <section className={styles["filters__container"]}>
      
        </section>
        <section className={styles["results__container"]}>

        </section>
      </main>
    </section>
  );
};

export default SearchResults;

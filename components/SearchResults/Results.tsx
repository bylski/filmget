import React from "react";
import styles from "./styles/Results.module.scss";
import ResultCard from "./ResultCard/ResultCard";
import SearchFilters from "./SearchFilters/SearchFilters";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchResults from "./SearchResults";

const Results: React.FC<{ searchResults: any[] }> = (props) => {
  const router = useRouter();
  const resultsFound: { movies: number; tv: number; people: number } = {
    movies: 0,
    tv: 0,
    people: 0,
  };

  if (props.searchResults) {
  props.searchResults.forEach((result) => {
    // Search through results and filter data in 3 categories...
    switch (result.media_type) {
      case "movie":
        resultsFound.movies += 1; // Increase by 1 if matching type found
        break;
      case "person":
        resultsFound.people += 1;
        break;
      case "tv":
        resultsFound.tv += 1;
        break;
    }
  });
}

  const [selectedOption, setSelectedOption] = useState("Movies");
  const changeOptionHander = (option: string) => {
    setSelectedOption(option);
  };

  let results: JSX.Element[] = []
  if (props.searchResults) {
  results = props.searchResults
    .filter((result) => {
      if (
        result.media_type === "movie" &&
        selectedOption.toUpperCase() === "movies".toUpperCase()
      ) {
        return true;
      } else if (
        result.media_type === "tv" &&
        selectedOption.toUpperCase() === "tv shows".toUpperCase()
      ) {
        return true;
      } else if (
        result.media_type === "person" &&
        selectedOption.toUpperCase() === "people".toUpperCase()
      ) {
        return true;
      }
    })
    .map((result, i) => {
      return (
        <ResultCard
          key={"result" + i}
          index={i}
          resultType={result.media_type}
          resultData={result}
        />
      );
    });
  }

  if (results.length === 0) {
    return (
      <main className={styles["results__card-main"]}>
        <SearchFilters
          currentFilter={selectedOption}
          resultsFound={resultsFound}
          changeFilterFunction={changeOptionHander}
        />
        <section className={styles["results__container"]}>
          <div className={styles["no-results__container"]}>
            <h1 className={styles["no-results__text"]}>No results for "{router.query.q}" in {selectedOption}</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles["results__card-main"]}>
      <SearchFilters
        currentFilter={selectedOption}
        resultsFound={resultsFound}
        changeFilterFunction={changeOptionHander}
      />
      <section className={styles["results__container"]}>{results}</section>
    </main>
  );
};

export default Results;

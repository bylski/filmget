import React from "react";
import styles from "./styles/SearchResults.module.scss";
import { useRouter } from "next/router";
import SearchInput from "../UI/SearchInput";
import Results from "./Results";
import useBreakpoints from "../../utils/hooks/useBreakpoints";
import SearchIcon from "../Icons/SearchIcon";

const SearchResults: React.FC<{searchResults: any[]}> = (props) => {
  const router = useRouter();

 const setBreakpoints =  useBreakpoints({breakpointName: "searchIcon", breakpointVal: 500})
 let showSearchIcon = false;
 if (setBreakpoints) {
  showSearchIcon = setBreakpoints[0].searchIcon;
 }

  return (
    <section className={styles["search-results"]}>
      <main className={styles["search-results__card"]}>
        <header className={styles["search-results__card-header"]}>
          <SearchInput
            customClasses={{
              formClass: styles["results-searchbar__form"],
              inputClass: styles["results-searchbar__input"],
              buttonClass: styles["results-searchbar__button"],
            }}
            initialVal={router.query.q?.toString()} 
            searchIcon={showSearchIcon}
            searchIconClass={styles["results-searchbar__icon"]}
          />
        </header>
            <Results searchResults={props.searchResults}/>
      </main>
    </section>
  );
};

export default SearchResults;

import React from "react"
import styles from "./styles/SearchFilters.module.scss"

const SearchFilters:React.FC = () => {
    return (
        <section className={styles["filters__container"]}>
          <header className={styles["filters__header"]}>
            <p className={styles["filters__header-text"]}>Search Results</p>
          </header>
          <main className={styles["filters__main"]}>
            <ul className={styles["filters__options-container"]}>
              <li className={styles["filters__option"]}>
                <p className={styles["filters__option-text"]}>Movies</p>
                <span className={styles["filters__option-results-num"]}>1</span>
              </li>
              <li className={styles["filters__option"]}>
                <p className={styles["filters__option-text"]}>TV Shows</p>
                <span className={styles["filters__option-results-num"]}>5</span>
              </li>
              <li className={styles["filters__option"]}>
                <p className={styles["filters__option-text"]}>People</p>
                <span className={styles["filters__option-results-num"]}>3</span>
              </li>
            </ul>
          </main>
        </section>
    )
}

export default SearchFilters;
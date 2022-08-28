import React from "react"
import styles from "../styles/FiltersMenu.module.scss";

const RatingFilter = () => {
    return (
        <section className={styles["filter-byrating"]}>
                  <div className={styles["filter-byrating__header"]}>
                    <h2 className={styles["filter-byrating__header-text"]}>
                      Rating
                    </h2>
                  </div>
                  <div className={styles["filter-byrating__inputs"]}>
                    <label className={styles["filter-byrating__label"]}>
                      From:
                    </label>
                    <input
                      className={styles["filter-byrating__input"]}
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="0.0"
                    ></input>
                    <label className={styles["filter-byrating__label"]}>
                      To:
                    </label>
                    <input
                      className={styles["filter-byrating__input"]}
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="10.0"
                    ></input>
                  </div>
                </section>
    )
}

export default RatingFilter;
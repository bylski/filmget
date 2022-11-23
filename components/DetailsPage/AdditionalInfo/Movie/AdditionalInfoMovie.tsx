import React from "react";
import { castInterface, movieInterface } from "../../../../utils/types";
import MovieCast from "./MovieCast";
import ProductionInfo from "./ProductionInfo";
import RevenueGraph from "./RevenueGraph";
import styles from "./styles/AdditionalInfoMovie.module.scss";

const AdditionalInfoMovie: React.FC<{ movieDetails: movieInterface, castDetails: castInterface }> = (
  props
) => {
  return (
    <section className={styles["details-page__additional-info"]}>
      <section className={styles["section__first-row"]}>
        <RevenueGraph
          budget={props.movieDetails.budget}
          revenue={props.movieDetails.revenue}
        />
      </section>
      <section className={styles["section__first-row"]}>
        <ProductionInfo movieDetails={props.movieDetails} />
      </section>
      <section className={styles["section__second-row"]}>
        <MovieCast castDetails={props.castDetails} />
      </section>
    </section>
  );
};

export default AdditionalInfoMovie;

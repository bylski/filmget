import React from "react";
import { castInterface, seriesInterface } from "../../../../utils/types";
import SeriesCast from "./SeriesCast";
import ProductionInfo from "./ProductionInfo";
// import RevenueGraph from "./RevenueGraph";
import styles from "./styles/AdditionalInfoSeries.module.scss";
import SeasonsDisplay from "./SeasonsDisplay";

const AdditionalInfoSeries: React.FC<{
  seriesDetails: seriesInterface;
  castDetails: castInterface;
}> = (props) => {
  return (
    <section className={styles["details-page__additional-info"]}>
      <section className={styles["section__first-row"]}>
        <SeasonsDisplay seriesDetails={props.seriesDetails}/>
      </section>
      <section className={styles["section__first-row"]}>
        <ProductionInfo movieDetails={props.seriesDetails} />
      </section>
      <section className={styles["section__second-row"]}>
        <SeriesCast castDetails={props.castDetails} />
      </section>
    </section>
  );
};

export default AdditionalInfoSeries;

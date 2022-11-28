import React from "react";
import { actorInterface } from "../../../../utils/types";
import Appearances from "./Appearances";
import PersonalInfo from "./PersonalInfo";
import styles from "./styles/AdditionalInfoPeople.module.scss";

const AdditionalInfoPeople: React.FC<{
  personDetails: actorInterface;
  additionalDetails: any;
}> = (props) => {

  return (
    <section className={styles["details-page__additional-info"]}>
      <section className={styles["section"]}>
        <Appearances appearances={props.additionalDetails?.known_for}/>
      </section>
      <section className={styles["section"]}>
        <PersonalInfo personDetails={props.personDetails}/>
      </section>
      {/* <section className={styles["section__second-row"]}>
        <SeriesCast castDetails={props.castDetails} />
      </section> */}
    </section>
  );
};

export default AdditionalInfoPeople;

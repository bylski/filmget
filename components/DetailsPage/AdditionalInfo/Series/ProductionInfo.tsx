import React from "react";
import { seriesInterface } from "../../../../utils/types";
import styles from "./styles/ProductionInfo.module.scss";
import Image from "next/image";

const ProductionInfo: React.FC<{ movieDetails: seriesInterface }> = (props) => {
  const productionCompanies = props.movieDetails.production_companies;
  let addIteration = 0;
  let companyLogos: (JSX.Element | null)[] = [];
  if (productionCompanies) {
    companyLogos = productionCompanies.map(
      (company: typeof productionCompanies[0], i) => {
        if (i < 3 + addIteration && company) {
          if (company.logo_path) {
            return (
              <div
                key={`companyLogo${i}`}
                className={styles["company-logo__container-wrapper"]}
              >
                <div className={styles["company-logo__container"]}>
                  <Image
                    className={styles["company-logo__img"]}
                    layout="fill"
                    title={company.name}
                    src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                  ></Image>
                </div>
              </div>
            );
          } else {
            addIteration++;
            return null;
          }
        } else return null;
      }
    );
  }

  return (
    <div className={styles["production-info"]}>
      <header className={styles["info__header"]}>
        <h2>Production Details</h2>
      </header>
      <div className={styles["info__content"]}>
        <div className={styles["content__info"]}>
          <span>Status: </span>
          <span className={styles["status"]}>
            {props.movieDetails.status || "Unknown"}
          </span>
        </div>
        <div className={styles["content__info"]}>
          <span>Production Country: </span>
          <span className={styles["status"]}>
            {props.movieDetails.production_countries[0]?.name || "Unknown"}
          </span>
        </div>
        <div className={styles["content__companies"]}>
          <span>Production Companies:</span>
          <div className={styles["companies"]}>
            {(companyLogos[0] !== null && companyLogos[0] !== undefined) ||
            (companyLogos[1] !== null && companyLogos[1] !== undefined) ||
            (companyLogos[2] !== null && companyLogos[2] !== undefined) ? (
              companyLogos
            ) : (
              <span className={styles["companies__fallback"]}>
                Not Available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionInfo;

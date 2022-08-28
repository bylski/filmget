import React, { ChangeEvent, useState } from "react";
import styles from "../styles/FiltersMenu/RatingFilter.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { hideOverflowIf } from "../../../utils/scripts";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import RatingIcon from "../../Icons/RatingIcon";

const RatingFilter = () => {
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);

  const sliderChangeHandler = (currentRange: any) => {

    if (currentRange[0] === currentRange[1]) {
      setRatingRange([currentRange[0], currentRange[0] + 0.9])
      return;
    }

    setRatingRange(currentRange);
  };

  return (
    <section className={styles["filter-byrating"]}>
      <div className={styles["filter-byrating__header"]}>
        <h2 className={styles["filter-byrating__header-text"]}>Rating:</h2>
        <div className={styles["filter-byrating__rating"]}>
        <RatingIcon className={styles["filter-byrating__rating-icon"]} />
          <span className={styles["filter-byrating__rating-range"]}>
            {`${ratingRange[0].toFixed(1)} -`}
          </span>
        </div>
        <div className={styles["filter-byrating__rating"]}>
        <RatingIcon className={styles["filter-byrating__rating-icon"]} />
          <span className={styles["filter-byrating__rating-range"]}>
            {ratingRange[1].toFixed(1)}
          </span>
        
        </div>
      </div>
      <div className={styles["filter-byrating__inputs"]}>
        <div className={styles["filter-byrating__input"]}>
          <Slider
            onChange={sliderChangeHandler}
            dots
            handleStyle={{
              backgroundColor: "#ff006e",
              borderColor: "#ff006e",
              opacity: 1,
            }}
            trackStyle={{ backgroundColor: "hsl(334, 50%, 40%)" }}
            railStyle={{ backgroundColor: "gray" }}
            dotStyle={{ backgroundColor: "white", borderColor: "white" }}
            activeDotStyle={{
              backgroundColor: "hsl(334, 100%, 45%)",
              borderColor: "hsl(334, 100%, 40%)",
            }}
            allowCross={false}
            defaultValue={[0.0, 10.0]}
            range
            min={0}
            max={10}
            step={1}
            marks={{ 0: "0", 5: "5", 10: "10" }}
          />
        </div>
      </div>
    </section>
  );
};

export default RatingFilter;

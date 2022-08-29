import React, { ChangeEvent, useState } from "react";
import styles from "../styles/FiltersMenu/RatingFilter.module.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { hideOverflowIf } from "../../../utils/scripts";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import RatingIcon from "../../Icons/RatingIcon";
import test from "node:test";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/reduxHooks";
import { mediaFilterActions } from "../../../redux/store";

const RatingFilter = () => {

  const dispatch = useAppDispatch();
  const savedRatingRange = useAppSelector((state) => state.mediaFilter.ratingRange)
  const initialRatingRange = savedRatingRange || [0, 10]
  const [ratingRange, setRatingRange] = useState<[number, number]>(initialRatingRange);
  const sliderChangeHandler = (currentRange: any) => {
    const [rangeFrom, rangeTo] = currentRange;
    // If handles are in the same position, the second value should be the first val + 0.9 
    // If values are [5, 5] - ratingRange should be [5, 5.9]
    if (rangeFrom === rangeTo && rangeFrom !== 0) {
      setRatingRange([rangeFrom - 1, rangeTo])
      dispatch(mediaFilterActions.getRatingRange({ratingRange: [rangeFrom - 1, rangeTo]}))
      return;
    } else if (rangeFrom === rangeTo && rangeFrom === 0) {
      setRatingRange([rangeFrom, rangeTo + 1])
      dispatch(mediaFilterActions.getRatingRange({ratingRange: [rangeFrom, rangeTo + 1]}))
      return;
    }
    dispatch(mediaFilterActions.getRatingRange({ratingRange: currentRange}))
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
            value={[Math.floor(ratingRange[0]), Math.floor(ratingRange[1])]}
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

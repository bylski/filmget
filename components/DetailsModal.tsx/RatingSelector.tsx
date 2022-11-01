import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { ratingSelectorActions } from "../../redux/store";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import RatingIcon from "../Icons/RatingIcon";
import StyledButton from "../UI/StyledButton";
import styles from "./styles/RatingSelector.module.scss";
import { motion } from "framer-motion";

const RatingSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [hoveredRating, setHoveredRating] = useState<null | number | "?">("?");
  const ratingTexts = [
    "a Catastrophy",
    "Really Bad",
    "Bad",
    "Bearable",
    "Decent",
    "Okay",
    "Good",
    "Great",
    "Amazing",
    "a Masterpiece",
  ];

  const ratingChangeHandler = (rate: number) => {
    // console.log(rate);
  };

  const ratingHoverHandler = (rate: number, index: number) => {
    setHoveredRating(rate);
  };

  const closeSelectorHandler = () => {
    dispatch(ratingSelectorActions.hideSelector());
  };

  const selectorVariants = {
    show: {
      transition: { duration: 0.6 },
      opacity: [0, 1],
      y: [-200, 0],
    },
    hide: {
      transition: { duration: 0.6 },
      opacity: [1, 0],
      y: [0, -200],
    },
  };

  const backdropVariants = {
    show: {
      transition: { duration: 0.5 },
      opacity: [0, 1],
    },
    hide: {
      transition: { duration: 0.5 },
      opacity: [1, 0],
    },
  };

  return (
    <div className={styles["rating-selector"]}>
      <motion.div
        variants={backdropVariants}
        animate="show"
        exit="hide"
        className={styles["rating-selector__backdrop"]}
      ></motion.div>
      <motion.div
        variants={selectorVariants}
        animate="show"
        exit="hide"
        className={styles["selector__card"]}
      >
        <div className={styles["selector__header"]}>
          <div className={styles["rating-display"]}>
            <span>{hoveredRating}</span>
          </div>
          <h2 className={styles["header__text"]}>
            This movie is{" "}
            <span className={styles["header__rating-text"]}>
              {typeof hoveredRating === "number"
                ? `${ratingTexts[hoveredRating - 1]}.`
                : "..."}
            </span>
          </h2>
          {/* <h3 className={styles["selector__rating-text"]}>Great</h3> */}
        </div>
        <div className={styles["rating__container"]}>
          <Rating
            initialValue={1}
            fillIcon={<RatingIcon className={styles["rating__fill"]} />}
            emptyIcon={
              <RatingIcon
                differentFill={{ fill1: "gray", fill2: "#737373" }}
                className={styles["rating__empty"]}
              />
            }
            transition={true}
            onClick={ratingChangeHandler}
            onPointerMove={ratingHoverHandler}
            iconsCount={10}
          />
        </div>
        <StyledButton
          action={closeSelectorHandler}
          addClass={styles["selector__exit-btn"]}
        >
          Go Back
        </StyledButton>
      </motion.div>
    </div>
  );
};

export default RatingSelector;

import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { accountActions, ratingSelectorActions } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import RatingIcon from "../Icons/RatingIcon";
import StyledButton from "../UI/StyledButton";
import styles from "./styles/RatingSelector.module.scss";
import { motion } from "framer-motion";
import { movieInterface, seriesInterface } from "../../utils/types";

const RatingSelector: React.FC<{
  mediaData: movieInterface | seriesInterface;
}> = (props) => {
  const dispatch = useAppDispatch();
  const { id: mediaId } = props.mediaData;
  const [hoveredRating, setHoveredRating] = useState<null | number | "?">("?");
  const [selectedRating, setSelectedRating] = useState<null | number>(null);
  const [ratingText, setRatingText] = useState("...");
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

  const ratedMedia = useAppSelector((state) => state.account.mediaRatings);
  // Get saved rating from redux if it exists
  useEffect(() => {
    ratedMedia.forEach((media) => {
      if (media.id === props.mediaData.id) {
        setSelectedRating(media.rating);
      }
    });
  }, []);

  const ratingChangeHandler = (rating: number) => {
    setSelectedRating(rating);
    dispatch(accountActions.addRating({ id: mediaId, rating: rating }));
    closeSelectorHandler();
  };

  const ratingHoverHandler = (rating: number, index: number) => {
    setHoveredRating(rating);
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

  useEffect(() => {
    if (typeof hoveredRating === "number") {
      setRatingText(ratingTexts[hoveredRating - 1]);
    } else if (selectedRating && typeof hoveredRating !== "number") {
      setRatingText(ratingTexts[selectedRating - 1]);
    }
  }, [hoveredRating, selectedRating]);

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
            <span>{selectedRating ? selectedRating : hoveredRating}</span>
          </div>
          <h2 className={styles["header__text"]}>
            This movie is{" "}
            <span className={styles["header__rating-text"]}>{ratingText}</span>
          </h2>
          {/* <h3 className={styles["selector__rating-text"]}>Great</h3> */}
        </div>
        <div className={styles["rating__container"]}>
          <Rating
            initialValue={selectedRating || 1}
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
            onPointerLeave={() => setHoveredRating("?")}
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

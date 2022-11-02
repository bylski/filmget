import React, { useState, useEffect, Fragment } from "react";
import { Rating } from "react-simple-star-rating";
import { accountActions, ratingSelectorActions } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import RatingIcon from "../Icons/RatingIcon";
import StyledButton from "../UI/StyledButton";
import styles from "./styles/RatingSelector.module.scss";
import { motion } from "framer-motion";
import { movieInterface, seriesInterface } from "../../utils/types";
import RefreshIcon from "../Icons/RefreshIcon";
import axios from "axios";
import { useSession } from "next-auth/react";

const RatingSelector: React.FC<{
  mediaData: movieInterface | seriesInterface;
}> = (props) => {
  const dispatch = useAppDispatch();
  const session = useSession();
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
    if (ratedMedia) {
      ratedMedia.forEach((media) => {
        if (media.id === props.mediaData.id) {
          setSelectedRating(media.rating);
        }
      });
    }
  }, []);

  const ratingChangeHandler = (rating: number) => {
    setSelectedRating(rating);
    dispatch(accountActions.addRating({ id: mediaId, rating: rating }));
    axios.post("/api/add-rating", {
      id: mediaId,
      rating,
      username: session.data?.user?.name,
      genresList: props.mediaData.genre_ids,
    });

    closeSelectorHandler();
  };

  const ratingHoverHandler = (rating: number, index: number) => {
    setHoveredRating(rating);
  };

  const clearRatingHandler = () => {
    dispatch(accountActions.deleteRating(mediaId));
    setSelectedRating(null);
    setRatingText("...");
    setHoveredRating("?");

    axios.post("/api/delete-rating", {
      id: mediaId,
      username: session.data?.user?.name,
    });
  };

  const closeSelectorHandler = () => {
    dispatch(ratingSelectorActions.hideSelector());
  };

  const outsideClickHandler = () => {
    console.log("HETY");
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
        onClick={outsideClickHandler}
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
        <header className={styles["selector__header"]}>
          <div className={styles["rating-display"]}>
            <span>{selectedRating ? selectedRating : hoveredRating}</span>
          </div>
          <h2 className={styles["header__text"]}>
            This movie is{" "}
            <span className={styles["header__rating-text"]}>{ratingText}</span>
          </h2>
          {/* <h3 className={styles["selector__rating-text"]}>Great</h3> */}
        </header>
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
        <footer className={styles["selector__footer"]}>
          <StyledButton
            action={closeSelectorHandler}
            addClass={styles["selector__btn"]}
          >
            Go Back
          </StyledButton>
          <StyledButton
            action={clearRatingHandler}
            addClass={styles["selector__btn"]}
          >
            <Fragment>
              Clear Rating
              <RefreshIcon className={styles["selector__btn-icon"]} />
            </Fragment>
          </StyledButton>
        </footer>
      </motion.div>
    </div>
  );
};

export default RatingSelector;

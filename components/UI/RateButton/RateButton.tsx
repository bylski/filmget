import React, {useState, useEffect, Fragment} from "react";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { movieInterface, seriesInterface } from "../../../utils/types";
import { ratingSelectorActions } from "../../../redux/store";
import RatingIcon from "../../Icons/RatingIcon";
import styles from "./styles/RateButton.module.scss"

const RateButton: React.FC<{mediaData: movieInterface | seriesInterface}> = (props) => {
    const dispatch = useAppDispatch();
    const [mediaRating, setMediaRating] = useState<{
        id: number;
        rating: number;
      } | null>(null);
    
      // Check if there is any ratingData, use is to control "Rate button's visuals"
      const ratingData = useAppSelector((state) => state.account.mediaRatings);
      useEffect(() => {
        let ratingNotFound = true;
        if (ratingData) {
          ratingData.forEach((ratedMedia, i) => {
            if (ratedMedia.id === props.mediaData.id) {
              setMediaRating(ratedMedia);
              ratingNotFound = false;
            }
          });
        }
        if (ratingNotFound) {
          setMediaRating(null);
        }
      }, [ratingData]);
    
      const openSelectorHandler = () => {
        dispatch(ratingSelectorActions.showSelector());
      };

    return mediaRating ? (
        <button
          onClick={openSelectorHandler}
          className={`${styles["rating__btn"]} ${styles["rated"]}`}
        >
          <Fragment>
            Rated |<span>{mediaRating.rating}</span>
            <RatingIcon
              differentFill={{ fill1: "white", fill2: "white" }}
              className={styles["btn__rating-icon"]}
            />
          </Fragment>
        </button>
      ) : (
        <button onClick={openSelectorHandler} className={styles["rating__btn"]}>
          Rate
        </button>
      );
}

export default RateButton;
import MoviesScroller from "../MoviesScroller/MoviesScroller";
import movieScrollerStyles from "./styles/MovieScrollerCustom.module.scss";
import React, { useState, useEffect } from "react";
import styles from "./styles/Dashboard.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import EyeIcon from "../Icons/EyeIcon";
import BrandIcon from "../Icons/BrandIcon";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { movieInterface, seriesInterface } from "../../utils/types";

const Dashboard: React.FC<{
  mediaUserLiked: Array<movieInterface | seriesInterface>;
  sessionData: any;
  genresList: { id: number; name: string }[];
  signUpDate: Date | null;
  toWatchAmount: number;
  ratedMediaAmount: number;
  mostWatchedGenre: string;
}> = (props) => {
  const { sessionData, signUpDate } = props;
  const [toWatchAmount, setToWatchAmount] = useState(props.toWatchAmount);
  const [ratedMediaAmount, setRatedMediaAmount] = useState(
    props.ratedMediaAmount
  );
  // Get and format signUpDate to display it later
  const date = new Date(signUpDate!);
  const [month, day, year] = [
    date.toLocaleString("en-GB", { month: "long" }),
    date.getDate(),
    date.getFullYear(),
  ];

  const { mediaRatings, toWatch: toWatch } = useAppSelector(
    (state) => state.account
  );
  const toWatchIds = toWatch.mediaIds;

  useEffect(() => {
    setToWatchAmount(toWatchIds.length);
    setRatedMediaAmount(mediaRatings.length);
  }, [mediaRatings, toWatchIds]);

  const noContentFall = (
    <div className={styles["no-content"]}>
      <span className={styles["no-content__info"]}>
        Be active to see more information in your profile!
      </span>
    </div>
  );

  return (
    <main className={styles["dashboard-section"]}>
      <header className={styles["section__header"]}>
        <p className={styles["header__username"]}>
          {sessionData?.user!.name.toUpperCase()}
        </p>
        <span>{`On Filmget since - ${day} ${month} ${year}`}</span>
      </header>
      <section className={styles["user__stats"]}>
          <ul className={styles["stats__list"]}>
            <li className={styles["stats__item"]}>
              <div className={styles["item__header"]}>
                <RatingIcon className={styles["stats__icon"]} />
                <span>Media Rated</span>
              </div>
              <div className={styles["item__value"]}>
                <span>{ratedMediaAmount}</span>
              </div>
            </li>
            <li className={styles["stats__item"]}>
              <div className={styles["item__header"]}>
                <EyeIcon className={styles["stats__icon"]} />
                <span>Media To-Watch</span>
              </div>
              <div className={styles["item__value"]}>
                <span>{toWatchAmount}</span>
              </div>
            </li>
            <li className={styles["stats__item"]}>
              <div className={styles["item__header"]}>
                <BrandIcon
                  customFill={true}
                  className={styles["stats__icon"]}
                />
                <span>Most Watched Genre</span>
              </div>
              <div className={styles["item__value"]}>
                <span>{props.mostWatchedGenre || "---"}</span>
              </div>
            </li>
          </ul>
        </section>
      <div className={styles["section__content"]}>
        {props.mediaUserLiked.length !== 0 ? (
          <MoviesScroller
            customStyles={movieScrollerStyles}
            headerText="Media you liked"
            moviesData={props.mediaUserLiked}
            genresList={props.genresList}
          />
        ) : noContentFall}
        {/* <a className={styles["content__ratings-link"]}>
          See all your rated movies...
        </a> */}
      </div>
    </main>
  );
};

export default Dashboard;

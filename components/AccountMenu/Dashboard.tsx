import MoviesScroller from "../MoviesScroller/MoviesScroller";
import movieScrollerStyles from "./styles/MovieScrollerCustom.module.scss";
import React from "react";
import styles from "./styles/Dashboard.module.scss";
import { Session } from "inspector";
import RatingIcon from "../Icons/RatingIcon";
import EyeIcon from "../Icons/EyeIcon";
import BrandIcon from "../Icons/BrandIcon";

const Dashboard: React.FC<{
  movieData: any;
  sessionData: any;
  genresList: { id: number; name: string }[];
  signUpDate: Date | null;
}> = (props) => {
  const { sessionData, signUpDate } = props;

  // Get and format signUpDate to display it later
  const date = new Date(signUpDate!);
  const [month, day, year] = [
    date.toLocaleString("en-GB", { month: "long" }),
    date.getDate(),
    date.getFullYear(),
  ];

  return (
    <main className={styles["dashboard-section"]}>
      <header className={styles["section__header"]}>
        <p className={styles["header__username"]}>
          {sessionData?.user!.name.toUpperCase()}
        </p>
        <span>{`On Filmget since - ${day} ${month} ${year}`}</span>
      </header>
      <div className={styles["section__content"]}>
        <section className={styles["content__stats"]}>
          <ul className={styles["stats__list"]}>
            <li className={styles["stats__item"]}>
              <div className={styles["item__header"]}>
                <RatingIcon className={styles["stats__icon"]} />
                <span>Media Rated</span>
              </div>
              <div className={styles["item__value"]}>
                <span>0</span>
              </div>
            </li>
            <li className={styles["stats__item"]}>
              <div className={styles["item__header"]}>
                <EyeIcon className={styles["stats__icon"]} />
                <span>Yours To-Watch</span>
              </div>
              <div className={styles["item__value"]}>
                <span>0</span>
              </div>
            </li>
            <li className={styles["stats__item"]}>
              <div className={styles["item__header"]}>
                <BrandIcon
                  customFill={true}
                  className={styles["stats__icon"]}
                />
                <span>Favourite Genre</span>
              </div>
              <div className={styles["item__value"]}>
                <span>Action</span>
              </div>
            </li>
          </ul>
        </section>
        <MoviesScroller
          customStyles={movieScrollerStyles}
          headerText="Highest Rated "
          moviesData={props.movieData}
          genresList={props.genresList}
        />
        {/* <a className={styles["content__ratings-link"]}>
          See all your rated movies...
        </a> */}
      </div>
    </main>
  );
};

export default Dashboard;

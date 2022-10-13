import MoviesScroller from "../MoviesScroller/MoviesScroller";
import movieScrollerStyles from "./styles/MovieScrollerCustom.module.scss";
import React from "react";
import styles from "./styles/Dashboard.module.scss"
import { Session } from "inspector";


const Dashboard: React.FC<{ movieData: any, sessionData: any, genresList: {id: number, name: string}[] }> = (props) => {
  const { sessionData } = props;

  console.log(props.genresList)

  return (
    <main className={styles["dashboard-section"]}>
      <header className={styles["section__header"]}>
        <p className={styles["header__username"]}>
          {sessionData?.user!.name.toUpperCase()}
        </p>
        <span>On Filmget since - 2 September 2022</span>
      </header>
      <div className={styles["section__content"]}>
        <MoviesScroller
          customStyles={movieScrollerStyles}
          headerText="Highest Rated "
          moviesData={props.movieData}
          genresList={props.genresList}
        />
        <a className={styles["content__ratings-link"]}>
          See all your rated movies...
        </a>
      </div>
    </main>
  );
};

export default Dashboard;

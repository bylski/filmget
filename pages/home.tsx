import styles from "../styles/pages/home.module.scss";
import { Fragment } from "react";

import MoviesScroller from "../components/MoviesScroller/MoviesScroller";
import Header from "../components/Layout/Header";
import ActorsShowcaser from "../components/ActorsShowcaser/ActorsShowcaser";


const Home: React.FC = () => {
  return (
    <Fragment>
    <Header/>
    <main className={styles["main-container"]}>
      <MoviesScroller movies={true} headerText={"What's Popular"}/>
      <ActorsShowcaser headerText="Trending Actors" />
      <MoviesScroller movies={false} headerText={"What's New"}/>
    </main>
    </Fragment>
  );
};

export default Home;

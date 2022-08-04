import styles from "../styles/pages/home.module.scss";
import { Fragment } from "react";
import MoviesScroller from "../components/MoviesScroller/MoviesScroller";
import SearchInput from "../components/UI/SearchInput";
import Header from "../components/Layout/Header";



const Home: React.FC = () => {
  return (
    <Fragment>
    <Header/>
    <main className={styles["main-container"]}>
      <MoviesScroller movies={true} headerText={"What's Popular"}/>
      <MoviesScroller movies={false} headerText={"What's New"}/>
    </main>
    </Fragment>
  );
};

export default Home;

import styles from "../styles/pages/home.module.scss";
import { Fragment } from "react";

import MoviesScroller from "../components/MoviesScroller/MoviesScroller";
import Header from "../components/Layout/Header";
import ActorsShowcaser from "../components/ActorsShowcaser/ActorsShowcaser";
import axios from "axios";



const Home: React.FC<{popularMovies: any[], topRatedMovies: any[], popularActors: any[]}> = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={styles["main-container"]}>
        <MoviesScroller moviesData={props.popularMovies} headerText={"Popular Now"} />
        <ActorsShowcaser actorsData={props.popularActors} headerText="Trending Actors" />
        <MoviesScroller moviesData={props.topRatedMovies} headerText={"Top Rated Movies"} />
      </main>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps() {
  const endpoints: string[] = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET popular movies
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET top rated movies
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET popular actors
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e:any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}` )
  }


  const popularMovies: any[] = res[0].data.results;
  const topRatedMovies: any[] = res[1].data.results;
  const popularActors: any[] = res[2].data.results;

  return {
    props: {popularMovies, topRatedMovies, popularActors},
    revalidate: 86400, // Revalidate every day
  };
}

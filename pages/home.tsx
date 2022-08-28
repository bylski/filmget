import styles from "../styles/pages/home.module.scss";
import { Fragment } from "react";

import MoviesScroller from "../components/MoviesScroller/MoviesScroller";
import Header from "../components/Layout/Header";
import ActorsShowcaser from "../components/ActorsShowcaser/ActorsShowcaser";
import axios from "axios";
import { Provider } from "react-redux";
import DetailsModal from "../components/DetailsModal.tsx/DetailsModal";
import { useAppSelector } from "../utils/hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import { hideOverflowIf } from "../utils/scripts";
import Head from "next/head";

const Home: React.FC<{
  popularMovies: any[];
  topRatedMovies: any[];
  popularActors: any[];
  genresList: {id: number, name: string}[]
}> = (props) => {
  const {
    modalData,
    isShown: showModal,
    originPosition,
  } = useAppSelector((state) => ({
    modalData: state.modal.modalData,
    isShown: state.modal.isShown,
    originPosition: state.modal.originPosition,
  }));

  const headerBackdropPaths: string[] = props.popularMovies
    .map((movie) => movie.backdrop_path)
    .slice(0, 15);


  hideOverflowIf(showModal) // Do not let user scroll when modal is active

  return (
    <Fragment>
      <Head>
        <title>Filmget</title>
        <meta name="description" content="Filmget provides information about your favourite movies, shows and people from the movie industry.
        Explore now and discover the world of cinema."></meta>
      </Head>
      <AnimatePresence>
        {showModal && (
          <DetailsModal modalData={modalData!} originPosition={originPosition} />
        )}
      </AnimatePresence>

      <Header backdropPaths={headerBackdropPaths} />
      <main className={styles["main-container"]}>
        <MoviesScroller
          moviesData={props.popularMovies}
          headerText={"Trending Now"}
          genresList={props.genresList}
        />
        <ActorsShowcaser
          actorsData={props.popularActors}
          headerText={"Popular Actors"}
        />
        <MoviesScroller
          moviesData={props.topRatedMovies}
          headerText={"Top Rated Movies"}
          genresList={props.genresList}
        />
      </main>
    </Fragment>
  );
};

export default Home;

export async function getServerSideProps() {
  const endpoints: string[] = [
    encodeURI(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`), // GET popular movies
    encodeURI(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`), // GET top rated movies
    encodeURI(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`), // GET popular actors
    encodeURI(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`) // Get genres lest
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const popularMovies: any[] = res[0].data.results;
  const topRatedMovies: any[] = res[1].data.results;
  const popularActors: any[] = res[2].data.results;
  const genresList: any = res[3].data.genres;

  return {
    props: { popularMovies, topRatedMovies, popularActors, genresList},
  };
}

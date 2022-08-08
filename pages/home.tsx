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
import { movieInterface } from "../utils/types";

const Home: React.FC<{
  popularMovies: any[];
  topRatedMovies: any[];
  popularActors: any[];
  genresList: {id: number, name: string}[]
}> = (props) => {
  const {
    modalData,
    isShown: showModal,
    originElement,
  } = useAppSelector((state) => ({
    modalData: state.modalData,
    isShown: state.isShown,
    originElement: state.originElement,
  }));

  const headerBackdropPaths: string[] = props.popularMovies
    .map((movie) => movie.backdrop_path)
    .slice(0, 15);


  hideOverflowIf(showModal) // Do not let user scroll when modal is active

  return (
    <Fragment>
      <AnimatePresence>
        {showModal && (
          <DetailsModal modalData={modalData!} originElement={originElement} />
        )}
      </AnimatePresence>

      <Header backdropPaths={headerBackdropPaths} />
      <main className={styles["main-container"]}>
        <MoviesScroller
          moviesData={props.popularMovies}
          headerText={"Popular Now"}
          genresList={props.genresList}
        />
        <ActorsShowcaser
          actorsData={props.popularActors}
          headerText="Trending Actors"
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

export async function getStaticProps() {
  const endpoints: string[] = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET popular movies
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET top rated movies
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET popular actors
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US` // Get genres lest
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
    revalidate: 86400, // Revalidate every day
  };
}

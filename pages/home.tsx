import styles from "../styles/pages/home.module.scss";
import { Fragment, useEffect } from "react";

import MoviesScroller from "../components/MoviesScroller/MoviesScroller";
import Header from "../components/Layout/Header";
import ActorsShowcaser from "../components/ActorsShowcaser/ActorsShowcaser";
import axios from "axios";
import DetailsModal from "../components/DetailsModal.tsx/DetailsModal";
import { useAppSelector, useAppDispatch } from "../utils/hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import { hideOverflowIf } from "../utils/scripts";
import Head from "next/head";
import mongoose from "mongoose";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../utils/mongo/userModel";
import { accountActions } from "../redux/store";
import { movieInterface, seriesInterface } from "../utils/types";
import useBreakpoints from "../utils/hooks/useBreakpoints";

const Home: React.FC<{
  popularMovies: any[];
  topRatedMovies: any[];
  popularActors: any[];
  genresList: { id: number; name: string }[];
  wantToWatchIds: number[];
  wantToWatchMedia: seriesInterface[] | movieInterface[];
  mediaRatings: { id: number; rating: number }[];
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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      accountActions.setToWatch({
        mediaToWatch: props.wantToWatchMedia,
        mediaIds: props.wantToWatchIds,
      })
    );
    dispatch(accountActions.setRating(props.mediaRatings));
  }, []);

  const headerBackdropPaths: string[] = props.popularMovies
    .map((movie) => movie.backdrop_path)
    .slice(0, 15);

  const mobileBackdropPaths: string[] = props.popularMovies
    .map((movie: movieInterface) => movie.poster_path)
    .slice(0, 15);

  hideOverflowIf(showModal); // Do not let user scroll when modal is active

  const breakpoints = useBreakpoints({
    breakpointName: "mobileView",
    breakpointVal: 500,
  });
  let isMobileView = false;
  if (breakpoints) {
    isMobileView = breakpoints[0].mobileView;
  }

  return (
    <Fragment>
      <Head>
        <title>Filmget</title>
        <meta
          name="description"
          content="Filmget provides information about your favourite movies, shows and people from the movie industry.
        Explore now and discover the world of cinema."
        ></meta>
      </Head>
      <AnimatePresence>
        {showModal && (
          <DetailsModal
            modalData={modalData!}
            originPosition={originPosition}
          />
        )}
      </AnimatePresence>

      <Header
        isMobileView={isMobileView}
        backdropPaths={headerBackdropPaths}
        mobileBackdropPaths={mobileBackdropPaths}
      />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET popular movies
    encodeURI(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET top rated movies
    encodeURI(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET popular actors
    encodeURI(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    ), // Get genres list
  ];

  let res: any = undefined;

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  try {
    // Check if code runs in production or in development, use the address specified for environment
    // Connect to the database
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
    } else {
      await mongoose.connect("mongodb://localhost:27017/filmget");
    }
  } catch (error) {
    throw new Error("[ERROR] Couldnt' connect to the database!");
  }

  // Get user data from the database
  const username = session?.user?.name;
  const currentUser = await User.findOne({ username });
  let wantToWatchIds: number[] | null = null;
  let wantToWatchMedia: movieInterface[] | seriesInterface[] | null = null;
  let mediaRatings: { id: number; rating: number }[] | null = null;
  if (currentUser) {
    mediaRatings = await JSON.parse(JSON.stringify(currentUser.mediaRatings));
    wantToWatchIds = currentUser.mediaIds;
    wantToWatchMedia = currentUser.mediaToWatch;
  }

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
    props: {
      popularMovies,
      topRatedMovies,
      popularActors,
      genresList,
      wantToWatchIds,
      wantToWatchMedia,
      mediaRatings,
    },
  };
}

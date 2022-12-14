import React, { Fragment, useEffect } from "react";
import MediaDisplayer from "../../components/CategoryDisplayer/MediaDisplayer";
import axios from "axios";
import { movieInterface, seriesInterface } from "../../utils/types";
import { AnimatePresence } from "framer-motion";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { useAppSelector, useAppDispatch } from "../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../utils/scripts";
import mongoose from "mongoose";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { User } from "../../utils/mongo/userModel";
import { accountActions } from "../../redux/store";
import Head from "next/head";

const Movies: React.FC<{
  popularMovies: movieInterface[];
  topRatedMovies: movieInterface[];
  nowPlayingMovies: movieInterface[];
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

  hideOverflowIf(showModal); // Do not let user scroll when modal is active

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

  return (
    <Fragment>
      <Head>
        <title>{`Filmget - Movies`}</title>
        <meta
          name="description"
          content="Trending, Now Playing and Top Rated Movies. Check them out on Filmget!"
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
      <MediaDisplayer
        mediaType="movies"
        genresList={props.genresList}
        mediaData={{
          popular: props.popularMovies,
          topRated: props.topRatedMovies,
          latest: props.nowPlayingMovies,
        }}
      />
    </Fragment>
  );
};

export default Movies;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET popular movies
    encodeURI(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET top rated movies
    encodeURI(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET playing now movies
    encodeURI(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    ), // Get genres lest
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
    // Check if code runs in production or in development, use the address specified for environment
    // Connect to the database
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
    } else {
      await mongoose.connect(process.env.DB_ADDRESS_DEV!, { dbName: "filmget" });
    }
  } catch (error) {
    throw new Error("[ERROR] Couldnt' connect to the database!");
  }

  const popularMovies: movieInterface[] = res[0].data.results;
  const topRatedMovies: movieInterface[] = res[1].data.results;
  const nowPlayingMovies: movieInterface[] = res[2].data.results;
  const genresList: any = res[3].data.genres;

  return {
    props: {
      popularMovies,
      topRatedMovies,
      nowPlayingMovies,
      genresList,
      mediaRatings,
      wantToWatchIds,
      wantToWatchMedia,
    },
  };
}

import React, { Fragment } from "react";
import MediaDisplayer from "../../components/CategoryDisplayer/MediaDisplayer";
import axios from "axios";
import { movieInterface } from "../../utils/types";
import { AnimatePresence } from "framer-motion";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../utils/scripts";

const Movies: React.FC<{
  popularMovies: movieInterface[];
  topRatedMovies: movieInterface[];
  nowPlayingMovies: movieInterface[];
  genresList: { id: number; name: string }[];
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

  return (
    <Fragment>
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

export async function getServerSideProps() {
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

  const popularMovies: movieInterface[] = res[0].data.results;
  const topRatedMovies: movieInterface[] = res[1].data.results;
  const nowPlayingMovies: movieInterface[] = res[2].data.results;
  const genresList: any = res[3].data.genres;

  return {
    props: { popularMovies, topRatedMovies, nowPlayingMovies, genresList },
  };
}

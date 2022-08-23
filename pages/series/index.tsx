import React from "react";
import MediaDisplayer from "../../components/CategoryDisplayer/MediaDisplayer";
import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import axios from "axios";
import { movieInterface, seriesInterface, actorInterface } from "../../utils/types";

const Series: React.FC<{
  popularSeries: movieInterface[];
  topRatedSeries: movieInterface[];
  nowAiringSeries: movieInterface[];
  genresList: { id: number; name: string }[];
}> = (props) => {
  const {
    modalData,
    isShown: showModal,
    originPosition,
  } = useAppSelector((state) => ({
    modalData: state.modalData,
    isShown: state.isShown,
    originPosition: state.originPosition,
  }));

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
        mediaType="Series"
        genresList={props.genresList}
        mediaData={{
          popular: props.popularSeries,
          topRated: props.topRatedSeries,
          nowPlaying: props.nowAiringSeries,
        }}
      />
    </Fragment>
  );
};

export default Series;

export async function getServerSideProps() {
  const endpoints: string[] = [
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET popular tv shows
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET top rated tv shows
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}&language=en-US&page=1`, // GET now airing tv shows
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-US`, // Get TV genres lest
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const popularSeries: movieInterface[] = res[0].data.results;
  const topRatedSeries: movieInterface[] = res[1].data.results;
  const nowAiringSeries: movieInterface[] = res[2].data.results;
  const genresList: any = res[3].data.genres;

  return {
    props: { popularSeries, topRatedSeries, nowAiringSeries, genresList },
  };
}

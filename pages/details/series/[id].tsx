import React from "react";
import { GetServerSidePropsContext } from "next";
import DetailsPage from "../../../components/DetailsPage/DetailsPage";
import axios from "axios";
import { seriesInterface } from "../../../utils/types";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../../utils/scripts";

const SeriesDetailsById: React.FC<{
  request: any;
  seriesDetails: seriesInterface;
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

  hideOverflowIf(showModal) // Do not let user scroll when modal is active

  return <DetailsPage mediaType={"series"} genresList={props.genresList} mediaDetails={props.seriesDetails} />;
};

export default SeriesDetailsById;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/tv/${context.params?.id}?api_key=${process.env.API_KEY}&language=en-US`
      // Get Movie Info by ID
    ),
    encodeURI(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-US`
    ), // Get genres lest
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const seriesDetails: any[] = res[0].data || null;
  const genresList: any[] = res[1].data;


  return {
    props: { seriesDetails, genresList },
  };
}


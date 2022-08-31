import React from "react";
import { GetServerSidePropsContext } from "next";
import DetailsPage from "../../../components/Detailspage/DetailsPage";
import axios from "axios";
import { movieInterface } from "../../../utils/types";

const MovieDetailsById: React.FC<{
  request: any;
  movieDetails: movieInterface;
  genresList: {id: number, name: string}[]
}> = (props) => {
  return <DetailsPage genresList={props.genresList} mediaDetails={props.movieDetails} />;
};

export default MovieDetailsById;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/movie/${context.params?.id}?api_key=${process.env.API_KEY}&language=en-US`
      // Get Movie Info by ID
    ),
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

  const movieDetails: any[] = res[0].data;
  const genresList: any[] = res[1].data;

  console.log(genresList)

  return {
    props: { movieDetails, genresList },
  };
}

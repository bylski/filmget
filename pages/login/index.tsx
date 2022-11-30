import React, { Fragment } from "react";
import Login from "../../components/Login/Login";
import axios from "axios";
import { movieInterface } from "../../utils/types";
import Head from "next/head";

const LoginPage: React.FC<{ popularMovies: movieInterface[] }> = (props) => {
  const movieUrls = props.popularMovies.map((movie, i) => {
    return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`;
  });

  const movieUrlsMobile = props.popularMovies.map((movie, i) => {
    return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;
  });
  return (
    <Fragment>
      <Head>
        <title>{`Filmget - Log In`}</title>
        <meta
          name="description"
          content="Log In to your Filmget account to experience media just as you like it to!"
        ></meta>
      </Head>
      <Login movieUrls={movieUrls} movieUrlsMobile={movieUrlsMobile} />;
    </Fragment>
  );
};

export default LoginPage;

export async function getServerSideProps() {
  let res: any = undefined;

  try {
    res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ); // GET Popular movies
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const popularMovies: any[] = res.data.results;

  return {
    props: { popularMovies },
  };
}

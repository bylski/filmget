import React, { useState, useEffect, Fragment } from "react";
import Register from "../../components/Register/Register";
import axios from "axios";
import { movieInterface } from "../../utils/types";
import useBreakpoints from "../../utils/hooks/useBreakpoints";
import Head from "next/head";
// https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}
const RegisterPage: React.FC<{ popularMovies: movieInterface[] }> = (props) => {
  const [posterView, setPosterView] = useState(false);
  const breakpoints = useBreakpoints({
    breakpointName: "changeToPoster",
    breakpointVal: 900,
  });
  let changeToPoster = false;
  if (breakpoints) {
    changeToPoster = breakpoints[0].changeToPoster;
  }

  useEffect(() => {
    setPosterView(changeToPoster);
  }, [changeToPoster]);

  const movieUrls = props.popularMovies.map((movie, i) => {
    return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`;
  });

  return (
    <Fragment>
      <Head>
        <title>{`Filmget - Register`}</title>
        <meta
          name="description"
          content="Create an account on Filmget to have access to more neat features!"
        ></meta>
      </Head>
      <Register movieUrls={movieUrls} />;
    </Fragment>
  );
};

export default RegisterPage;

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

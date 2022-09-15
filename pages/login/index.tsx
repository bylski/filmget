import React from "react";
import Login from "../../components/Login/Login";
import axios from "axios";
import { movieInterface } from "../../utils/types";

const LoginPage: React.FC<{ popularMovies: movieInterface[] }> = (props) => {
  const movieUrls = props.popularMovies.map((movie, i) => {
      return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`;
  });
  return <Login movieUrls={movieUrls} />;
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

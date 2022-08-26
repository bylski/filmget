import React from "react";
import Router, { useRouter } from "next/router";
import SearchResults from "../components/SearchResults/SearchResults";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

const Search: React.FC<{ searchResults: any[] }> = (props) => {
  return <SearchResults searchResults={props.searchResults} />;
};

export default Search;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.query !== undefined) {
    let searchResults: any[] | null;
    if (context.query.q !== "") {
      const endpoints: string[] = [
        encodeURI(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${context.query.q}&page=1&include_adult=false`), // GET search results
      ];

      let res: any = undefined;

      try {
        res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
      } catch (e: any) {
        console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
      }

      searchResults = res[0].data.results;
    } else {
      searchResults = null;
    }

    return {
      props: { searchResults },
    };
  }

  return { props: { d: null } };
}

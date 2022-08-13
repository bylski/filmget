import React from "react";
import { useRouter } from "next/router";
import SearchResults from "../components/SearchResults/SearchResults";

const Search: React.FC = (props) => {

    const router = useRouter();
    return(
        <SearchResults/>
    )
};

export default Search;

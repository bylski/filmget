import React, { useEffect, useState } from "react";
import useScrollActions from "../../utils/hooks/useScrollActions";
import axios from "axios";
import { actorInterface, seriesInterface, movieInterface } from "../types";
// Change state when chosen media data changes

const useNextPage = (
  setStateFunc: React.Dispatch<React.SetStateAction<(actorInterface[] | seriesInterface[] | movieInterface[])[]>>,
  chosenMediaData: actorInterface[] | seriesInterface[] | movieInterface[],
  passedMediaType: string,
  switchSelected: number
) => {
  const scrollState = useScrollActions();
  useEffect(() => {
    setStateFunc([chosenMediaData]);
    setCurrentPage(1);
  }, [chosenMediaData]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(true);

  useEffect(() => {
    const getNextPage = async () => {
      if (
        chosenMediaData !== undefined &&
        chosenMediaData !== null &&
        scrollState.atBottom &&
        isPageLoaded
      ) {
        let req: any;

        let switchMediaMode = "";
        let mediaType: string = "";
        if (passedMediaType === "movies") {
          mediaType = "movie";
          switch (switchSelected) {
            case 0:
              switchMediaMode = "popular";
              break;
            case 1:
              switchMediaMode = "now_playing";
              break;
            case 2:
              switchMediaMode = "top_rated";
              break;
          }
        } else if (passedMediaType === "series") {
          mediaType = "tv";
          switch (switchSelected) {
            case 0:
              switchMediaMode = "popular";
              break;
            case 1:
              switchMediaMode = "on_the_air";
              break;
            case 2:
              switchMediaMode = "top_rated";
              break;
          }
        } else if (passedMediaType === "people") {
          mediaType = "person";
          switchMediaMode = "popular";
        }

        setIsPageLoaded(false); // Page is now loading, wait until it loads before user can load another page
        try {
          req = await axios.get(
            encodeURI(
              `https://api.themoviedb.org/3/${mediaType}/${switchMediaMode}?api_key=cd33ae221d8f63d59609a81c6ef754e4&language=en-US&page=${
                currentPage + 1
              }`
            )
          );
        } catch (e) {
          console.log(`ERROR!`);
          return;
        }
        setCurrentPage((prev) => prev + 1); // Add +1 to the page counter
        setIsPageLoaded(true); // Data fetched, page is loaded - set to true
        const response: movieInterface[] | actorInterface | seriesInterface = [
          req.data.results,
        ];
        setStateFunc((prev: any) => prev?.concat(response)); // Concat pages
      }
    };

    getNextPage();
  }, [scrollState]);
};


export default useNextPage;
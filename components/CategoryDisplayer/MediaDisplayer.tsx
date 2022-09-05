import React, { useEffect, useState, useCallback } from "react";
import styles from "./styles/MediaDisplayer.module.scss";
import Switcher from "../UI/Switcher";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
  sortInterface,
} from "../../utils/types";
import MediaCards from "./MediaCards";
import { chooseSwitchers, sortMediaBy } from "../../utils/scripts";
import SortBy from "../UI/SortBy/SortBy";
import { chooseSorterItems } from "./utils/sorterItemsTypes";
import FiltersMenu from "../UI/FiltersMenu/FiltersMenu";
import useScrollActions from "../../utils/hooks/useScrollActions";
import axios from "axios";

const MediaDisplayer: React.FC<{
  mediaType: string;
  mediaData: {
    popular: movieInterface[] | seriesInterface[] | actorInterface[];
    topRated?: movieInterface[] | seriesInterface[] | actorInterface[];
    latest?: movieInterface[] | seriesInterface[] | actorInterface[];
  };
  genresList?: { id: number; name: string }[];
}> = (props) => {
  const [switchSelected, setSwitchSelected] = useState(0);
  const switchingHandler = (activeSwitchNum: number) => {
    setSwitchSelected(activeSwitchNum);
  };

  let chosenMediaData: movieInterface[] | seriesInterface[] | actorInterface[] =
    [];
  switch (switchSelected) {
    case 0:
      chosenMediaData = props.mediaData.popular;
      break;
    case 1:
      chosenMediaData = props.mediaData.latest!;
      break;
    case 2:
      chosenMediaData = props.mediaData.topRated!;
      break;
  }

  let switchers: { switchName: string }[] | null = null;
  switchers = chooseSwitchers(props.mediaType); // Selects switcher's text based upon mediaType being displayed

  const [selectedSort, setSelectedSort] = useState<sortInterface>();
  // Receive selected sort from the SortBy component
  const fetchSortHandler = useCallback((receivedSort: sortInterface) => {
    setSelectedSort(receivedSort);
  }, []);

  // Select sorter items based on type of media
  const sorterItems = chooseSorterItems(props.mediaType);

  const [currentMediaData, setMediaData] = useState([chosenMediaData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const scrollState = useScrollActions();

  useEffect(() => {
    // Sort media data
    if (
      selectedSort !== undefined &&
      currentMediaData !== undefined &&
      currentMediaData !== null
    ) {
      const sortedData = sortMediaBy(selectedSort, currentMediaData);
      if (sortedData !== null) {
        setMediaData([sortedData]);
      }
    }
  }, [selectedSort]);

  // Change state when chosen media data changes
  useEffect(() => {
    setMediaData([chosenMediaData]);
    setCurrentPage(1);
  }, [chosenMediaData]);

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
        if (props.mediaType === "movies") {
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
        } else if (props.mediaType === "series") {
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
        } else if (props.mediaType === "people") {
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
        setMediaData((prev) => prev?.concat(response)); // Concat pages
      }
    };

    getNextPage();
  }, [scrollState]);

  return (
    <section className={styles["media-displayer"]}>
      <main className={styles["media-displayer__card"]}>
        <header className={styles["media-displayer__header"]}>
          <div className={styles["media-displayer__header-firstseg"]}>
            <Switcher switches={switchers} onSwitch={switchingHandler} />
            <SortBy onFetchSort={fetchSortHandler} sortItems={sorterItems} />
          </div>
          {props.mediaType === "movies" || props.mediaType === "series" ? (
            <FiltersMenu
              genresList={
                props.genresList !== undefined ? props.genresList : null
              }
            />
          ) : null}
        </header>
        <main className={styles["media-displayer__content"]}>
          {currentMediaData !== null && currentMediaData !== undefined ? (
            <MediaCards
              genresList={
                props.genresList !== undefined ? props.genresList : null
              }
              mediaData={currentMediaData}
              mediaType={props.mediaType.toLowerCase()}
            />
          ) : null}
        </main>
      </main>
    </section>
  );
};

export default MediaDisplayer;

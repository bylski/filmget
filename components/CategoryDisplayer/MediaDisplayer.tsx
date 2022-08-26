import React, { useState } from "react";
import styles from "./styles/MediaDisplayer.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import Switcher from "../UI/Switcher";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
  sortInterface,
} from "../../utils/types";
import MediaCards from "./MediaCards";
import { chooseSwitchers } from "../../utils/scripts";
import SortBy from "../UI/SortBy/SortBy";
import { chooseSorterItems } from "./utils/sorterItemsTypes";

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

  let chosenMediaData:
    | movieInterface[]
    | seriesInterface[]
    | actorInterface[]
    | undefined
    | null = null;
  switch (switchSelected) {
    case 0:
      chosenMediaData = props.mediaData.popular;
      break;
    case 1:
      chosenMediaData = props.mediaData.latest;
      break;
    case 2:
      chosenMediaData = props.mediaData.topRated;
      break;
  }

  let switchers: { switchName: string }[] | null = null;
  switchers = chooseSwitchers(props.mediaType); // Selects switcher's text based upon mediaType being displayed

  const [selectedSort, setSelectedSort] = useState<sortInterface>();
  // Receive selected sort from the SortBy component
  const fetchSortHandler = (receivedSort: sortInterface) => {
    setSelectedSort(receivedSort);
  };

  const sortMediaBy = (selectedSort: sortInterface, chosenMediaData: any[]) => {
    const { sortType, sortedProperty } = selectedSort;
    // If chosen media is undefined or null --> omit function all together
    if (chosenMediaData !== undefined && chosenMediaData !== null) {
      // MAX VALUE TO MIN VALUE SORT
      if (sortType === "max-min") {
        if (sortedProperty === "rating") {
          return chosenMediaData.sort((a, b) =>
            a.vote_average < b.vote_average ? 1 : -1
          );
        }
        if (sortedProperty === "popularity") {
          return chosenMediaData.sort((a, b) =>
            a.popularity < b.popularity ? 1 : -1
          );
        }
      }
      // MIN VALUE TO MAX VALUE SORT
      if (sortType === "min-max") {
        if (sortedProperty === "rating") {
          return chosenMediaData.sort((a, b) =>
            a.vote_average > b.vote_average ? 1 : -1
          );
        }
        if (sortedProperty === "popularity") {
          return chosenMediaData.sort((a, b) =>
            a.popularity > b.popularity ? 1 : -1
          );
        }
      }
      // ALPHABETIC SORT
      if (sortType === "alphabetically") {
        if (sortedProperty === "title") {
          return chosenMediaData.sort(
            (a, b) => (a.title[0] > b.title[0] ? 1 : -1) // Compare first letters of title
          );
        } else if (sortedProperty === "name") {
          return chosenMediaData.sort((a, b) =>
            a.name[0] > b.name[0] ? 1 : -1
          );
        }
      }
      // COUNTER-ALPHABETIC SORT
      if (sortType === "counter-alphabetically") {
        if (sortedProperty === "title") {
          return chosenMediaData.sort(
            (a, b) => (a.title[0] < b.title[0] ? 1 : -1) // Compare first letters of title
          );
        } else if (sortedProperty === "name") {
          return chosenMediaData.sort((a, b) =>
            a.name[0] < b.name[0] ? 1 : -1
          );
        }
      }
    }
    return null;
  };

  if (
    selectedSort !== undefined &&
    chosenMediaData !== undefined &&
    chosenMediaData !== null
  ) {
    sortMediaBy(selectedSort, chosenMediaData);
  }

  // Select sorter items based on type of media 
  const sorterItems = chooseSorterItems(props.mediaType);

  return (
    <section className={styles["media-displayer"]}>
      <main className={styles["media-displayer__card"]}>
        <header className={styles["media-displayer__header"]}>
          <Switcher switches={switchers} onSwitch={switchingHandler} />
          <SortBy
            onFetchSort={fetchSortHandler}
            sortItems={sorterItems}
          />
        </header>
        <main className={styles["media-displayer__content"]}>
          {chosenMediaData !== null && chosenMediaData !== undefined ? (
            <MediaCards
              genresList={
                props.genresList !== undefined ? props.genresList : null
              }
              mediaData={chosenMediaData}
              mediaType={props.mediaType.toLowerCase()}
            />
          ) : null}
        </main>
      </main>
    </section>
  );
};

export default MediaDisplayer;

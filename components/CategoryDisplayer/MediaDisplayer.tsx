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
import { useAppSelector } from "../../utils/hooks/reduxHooks";

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
  const fetchSortHandler = useCallback((receivedSort: sortInterface) => {
    setSelectedSort(receivedSort);
  }, []);

  // Select sorter items based on type of media
  const sorterItems = chooseSorterItems(props.mediaType);

  // Sort media data
  if (
    selectedSort !== undefined &&
    chosenMediaData !== undefined &&
    chosenMediaData !== null
  ) {
    sortMediaBy(selectedSort, chosenMediaData);
  }

  return (
    <section className={styles["media-displayer"]}>
      <main className={styles["media-displayer__card"]}>
        <header className={styles["media-displayer__header"]}>
          <Switcher switches={switchers} onSwitch={switchingHandler} />

          <SortBy onFetchSort={fetchSortHandler} sortItems={sorterItems} />

          {props.mediaType === "movies" || props.mediaType === "series" ? (
            <FiltersMenu
              genresList={
                props.genresList !== undefined ? props.genresList : null
              }
            />
          ) : null}
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

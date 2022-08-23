import React, { useState } from "react";
import styles from "./styles/MediaDisplayer.module.scss";
import RatingIcon from "../Icons/RatingIcon";
import Switcher from "../UI/Switcher";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import MediaCards from "./MediaCards";
import { chooseSwitchers } from "../../utils/scripts";

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

  let chosenMediaData = null;
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
  switchers = chooseSwitchers(props.mediaType) // Selects switcher's text based upon mediaType being displayed

  return (
    <section className={styles["media-displayer"]}>
      <main className={styles["media-displayer__card"]}>
        <header className={styles["media-displayer__header"]}>
          <p className={styles["media-displayer__header-text"]}></p>
          <Switcher
            switches={switchers}
            onSwitch={switchingHandler}
          />
        </header>
        <main className={styles["media-displayer__content"]}>
          {chosenMediaData !== null && chosenMediaData !== undefined ? (
            <MediaCards
              genresList={props.genresList !== undefined ? props.genresList : null}
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

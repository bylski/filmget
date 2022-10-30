import React, { Fragment, useEffect } from "react";
import styles from "../styles/ToWatchList.module.scss";
import ToWatchCard from "./ToWatchCard";
import { movieInterface, seriesInterface } from "../../../utils/types";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../utils/hooks/reduxHooks";
import { accountActions } from "../../../redux/store";
import { AnimatePresence } from "framer-motion";

const ToWatchList: React.FC<{
  mediaToWatch: movieInterface[] | seriesInterface[];
  genresList: { id: number; name: string }[];
  mediaIds: number[];
}> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      accountActions.setToWatch({
        mediaToWatch: props.mediaToWatch,
        mediaIds: props.mediaIds,
      })
    );
  }, [props.mediaToWatch]);
  const mediaToWatch =
    useAppSelector((state) => state.account.toWatch.mediaToWatch)

  const allCards = mediaToWatch.map(
    (mediaData: movieInterface | seriesInterface, i) => {
      return (
        <ToWatchCard
          key={`movieCard${i}`}
          mediaData={mediaData}
          genresList={props.genresList}
        />
      );
    }
  );

  return (
    <main className={styles["towatch-section"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__text"]}>Want to watch</h1>
      </header>
      <div className={styles["section__content"]}>
        <div className={styles["media__list"]}>
          {mediaToWatch.length !== 0 && allCards}
        </div>
      </div>
      {mediaToWatch.length === 0 ? (
        <Fragment>
          <p className={styles["no-results-text"]}>
            Nothing to see here for now!
          </p>
        </Fragment>
      ) : null}
    </main>
  );
};

export default ToWatchList;

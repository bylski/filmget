import React, { useEffect, useState } from "react";
import styles from "../styles/FiltersMenu/GenreFilters.module.scss";
import GenreFilter from "./GenreFilter";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { mediaFilterActions } from "../../../redux/store";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";

const GenreFilters: React.FC<{
  genresList: { name: string; id: number }[] | null;
}> = (props) => {
  const dispatch = useAppDispatch();

  const { selectedGenresIds } = useAppSelector((state) => ({
    selectedGenresIds: state.mediaFilter.selectedGenresIds,
  })); // Get current filters
  const selectedGenresInit = selectedGenresIds || []; // If there is data to get, set it as initial value, else use empty array

  useEffect(() => {
    setSelectedGenres(selectedGenresInit)
  }, [selectedGenresIds])
  
  const [selectedGenres, setSelectedGenres] =
    useState<number[]>(selectedGenresInit);
  const addGenreHandler = (genreToAdd: number) => {
    setSelectedGenres((prev) => [...prev, genreToAdd]);
  };
  const removeGenreHandler = (genreToRemove: number) => {
    setSelectedGenres(selectedGenres.filter((id) => id !== genreToRemove));
  };

  useEffect(() => {
    dispatch(
      mediaFilterActions.getSelectedGenres({ selectedGenres: selectedGenres })
    );
  }, [selectedGenres]);

  let allGenres = null;
  if (props.genresList !== null) {
    allGenres = props.genresList.map((genre, i) => {
      return (
        <GenreFilter
          key={`genreFilter${i}`}
          genre={genre}
          isSelected={selectedGenres.includes(genre.id)}
          onAddGenre={addGenreHandler}
          onRemoveGenre={removeGenreHandler}
        ></GenreFilter>
      );
    });
  }
  return (
    <section className={styles["filter-bygenre"]}>
      <div className={styles["filter-bygenre__header"]}>
        <h2 className={styles["filter-bygenre__header-text"]}>Genres</h2>
      </div>
      <ul className={styles["filter-bygenre__genres"]}>{allGenres}</ul>
    </section>
  );
};

export default GenreFilters;

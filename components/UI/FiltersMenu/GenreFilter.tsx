import React, { useEffect, useState } from "react";
import styles from "../styles/FiltersMenu.module.scss";

const GenreFilter: React.FC<{
  genre: { name: string; id: number };
  onAddGenre: (selecteGenreId: number) => void;
  onRemoveGenre: (unselectedGenreId: number) => void;
  isSelected: boolean;
}> = (props) => {

  const genreChosenInit = props.isSelected || false;
  const [genreChosen, setGenreChosen] = useState(genreChosenInit);
  const genreClickHandler = () => {
    setGenreChosen((prev) => !prev);
  };


  useEffect(() => {
    if (genreChosen) {
      props.onAddGenre(props.genre.id);
    } else {
      props.onRemoveGenre(props.genre.id);
    }
  }, [genreChosen]);

  let classes = styles["filter-bygenre__genre"];
  if (genreChosen) {
    classes = `${styles["filter-bygenre__genre"]} ${styles["genre-active"]}`;
  }

  return (
    <li onClick={genreClickHandler} className={classes}>
      {props.genre.name}
    </li>
  );
};

export default GenreFilter;

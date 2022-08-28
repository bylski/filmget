import React, { Fragment } from "react";
import MediaCard from "./MediaCard";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { mediaFilterActions } from "../../redux/store";

const MediaCards: React.FC<{
  mediaData: movieInterface[] | seriesInterface[] | actorInterface[];
  genresList: { id: number; name: string }[] | null;
  mediaType: string;
}> = (props) => {
  const { selectedGenresIds } = useAppSelector((state) => ({
    selectedGenresIds: state.mediaFilter.selectedGenresIds,
  })); // Get current filters

  const allMediaCards = props.mediaData.map((data, i) => {

    // If data is of "series" or "movies" type
    let genreIncluded: boolean = false;
    if ("vote_average" in data) {
      data.genre_ids.forEach((genreId) => {
        if (selectedGenresIds.includes(genreId) || selectedGenresIds.length === 0) {  // If media has genres included in filters
          genreIncluded = true; // Set genreIncluded to true
        }
      })

      if (!genreIncluded) { // And if genreIncluded is false, pass null, if it is truthy, go further down and render component
        return null;
      }
    }


    return (
      <MediaCard
        key={`media${i}`}
        index={i}
        mediaData={data}
        mediaType={props.mediaType}
        genresList={props.genresList}
      />
    );
  });

  return <Fragment>{allMediaCards}</Fragment>;
};

export default MediaCards;

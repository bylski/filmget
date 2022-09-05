import React, { Fragment, useEffect } from "react";
import MediaCard from "./MediaCard";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import { useAppSelector } from "../../utils/hooks/reduxHooks";

const MediaCards: React.FC<{
  mediaData: (movieInterface[] | seriesInterface[] | actorInterface[])[];
  genresList: { id: number; name: string }[] | null;
  mediaType: string;
}> = (props) => {
  const { selectedGenresIds, ratingRange } = useAppSelector((state) => ({
    selectedGenresIds: state.mediaFilter.selectedGenresIds,
    ratingRange: state.mediaFilter.ratingRange,
  })); // Get current filters

  const allMediaCards: (JSX.Element | null)[][] = []
  props.mediaData.forEach((mediaArr, i) => {
    const mappedArr = mediaArr.map((data, j) => {
      // If data is of "series" or "movies" type
      let genreIncluded: boolean = false;
      let inRange: boolean = false;
      if ("vote_average" in data) {
        data.genre_ids.forEach((genreId) => {
          if (
            selectedGenresIds.includes(genreId) ||
            selectedGenresIds.length === 0
          ) {
            // If media has genres included in filters
            genreIncluded = true; // Set genreIncluded to true
          }
          const [ratingFrom, ratingTo] = ratingRange;
          if (
            data.vote_average >= ratingFrom &&
            data.vote_average <= ratingTo
          ) {
            // If vote-average is higher than max rating or lower than min rating - set filterMedia to true
            inRange = true;
          }
        });

        if (!genreIncluded || !inRange) {
          // If genreIncluded is false, pass null, if it is truthy, go further down and render component
          return null;
        }
      }

      return (
        <MediaCard
          key={`media${j + (i * 20)}`}
          index={i}
          mediaData={data}
          mediaType={props.mediaType}
          genresList={props.genresList}
        />
      );
    });
    allMediaCards.push(mappedArr)
  });


  return <Fragment>{allMediaCards}</Fragment>;
};

export default MediaCards;

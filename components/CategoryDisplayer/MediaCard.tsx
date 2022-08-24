import React from "react";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import MovieMediaCard from "./MovieMediaCard";
import SeriesMediaCard from "./SeriesMediaCard";
import PeopleMediaCard from "./PeopleMediaCard";

const MediaCard: React.FC<{
  mediaData: movieInterface | seriesInterface | actorInterface;
  genresList: { id: number; name: string }[] | null;
  mediaType: string;
}> = (props) => {
  let mediaGenres: any = {};
  if ("genre_ids" in props.mediaData) {
    mediaGenres = // get the genres of the movie
      props.mediaData.genre_ids.map((genreId, i) => {
        for (let genreElement of props.genresList!) {
          if (genreElement.id === genreId) {
            return { id: genreElement.id, name: genreElement.name };
          }
        }
        return null;
      });
  }

  const dispatch = useAppDispatch();
  // const mediaCardRef = useRef<HTMLDivElement | null>(null);
  let originPosition;
  let position: { x: number; y: number };
  const cardClickHandler = (
    cardRef: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    if (cardRef.current !== null) {
      originPosition = cardRef.current.getBoundingClientRect();
      position = {
        x: originPosition.x + originPosition.width / 2,
        y: originPosition.y + originPosition.height / 2,
      };
    }
    dispatch(
      modalActions.showModal({
        data: { ...props.mediaData, genresList: mediaGenres },
        originPosition: position,
      })
    );
  };

  if (props.mediaType === "series" && "first_air_date" in props.mediaData) {
    return (
      <SeriesMediaCard
        mediaData={props.mediaData}
        onCardClick={cardClickHandler}
      />
    );
  } else if (props.mediaType === "movies" && "title" in props.mediaData) {
    return (
      <MovieMediaCard
        onCardClick={cardClickHandler}
        mediaData={props.mediaData}
      />
    );
  } else if (props.mediaType === "people" && "known_for" in props.mediaData) {
    return (
      <PeopleMediaCard
        onCardClick={cardClickHandler}
        mediaData={props.mediaData}
      />
    );
  } else return null;
};

export default MediaCard;

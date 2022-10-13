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
import useModal from "../../utils/hooks/useModal";

const MediaCard: React.FC<{
  mediaData: movieInterface | seriesInterface | actorInterface;
  genresList: { id: number; name: string }[] | null;
  mediaType: "movies" | "series" | "people";
  index: number;
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

  const { showModal, closeModal } = useModal();
  const cardClickHandler = (
    cardRef: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    console.log(props.mediaType)
    showModal({elementRef: cardRef, mediaData: props.mediaData, mediaType: props.mediaType, genresList: mediaGenres})
  };

  if (props.mediaType === "series" && "first_air_date" in props.mediaData) {
    return (
      <SeriesMediaCard
        index={props.index}
        mediaData={props.mediaData}
        onCardClick={cardClickHandler}
      />
    );
  } else if (props.mediaType === "movies" && "title" in props.mediaData) {
    return (
      <MovieMediaCard
        index={props.index}
        onCardClick={cardClickHandler}
        mediaData={props.mediaData}
      />
    );
  } else if (props.mediaType === "people" && "known_for" in props.mediaData) {
    return (
      <PeopleMediaCard
        index={props.index}
        onCardClick={cardClickHandler}
        mediaData={props.mediaData}
      />
    );
  } else return null;
};

export default MediaCard;

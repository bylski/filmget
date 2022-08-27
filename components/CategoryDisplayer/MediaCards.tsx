import React, { Fragment } from "react";
import styles from "./styles/MediaDisplayer.module.scss";
import MediaCard from "./MediaCard";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";

const MediaCards: React.FC<{
  mediaData: movieInterface[] | seriesInterface[] | actorInterface[];
  genresList: { id: number; name: string }[] | null;
  mediaType: string;
}> = (props) => {
  const allMediaCards = props.mediaData.map((data, i) => (
    <MediaCard
      key={`media${i}`}
      index={i}
      mediaData={data}
      mediaType={props.mediaType}
      genresList={props.genresList}
    />
  ));

  return <Fragment>{allMediaCards}</Fragment>;
};

export default MediaCards;

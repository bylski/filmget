import React from "react";
import { actorInterface } from "../../utils/types";
import styles from "./styles/MediaCard.module.scss";
import { useRef } from "react";
import Image from "next/image";

const PeopleMediaCard: React.FC<{
  mediaData: actorInterface;
  onCardClick: (cardRef: React.MutableRefObject<HTMLDivElement | null>) => void;
}> = (props) => {
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const cardClickHandler = () => {
    props.onCardClick(mediaCardRef);
  };
  return (
    <div
      ref={mediaCardRef}
      onClick={cardClickHandler}
      className={styles["media__card"]}
    >
      <div className={styles["media__img-container"]}>
        {"profile_path" in props.mediaData ? (
          <Image
          width="600px"
          height="900px"
          className={styles["media__img"]}
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.mediaData.profile_path}`}
        />
        ) : null}
      </div>
      <div className={styles["media__info"]}>
        <p className={styles["media__name"]}>
          {"name" in props.mediaData ? props.mediaData.name : null}
        </p>
        <p className={styles["media__department"]}>
          {"known_for_department" in props.mediaData
            ? props.mediaData.known_for_department
            : null}
        </p>
      </div>
    </div>
  );
};

export default PeopleMediaCard;

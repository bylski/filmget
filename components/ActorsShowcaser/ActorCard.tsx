import React from "react";
import styles from "./styles/ActorCard.module.scss";
import { useRef } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import { actorInterface } from "../../utils/types";
import useModal from "../../utils/hooks/useModal";
import Link from "next/link";

const ActorCard: React.FC<{
  actorData: actorInterface;
  onHover: (path: string) => void;
}> = (props) => {
  const actorCardRef = useRef<HTMLImageElement>(null);

  let originPosition;
  let position: { x: number; y: number };

  const { showModal, closeModal } = useModal();
  const showModalHandler = () => {
    showModal({
      elementRef: actorCardRef,
      mediaData: props.actorData,
      mediaType: "people",
    });
  };

  const imgHoveredHandler = (e: React.MouseEvent) => {
    const path = props.actorData.known_for[0].backdrop_path;
    props.onHover(path);
  };

  let profileImgPath = props.actorData.profile_path;

  return (
    <div className={styles["actor__container"]}>
      <div
        onMouseEnter={imgHoveredHandler}
        className={styles["actor__img-container"]}
      >
        <img
          onClick={showModalHandler}
          ref={actorCardRef}
          className={styles["actor__img"]}
          src={
            profileImgPath !== null && profileImgPath !== undefined
              ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profileImgPath}`
              : "/noImg.png"
          }
        />
      </div>
      <div className={styles["actor__info"]}>
        <p onClick={showModalHandler} className={styles["actor__fullname"]}>
          {props.actorData.name}
        </p>
        <Link href={`/details/movie/${props.actorData.known_for[0].id}`}>
        <a className={styles["actor__known-from"]}>
          {props.actorData.known_for[0].title}
        </a>
        </Link>
      </div>
    </div>
  );
};

export default ActorCard;

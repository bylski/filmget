import React from "react";
import styles from "./styles/ActorCard.module.scss";
import { useRef } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import { actorInterface } from "../../utils/types";

const ActorCard: React.FC<{
  actorData: actorInterface;
  onHover: (path: string) => void;
}> = (props) => {
  const actorCardRef = useRef<HTMLImageElement>(null);

  let originPosition;
  let position: { x: number; y: number };
  const dispatch = useAppDispatch();
  const showModalHandler = () => {
    if (actorCardRef.current !== null) {
      originPosition = actorCardRef.current.getBoundingClientRect();
      position = {
        x: originPosition.x + originPosition.width / 2,
        y: originPosition.y + originPosition.height / 2,
      };
    }

    dispatch(
      modalActions.showModal({
        data: { ...props.actorData },
        originPosition: position,
      })
    );
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
        <p className={styles["actor__known-from"]}>
          {props.actorData.known_for[0].title}
        </p>
      </div>
    </div>
  );
};

export default ActorCard;

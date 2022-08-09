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
  const dispatch = useAppDispatch();
  const showModalHandler = () => {
    dispatch(
      modalActions.showModal({
        data: { ...props.actorData },
        originElement: actorCardRef,
      })
    );
  };

  const imgHoveredHandler = (e: React.MouseEvent) => {
    const path = props.actorData.known_for[0].backdrop_path;
    props.onHover(path);
  };

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
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${props.actorData.profile_path}`}
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

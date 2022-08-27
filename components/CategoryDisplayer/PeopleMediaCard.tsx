import React from "react";
import { actorInterface } from "../../utils/types";
import styles from "./styles/MediaCard.module.scss";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

const PeopleMediaCard: React.FC<{
  mediaData: actorInterface;
  onCardClick: (cardRef: React.MutableRefObject<HTMLDivElement | null>) => void;
  index: number;
}> = (props) => {
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const cardClickHandler = () => {
    props.onCardClick(mediaCardRef);
  };

  // Manual control of the fade-in animation
  const controls = useAnimationControls();
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 0,
        top: 15,
        transition: { duration: 0 },
      });
      await controls.start((i) => ({
        opacity: 1,
        transition: { duration: 0.5, delay: 0.02 * i },
      }));
    };

    sequence();
  }, [props.mediaData]);

  return (
    <motion.div
      animate={controls}
      custom={props.index}
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
    </motion.div>
  );
};

export default PeopleMediaCard;

import { motion } from "framer-motion";
import React, { Fragment } from "react";
import styles from "./styles/DetailsModal.module.scss";
import { modalVariants } from "../../utils/AnimationVariants.ts";
import { movieInterface, seriesInterface } from "../../utils/types";
import { actorInterface } from "../../utils/types";
import MovieDetails from "./MovieDetails";
import ActorDetails from "./ActorDetails";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import SeriesDetails from "./SeriesDetails";
import useModal from "../../utils/hooks/useModal";

const DetailsModal: React.FC<{
  modalData: movieInterface | actorInterface | seriesInterface;
  originPosition: any;
}> = (props) => {
  // Gets the origin element's (the card that was clicked)
  // position to animate the modal enterencce from that position.
  const position = props.originPosition;

  let genres: string[] = [];
  let genresString: string = "";

  if ("genre_ids" in props.modalData) {
    genres = props.modalData.genresList.map((genre) => {
      return genre.name;
    });
    genresString = genres.join(", ");
  }

  let modalDetailsRender;
  if ("title" in props.modalData) {
    // Check if the data is from movie or actor card
    modalDetailsRender = (
      <MovieDetails modalData={props.modalData} genresString={genresString} />
    );
  } else if ("name" in props.modalData && "genre_ids" in props.modalData) {
    modalDetailsRender = <SeriesDetails modalData={props.modalData} genresString={genresString}/>
  } else if ("known_for" in props.modalData) {
    modalDetailsRender = <ActorDetails modalData={props.modalData} />;
  } else {
    <p style={{color: "white"}}>ERROR</p>
  }

  const {showModal, closeModal} = useModal();
  const backdropClickHandler = () => {
    closeModal();
  };

  return (
    <Fragment>
      <motion.div
        key="backdrop"
        variants={modalVariants}
        initial="backdropFade"
        animate="backdropEnter"
        exit="backdropFade"
        className={styles["modal__backdrop"]}
      ></motion.div>
      <motion.section
        key="modal"
        className={styles["modal__container"]}
        custom={position}
        variants={modalVariants}
        initial="modalHidden"
        animate="modalEnter"
        exit="modalHidden"
      >
        <div
          onClick={backdropClickHandler}
          className={styles["modal__outside-space"]}
        ></div>
        <div className={styles["modal__card"]}>{modalDetailsRender}</div>
      </motion.section>
    </Fragment>
  );
};

export default DetailsModal;

import { motion } from "framer-motion";
import React, { Fragment } from "react";
import styles from "./styles/DetailsModal.module.scss";
import { modalVariants } from "../../utils/AnimationVariants.ts";
import { movieInterface } from "../../utils/types";
import { actorInterface } from "../../utils/types";
import MovieDetails from "./MovieDetails";
import ActorDetails from "./ActorDetails";

const DetailsModal: React.FC<{
  modalData: movieInterface | actorInterface;
  originElement: any;
}> = (props) => {
  // Gets the origin element's (the card that was clicked)
  // position to animate the modal enterencce from that position.
  const originElement = props.originElement.current.getBoundingClientRect();
  const position = {
    x: originElement.x + originElement.width / 2,
    y: originElement.y + originElement.height / 2,
  };

  let genres: string[] = [];
  let genresString: string = "";

  if ("genresList" in props.modalData) {
    genres = props.modalData.genresList.map((genre) => {
      return genre.name;
    });
    genresString = genres.join(", ");
  }


  let modalDetailsRender;
  if ("poster_path" in props.modalData) { // Check if the data is from movie or actor card
    modalDetailsRender = (
      <MovieDetails
            modalData={props.modalData}
            genresString={genresString}
          />
    )
  } else {
    modalDetailsRender = (
      <ActorDetails modalData={props.modalData}/>
    )
  }

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
        <div className={styles["modal__card"]}>
          {modalDetailsRender} 
        </div>
      </motion.section>
    </Fragment>
  );
};

export default DetailsModal;

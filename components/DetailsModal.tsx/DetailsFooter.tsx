import React from "react";
import StyledButton from "../UI/StyledButton";
import styles from "./styles/DetailsFooter.module.scss";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";
import Link from "next/link";
import useModal from "../../utils/hooks/useModal";

const DetailsFooter: React.FC<{
  mediaData: { id: number; mediaType: string };
}> = (props) => {
  const dispatch = useAppDispatch();
  const { showModal, closeModal } = useModal();
  const closeModalHandler = () => {
    closeModal();
  };

  

  return (
    <footer className={styles["modal__footer"]}>
      <Link
        href={`/details/${props.mediaData.mediaType}/${props.mediaData.id}`}
      >
        <a className={styles["anchor-link"]}>
          <StyledButton addClass={styles["modal-btn"]}>
            More Details
          </StyledButton>
        </a>
      </Link>
      <StyledButton action={closeModalHandler} addClass={styles["modal-btn"]}>
        Exit
      </StyledButton>
    </footer>
  );
};

export default DetailsFooter;

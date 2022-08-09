import React from "react";
import StyledButton from "../UI/StyledButton";
import styles from "./styles/DetailsFooter.module.scss";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { modalActions } from "../../redux/store";

const DetailsFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <footer className={styles["modal__footer"]}>
      <StyledButton addClass={styles["modal-btn"]}>More Details</StyledButton>
      <StyledButton action={closeModalHandler} addClass={styles["modal-btn"]}>
        Exit
      </StyledButton>
    </footer>
  );
};

export default DetailsFooter;

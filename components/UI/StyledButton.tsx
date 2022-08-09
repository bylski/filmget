import React from "react";
import styles from "./styles/StyledButton.module.scss";

const StyledButton: React.FC<{
  children?: string;
  addClass?: string;
  action?: () => any;
}> = (props) => {
  const classes = props.addClass
    ? `${styles["styled-button"]} ${props.addClass}`
    : styles["styled-button"];

  const onClickHandler = () => {
    if (props.action !== undefined) {
      props.action();
    }
  };

  return (
    <button onClick={onClickHandler} className={classes}>
      {props.children}
    </button>
  );
};

export default StyledButton;

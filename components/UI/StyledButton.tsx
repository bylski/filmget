import React from "react";
import styles from "./styles/StyledButton.module.scss";

const StyledButton: React.FC<{
  children?: string | JSX.Element;
  addClass?: string;
  notSubmit?: boolean;
  action?: (e: any) => any;
}> = (props) => {
  const classes = props.addClass
    ? `${styles["styled-button"]} ${props.addClass}`
    : styles["styled-button"];

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.action !== undefined) {
      props.action(e);
    }
  };

  return (
    <button onClick={onClickHandler} className={classes} type={props.notSubmit ? "button": "submit"}>
      {props.children}
    </button>
  );
};

export default StyledButton;

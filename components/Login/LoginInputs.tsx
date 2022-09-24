import React from "react";
import LoginInput from "./LoginInput";
import styles from "./styles/LoginInputs.module.scss";

const LoginInputs: React.FC<{
  inputsValidity: { usernameValidity: boolean; passwordValidity: boolean };
}> = (props) => {
  return (
    <ul className={styles["form__inputs"]}>
      <LoginInput
        inputName="Username"
        type="text"
        placeholder="Your username"
        validity={props.inputsValidity.usernameValidity}
      />
      <LoginInput
        inputName="Password"
        passwordInput={true}
        placeholder="Password"
        validity={props.inputsValidity.passwordValidity}
      />
    </ul>
  );
};

export default LoginInputs;

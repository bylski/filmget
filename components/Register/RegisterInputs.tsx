import React, { useState } from "react";
import styles from "./styles/RegisterInputs.module.scss";
import RegisterInput from "./RegisterInput";

type validationState = {
  username: { isValid: boolean };
  email: { isValid: boolean };
  password: { isValid: boolean };
};

const RegisterInputs: React.FC<{inputsValidation: validationState}> = (props) => {
  return (
    <ul className={styles["form__inputs"]}>
      <RegisterInput
        inputName={"Username"}
        type="text"
        placeholder={"Username"}
        maxLength={18}
        isInputValid={props.inputsValidation.username.isValid}
      />
      <RegisterInput
        inputName={"Email"}
        type="text"
        placeholder={"Email"}
        maxLength={100}
        isInputValid={props.inputsValidation.email.isValid}
      />
      <RegisterInput
        inputName={"Password"}
        passwordInput={true}
        placeholder={"* Password - min. 8 characters"}
        maxLength={24}
        isInputValid={props.inputsValidation.password.isValid}
      />
    </ul>
  );
};

export default RegisterInputs;

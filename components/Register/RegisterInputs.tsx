import React, { useState } from "react";
import styles from "./styles/RegisterInputs.module.scss";
import RegisterInput from "./RegisterInput";

const RegisterInputs: React.FC = (props) => {

  return (
    <ul className={styles["form__inputs"]}>
        <RegisterInput inputName={"Username"} type="text" placeholder={"Username"}/>
        <RegisterInput inputName={"Email"} type="text" placeholder={"Email"}/>
        <RegisterInput inputName={"Password"} passwordInput={true} placeholder={"* Password - min. 8 characters"}/>
    </ul>
  );
};

export default RegisterInputs;

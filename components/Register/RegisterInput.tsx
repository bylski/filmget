import React, { useState } from "react";
import EyeIcon from "../Icons/EyeIcon";
import styles from "./styles/RegisterInput.module.scss";

const RegisterInput: React.FC<
  {
      inputName: string;
      type: string;
      placeholder: string;
      passwordInput?: boolean;
    }
    | {
        inputName: string;
        placeholder: string;
        passwordInput: true;
      }
> = (props) => {

  const [showPassword, setShowPassword] = useState(false);
  if (props.passwordInput === true) {
    return (
      <li className={styles["form__input"]}>
        <label className={styles["input__label"]} htmlFor="password">
          Password
        </label>
        <div className={styles["input__wrap"]}>
          <input
            className={styles["input"]}
            type={!showPassword ? "password" : "text"}
            placeholder={props.placeholder}
            id={props.inputName}
          ></input>
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
            className={styles["input__eye-icon-btn"]}
          >
            <EyeIcon
              className={
                !showPassword
                  ? styles["input__eye-icon"]
                  : `${styles["input__eye-icon"]} ${styles["active"]}`
              }
            />
          </button>
        </div>
        <ul className={styles["input__requirements"]}>
          <li className={styles["input__requirement"]}>
            * Minimum 8 characters
          </li>
          <li className={styles["input__requirement"]}>
            * At least 1 large letter
          </li>
          <li className={styles["input__requirement"]}>* At least 1 digit</li>
        </ul>
      </li>
    );
  }

  return (
    <li className={styles["form__input"]}>
      <label className={styles["input__label"]} htmlFor={props.inputName}>
        {props.inputName}
      </label>
      <input
        className={styles["input"]}
        type={props.type}
        placeholder={props.placeholder}
        id={props.inputName}
      ></input>
    </li>
  );
};

export default RegisterInput;

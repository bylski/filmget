import React, { useState } from "react";
import styles from "./styles/LoginInput.module.scss";
import EyeIcon from "../Icons/EyeIcon";

const LoginInput: React.FC<
  | {
      inputName: string;
      type: string;
      placeholder: string;
      passwordInput?: boolean;
    }
  | { passwordInput: true, placeholder: string, inputName: string}
> = (props) => {
  if (props.passwordInput === true) {
    const [showPassword, setShowPassword] = useState(false);

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

export default LoginInput;

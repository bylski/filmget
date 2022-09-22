import React, { ChangeEventHandler, useState, useReducer } from "react";
import EyeIcon from "../Icons/EyeIcon";
import styles from "./styles/RegisterInput.module.scss";
import { AppDispatch, registerInputsActions } from "../../redux/store";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { defaultConfig } from "next/dist/server/config-shared";
import { LargeNumberLike } from "crypto";

const RegisterInput: React.FC<
  | {
      inputName: string;
      type: string;
      placeholder: string;
      passwordInput?: boolean;
      maxLength: number;
      isInputValid: boolean
    }
  | {
      inputName: string;
      placeholder: string;
      passwordInput: true;
      maxLength: number;
      isInputValid: boolean
    }
> = (props) => {
  const [inputData, setInputData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    setInputData(inputVal);
    // Store data in redux store
    dispatch(
      registerInputsActions.getInputsData({
        type: props.inputName,
        data: inputVal,
      })
    );
  };

  // Set input classes based on validationState
  const { isInputValid } = props;
  console.log(isInputValid)
  const inputClasses = isInputValid ? styles["input"] : `${styles["input"]} ${styles["invalid"]}`
  console.log(inputClasses)


  if (props.passwordInput === true) {
    return (
      <li className={styles["form__input"]}>
        <label className={styles["input__label"]} htmlFor="password">
          Password
        </label>
        <div className={styles["input__wrap"]}>
          <input
            value={inputData}
            onChange={inputChangeHandler}
            className={inputClasses}
            type={!showPassword ? "password" : "text"}
            placeholder={props.placeholder}
            id={props.inputName}
            maxLength={props.maxLength}
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
        value={inputData}
        onChange={inputChangeHandler}
        className={inputClasses}
        type={props.type}
        placeholder={props.placeholder}
        id={props.inputName}
        maxLength={props.maxLength}
      ></input>
    </li>
  );
};

export default RegisterInput;

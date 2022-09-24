import React, { useState, useEffect } from "react";
import styles from "./styles/LoginInput.module.scss";
import EyeIcon from "../Icons/EyeIcon";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { loginInputsActions } from "../../redux/store";

const LoginInput: React.FC<
  | {
      inputName: string;
      type: string;
      placeholder: string;
      passwordInput?: boolean;
      validity: boolean;
    }
  | {
      passwordInput: true;
      placeholder: string;
      inputName: string;
      validity: boolean;
    }
> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState("");

  const dispatch = useAppDispatch();

  // Clear redux state on initial render
  useEffect(() => {
    dispatch(
      loginInputsActions.getInputsData({
        data: inputData,
        type: props.inputName,
      })
    );
  }, []);

  // Set redux input state on every input change
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    setInputData(inputVal);
    dispatch(
      loginInputsActions.getInputsData({
        data: inputVal,
        type: props.inputName,
      })
    );
  };

  // Set input classes based on validationState
  const { validity } = props;
  const inputClasses = validity ? styles["input"] : `${styles["input"]} ${styles["invalid"]}`


  if (props.passwordInput === true) {
    return (
      <li className={styles["form__input"]}>
        <label className={styles["input__label"]} htmlFor="password">
          Password
        </label>
        <div className={styles["input__wrap"]}>
          <input
            className={inputClasses}
            type={!showPassword ? "password" : "text"}
            placeholder={props.placeholder}
            id={props.inputName}
            onChange={inputChangeHandler}
            value={inputData}
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
        className={inputClasses}
        type={props.type}
        placeholder={props.placeholder}
        id={props.inputName}
        onChange={inputChangeHandler}
        value={inputData}
      ></input>
    </li>
  );
};

export default LoginInput;

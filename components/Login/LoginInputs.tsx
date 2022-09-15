import React from "react";
import LoginInput from "./LoginInput";
import styles from "./styles/LoginInputs.module.scss";

const LoginInputs: React.FC = (props) => {
  return (
    <ul className={styles["form__inputs"]}>
      <LoginInput
        inputName="Username"
        type="text"
        placeholder="Your username"
      />
      <LoginInput
        inputName="Password"
        passwordInput={true}
        placeholder="Password"
      />
      {/* <li className={styles["form__input"]}>
                <label className={styles["input__label"]} htmlFor="username">
                  Username
                </label>
                <input
                  className={styles["input"]}
                  type="text"
                  placeholder="Your Username"
                  id="username"
                ></input>
              </li>
              <li className={styles["form__input"]}>
                <label className={styles["input__label"]} htmlFor="password">
                  Password
                </label>
                <input
                  className={styles["input"]}
                  type="text"
                  placeholder="Password"
                  id="password"
                ></input>
              </li> */}
    </ul>
  );
};

export default LoginInputs;

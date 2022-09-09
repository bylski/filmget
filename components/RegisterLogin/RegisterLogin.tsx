import React from "react";
import styles from "./styles/RegisterLogin.module.scss";

const RegisterLogin: React.FC<{headerText: string}> = (props) => {
  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <div className={styles["card__img-section"]}>
          <img
            className={styles["card__img"]}
            src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg"
          ></img>
        </div>
        <div className={styles["card__form-section"]}>
          <form className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>{props.headerText}</h1>
            <ul className={styles["form__inputs"]}>
              <li className={styles["form__input"]}>
                <label className={styles["input__label"]} htmlFor="username">
                  Username
                </label>
                <input
                  className={styles["input"]}
                  type="text"
                  placeholder="* Username"
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
                  placeholder="* Password - min. 8 characters"
                  id="password"
                ></input>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterLogin;

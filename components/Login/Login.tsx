import React, { useEffect, useState } from "react";
import styles from "./styles/Login.module.scss";
import StyledButton from "../UI/StyledButton";
import LoginInputs from "./LoginInputs";



const Login: React.FC<{movieUrls: string[]}> = (props) => {
  const bgImg = props.movieUrls[Math.floor(Math.random() * props.movieUrls.length)];

  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <div className={styles["card__img-section"]}>
          <img className={styles["card__img"]} src={bgImg}></img>
        </div>
        <div className={styles["card__form-section"]}>
          <form className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>Log In</h1>
            <LoginInputs/>
            <div className={styles["form__footer"]}>
              <StyledButton addClass={styles["form__submit-btn"]}>Submit</StyledButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;

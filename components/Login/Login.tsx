import React, { useEffect, useState } from "react";
import styles from "./styles/Login.module.scss";
import StyledButton from "../UI/StyledButton";
import LoginInputs from "./LoginInputs";

const urls = [
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/68sanslplXryiJWzv0uMuXjJBmB.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg",
  "https://image.tmdb.org/t/p/w1920_and_h800_bestv2/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yQTQL9pliY6vpRt8HkjUJrKymBb.jpg",
];

const Login: React.FC = (props) => {
  const bgImg = urls[Math.floor(Math.random() * urls.length)];

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

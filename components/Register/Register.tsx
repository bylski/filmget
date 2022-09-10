import React, { useEffect, useState } from "react";
import styles from "./styles/Register.module.scss";

const urls = [
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/68sanslplXryiJWzv0uMuXjJBmB.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg",
  "https://image.tmdb.org/t/p/w1920_and_h800_bestv2/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg",
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yQTQL9pliY6vpRt8HkjUJrKymBb.jpg",
];

const Register: React.FC = (props) => {
  const [currentUrlIndex, setUrlIndex] = useState(0);
  let carouselInterval: any = undefined;
  useEffect(() => {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    carouselInterval = setInterval(() => {
      setUrlIndex((prev) => {
        if (prev === urls.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  }, []);

  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <div className={styles["card__img-section"]}>
          {urls.map((url, i) => {
            if (currentUrlIndex - 1 === i) {
              return (
                <img
                  key={`reglog_img${i}`}
                  className={`${styles["card__img"]} ${styles["fade-out"]}`}
                  src={url}
                ></img>
              );
            }
            if (currentUrlIndex === i) {
              return (
                <img
                  key={`reglog_img${i}`}
                  className={`${styles["card__img"]} ${styles["active"]}`}
                  src={url}
                ></img>
              );
            }
            return (
              <img
                key={`reglog_img${i}`}
                className={styles["card__img"]}
                src={url}
              ></img>
            );
          })}
        </div>
        <div className={styles["card__form-section"]}>
          <form className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>Create Account</h1>
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

export default Register;

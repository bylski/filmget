import React from "react";
import StyledButton from "../UI/StyledButton";
import RegisterImageCarousel from "./RegisterImageCarousel";
import RegisterInputs from "./RegisterInputs";
import styles from "./styles/Register.module.scss";

const urls = [
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",

  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/68sanslplXryiJWzv0uMuXjJBmB.jpg",

  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg",

  "https://image.tmdb.org/t/p/w1920_and_h800_bestv2/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg",

  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yQTQL9pliY6vpRt8HkjUJrKymBb.jpg",
];

const Register: React.FC = (props) => {

  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <RegisterImageCarousel urls={urls}/>
        <div className={styles["card__form-section"]}>
          <form className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>Create Account</h1>
            <RegisterInputs/>
            <div className={styles["form__footer"]}>
              <StyledButton addClass={styles["form__submit-btn"]}>Submit Account</StyledButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;

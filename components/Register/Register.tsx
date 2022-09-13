import { stat } from "fs";
import { iteratorSymbol } from "immer/dist/internal";
import React, {
  ReducerAction,
  ReducerState,
  useEffect,
  useReducer,
  useState,
} from "react";
import styles from "./styles/Register.module.scss";

const urls = [
  {
    url: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    active: false,
    fadeOut: false,
    init: true,
  },
  {
    url: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/68sanslplXryiJWzv0uMuXjJBmB.jpg",
    active: false,
    fadeOut: false,
  },
  {
    url: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg",
    active: false,
    fadeOut: false,
  },
  {
    url: "https://image.tmdb.org/t/p/w1920_and_h800_bestv2/27Mj3rFYP3xqFy7lnz17vEd8Ms.jpg",
    active: false,
    fadeOut: false,
  },
  {
    url: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yQTQL9pliY6vpRt8HkjUJrKymBb.jpg",
    active: false,
    fadeOut: false,
  },
];

const Register: React.FC = (props) => {
  const initState = {
    index: 0,
    images: urls,
  };

  type carouselActions =
    | { type: "increaseIndex" | "decreaseIndex" }
    | { type: "setIndex"; payload: number }
    | { type: "setImages"; payload: typeof urls }

  const carouselReducer = (
    state: typeof initState,
    action: carouselActions
  ) => {
    switch (action.type) {
      case "increaseIndex":
        return { ...state, index: state.index + 1 };
      case "decreaseIndex":
        return { ...state, index: state.index - 1 };
      case "setIndex":
        return { ...state, index: action.payload };
      case "setImages":
        return { ...state, images: action.payload };
    }
  };

  const [carouselState, carouselDispatch] = useReducer(
    carouselReducer,
    initState
  );


  let carouselInterval: any = undefined;
  useEffect(() => {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    carouselInterval = setTimeout(() => {
      if (carouselState.index >= urls.length - 1) {
        console.log("SET");
        carouselDispatch({ type: "setIndex", payload: 0 });
      } else {
        console.log("FIRE")
        carouselDispatch({ type: "increaseIndex" });
      }

      
  console.log(carouselState.index)
      const newImagesState = carouselState.images.map((image, i) => {
         // After initial cycle, set init to false to unlock normal behaviour
        if (carouselState.index === 0 && image.init) {
          return { ...image, init: false, fadeOut: true};
        }
        // If its the end of the array -> set first index to active
        if (carouselState.index === carouselState.images.length - 1 && i === 0) {
          return {...image, active: true}
        }
        // Set image with current index to fadeOut
        if (carouselState.index === i) {
          return { ...image, active: false, fadeOut: true};
        } 
        // Set image with next index to Active
        if (carouselState.index + 1 === i) {
          return { ...image, active: true, fadeOut: false};
        }
        // Set all other image states to false
        return { ...image, active: false, fadeOut: false};
      });

      console.log(newImagesState);

      carouselDispatch({ type: "setImages", payload: newImagesState });
    }, 15000);
  }, [carouselState.index]);



  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <div className={styles["card__img-section"]}>
          {carouselState.images.map((url, i) => {
            let classes = styles["card__img"];
            if (url.init) {
              classes = `${styles["card__img"]} ${styles["init"]}`;
            }
            if (url.active)
              classes = `${styles["card__img"]} ${styles["active"]}`;
            if (url.fadeOut)
              classes = `${styles["card__img"]} ${styles["fade-out"]}`;
            return (
              <img key={`reg_img${i}`} className={classes} src={url.url}></img>
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

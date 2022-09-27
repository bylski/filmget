import React, { useEffect, useState } from "react";
import styles from "./styles/Login.module.scss";
import StyledButton from "../UI/StyledButton";
import LoginInputs from "./LoginInputs";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: React.FC<{ movieUrls: string[] }> = (props) => {
  const [bgImg, setBgImg] = useState("");
  useEffect(() => {
    setBgImg(
      props.movieUrls[Math.floor(Math.random() * props.movieUrls.length)]
    );
  }, []);

  const { username, password } = useAppSelector((state) => state.loginInputs);
  const [inputsValidity, setInputsValidity] = useState({
    usernameValidity: true,
    passwordValidity: true,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const loginSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === "") {
      setInputsValidity((prev) => ({
        ...prev,
        usernameValidity: false,
        message: "* Pass all of the required credentials!",
      }));
    } else {
      setInputsValidity((prev) => ({ ...prev, usernameValidity: true }));
    }
    if (password.trim() === "") {
      setInputsValidity((prev) => ({
        ...prev,
        passwordValidity: false,
        message: "* Pass all of the required credentials!",
      }));
    } else {
      setInputsValidity((prev) => ({ ...prev, passwordValidity: true }));
    }
    setIsSubmitted(true);
  };

  const router = useRouter();
  useEffect(() => {
    const signInHandler = async () => {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res !== undefined && res.ok) {
        setInputsValidity((prev) => ({
          ...prev,
          message: "",
        }));
        router.replace("/home");
      } else if (res !== undefined && !res.ok) {
        setInputsValidity((prev) => ({
          ...prev,
          message: "* Invalid credentials!",
        }));
      }
    };

    if (isSubmitted) {
      const { passwordValidity, usernameValidity } = inputsValidity;
      if (passwordValidity && usernameValidity) {
        signInHandler();
      }
    }

    setIsSubmitted(false);
  }, [isSubmitted]);

  const errorMessage = inputsValidity.message ? (
    <p className={styles["form__error-text"]}>{inputsValidity.message}</p>
  ) : null;

  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <div className={styles["card__img-section"]}>
          <img className={styles["card__img"]} src={bgImg}></img>
        </div>
        <div className={styles["card__form-section"]}>
          <form onSubmit={loginSubmitHandler} className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>Log In</h1>
            <LoginInputs inputsValidity={inputsValidity} />
            <div className={styles["form__footer"]}>
              <div className={styles["form__errors"]}>{errorMessage}</div>
              <StyledButton addClass={styles["form__submit-btn"]}>
                Submit
              </StyledButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;

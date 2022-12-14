import React, { useEffect, useState } from "react";
import styles from "./styles/Login.module.scss";
import StyledButton from "../UI/StyledButton";
import LoginInputs from "./LoginInputs";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useBreakpoints from "../../utils/hooks/useBreakpoints";
import Image from "next/image";

const Login: React.FC<{ movieUrls: string[]; movieUrlsMobile: string[] }> = (
  props
) => {
  let hideImgSection = true;
  const breakpoints = useBreakpoints({
    breakpointName: "mobileImageSection",
    breakpointVal: 600,
  });
  if (breakpoints !== undefined) {
    hideImgSection = breakpoints[0].mobileImageSection;
  }

  const [bgImg, setBgImg] = useState("");
  useEffect(() => {
    if (hideImgSection) {
      setBgImg(
        props.movieUrlsMobile[
          Math.floor(Math.random() * props.movieUrls.length)
        ]
      );
    } else {
      setBgImg(
        props.movieUrls[Math.floor(Math.random() * props.movieUrls.length)]
      );
    }
  }, [hideImgSection]);

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
          <Image
            placeholder={"blur"}
            blurDataURL={
              "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqgcAALkAm/1TptUAAAAASUVORK5CYII="
            }
            layout="fill"
            className={styles["card__img"]}
            src={bgImg}
          ></Image>
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
